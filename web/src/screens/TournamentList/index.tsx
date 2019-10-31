import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Nav } from "../Nav";
import { Tournament } from "./Tournament";
import { Link } from 'react-router-dom';
import { useAuth0 } from "../../react-auth0-wrapper";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1d1d1d;
  height: 100vh;
`;

const PageConstraint = styled.div`
  width: 800px;
`;

const Header = styled.h1`
  margin-top: 100px;
  margin-bottom: 5px;
  margin-bottom: 0;
  font-family: nexa;
  font-weight: normal;
`;

const TournamentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 730px;
  min-height: 429px;
  padding: 15px 30px;
  background: rgba(2, 2, 2, 0.3);
  border-radius: 3px;

  input {
    background: #373737;
    height: 30px;
    border: transparent;
    border-radius: 3px;
    color: white;
    padding: 0 5px;
  }
`;

const UpperBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 15px;
`;

const FontFix = styled.span`
  position: relative;
  top: 0.1em;
`

const Create = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 100px;
  height: 35px;

  border-radius: 3px;
  border: transparent;
  background: #00813C;

  color: white;
  font-family: nexa;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`

const URL: string = "http://localhost:5000";

const TournamentList: React.FC<{}> = (): JSX.Element => {
  const { isAuthenticated } = useAuth0();
  const [tournaments, setTournaments] = useState<any[]>([]);

  useEffect(() => {
    fetch(URL + "/tournaments/getall")
      .then(res => res.json())
      .then(
        result => {
          if (tournaments.length === 0) {
            var tempTournaments: any[] = [];
            result.forEach((tournament: any) => {
              tempTournaments.push(tournament);
            });
            setTournaments(tempTournaments);
          }
        },
        error => {
          //console.log(error);
        }
      );
  });

  return (
    <Wrapper>
      <Nav />
      <PageConstraint>
        <Header>Tournaments</Header>
        <TournamentWrapper>
          <UpperBar>
            <input placeholder="Search"></input>
            {isAuthenticated && <Link to="/tournaments/create" style={{ textDecoration: 'none', color: 'inherit' }}><Create><FontFix>CREATE</FontFix></Create></Link>}
          </UpperBar>
          {tournaments.sort((a, b) => (a.date > b.date) ? 1 : -1).map((tournament, i) => {
            return (
              <Tournament
                name={tournament.name}
                participants={tournament.players.length}
                date={tournament.date}
                description={tournament.description}
                uuid={tournament.uuid}
                key={i}
              />
            );
          })}
        </TournamentWrapper>
      </PageConstraint>
    </Wrapper>
  );
};

export { TournamentList };
