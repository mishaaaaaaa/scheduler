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
    mt={10}
    sx={{
      border: "1px solid black",
      width: "80%",
    }}
  >
    {props.children}
  </Box>
);
