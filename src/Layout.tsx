import { useState } from "react";
import Head from "next/head";
import { Theme } from "@mui/material";
import { css, Global } from "@emotion/react";
import { BsDiscord as DiscordLogo } from "react-icons/bs";
import "wicg-inert";

import SanityGoneLogo from "./components/SanityGoneLogo";
import MobileMenuIcon from "./components/icons/MobileMenuIcon";
import { lighten, rgba, transparentize } from "polished";
import MobileMenu from "./components/MobileMenu";
import SearchBar from "./components/SearchBar";
import WeirdDeathSphere from "./components/WeirdDeathSphere";
import { Media } from "./Media";
import config from "./config";
import Link from "next/link";
import Image from "next/image";
import HashCompatibleNextLink from "./components/HashCompatibleNextLink";

interface BannerImageProps {
  width: number;
  height: number;
  url: string;
}

interface LayoutProps {
  pageTitle: string;
  description?: string;
  image?: string;
  customPageHeading?: React.ReactNode;
  blendPoint?: number;
  bannerImage?: any;
  bannerImageProps?: BannerImageProps;
  previousLocation?: string;
  previousLocationLink?: string;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const {
    pageTitle,
    description,
    image,
    customPageHeading,
    bannerImage,
    bannerImageProps,
    blendPoint,
    children,
    previousLocation,
    previousLocationLink,
    ...rest
  } = props;
  const {
    siteName,
    description: defaultDescription,
    image: defaultImage,
    siteUrl,
  } = config;

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const title = pageTitle
    ? `${pageTitle} / Arknights Hub - ${siteName}`
    : `Arknights Hub - ${siteName}`;

