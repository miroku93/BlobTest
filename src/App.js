import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListBoardComponent from "./components/ListBoardComponent";
import HeaderComponent from "./components/HeaderComponent";
//import FooterComponent from "./components/FooterComponent";
import CreateBoardComponent from "./components/CreateBoardComponent";
import ReadBoardComponent from "./components/ReadBoardComponent";
import { IntlProvider, FormattedMessage } from "react-intl";

import enUsMsg from "./lang/en.json";
import koMsg from "./lang/ko.json";
import message from "./lang/data";

const locale = localStorage.getItem("locale") ?? "ko";
const messages = { en: enUsMsg, ko: koMsg }[locale];

function App() {
  return (
    <div>
      <Router>
        {/* <IntlProvider locale={locale} messages={message[locale]}> */}
        <IntlProvider locale={locale} messages={messages}>
          <FormattedMessage
            id="heading"
            defaultMessage="some default one"
            values={{ locale }}
          />
          <HeaderComponent />
          <div className="container">
            <Switch>
              <Route path="/" exact component={ListBoardComponent}></Route>
              <Route path="/board" component={ListBoardComponent}></Route>
              <Route
                path="/create-board/:no"
                component={CreateBoardComponent}
              ></Route>
              <Route
                path="/read-board/:no"
                component={ReadBoardComponent}
              ></Route>
            </Switch>
          </div>
        </IntlProvider>
        ,{/* <FooterComponent/> */}
      </Router>
    </div>
  );
}

export default App;
