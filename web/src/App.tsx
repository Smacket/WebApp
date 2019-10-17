import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage } from "./screens";
import { useAuth0 } from "./react-auth0-wrapper";

//const URL = "http://localhost:5000";

const App: React.FC = () => {
  /*useEffect(() => {
    fetch(URL + "/getall")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
        },
        (error) => {
          console.log(error)
        }
      );
  })*/

  /*const post = () => {
    const data = {name: "Awesome Book 2", author: "David", published: "2020"}
    fetch(URL + "/add", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then((result) => console.log(result))
  }*/

  const { loading, isAuthenticated, getTokenSilently } = useAuth0();

  useEffect(() => {
    if (loading || !isAuthenticated) {
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
        {/*<Route component={NotFoundPage} />*/}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
