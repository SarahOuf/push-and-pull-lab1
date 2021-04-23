import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import LongPolling from "./LongPolling";
import ShortPolling from "./ShortPolling";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/shortpolling" className="nav-link">
                  Short Polling
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/longpolling" className="nav-link">
                  Long Polling
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/shortpolling">
            <ShortPolling />
          </Route>
          <Route path="/longpolling">
            <LongPolling />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
