import Layout from "../Layout";
import disclaimerPageBanner from "../images/page-banners/disclaimer.jpg";
import * as classes from "./disclaimer.css";
import type { NextPage } from "next";

const Disclaimer: NextPage = () => {
  return (
    <Layout pageTitle="Disclaimer" bannerImage={disclaimerPageBanner}>
      <main className={classes.root}>
        <p>
          <b>Sanity;Gone</b> is an unofficial fan project and is not affiliated
          with or endorsed by Hypergryph/Studio Montagne/Yostar,
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
