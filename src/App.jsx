import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes/Routes";

function App() {
  return (
    <>
      <div className="bg-base-200">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
