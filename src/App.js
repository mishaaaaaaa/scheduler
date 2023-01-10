import "./App.css";
import Scheduler from "./components/Scheduler";
import { AppContainer, SchedulerWrapper } from "./custom/CustomComponents";

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
