import "./App.css";
import Scheduler from "./Scheduler/Scheduler";
import { Container } from "@mui/material/";
import { styled } from "@mui/material/styles";

const AppContainer = styled(Container)({
  maxWidth: "lg",
  minHeight: "100vh",
  display: "flex",
});

function App() {
  return (
    <AppContainer>
      <Scheduler />
    </AppContainer>
  );
}

export default App;
