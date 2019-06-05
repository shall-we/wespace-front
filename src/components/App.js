import React from "react";
import { Switch, Route } from "react-router-dom";
import { NotFoundPage, LoginPage, JoinPage, IntroPage, MainPage, PublicPage, AdminPage } from "../pages";
import { autoLogin } from "../lib/api";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      autoLogin: false
    };
  }

  componentWillMount = async () => {
    await autoLogin().then(res => {
      if (res.data.data.autoLogin) {
        this.setState({
          autoLogin: true
        });
      } else {
        this.setState({
          autoLogin: false
        });
      }
    });
  };

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={this.state.autoLogin ? MainPage : IntroPage} />
          <Route path="/intro" component={IntroPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/join" component={JoinPage} />
          <Route exact path="/note" component={MainPage} />
          <Route path="/note/public/:uuid" component={PublicPage} />
          <Route exact path="/admin" component={AdminPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
};
 
export default App;