import React from "react";
import { Link } from 'react-router-dom';
import { useAuth0 } from "../../react-auth0-wrapper";
import styled from 'styled-components';
import '../../App.css';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  background: rgba(0,0,0,0.2);

  div {
    display: flex;
    align-items: center;
  }

  img {
    width: 50px;
    margin-left: 20px;
  }

  h1 {
    margin-left: 20px;
    font-family: nexa;
    color: white;
    letter-spacing: 3px;
    text-decoration: none;
  }
`

const ButtonGreen = styled.button`
  margin-right: 20px;
  width: 100px;
  height: 35px;
  border: transparent;
  border-radius: 3px;
  background: #00813C;
  color: white;
  font-family: nexa;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`

const FontFix = styled.span`
  position: relative;
  top: 0.1em;
`

const Nav: React.FC<{}> = (): JSX.Element => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Wrapper>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div>
          <img src={require('../../static/img/logo.png')} alt='logo'/>
          <h1><FontFix>SMACKET</FontFix></h1>  
        </div>
      </Link>
      {!isAuthenticated && (
      <ButtonGreen
        onClick={() =>
          loginWithRedirect({})
        }
      >
        <FontFix>LOG IN</FontFix>
      </ButtonGreen>
      )}

      {isAuthenticated && <ButtonGreen onClick={() => logout()}><FontFix>LOG OUT</FontFix></ButtonGreen>}
    </Wrapper>
  );
};

export { Nav };
