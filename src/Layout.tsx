import { Global, Theme, css, ThemeProvider } from "@emotion/react";
import emotionNormalize from "emotion-normalize";
import { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import {
  BsDiscord as DiscordLogo,
  BsTwitter as TwitterLogo,
} from "react-icons/bs";
import "wicg-inert";
import { defaultTheme } from "./theme";
import SanityGoneLogo from "./components/SanityGoneLogo";
import useIsMobile from "./hooks/useIsMobile";
import MobileMenuIcon from "./components/icons/MobileMenuIcon";
import { lighten, rgba } from "polished";
import MobileMenu from "./components/MobileMenu";
import { graphql, useStaticQuery } from "gatsby";

interface LayoutProps {
  pageTitle: string;
  customPageHeading?: React.ReactNode;
  blendPoint?: number;
  bannerImageUrl?: string;
}

interface SiteMetadataQuery {
  site: {
    siteMetadata: {
      siteUrl: string;
      siteName: string;
      image: string;
      description: string;
    };
  };
}

const Layout: React.FC<LayoutProps> = (props) => {
  const {
    pageTitle,
    customPageHeading,
    bannerImageUrl,
    blendPoint,
    children,
    ...rest
  } = props;
  const data: SiteMetadataQuery = useStaticQuery(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          siteUrl
          description
          siteName
          image
        }
      }
    }
  `);
  const {
    siteUrl,
    description: defaultDescription,
    siteName,
    image: defaultImage,
  } = data.site.siteMetadata;

  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const title = pageTitle
    ? `${pageTitle} / Arknights Hub - ${siteName}`
    : `Arknights Hub - ${siteName}`;

  const handleMenuToggle = () => {
    setMobileMenuOpen((open) => !open);
  };

  return (
    // <> shorthand syntax is BROKEN, don't use it.
    <Fragment>
      <Helmet title={title}>
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
        <html lang="en" {...rest} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:image" content={`${siteUrl}${defaultImage}`} />
        <meta property="description" content={defaultDescription} />
      </Helmet>
      <ThemeProvider theme={defaultTheme}>
        <Global styles={emotionNormalize} />
        <Global styles={styles({ bannerImageUrl, blendPoint })} />
        <div className="site-wrapper">
          <div className="top-fold">
            <div className="header-main-wrapper">
              <header>
                <div className="top-line">
                  <SanityGoneLogo />
                  <div className="header-links" hidden={isMobile}>
                    <a href="/operators">Operators</a>
                    <a href="/about">About</a>
                  </div>
                  <button className="mobile-menu-button" aria-label="Open menu">
                    <MobileMenuIcon
                      className="mobile-menu"
                      role="button"
                      aria-label="Open Menu"
                      hidden={!isMobile}
                      onClick={handleMenuToggle}
                    />
                    <MobileMenu
                      open={isMobileMenuOpen}
                      onClose={() => setMobileMenuOpen(false)}
                    />
                  </button>
                </div>
                <div className="heading-and-breadcrumb">
                  {customPageHeading || <h1>{pageTitle}</h1>}
                  {/* {previousLocation && previousLocationLink && (
                    <div className="breadcrumb">
                      <a
                        href={previousLocationLink}
                        aria-label={`Back to ${previousLocation}`}
                      >
                        <BreadcrumbBackIcon />
                        {previousLocation}
                      </a>
                    </div>
                  )} */}
                </div>
              </header>
              <div className="page-content">{children}</div>
            </div>
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
                  <li>
                    <a href="mailto:admin@sanitygone.help">Contact Email</a>
                  </li>
                  <li>
                    <a href="/disclaimer">Disclaimer</a>
                  </li>
                </ul>
              </div>
              <div className="socials-section">
                <span className="list-title">Socials</span>
                <ul>
                  <li>
                    <a
                      href="https://discord.gg/bAnrGzw75H"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Sanity Gone Zero Discord Server"
                    >
                      <DiscordLogo size={24} />
                    </a>
                  </li>
                  {/* <li>
                    <a
                      href="https://twitter.com/sanitygonezero"
                      aria-label="Sanity Gone Zero Twitter"
                    >
                      <TwitterLogo size={24} />
                    </a>
                  </li> */}
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
    bannerImageUrl,
    blendPoint = 576,
  }: {
    bannerImageUrl?: string;
    blendPoint?: number;
  }) =>
  (theme: Theme) =>
    css`
      ${bannerImageUrl &&
      css`
        body {
          background-image: linear-gradient(
              to bottom,
              transparent ${0.3576 * blendPoint}px,
              ${rgba(theme.palette.dark, 0.9)} ${0.8361 * blendPoint}px,
              ${theme.palette.dark} ${blendPoint}px
            ),
            url("${bannerImageUrl}"),
            linear-gradient(
              to bottom,
              ${theme.palette.black},
              ${theme.palette.black} ${blendPoint}px,
              ${theme.palette.dark} ${blendPoint}px
            );
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
        display: grid;
        grid-template-rows: 1fr max-content;
      }

      .header-main-wrapper {
        max-width: ${theme.containerWidth};
        margin: auto;
      }

      header {
        padding: ${theme.spacing(2, 2, 0)};

        ${theme.breakpoints.down("mobile")} {
          padding: ${theme.spacing(3, 3, 0)};
        }

        .top-line {
          height: 39px; // FIXME delete this once site-wide search is implemented
          display: flex;
          align-items: center;
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

          .mobile-menu-button {
            padding: 0;
            background: none;
            border: none;
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

          /* .breadcrumb {
            line-height: 1;

            a {
              display: inline-flex;
              align-items: center;
              text-decoration: none;
              font-style: normal;
              line-height: ${theme.typography.navigationLink.lineHeight};
              text-shadow: ${theme.typography.operatorPageHeading.textShadow};

              svg {
                margin-right: ${theme.spacing(1)};

                path {
                  fill: ${theme.palette.white};
                }
              }
            }
          } */
        }
      }

      footer {
        margin-top: ${theme.spacing(8)};
        background-color: ${theme.palette.black};

        ${theme.breakpoints.down("mobile")} {
          margin-top: ${theme.spacing(4)};
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

                a {
                  background: none;
                  transition: none;

                  &:hover {
                    background: none;
                  }
                }
              }
            }
          }

          .links-section,
          .socials-section {
            a {
              color: ${theme.palette.gray};

              &:hover {
                color: ${theme.palette.white};
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
        font-weight: ${theme.typography.bodyBolder.fontWeight};
      }

      a,
      a:link,
      a:visited {
        text-decoration: none;

        &[target="_blank"] {
          display: inline-block;
          padding: ${theme.spacing(0, 0.5)};
          border-radius: ${theme.spacing(0.25)};
          transition: all 50ms ease-out;
          color: ${rgba(lighten(0.27, theme.palette.blue), 0.66)};
          background-color: ${rgba(theme.palette.blue, 0.08)};

          &:hover {
            color: ${lighten(0.27, theme.palette.blue)};
            background-color: ${rgba(theme.palette.blue, 0.4)};
          }
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

      .rarity-6-stars {
        color: ${theme.palette.orange};
      }

      .rarity-5-stars {
        color: ${theme.palette.yellow};
      }

      .rarity-4-stars {
        color: ${theme.palette.softBlue};
      }

      .rarity-3-stars {
        color: ${theme.palette.blue};
      }
    `;
