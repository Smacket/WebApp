import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage, OrganizationPage, ProfilePage, TournamentPage } from "./screens";

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

  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={ProfilePage} />
        {/*<Route component={NotFoundPage} />*/}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
