import React from "react";
import { Nav } from '../Nav';
import styled from 'styled-components';
import img from '../../static/img/Wallpaper.png'

const Wrapper = styled.div`

`
const WallPaper = styled.div`
  background-image: url(${img});
  height: 300px;
`

const Name = styled.div`
  display: flex;
  margin-top: -80px;
  height: 80px;
  background-color: rgba(26, 26, 26, 0.7);
  align-items: center;

  h1{
    margin-left: 370px;
    font-size: 50px;
  }
`

const ProfilePic = styled.div`
  height: 240px;
  width: 240px;
  margin-top: -120px;
  margin-left: 60px;
  background-color: #6F989A;
  border-radius: 120px;
  border: 4px solid #FFFFFF: 
`

const Stats = styled.div`
  display: flex;
  margin-left: 370px;
  margin-top: -110px;
`

const StatGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  margin-right: 30px;

  h1 {
    margin: 0;
    font-size: 40px;
  }

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: normal;
  }
`

const Info = styled.div`
  display: flex;
  margin-left: 350px;
  h1 {
    margin: 10px;
    color: #686868;
    font-size: 16px;
  }

  img {
    height: 20px;
    margin-top: 9px;
    margin-left: 20px;
  }
`

const Tournaments = styled.div`
  width: 90%;
  margin-left: 5%;
  border-radius: 10px;
  background: rgba(2, 2, 2, 0.3);

  h1 {
    padding-top: 30px;
    font-size: 50px;
    margin-left: 200px;
  }
`

const Line = styled.div`
  width: 88%;
  margin-left: 6%;
  height: 1px;
  background-color: #475E51;
`

const Wins = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  margin-left: 180px;
  img{
    height: 130px;
    width: 130px;
    margin: 5px;
  }
`

const ProfilePage: React.FC<{}> = (): JSX.Element => {
  return (
    <Wrapper>
      <Nav />
      <WallPaper></WallPaper>
      <Name>
        <h1>MIKE GOSNELL</h1>
      </Name>
      <ProfilePic/>
      <Stats>
        <StatGroup>
          <h1>10</h1>
          <h2>Matches</h2>
        </StatGroup>
        <StatGroup>
          <h1>2</h1>
          <h2>Tournaments</h2>
        </StatGroup>
        <StatGroup>
          <h1>4</h1>
          <h2>Victorys</h2>
        </StatGroup>
        <StatGroup>
          <h1>1</h1>
          <h2>Organizations</h2>
        </StatGroup>
      </Stats>
      <Info>
        <img src={require('../../static/img/Location.png')}/>
        <h1>Rolla, Missouri, USA</h1>
        <img src={require('../../static/img/Major.png')}/>
        <h1>Computer Science</h1>
        <img src={require('../../static/img/Member.png')}/>
        <h1>Member for 1 year</h1>
      </Info>
      <Tournaments>
        <h1>PLAYED TOURNAMENTS</h1>
        <Line/>
        <Wins>
          <img src={require('../../static/img/1st.png')}/>
          <img src={require('../../static/img/2nd.png')}/>
          <img src={require('../../static/img/3rd.png')}/>
        </Wins>
      </Tournaments>
    </Wrapper>
  );
}

export { ProfilePage };
