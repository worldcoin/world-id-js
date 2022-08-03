import logo from "./logo.svg";
import "./App.css";
import { Widget, utils, AppProps } from "@worldcoin/id";

const widgetProps: AppProps = {
  action_id: "wid_staging_PCNQeDC5CX",
  signal: "user-id-1",
  enable_telemetry: true,
  app_name: "candyApp",
  signal_description: "Receive initial airdrop April 2022",
  theme: "light",
  debug: true,
  on_success: (result) => console.log(result),
  on_error: ({ code, detail }) => console.log({ code, detail }),
  on_init_success: () => console.log("Init successful"),
  on_init_error: (error) => console.log("Error while initialization World ID", error),
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
