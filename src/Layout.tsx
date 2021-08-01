import { Global, Theme, css, ThemeProvider, ClassNames } from "@emotion/react";
import emotionNormalize from "emotion-normalize";
import { Fragment } from "react";
import { defaultTheme } from "./theme";
import { Helmet } from "react-helmet";
import SanityGoneLogo from "./components/SanityGoneLogo";
import BreadcrumbBackIcon from "./components/icons/BreadcrumbBackIcon";

interface LayoutProps {
  pageTitle: string;
  previousLocation: string;
  previousLocationLink: string;
  bannerImageUrl?: string;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const {
    pageTitle,
    previousLocation,
    previousLocationLink,
    bannerImageUrl,
    children,
    ...rest
  } = props;
  return (
    // <> shorthand syntax is BROKEN, don't use it.
    <Fragment>
      <Helmet titleTemplate="%s · Sanity;Gone 0" defaultTitle="Sanity;Gone 0">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <html {...rest} />
      </Helmet>
      <ThemeProvider theme={defaultTheme}>
        <Global styles={emotionNormalize} />
        <Global styles={styles} />
        <Global
          styles={css`
            body {
              background-image: url("${bannerImageUrl}");
            }
          `}
        />
        <header>
          <SanityGoneLogo />
          <ClassNames>
            {({ cx }) => (
              <div
                className={cx(
                  "heading-and-breadcrumb",
                  bannerImageUrl && "has-banner-image"
                )}
              >
                <h1>{pageTitle}</h1>
                <a
                  className="breadcrumb"
                  href={previousLocationLink}
                  aria-label={`Back to ${previousLocation}`}
                >
                  <BreadcrumbBackIcon />
                  {previousLocation}
                </a>
              </div>
            )}
          </ClassNames>
        </header>
        <div className="page-content">{children}</div>
      </ThemeProvider>
    </Fragment>
  );
};
export default Layout;

const styles = (theme: Theme) => css`
  html {
    font-family: ${theme.typography.body.family};
    font-size: ${theme.typography.body.size};
    color: ${theme.palette.white};
    background-color: ${theme.palette.background};
    line-height: ${theme.typography.body.lineHeight};
    overflow-y: scroll;
  }

  body {
    display: flex;
    justify-content: center;
    background-repeat: no-repeat;
    background-position-x: center;
  }

  header,
  .page-content {
    max-width: 1280px;
  }

  header {
    padding: ${theme.spacing(3)} ${theme.spacing(3)} 0;

    .heading-and-breadcrumb {
      display: flex;
      flex-direction: column-reverse;

      &.has-banner-image {
        margin-top: 165px;
      }

      h1 {
        margin: 0;
        font-size: ${theme.typography.pageHeading.size};
        font-weight: ${theme.typography.pageHeading.weight};
        line-height: ${theme.typography.pageHeading.lineHeight};
      }

      .breadcrumb {
        display: flex;
        align-items: center;
        text-decoration: none;
        font-style: normal;
        color: ${theme.palette.gray};
        line-height: ${theme.typography.navigationLink.lineHeight};

        svg {
          margin-right: ${theme.spacing(1)};
        }
      }
    }
  }

  b,
  strong {
    color: ${theme.palette.blue};
    font-weight: normal;
  }

  a {
    color: ${theme.palette.blue};
  }

  .visually-hidden:not(:focus):not(:active) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  dl {
    & > div {
      padding: ${theme.spacing(2)};
      background-color: ${theme.palette.midBackground};
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    dt {
      font-size: ${theme.typography.body2};
      color: ${theme.palette.gray};
      display: flex;
      align-items: center;

      svg {
        margin-right: ${theme.spacing(1)};
      }
    }

    dd {
      margin: ${theme.spacing(1)} 0 0;
      font-size: ${theme.typography.generalHeadingBold.size};
      font-weight: ${theme.typography.generalHeadingBold.weight};
      line-height: ${theme.typography.generalHeadingBold.lineHeight};
    }
  }

  p,
  section {
    margin: ${theme.spacing(3)} 0 0;
  }
`;