  const handleMenuToggle = () => {
    setMobileMenuOpen((open) => !open);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={pageTitle ?? "Arknights Hub"} />
        <meta
          property="og:description"
          content={description ?? defaultDescription}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta
          property="og:image"
          content={`${siteUrl}${image ?? defaultImage}`}
        />
        <meta name="description" content={description ?? defaultDescription} />
      </Head>

      <Global styles={styles({ blendPoint })} />
      <div className="site-wrapper">
        {(bannerImage != null || bannerImageProps != null) && (
          <div className="banner-image-container">
            <div className="banner-image-wrapper">
              <Image
                alt=""
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                src={bannerImage ?? bannerImageProps!.url}
                priority
                objectFit="cover"
                placeholder={bannerImage != null ? "blur" : "empty"}
                {...(bannerImage == null
                  ? {
                      width: bannerImageProps?.width,
                      height: bannerImageProps?.height,
                    }
                  : {})}
              />
              <div className="banner-image-gradient-overlay" />
            </div>
          </div>
        )}
        <div className="top-fold">
          <div className="navbar">
            <div className="navbar-background">
              <div className="background-spacer" />
              <div className="logo-bg" />
              <WeirdDeathSphere className="weird-death-sphere" />
              <div className="background-spacer" />
            </div>
            <div className="navbar-container">
              <div className="navbar-content">
                <div className="navbar-left">
                  {<SearchBar placeholder="Search operators and guides" />}
                </div>
                <div className="navbar-center">
                  <div className="center-container">
                    <SanityGoneLogo />
                  </div>
                </div>
                <div className="navbar-right">
                  <div className="header-links">
                    <div className="link-spacer" />
                    <HashCompatibleNextLink href="/operators">
                      <a>Operators</a>
                    </HashCompatibleNextLink>
                    <Link href="/about">
                      <a>About</a>
                    </Link>
                  </div>
                  <button className="mobile-menu-button" aria-label="Open menu">
                    <MobileMenuIcon
                      className="mobile-menu"
                      role="button"
                      aria-label="Open Menu"
                      onClick={handleMenuToggle}
                    />
                    <MobileMenu
                      open={isMobileMenuOpen}
                      onClose={() => setMobileMenuOpen(false)}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="header-main-wrapper">
            <header>
              <div className="heading-and-breadcrumb">
                <div className="heading-spacer" />
                {previousLocation && previousLocationLink && (
                  <Media greaterThanOrEqual="mobile" className="breadcrumb">
                    <Link href={previousLocationLink}>
                      <a aria-label={`Back to ${previousLocation}`}>
                        {previousLocation}
                      </a>
                    </Link>
                    /
                  </Media>
                )}
                {customPageHeading || <h1>{pageTitle}</h1>}
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
                providing quick guides, reviews, and detailed information about
                the game.
              </p>
            </div>
            <div className="links-section">
              <span className="list-title">Links</span>
              <ul>
                <li>
                  <a href="mailto:admin@sanitygone.help">Contact Email</a>
                </li>
                <li>
                  <Link href="/disclaimer">
                    <a>Disclaimer</a>
                  </Link>
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
                    aria-label="Sanity Gone Discord Server"
                  >
                    <DiscordLogo size={24} />
                  </a>
                </li>
                {/* <li>
                    <a
                      href="https://twitter.com/sanitygonezero"
                      aria-label="Sanity Gone Twitter"
                    >
                      <TwitterLogo size={24} />
                    </a>
                  </li> */}
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Layout;

const styles =
  ({ blendPoint = 576 }: { blendPoint?: number }) =>
  (theme: Theme) =>
    css`
      html {
        font-size: ${theme.typography.body1.fontSize}px;
        color: ${theme.palette.white.main};
        background-color: ${theme.palette.dark.main};
        line-height: ${theme.typography.body1.lineHeight};
        overflow-y: scroll;
        font-family: ${theme.typography.body1.fontFamily}, Arial, sans-serif;

        ${theme.breakpoints.down("mobile")} {
          font-size: ${theme.typography.body2.fontSize}px;
        }
      }

      .site-wrapper {
        height: 100vh;
        display: grid;
        grid-template-areas: "top-fold" "footer";
        grid-template-rows: 1fr max-content;
        grid-template-columns: 100%;

        .top-fold {
          grid-area: top-fold;
        }

        .banner-image-container {
          grid-area: top-fold;
          display: flex;
          justify-content: center;
          background: linear-gradient(
              to bottom,
              transparent ${0.3576 * blendPoint}px,
              ${rgba(theme.palette.dark.main, 0.75)} ${0.7083 * blendPoint}px,
              ${theme.palette.dark.main} ${blendPoint}px
            ),
            linear-gradient(
              to bottom,
              ${theme.palette.black.main},
              ${theme.palette.black.main} ${blendPoint}px,
              ${theme.palette.dark.main} ${blendPoint}px
            );

          .banner-image-wrapper {
            display: grid;
            grid-template-areas: "banner";
            width: min(100vw, 1920px);
            height: 576px;

            & > * {
              grid-area: banner;
            }

            .banner-image-gradient-overlay {
              background-image: linear-gradient(
                to bottom,
                transparent ${0.3576 * blendPoint}px,
                ${rgba(theme.palette.dark.main, 0.75)} ${0.7083 * blendPoint}px,
                ${theme.palette.dark.main} ${blendPoint}px
              );
              z-index: 1;
            }
          }
        }
      }

      .header-main-wrapper {
        max-width: ${theme.breakpoints.values["maxWidth"]}px;
        margin: auto;
        position: relative;
        z-index: 1;
      }

      .navbar {
        position: relative;
        z-index: 2;
        display: grid;
        grid-template-areas: "navbar";
        align-items: center;
        height: ${theme.spacing(8.5)};

        ${theme.breakpoints.down("mobile")} {
          height: 75px;
        }

        .navbar-background {
          grid-area: navbar;
          height: ${theme.spacing(8.5)};
          width: 100%;
          display: flex;
          justify-content: center;
          backdrop-filter: blur(8px);
          background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0) 70.31%,
              rgba(0, 0, 0, 0.4) 100%
            )
            ${transparentize(0.8, theme.palette.black.main)};

          .background-spacer {
            flex: 1 1 0;
          }

          svg.weird-death-sphere {
            position: relative;
            transform: translateY(-100%);
            top: 97px;
          }

          ${theme.breakpoints.down("mobile")} {
            height: 75px;

            svg.weird-death-sphere,
            .logo-bg {
              display: none;
            }
          }
        }

        .navbar-container {
          grid-area: navbar;
          z-index: 3;
          width: 100%;
          max-width: ${theme.breakpoints.values["maxWidth"]}px;
          margin: 0 auto;

          .navbar-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: ${theme.spacing(0, 3)};

            ${theme.breakpoints.down("mobile")} {
              padding: unset;
            }

            .navbar-left {
              flex: 1 1 0;

              ${theme.breakpoints.down("mobile")} {
                display: none;
              }
            }

            .navbar-center {
              margin: ${theme.spacing(0, 10)};

              .center-container {
                display: flex;
                align-items: center;
              }

              ${theme.breakpoints.down("mobile")} {
                margin: 0;
                width: auto;
                flex: 1 1 0;

                .center-container {
                  margin: ${theme.spacing(0, 0, 0, 2)};
                }
              }
            }

            .navbar-right {
              flex: 1 1 0;

              ${theme.breakpoints.down("mobile")} {
                flex: 0;
                margin-right: ${theme.spacing(3)};
              }

              .header-links {
                flex-grow: 1;
                text-align: end;
                display: flex;
                align-items: center;

                .link-spacer {
                  flex: 1 1 0;
                }

                ${theme.breakpoints.down("mobile")} {
                  display: none;
                }

                a {
                  margin-left: ${theme.spacing(8)};
                  color: ${theme.palette.white.main};
                  height: 100%;
                  text-decoration: none;
                  text-transform: uppercase;
                  letter-spacing: 0.04em;
                  font-size: ${theme.typography.operatorBrowserNameHeading
                    .fontSize}px;
                  line-height: ${theme.typography.operatorBrowserNameHeading
                    .lineHeight};
                  font-weight: ${theme.typography.operatorBrowserNameHeading
                    .fontWeight};
                }
              }

              .mobile-menu-button {
                padding: 0;
                background: none;
                border: none;
                display: flex;
                align-items: center;

                ${theme.breakpoints.up("mobile")} {
                  display: none;
                }
              }
            }
          }
        }
      }

      header {
        padding: ${theme.spacing(3, 3, 0)};
        height: ${theme.spacing(22.5)};

        ${theme.breakpoints.down("mobile")} {
          padding: ${theme.spacing(2, 2, 0)};
        }

        display: flex;
        flex-direction: column-reverse;

        .heading-and-breadcrumb {
          display: flex;
          flex-direction: column;

          .heading-spacer {
            flex: 1 1 0;
          }

          h1 {
            font-size: ${theme.typography.pageHeading.fontSize}px;
            font-weight: ${theme.typography.pageHeading.fontWeight};
            line-height: ${theme.typography.pageHeading.lineHeight};
            text-shadow: 0 ${theme.spacing(0.25)} ${theme.spacing(1)}
              rgba(0, 0, 0, 0.5);
            text-transform: uppercase;
            margin-top: ${theme.spacing(1)};
            margin-bottom: 0;

            ${theme.breakpoints.down("mobile")} {
              font-size: ${theme.typography.operatorNameHeading.fontSize}px;
            }
          }

          .breadcrumb {
            line-height: 1.5;
            font-size: ${theme.typography.navigationLink.fontSize}px;

            a {
              display: inline-block;
              text-decoration: none;
              font-style: normal;
              text-shadow: ${theme.typography.operatorPageHeading.textShadow};
              margin-right: ${theme.spacing(1)};
              padding: ${theme.spacing(0, 0.5)};
              border-radius: ${theme.spacing(0.25)};

              color: ${rgba(lighten(0.27, theme.palette.blue.main), 0.66)};
              background-color: ${rgba(theme.palette.blue.main, 0.08)};

              &:hover {
                color: ${lighten(0.27, theme.palette.blue.main)};
                background-color: ${rgba(theme.palette.blue.main, 0.4)};
              }
            }
          }
        }
      }

      footer {
        margin-top: ${theme.spacing(8)};
        grid-area: footer;
        background-color: ${theme.palette.black.main};

        ${theme.breakpoints.down("mobile")} {
          margin-top: ${theme.spacing(4)};
        }

        .footer-inner {
          box-sizing: border-box;
          margin: auto;
          padding: ${theme.spacing(8, 3)};
          max-width: ${theme.breakpoints.values["maxWidth"]}px;
          display: grid;
          grid-template-columns: 50% repeat(2, 1fr);
          color: ${theme.palette.gray.main};

          ${theme.breakpoints.down("mobile")} {
            grid-template-rows: repeat(2, max-content);
            grid-template-columns: repeat(2, 1fr);
            padding: ${theme.spacing(4, 3)};
          }

          .logo-and-description {
            ${theme.breakpoints.down("mobile")} {
              grid-column: span 2;
            }

            a {
              padding: 0;
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
              font-size: ${theme.typography.generalHeading.fontSize}px;
              line-height: ${theme.typography.generalHeading.lineHeight};
              font-weight: ${theme.typography.generalHeadingBold.fontWeight};
              color: ${theme.palette.white.main};

              &::before {
                content: " ";
                position: absolute;
                display: inline-block;
                border-left: ${theme.spacing(0.25)} solid
                  ${theme.palette.blue.main};
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

          .links-section,
          .socials-section {
            a {
              color: ${theme.palette.gray.main};

              &:hover {
                color: ${theme.palette.white.main};
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
        font-weight: ${theme.typography.body1Bolder.fontWeight};
      }

      a,
      a:link,
      a:visited {
        text-decoration: none;

        &.emphasized-link {
          display: inline-block;
          padding: ${theme.spacing(0, 0.5)};
          border-radius: ${theme.spacing(0.25)};
          transition: all 50ms ease-out;
          color: ${rgba(lighten(0.27, theme.palette.blue.main), 0.66)};
          background-color: ${rgba(theme.palette.blue.main, 0.08)};

          &:hover {
            color: ${lighten(0.27, theme.palette.blue.main)};
            background-color: ${rgba(theme.palette.blue.main, 0.4)};
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
          background-color: ${theme.palette.midtoneDarker.main};
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
          font-size: ${theme.typography.body2.fontSize}px;
          line-height: ${theme.typography.body2.lineHeight};
          color: ${theme.palette.gray.main};
          display: flex;
          align-items: center;

          svg {
            margin-right: ${theme.spacing(1)};
          }

          ${theme.breakpoints.down("mobile")} {
            font-size: ${theme.typography.body3.fontSize}px;
            line-height: ${theme.typography.body3.lineHeight};
          }
        }

        dd {
          margin: ${theme.spacing(1, 0, 0)};
          font-size: ${theme.typography.generalHeadingBold.fontSize}px;
          font-weight: ${theme.typography.generalHeadingBold.fontWeight};
          line-height: ${theme.typography.generalHeadingBold.lineHeight};

          ${theme.breakpoints.down("mobile")} {
            margin: 0;
            font-size: ${theme.typography.skillTalentHeading.fontSize}px;
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
        color: ${theme.palette.orange.main};
      }

      .rarity-5-stars {
        color: ${theme.palette.yellow.main};
      }

      .rarity-4-stars {
        color: ${theme.palette.softBlue.main};
      }

      .rarity-3-stars {
        color: ${theme.palette.blue.main};
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input[type="number"] {
        -moz-appearance: textfield;
      }

      img {
        object-fit: contain;
      }

      html {
        scrollbar-width: ${theme.spacing(2)};
        scrollbar-color: ${rgba(theme.palette.white.main, 0.8)} transparent;
      }

      body::-webkit-scrollbar {
        width: ${theme.spacing(2)};
      }

      body::-webkit-scrollbar-thumb {
        border-radius: ${theme.spacing(1)};
        border: ${theme.spacing(0.5)} solid transparent;
        background-clip: content-box;
        background-color: ${rgba(theme.palette.white.main, 0.3)};
      }

      body::-webkit-scrollbar-thumb:hover {
        background-color: ${rgba(theme.palette.white.main, 0.5)};
      }

      body::-webkit-scrollbar-thumb:active {
        background-color: ${rgba(theme.palette.white.main, 0.8)};
      }
    `;
