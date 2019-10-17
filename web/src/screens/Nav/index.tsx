import React, { useEffect } from "react";
import { useAuth0 } from "../../react-auth0-wrapper";

const Nav: React.FC<{}> = (): JSX.Element => {
  const { loading, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
      <button
        onClick={() =>
        loginWithRedirect({})
        }
      >
        Log in
      </button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
    </div>
  );
};

export { Nav };
