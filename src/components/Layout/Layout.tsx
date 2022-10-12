import React, { useState } from "react";
import Head from "next/head";
import { BsDiscord as DiscordLogo } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import "wicg-inert";
import cx from "clsx";

import SanityGoneLogo from "../SanityGoneLogo";
import MobileMenuIcon from "../icons/MobileMenuIcon";
import MobileMenu from "../MobileMenu";
import SearchBar from "../SearchBar";
import WeirdDeathSphere from "../WeirdDeathSphere";
import { Media } from "../../Media";
import config from "../../config";
import HashCompatibleNextLink from "../HashCompatibleNextLink";

import * as classes from "./styles.css";

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
  classes?: Partial<{
    topFold: string;
    headerMainWrapper: string;
    header: string;
    headingAndBreadcrumb: string;
    heading: string;
    pageContent: string;
    footer: string;
    breadcrumbLink: string;
    siteWrapper: string;
  }>;
  style?: React.CSSProperties;
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
    classes: customClasses,
    style,
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

      <div
        className={cx(classes.siteWrapper, customClasses?.siteWrapper)}
        style={style}
      >
        {(bannerImage != null || bannerImageProps != null) && (
          <div
            className={classes.bannerImageContainer}
            style={
              blendPoint != null
                ? ({
                    "--blend-point": `${blendPoint}px`,
                  } as React.CSSProperties)
                : undefined
            }
          >
            <div className={classes.bannerImageWrapper}>
              <Image
                alt=""
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                src={bannerImage ?? bannerImageProps!.url}
                quality={100}
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
            </div>
          </div>
        )}
        <div className={cx(classes.topFold, customClasses?.topFold)}>
          <div className={classes.navbar}>
            <div className={classes.navbarBackground}>
              <div className={classes.flexSpacer} />
              <div className={classes.logoBg} />
              <WeirdDeathSphere className={classes.weirdDeathSphere} />
              <div className={classes.flexSpacer} />
            </div>
            <div className={classes.navbarContainer}>
              <div className={classes.navbarContent}>
                <div className={classes.skipLinkContainer}>
                  <a className={classes.skipLink} href="#page-content">
                    Skip to Content
                  </a>
                </div>
                <div className={classes.navbarLeft}>
                  <SearchBar placeholder="Search operators and guides" />
                </div>
                <div className={classes.navbarCenter}>
                  <div className={classes.navbarCenterContainer}>
                    <SanityGoneLogo />
                  </div>
                </div>
                <div className={classes.navbarRight}>
                  <div className={classes.headerLinks}>
                    <div className={classes.flexSpacer} />
                    <HashCompatibleNextLink href="/operators">
                      <a className={classes.headerLink}>Operators</a>
                    </HashCompatibleNextLink>
                    <Link href="/about">
                      <a className={classes.headerLink}>About</a>
                    </Link>
                  </div>
                  <button
                    className={classes.mobileMenuButton}
                    aria-label="Open menu"
                    onClick={handleMenuToggle}
                  >
                    <MobileMenuIcon className="mobile-menu" />
                  </button>

                  <MobileMenu
                    open={isMobileMenuOpen}
                    onClose={() => setMobileMenuOpen(false)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className={cx(
              classes.headerMainWrapper,
              customClasses?.headerMainWrapper
            )}
          >
            <header className={cx(classes.header, customClasses?.header)}>
              <div
                className={cx(
                  classes.headingAndBreadcrumb,
                  customClasses?.headingAndBreadcrumb
                )}
              >
                <div className={classes.flexSpacer} />
                {previousLocation && previousLocationLink && (
                  <Media
                    greaterThanOrEqual="mobile"
                    className={classes.breadcrumb}
                  >
                    <Link href={previousLocationLink}>
                      <a
                        className={cx(
                          "emphasized-link",
                          classes.breadcrumbLink,
                          customClasses?.breadcrumbLink
                        )}
                        aria-label={`Back to ${previousLocation}`}
                      >
                        {previousLocation}
                      </a>
                    </Link>
                    /
                  </Media>
                )}
                {customPageHeading || (
                  <h1 className={cx(classes.heading, customClasses?.heading)}>
                    {pageTitle}
                  </h1>
                )}
              </div>
            </header>
            <div id="page-content" className={customClasses?.pageContent}>
              {children}
            </div>
          </div>
        </div>
        <footer className={cx(classes.footer, customClasses?.footer)}>
          <div className={classes.footerContent}>
            <div className={classes.logoAndDescription}>
              <SanityGoneLogo className={classes.logo} />
              <p>
                Sanity;Gone is a community resource for Arknights players,
                providing quick guides, reviews, and detailed information about
                the game.
              </p>
            </div>
            <div className={classes.linksSection}>
              <span className={classes.linksSocialListTitle}>Links</span>
              <ul className={classes.linksList}>
                <li className={classes.linksListItem}>
                  <a href="mailto:admin@sanitygone.help">Contact Email</a>
                </li>
                <li className={classes.linksListItem}>
                  <Link href="/disclaimer">
                    <a>Disclaimer</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className={classes.socialSection}>
              <span className={classes.linksSocialListTitle}>Socials</span>
              <ul className={classes.socialList}>
                <li className={classes.socialListItem}>
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
