import { Global, Theme, css, ThemeProvider } from "@emotion/react";
import emotionNormalize from "emotion-normalize";
import { Fragment } from "react";
import { defaultTheme } from "./theme";
import { Helmet } from "react-helmet";
import SanityGoneLogo from "./components/SanityGoneLogo";
import BreadcrumbBackIcon from "./components/icons/BreadcrumbBackIcon";
import { slugify } from "./utils/globals";
import "wicg-inert";

interface LayoutProps {
  pageTitle: string;
  previousLocation: string;
  previousLocationLink: string;
  accentColor: string;
  bannerImageUrl: string;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const {
    pageTitle,
    previousLocation,
    previousLocationLink,
    bannerImageUrl,
    accentColor,
    children,
    ...rest
  } = props;
  return (
    // <> shorthand syntax is BROKEN, don't use it.
    <Fragment>
      <Helmet titleTemplate="%s · Sanity;Gone 0" defaultTitle="Sanity;Gone 0">
        <html {...rest} />
      </Helmet>
      <ThemeProvider theme={defaultTheme}>
        <Global styles={emotionNormalize} />
        <Global styles={styles({ accentColor, bannerImageUrl })} />
        <div className="site-wrapper">
          <div className="header-main-wrapper">
            <header>
              <div className="top-line">
                <SanityGoneLogo />
                <div className="header-links">
                  <a href="/">Home</a>
                  <a href="/operators">Operators</a>
                  <a href="/about">About</a>
                </div>
              </div>
              <div className="heading-and-breadcrumb">
                <h1>{pageTitle}</h1>
                <div className="breadcrumb">
                  <a
                    href={previousLocationLink}
                    aria-label={`Back to ${previousLocation}`}
                  >
                    <BreadcrumbBackIcon />
                    {previousLocation}
                  </a>
                </div>
              </div>
            </header>
            <div className="page-content">{children}</div>
          </div>
          <footer />
        </div>
      </ThemeProvider>
    </Fragment>
  );
};
export default Layout;

const styles =
  ({
    accentColor,
    bannerImageUrl,
  }: {
    accentColor: string;
    bannerImageUrl: string;
  }) =>
  (theme: Theme) =>
    css`
      html {
        font-size: ${theme.typography.body.size};
        color: ${theme.palette.white};
        background-color: ${theme.palette.background};
        line-height: ${theme.typography.body.lineHeight};
        overflow-y: scroll;
        font-family: ${theme.typography.fallbackFontFamily};
      }

      body {
        background-image: url("${bannerImageUrl}");
        background-repeat: no-repeat;
        background-position-x: center;

        &:not(.wf-${slugify(theme.typography.body.family)}--loaded) {
          ${theme.typography.fallbackFontCss};
        }

        &.wf-${slugify(theme.typography.body.family)}--loaded {
          font-family: ${theme.typography.body.family};
        }
      }

      .site-wrapper {
        height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .header-main-wrapper {
        margin: auto;
        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
        max-width: ${theme.containerWidth};

        .page-content {
          padding-top: ${theme.contentY};
        }
      }

      footer {
        flex-shrink: 0;
      }

      header {
        padding: ${theme.spacing(3, 0, 0)};
        position: absolute; // to remove from page flow
        width: ${theme.containerWidth};

        .top-line {
          display: flex;
          align-items: flex-end;

          .header-links {
            flex-grow: 1;
            text-align: end;

            a {
              margin-left: ${theme.spacing(8)};
              color: ${theme.palette.white};
              text-decoration: none;
            }
          }
        }

        .heading-and-breadcrumb {
          display: flex;
          flex-direction: column-reverse;
          margin-top: 165px;

          h1 {
            margin: 0;
            font-size: ${theme.typography.pageHeading.size};
            font-weight: ${theme.typography.pageHeading.weight};
            line-height: ${theme.typography.pageHeading.lineHeight};
          }

          .breadcrumb {
            line-height: 1;

            a {
              display: inline-flex;
              align-items: center;
              text-decoration: none;
              font-style: normal;
              color: ${theme.palette.gray};
              line-height: ${theme.typography.navigationLink.lineHeight};

              svg {
                margin-right: ${theme.spacing(1)};

                path {
                  fill: ${theme.palette.white};
                }
              }
            }
          }
        }
      }

      footer {
        height: 120px;
        margin-top: ${theme.spacing(1)};
        background-color: ${theme.palette.headerBackground};
      }

      b,
      strong {
        color: ${theme.palette.blue};
        font-weight: normal;
      }

      a {
        text-decoration: none;
        color: ${accentColor};

        &:hover {
          color: ${theme.palette.white};
        }
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
          background-color: ${theme.palette.background};
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        dt {
          font-size: ${theme.typography.body2.size};
          line-height: ${theme.typography.body2.lineHeight};
          color: ${theme.palette.gray};
          display: flex;
          align-items: center;

          svg {
            margin-right: ${theme.spacing(1)};
          }
        }

        dd {
          margin: ${theme.spacing(1, 0, 0)};
          font-size: ${theme.typography.generalHeadingBold.size};
          font-weight: ${theme.typography.generalHeadingBold.weight};
          line-height: ${theme.typography.generalHeadingBold.lineHeight};
        }
      }

      p {
        margin: ${theme.spacing(3, 0, 0)};
      }
    `;
