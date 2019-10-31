import React, { useEffect } from "react";
import { Nav } from '../Nav';
import styled from 'styled-components'
import img from '../../static/img/Background.png'
import { useAuth0 } from "../../react-auth0-wrapper";
import { Link } from 'react-router-dom';
import '../../App.css'

const Wrapper = styled.div`
  height: 100vh;
  background: black;

  background-image: url(${img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  

  h1 {
    margin: 0;
    text-transform: uppercase;
    font-size: 110px;
    font-family: nexa;
    color: white;
  }

  h2{
    margin: 0;
    font-size: 36px;
    font-family: nexa;
    color: white;
    width: 60%;
    font-weight: normal;
    text-align: center;
  }

`
const Buttons = styled.div`
  width: 40%;
  align items: center;
  display: flex;
  justify-content: center;
`

const Matches = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  
  height: 60px;
  width: 300px;
  margin: 20px;

  border-radius: 3px;
  border: 3px solid #00813C;
  background-color: #212121;

  color: #00813C;
  font-size: 20px;
  font-family: nexa;
  font-weight: bold;

  &:hover {
    background-color: #00813C;
    color: white;
    cursor: pointer;
  }
`

const Tournaments = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 300px;
  height: 60px;
  margin: 20px;

  border: transparent;
  border-radius: 3px;
  background: #00813C;

  color: white;
  font-size: 20px;
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


const HomePage: React.FC<{}> = (): JSX.Element => {
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if(isAuthenticated) {
      console.log('good');
    }
  })

  return (
    <div>
      <Nav />
      <Wrapper>
        <h1>
          <FontFix>
            Smacket
          </FontFix>
        </h1>
        <h2>
          <FontFix>
            The home for Super Smash Bros. tournaments hosted by Missouri S&T's Fighting Game Club. 
          </FontFix>
        </h2>
        <Buttons>
          {isAuthenticated && <Link to="/tournaments/create" style={{ textDecoration: 'none', color: 'inherit' }}><Matches><FontFix>CREATE TOURNAMENT</FontFix></Matches></Link>}
          <Link to="/tournaments" style={{ textDecoration: 'none', color: 'white' }}><Tournaments><FontFix>VIEW TOURNAMENTS</FontFix></Tournaments></Link>
        </Buttons>
      </Wrapper>
    </div>
  );
};

export { HomePage };
