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
  alignItems: "start",
});

export const TableWrapper = (props) => (
  <Box
    sx={{
      width: "80%",
      position: "relative",
    }}
  >
    {props.children}
  </Box>
);
