import { Box } from "@mui/material/";

export const TableWrapper = (props) => (
  <Box
    mt={5}
    sx={{
      position: "relative",
    }}
  >
    {props.children}
  </Box>
);

export const TablePageWrapper = (props) => (
  <Box
    sx={{
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
    }}
  >
    {props.children}
  </Box>
);
