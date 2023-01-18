import "./App.css";
import Scheduler from "./Scheduler/Scheduler";
import { Container, Box } from "@mui/material/";
import { styled } from "@mui/material/styles";

const AppContainer = styled(Container)({
  maxWidth: "lg",
  minHeight: "100vh",
  display: "flex",
});

const SchedulerWrapper = styled(Box)({
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

function App() {
  return (
    <AppContainer>
      <SchedulerWrapper>
        <Scheduler />
      </SchedulerWrapper>
    </AppContainer>
  );
}

export default App;
