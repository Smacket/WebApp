import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage, SignUpPage, TournamentForm, ProfilePage } from "./screens";
import { Callback } from "./screens/Callback";
import { useAuth0 } from "./react-auth0-wrapper";

const App: React.FC = () => {
  const { loading, isAuthenticated, getTokenSilently } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const setToken: () => void = async (): Promise<void> => {
      const token: string = (await getTokenSilently()) || "";
      localStorage.setItem("auth0_access_token", token);
    };

    setToken();
  }, [loading, isAuthenticated, getTokenSilently]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route exact={true} path="/signup" component={SignUpPage} />
        <Route exact={true} path="/callback" component={Callback} />
        <Route exact={true} path="/create" component={TournamentForm} />
        <Route exact={true} path="/profile" component={ProfilePage} />
        {/*<Route component={NotFoundPage} />*/}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
