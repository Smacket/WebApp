import React, { useEffect, useState } from "react";
import { useParams } from 'react-router';
import styled from 'styled-components';
import { Nav } from '../Nav';
import moment from 'moment';
import { Tournament } from '../HomePage/bracket';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1d1d1d;
  height: 100vh;
`;

const PageConstraint = styled.div`
  width: 1000px;
`;

const TournamentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;

  h1 {
    margin: 0;
    text-transform: uppercase;
  }
`

const Line = styled.div`
  width: 1025px;
  margin-top: 10px;
  margin-left: -12.5px;
  border-bottom: 1px solid #475E51;
`

const TournamentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 700px;
  margin-top: 7px;

  div {
    display: flex;
  }

  img {
    width: 20px;
    margin-right: 3px;
  }

  p {
    margin: 0;
    font-family: roboto;
    color: #475E51;
  }

  span {
    color: #00813C;
  }
`

const Description = styled.p`
  margin: 5px 0;
`

const URL: string = "http://localhost:5000";

const TournamentPage: React.FC<{}> = (): JSX.Element => {
  const { tournament_id } = useParams();
  const [tournament, setTournament] = useState<any>(null);

  useEffect(() => {
    fetch(URL + "/tournaments/get/" + tournament_id)
    .then(res => res.json())
    .then(
      (result) => {
        if(tournament === null) {
          setTournament(result);
        }
      },
      (error) => {
        //console.log(error);
      }
    );
  })

  if(tournament !== null) {
    return (
      <Wrapper>
        <Nav />
        <PageConstraint>
          <TournamentWrapper>
            <h1>{tournament.name}</h1>
            <TournamentInfo>
              <div>
                <img src={require("../../static/img/people.png")} alt="people"/>
                <p>{tournament.players.length} PARTICIPANTS</p>
              </div>
              <div>
                <img src={require("../../static/img/trophy.png")} alt="trophy" />
                <p>SINGLE ELIMINATION</p>
              </div>
              <div className="date">
                <img style={{ width: '17px', height: '17px' }} src={require("../../static/img/calendar.png")} alt="calendar" />
                <p><span>{moment.unix(tournament.date).format('MMMM Do YYYY [at] h:mm a')}</span></p>
              </div>
              <div className="date">
                <img style={{ width: '17px', height: '17px' }} src={require("../../static/img/location.png")} alt="location"/>
                <p><span>{tournament.location}</span></p>
              </div>
            </TournamentInfo>
            <Description>{tournament.description}</Description>
            <Line></Line>
            <Tournament players={tournament.players} tournamentId={tournament_id}/>
          </TournamentWrapper>
        </PageConstraint>
      </Wrapper>
    );
  } else {
    return <div></div>
  }
}
export { TournamentPage };
