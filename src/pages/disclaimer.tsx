import { css } from "@emotion/react";
import { Theme } from "@mui/material";

import Layout from "../Layout";
import { sgPageBanner } from "../utils/images";

const Disclaimer: React.VFC = () => {
  return (
    <Layout pageTitle="Disclaimer" bannerImageUrl={sgPageBanner("disclaimer")}>
      <main css={styles}>
        <p>
          <b>Sanity;Gone Zero</b> is an unofficial fan project and is not
          affiliated with or endorsed by Hypergryph/Studio Montagne/Yostar,
          Arknights&rsquo; creators & distributors. The in-game assets used on
          this site are the property of Hypergryph/Yostar.
        </p>
        <p>
          This website may contain copyrighted material, the use of which may
          not have specifically authorized by the copyright owner. The material
          contained in this website is distributed without profit for research
          and educational purposes. Only small portions of the original work are
          being used and those could not be used easily to duplicate the
          original work.
        </p>
        <p>
          Under section 107 of the Copyright Act of 1976, allowance is made for
          “fair use” for purposes such as criticism, comment, news reporting,
          teaching, scholarship, education and research. Fair use is a use
          permitted by copyright statute that might otherwise be infringing.
        </p>
        <p>
          If you wish to use any copyrighted material from this site for
          purposes of your own that go beyond “fair use”, you must obtain
          expressed permission from the copyright owner.
        </p>
      </main>
    </Layout>
  );
};
export default Disclaimer;

const styles = (theme: Theme) => css`
  padding: ${theme.spacing(0, 2)};

  ${theme.breakpoints.down("mobile")} {
    padding: ${theme.spacing(0, 3)};
  }
`;
