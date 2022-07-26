import logo from "./logo.svg";
import "./App.css";
import { Widget, utils } from "@worldcoin/id";
import { AppProps } from "@worldcoin/id/dist/types/app-props";

const widgetProps: AppProps = {
  connectionProps: {
    enable_telemetry: true,
    action_id: "wid_staging_PCNQeDC5CX",
    signal: "user-id-1",
    app_name: "candyApp",
    signal_description: "Receive initial airdrop April 2022",
    onVerificationError: ({ code, detail }) => console.log({ code, detail }),
    onVerificationSuccess: (result) => console.log(result),
  },
  theme: "light",
  debug: true,
  onInitSuccess: () => console.log("Init successful"),
  onInitError: ({ error }) =>
    console.log("Error while initialization World ID", error),
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>World ID React Example</p>
        {/* ADD REACT COMPONENT HERE */}
        <Widget {...widgetProps} />
        <div
          style={{ marginTop: "16px" }}
        >{`Random number from utils ${utils.randomNumber(1, 100)}`}</div>
      </header>
    </div>
  );
}

export default App;
