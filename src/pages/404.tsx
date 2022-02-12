import { Box, useMediaQuery, useTheme } from "@mui/material";
import Layout from "../Layout";

const PageNotFound: React.VFC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("mobile"));
  return (
    <Layout pageTitle="Page Not Found">
      <Box component="main" p={isMobile ? 2 : 3}>
        This page doesn&apos;t seem to exist...
      </Box>
    </Layout>
  );
};
export default PageNotFound;
