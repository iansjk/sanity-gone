import { Global, Theme, css, ThemeProvider } from "@emotion/react";
import emotionNormalize from "emotion-normalize";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import {
  BsDiscord as DiscordLogo,
  BsTwitter as TwitterLogo,
} from "react-icons/bs";
import "wicg-inert";
import { defaultTheme } from "./theme";
import SanityGoneLogo from "./components/SanityGoneLogo";
import BreadcrumbBackIcon from "./components/icons/BreadcrumbBackIcon";
import useIsMobile from "./hooks/useIsMobile";
import MobileMenuIcon from "./components/icons/MobileMenuIcon";

interface LayoutProps {
  pageTitle: string;
  previousLocation: string;
  previousLocationLink: string;
  accentColor?: string;
  bannerImageUrl?: string;
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
  const isMobile = useIsMobile();

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
        <Global styles={styles({ accentColor, bannerImageUrl })} />
        <div className="site-wrapper">
          <div className="header-main-wrapper">
            <header>
              <div className="top-line">
                <SanityGoneLogo />
                <div className="header-links" hidden={isMobile}>
                  <a href="/">Home</a>
                  <a href="/operators">Operators</a>
                  <a href="/about">About</a>
                </div>
                <MobileMenuIcon
                  className="mobile-menu"
                  role="button"
                  aria-label="Open Menu"
                  hidden={!isMobile}
                />
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
          <footer>
            <div className="footer-inner">
              <div className="logo-and-description">
                <SanityGoneLogo />
                <p className="site-description">
                  Sanity;Gone is a community resource for Arknights players,
                  providing quick guides, reviews, and detailed information
                  about the game.
                </p>
              </div>
              <div className="links-section">
                <span className="list-title">Links</span>
                <ul>
                  <li>Contact Email</li>
                  <li>Disclaimer</li>
                </ul>
              </div>
              <div className="socials-section">
                <span className="list-title">Socials</span>
                <ul>
                  <li>
                    <DiscordLogo size={24} aria-label="Discord" />
                  </li>
                  <li>
                    <TwitterLogo size={24} aria-label="Twitter" />
                  </li>
                </ul>
              </div>
            </div>
          </footer>
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
    accentColor?: string;
    bannerImageUrl?: string;
  }) =>
  (theme: Theme) =>
    css`
      ${accentColor &&
      css`
        a {
          color: ${accentColor};
        }
      `}

      ${bannerImageUrl &&
      css`
        body {
          background-image: url("${bannerImageUrl}");
          background-repeat: no-repeat;
          background-position-x: center;
        }
      `}

      html {
        font-size: ${theme.typography.body.fontSize};
        color: ${theme.palette.white};
        background-color: ${theme.palette.dark};
        line-height: ${theme.typography.body.lineHeight};
        overflow-y: scroll;
        font-family: ${theme.typography.body.fontFamily};

        ${theme.breakpoints.down("mobile")} {
          font-size: ${theme.typography.body2.fontSize};
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

      header {
        padding: ${theme.spacing(3, 0, 0)};

        .top-line {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;

          .header-links {
            flex-grow: 1;
            text-align: end;

            a {
              margin-left: ${theme.spacing(8)};
              color: ${theme.palette.white};
              text-decoration: none;
            }
          }

          .mobile-menu {
            align-self: center;
            position: relative;
            top: -2px;
          }
        }

        .heading-and-breadcrumb {
          display: flex;
          flex-direction: column-reverse;
          margin-top: 165px;

          h1 {
            margin: 0;
            font-size: ${theme.typography.pageHeading.fontSize};
            font-weight: ${theme.typography.pageHeading.fontWeight};
            line-height: ${theme.typography.pageHeading.lineHeight};
            text-shadow: ${theme.typography.pageHeading.textShadow};

            ${theme.breakpoints.down("mobile")} {
              font-size: ${theme.typography.operatorNameHeading.fontSize};
            }
          }

          .breadcrumb {
            line-height: 1;

            a {
              display: inline-flex;
              align-items: center;
              text-decoration: none;
              font-style: normal;
              line-height: ${theme.typography.navigationLink.lineHeight};
              text-shadow: ${theme.typography.pageHeading.textShadow};

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

      .page-content {
        margin-top: ${theme.spacing(3)};
      }

      footer {
        margin-top: ${theme.spacing(8)};
        background-color: ${theme.palette.black};

        ${theme.breakpoints.down("mobile")} {
          margin: 0;
        }

        .footer-inner {
          box-sizing: border-box;
          margin: auto;
          padding: ${theme.spacing(8, 3)};
          max-width: ${theme.containerWidth};
          display: grid;
          grid-template-columns: 50% repeat(2, 1fr);
          color: ${theme.palette.gray};

          ${theme.breakpoints.down("mobile")} {
            grid-template-rows: repeat(2, max-content);
            grid-template-columns: repeat(2, 1fr);
            padding: ${theme.spacing(4, 3)};
          }

          .logo-and-description {
            ${theme.breakpoints.down("mobile")} {
              grid-column: span 2;
            }
          }

          .links-section,
          .socials-section {
            justify-self: flex-end;

            ${theme.breakpoints.down("mobile")} {
              margin-top: ${theme.spacing(4)};
              justify-self: unset;
            }

            .list-title {
              position: relative;
              padding-left: ${theme.spacing(2)};
              font-size: ${theme.typography.generalHeading.fontSize};
              line-height: ${theme.typography.generalHeading.lineHeight};
              font-weight: ${theme.typography.generalHeadingBold.fontWeight};
              color: ${theme.palette.white};

              &::before {
                content: " ";
                position: absolute;
                display: inline-block;
                border-left: ${theme.spacing(0.25)} solid ${theme.palette.blue};
                height: ${theme.spacing(1.5)};
                top: calc(50% - ${theme.spacing(0.75)});
                left: -${theme.spacing(0.25)};
              }
            }

            ul {
              margin: ${theme.spacing(3, 0, 0)};
              padding: ${theme.spacing(0, 0, 0, 2)};
              list-style: none;

              li {
                margin-top: ${theme.spacing(2)};
              }
            }
          }

          .links-section {
            ${theme.breakpoints.down("mobile")} {
              grid-row: 2;
              grid-column: 1;
            }
          }

          .socials-section {
            ${theme.breakpoints.down("mobile")} {
              grid-row: 2;
              grid-column: 2;
            }

            ul {
              display: flex;

              li {
                margin-top: 0;

                &:not(:last-of-type) {
                  margin-right: ${theme.spacing(2)};
                }
              }
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
        text-decoration: none;

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
          background-color: ${theme.palette.midtoneDarker};
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          ${theme.breakpoints.down("mobile")} {
            padding: ${theme.spacing(1)};
            flex-direction: row;
            align-items: center;
          }
        }

        dt {
          font-size: ${theme.typography.body2.fontSize};
          line-height: ${theme.typography.body2.lineHeight};
          color: ${theme.palette.gray};
          display: flex;
          align-items: center;

          svg {
            margin-right: ${theme.spacing(1)};
          }

          ${theme.breakpoints.down("mobile")} {
            font-size: ${theme.typography.body3.fontSize};
            line-height: ${theme.typography.body3.lineHeight};
          }
        }

        dd {
          margin: ${theme.spacing(1, 0, 0)};
          font-size: ${theme.typography.generalHeadingBold.fontSize};
          font-weight: ${theme.typography.generalHeadingBold.fontWeight};
          line-height: ${theme.typography.generalHeadingBold.lineHeight};

          ${theme.breakpoints.down("mobile")} {
            margin: 0;
            font-size: ${theme.typography.skillTalentHeading.fontSize};
            font-weight: ${theme.typography.skillTalentHeading.fontWeight};
            line-height: ${theme.typography.skillTalentHeading.lineHeight};
          }
        }
      }

      p {
        margin: ${theme.spacing(3, 0, 0)};

        ${theme.breakpoints.down("mobile")} {
          margin: ${theme.spacing(2, 0, 0)};
        }
      }
    `;
