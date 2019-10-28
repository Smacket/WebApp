import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider, onRedirectCallback } from "./react-auth0-wrapper";

ReactDOM.render(
    <Auth0Provider
        domain={'dmgardiner.auth0.com'}
        client_id={'nKvEjo2oZHU7sw8yNIE6ZuCzrAAXmydm'}
        redirect_uri={window.location.origin + '/callback'}
        onRedirectCallback={onRedirectCallback}
        responseType={'token id_token'}
    >
        <App />
    </Auth0Provider>,
    document.getElementById("root") as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
