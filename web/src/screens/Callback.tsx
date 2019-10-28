import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import { useAuth0 } from "../react-auth0-wrapper";

interface UserTypes {
  nickname: string,
  name: string,
  picture: string,
  updated_at: string,
  email: string,
  email_verified: boolean,
  sub: string
}

const URL: string = "http://localhost:5000"

const Callback: React.FC<{}> = (): JSX.Element => {
  const { user, getTokenSilently, loading } = useAuth0();
  const [emailFound, setEmailFound] = useState<boolean>(false);
  const [_loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const setToken: () => void = async (): Promise<void> => {
      const token: string = (await getTokenSilently()) || "";
      localStorage.setItem("auth0_access_token", token);
    };

    if(!loading) {
      setToken();
      var profile: UserTypes = user;

      if(profile && _loading) {
        fetch(URL + "/get/" + profile.email)
        .then(res => res.json())
        .then(
          (result) => {
            setEmailFound(true)
            setLoading(false)
          },
          (error) => {
            setLoading(false)
          }
        );
      }
    }
  })

  if(!_loading) {
    if(!emailFound) {
      return <Redirect to='/signup' />
    } else {
      return <Redirect to='/' />
    }
  } else {
    return <div></div>
  }
};

export { Callback };
