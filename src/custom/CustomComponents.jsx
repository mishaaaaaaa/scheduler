import { Container, Box } from "@mui/material/";
import { styled } from "@mui/material/styles";

export const AppContainer = styled(Container)({
  maxWidth: "lg",
  minHeight: "100vh",
  display: "flex",
});

export const SchedulerWrapper = styled(Box)({
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const TableWrapper = (props) => (
  <Box
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
      alignItems: "center",
    }}
  >
    {props.children}
  </Box>
);
