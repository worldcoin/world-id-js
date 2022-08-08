import logo from "./logo.svg";
import "./App.css";
import { WorldIDWidget, utils, WidgetProps } from "@worldcoin/id";

const widgetProps: WidgetProps = {
  actionId: "wid_staging_PCNQeDC5CX",
  signal: "user-id-1",
  enableTelemetry: true,
  appName: "candyApp",
  signalDescription: "Receive initial airdrop April 2022",
  theme: "light",
  debug: true,
  onSuccess: (result) => console.log(result),
  onError: ({ code, detail }) => console.log({ code, detail }),
  onInitSuccess: () => console.log("Init successful"),
  onInitError: (error) => console.log("Error while initialization World ID", error),
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>World ID React Example</p>
        {/* ADD REACT COMPONENT HERE */}
        <WorldIDWidget {...widgetProps} />
        <div
          style={{ marginTop: "16px" }}
        >{`Random number from utils ${utils.randomNumber(1, 100)}`}</div>
      </header>
    </div>
  );
}

export default App;
