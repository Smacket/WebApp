import React, { useEffect, useState } from "react";
import { Bracket, BracketGame } from "react-tournament-bracket";
import JSOG from "jsog";
import * as _ from "underscore";
import styled from "styled-components";
import { useAuth0 } from "../../react-auth0-wrapper";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: -50px;

  path {
    stroke: white !important;
  }
`;

const Update = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 15px;
  margin-left: 50px;
  z-index: 2;

  div {
    display: flex;
    flex-direction: column;
    width: 125px;
    margin-right: 15px;
  }

  p {
    margin: 0;
  }
`;

const Input = styled.input`
  border: transparent;
  border-radius: 3px;
  width: 100%;
  height: 35px;
  background: #373737;
  color: white;
  padding: 0 5px;
`;

const ButtonGreen = styled.button`
  width: 100px;
  height: 35px;
  border: transparent;
  border-radius: 3px;
  background: #00813c;
  color: white;
  font-family: nexa;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

const FontFix = styled.span`
  position: relative;
  top: 0.1em;
`;

interface IProps {
  players: string[];
  tournamentId: string | undefined;
}

interface UserTypes {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: string;
}

const URL: string = "http://localhost:5000";

const Tournament: React.FC<IProps> = (props): JSX.Element => {
  const { players, tournamentId } = props;
  const { isAuthenticated, user } = useAuth0();
  const numTeams = players.length;
  const [matches, setMatches] = useState<any[]>([]);
  const [scoresSet, setScoresSet] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [idToUpdate, setIdToUpdate] = useState<string>("");
  const [score1Update, setScore1Update] = useState<number>(-1);
  const [score2Update, setScore2Update] = useState<number>(-1);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [organizer, setOrganizer] = useState<string>("");
  var matchScores: any = [];
  var test: boolean = false;

  const handleMatchIdChange = (event: any) => {
    setIdToUpdate(event.target.value);
  };

  const handleScore1Change = (event: any) => {
    setScore1Update(event.target.value);
  };

  const handleScore2Change = (event: any) => {
    setScore2Update(event.target.value);
  };

  const handleUpdate = () => {
    const data = {
      score1: score1Update,
      score2: score2Update
    };
    fetch(
      URL + "/tournaments/update_score/" + tournamentId + "/" + idToUpdate,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
      }
    )
      .then(response => {
        setUpdate(true);
      })
      .then(error => {
        //console.log(error);
      });
  };

  useEffect(() => {
    var numLevels: number = Math.log2(
      Math.pow(2, Math.ceil(Math.log2(numTeams)))
    );

    if (currentUser === "" && isAuthenticated) {
      var profile: UserTypes = user;

      fetch(URL + "/get/" + profile.email)
        .then(res => res.json())
        .then(result => {
          setCurrentUser(result.username);
        });
    }

    if (organizer === "") {
      fetch(URL + "/tournaments/get/" + tournamentId)
        .then(res => res.json())
        .then(result => {
          setOrganizer(result.organizer);
        });
    }

    if ((matchScores.length === 0 || update) && organizer !== "") {
      fetch(URL + "/tournaments/" + tournamentId)
        .then(res => res.json())
        .then(
          result => {
            matchScores = result.sort((a: any, b: any) =>
              a.matchId > b.matchId ? 1 : -1
            );

            if (matches.length === 0 || update) {
              var numByes =
                numTeams -
                Math.pow(2, Math.round(Math.log(numTeams) / Math.log(2)));

              var byeTeams: any[] = [];
              var otherTeams: any[] = players
                .slice(0, numTeams)
                .slice(Math.abs(numByes));

              if (numByes !== 0) {
                byeTeams = calculateByes(numByes);
              }

              generateBracket(numLevels, byeTeams, otherTeams);
              setUpdate(false);
            }
          },
          error => {
            //console.log(error);
          }
        );
    }
  });

  const calculateByes = (numByes: number) => {
    var byeTeams = players.slice(0, Math.abs(numByes));
    var numByesLevels: number = Math.pow(
      2,
      Math.ceil(Math.log(Math.abs(numByes)) / Math.log(2))
    );
    var numByes1: number = Math.floor(Math.abs(numByes) / 2);
    var numByes2: number = Math.ceil(Math.abs(numByes) / 2);
    var a: number[] = [];
    var b: number[] = [];

    for (var i = 0; i < numByesLevels; i++) {}

    return byeTeams;
  };

  const generateBracket = (
    numLevels: number,
    byeTeams: any[],
    otherTeams: any[]
  ) => {
    var matches: any[] = [];
    var previousMatches: number = 0;
    var match: any = {};
    var matchId: number = byeTeams.length + otherTeams.length - 1;

    for (var i = numLevels - 1; i >= 0; i--) {
      if (i === numLevels - 1 && i !== 1 && i !== 0) {
        var player1 = "";
        var player2 = "";
        var score1 = null;
        var score2 = null;
        var update = false;
        if (matchScores.length !== 0) {
          player1 = matchScores[matchId - 1].player1;
          player2 = matchScores[matchId - 1].player2;
          score1 = matchScores[matchId - 1].score1;
          score2 = matchScores[matchId - 1].score2;

          if (player1 === "") {
            if (
              matchScores[matchId - 3].score1 > matchScores[matchId - 3].score2
            ) {
              player1 = matchScores[matchId - 3].player1;
              update = true;
            } else if (
              matchScores[matchId - 3].score1 < matchScores[matchId - 3].score2
            ) {
              player1 = matchScores[matchId - 3].player2;
              update = true;
            }
          }

          if (player2 === "") {
            if (
              matchScores[matchId - 2].score1 > matchScores[matchId - 2].score2
            ) {
              player2 = matchScores[matchId - 2].player1;
              update = true;
            } else if (
              matchScores[matchId - 2].score1 < matchScores[matchId - 2].score2
            ) {
              player2 = matchScores[matchId - 2].player2;
              update = true;
            }
          }

          if (update) {
            const data = {
              player1: player1,
              player2: player2,
              score1: score1,
              score2: score2
            };
            fetch(URL + "/tournaments/update/" + tournamentId + "/" + matchId, {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              method: "POST",
              body: JSON.stringify(data)
            })
              .then(response => {
                setScoresSet(scoresSet => true)
                //console.log(response);
              })
              .then(error => {
                //console.log(error);
              });
          }
        } else if (!scoresSet) {
          const data = {
            player1: "",
            player2: "",
            score1: -1,
            score2: -1,
            matchId: matchId,
            tournamentUUID: tournamentId
          };
          setScoresSet(scoresSet => true);
          fetch(URL + "/tournaments/create_match", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
          })
            .then(response => {
            })
            .then(error => {
              //console.log(error);
            });
        }
        match = {
          id: matchId,
          "@id": matchId,
          name: "Match " + matchId,
          scheduled: Date.now(),
          sides: {
            home: {
              score: {
                score: score1 === -1 ? null : score1
              },
              team: {
                name: player1
              },
              seed: {
                sourceGame: { "@ref": matchId - 2 },
                sourcePool: null,
                rank: 1,
                displayName: "Winner of B4"
              }
            },
            visitor: {
              score: {
                score: score2 === -1 ? null : score2
              },
              team: {
                name: player2
              },
              seed: {
                sourceGame: { "@ref": matchId - 1 },
                sourcePool: null,
                rank: 1,
                displayName: "Winner of B4"
              }
            }
          }
        };
        matches.push(match);
        previousMatches++;
      } else if (i !== 1 && i !== 0) {
        var newPreviousMatches: number = 0;
        var newMatches1: any[] = [];
        var newMatches2: any[] = [];
        matchId -= previousMatches * 2;
        for (var j = 0; j < previousMatches * 2; j++) {
          var player1 = "";
          var player2 = "";
          var score1 = null;
          var score2 = null;
          var update = false;
          if (matchScores.length !== 0) {
            player1 = matchScores[matchId - 1].player1;
            player2 = matchScores[matchId - 1].player2;
            score1 = matchScores[matchId - 1].score1;
            score2 = matchScores[matchId - 1].score2;

            if (player1 === "") {
              if (
                matchScores[matchId - previousMatches * 2 * 2 + j - 1].score1 >
                matchScores[matchId - previousMatches * 2 * 2 + j - 1].score2
              ) {
                player1 =
                  matchScores[matchId - previousMatches * 2 * 2 + j - 1]
                    .player1;
                update = true;
              } else if (
                matchScores[matchId - previousMatches * 2 * 2 + j - 1].score1 <
                matchScores[matchId - previousMatches * 2 * 2 + j - 1].score2
              ) {
                player1 =
                  matchScores[matchId - previousMatches * 2 * 2 + j - 1]
                    .player2;
                update = true;
              }
            }

            if (player2 === "") {
              if (
                matchScores[matchId - previousMatches * 2 * 2 + j].score1 >
                matchScores[matchId - previousMatches * 2 * 2 + j].score2
              ) {
                player2 =
                  matchScores[matchId - previousMatches * 2 * 2 + j].player1;
                update = true;
              } else if (
                matchScores[matchId - previousMatches * 2 * 2 + j].score1 <
                matchScores[matchId - previousMatches * 2 * 2 + j].score2
              ) {
                player2 =
                  matchScores[matchId - previousMatches * 2 * 2 + j].player2;
                update = true;
              }
            }

            if (update) {
              const data = {
                player1: player1,
                player2: player2,
                score1: score1,
                score2: score2
              };
              fetch(
                URL + "/tournaments/update/" + tournamentId + "/" + matchId,
                {
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  method: "POST",
                  body: JSON.stringify(data)
                }
              )
                .then(response => {
                  //console.log(response);
                })
                .then(error => {
                  //console.log(error);
                });
            }
          } else if (!scoresSet) {
            const data = {
              player1: "",
              player2: "",
              score1: -1,
              score2: -1,
              matchId: matchId,
              tournamentUUID: tournamentId
            };
            fetch(URL + "/tournaments/create_match", {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              method: "POST",
              body: JSON.stringify(data)
            })
              .then(response => {
                setScoresSet(true);
              })
              .then(error => {
                //console.log(error);
              });
          }
          match = {
            id: matchId,
            "@id": matchId,
            name: "Match " + matchId,
            scheduled: Date.now(),
            sides: {
              home: {
                score: {
                  score: score1 === -1 ? null : score1
                },
                team: {
                  name: player1
                },
                seed: {
                  sourceGame: { "@ref": matchId - previousMatches * 2 * 2 + j },
                  sourcePool: null,
                  rank: 1,
                  displayName: "Winner of B4"
                }
              },
              visitor: {
                score: {
                  score: score2 === -1 ? null : score2
                },
                team: {
                  name: player2
                },
                seed: {
                  sourceGame: {
                    "@ref": matchId - previousMatches * 2 * 2 + 1 + j
                  },
                  sourcePool: null,
                  rank: 1,
                  displayName: "Winner of B4"
                }
              }
            }
          };
          if (j < previousMatches) {
            newMatches1.push(match);
          } else {
            newMatches2.push(match);
          }
          matchId++;
          newPreviousMatches++;
        }
        newMatches1.push(...newMatches2);
        matches.push(...newMatches1);
        matchId -= previousMatches * 2;
        previousMatches = newPreviousMatches;
      } else if (i === 1) {
        var byeCount: number = 0;
        var otherCount: number = 1;

        matchId -= previousMatches * 2;
        for (
          var j = 0;
          j < (previousMatches === 0 ? 1 : previousMatches * 2);
          j++
        ) {
          var player1 = "";
          var player2 = "";
          var score1 = null;
          var score2 = null;
          var update = false;
          if (matchScores.length !== 0) {
            player1 = matchScores[matchId - 1].player1;
            player2 = matchScores[matchId - 1].player2;
            score1 = matchScores[matchId - 1].score1;
            score2 = matchScores[matchId - 1].score2;

            if (
              (byeTeams.length === previousMatches * 2 || j !== 1) &&
              byeTeams.length !== 0
            ) {
              if (player1 !== byeTeams[byeCount]) {
                player1 = byeTeams[byeCount];
                update = true;
              }

              if (player2 === "") {
                if (
                  matchScores[otherCount - 1].score1 >
                  matchScores[otherCount - 1].score2
                ) {
                  player2 = matchScores[otherCount - 1].player1;
                  update = true;
                } else if (
                  matchScores[otherCount - 1].score1 <
                  matchScores[otherCount - 1].score2
                ) {
                  player2 = matchScores[otherCount - 1].player2;
                  update = true;
                }
              }
            } else {
              if (player1 === "") {
                if (
                  matchScores[otherCount - 1].score1 >
                  matchScores[otherCount - 1].score2
                ) {
                  player1 = matchScores[otherCount - 1].player1;
                  update = true;
                } else if (
                  matchScores[otherCount - 1].score1 <
                  matchScores[otherCount - 1].score2
                ) {
                  player1 = matchScores[otherCount - 1].player2;
                  update = true;
                }
              }

              if (player2 === "") {
                if (
                  matchScores[otherCount].score1 >
                  matchScores[otherCount].score2
                ) {
                  player2 = matchScores[otherCount].player1;
                  update = true;
                } else if (
                  matchScores[otherCount].score1 <
                  matchScores[otherCount].score2
                ) {
                  player2 = matchScores[otherCount].player2;
                  update = true;
                }
              }
            }

            if (update) {
              const data = {
                player1: player1,
                player2: player2,
                score1: score1,
                score2: score2
              };
              fetch(
                URL + "/tournaments/update/" + tournamentId + "/" + matchId,
                {
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  method: "POST",
                  body: JSON.stringify(data)
                }
              )
                .then(response => {
                  //console.log(response);
                })
                .then(error => {
                  //console.log(error);
                });
            }
          } else if (!scoresSet) {
            const data = {
              player1: "",
              player2: "",
              score1: -1,
              score2: -1,
              matchId: matchId,
              tournamentUUID: tournamentId
            };
            fetch(URL + "/tournaments/create_match", {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              method: "POST",
              body: JSON.stringify(data)
            })
              .then(response => {
                //console.log(response);
              })
              .then(error => {
                //console.log(error);
              });
          }
          if (
            (byeTeams.length !== previousMatches * 2 && j === 1) ||
            byeTeams.length === 0
          ) {
            match = {
              id: matchId,
              "@id": matchId,
              name: "Match " + matchId,
              scheduled: Date.now(),
              sides: {
                home: {
                  score: {
                    score: score1 === -1 ? null : score1
                  },
                  team: {
                    name: player1
                  },
                  seed: {
                    sourceGame: { "@ref": otherCount },
                    sourcePool: null,
                    rank: 1,
                    displayName: "Winner of " + otherCount++
                  }
                },
                visitor: {
                  score: {
                    score: score2 === -1 ? null : score2
                  },
                  team: {
                    name: player2
                  },
                  seed: {
                    sourceGame: { "@ref": otherCount },
                    sourcePool: null,
                    rank: 1,
                    displayName: "Winner of " + otherCount++
                  }
                }
              }
            };
          } else {
            match = {
              id: matchId,
              "@id": matchId,
              name: "Match " + matchId,
              scheduled: Date.now(),
              sides: {
                home: {
                  score: {
                    score: score1 === -1 ? null : score1
                  },
                  team: {
                    name: byeTeams[byeCount++]
                  }
                },
                visitor: {
                  score: {
                    score: score2 === -1 ? null : score2
                  },
                  team: {
                    name: player2
                  },
                  seed: {
                    sourceGame: { "@ref": otherCount++ },
                    sourcePool: null,
                    rank: 1,
                    displayName: "Winner of B4"
                  }
                }
              }
            };
          }
          matches.push(match);
          matchId++;
        }
        matchId -= previousMatches * 2;
      } else {
        matchId = 1;

        for (var j = 0; j < otherTeams.length; j += 2) {
          var score1 = null;
          var score2 = null;
          if (matchScores.length !== 0) {
            score1 = matchScores[matchId - 1].score1;
            score2 = matchScores[matchId - 1].score2;
          } else if (!scoresSet) {
            const data = {
              player1: otherTeams[j],
              player2: otherTeams[j + 1],
              score1: -1,
              score2: -1,
              matchId: matchId,
              tournamentUUID: tournamentId
            };
            fetch(URL + "/tournaments/create_match", {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              method: "POST",
              body: JSON.stringify(data)
            })
              .then(response => {
                //console.log(response);
              })
              .then(error => {
                //console.log(error);
              });
          }

          match = {
            id: matchId,
            "@id": matchId,
            name: "Match " + matchId,
            scheduled: Date.now(),
            sides: {
              home: {
                score: {
                  score: score1 === -1 ? null : score1
                },
                team: {
                  name: otherTeams[j]
                }
              },
              visitor: {
                score: {
                  score: score2 === -1 ? null : score2
                },
                team: {
                  name: otherTeams[j + 1]
                }
              }
            }
          };
          matches.push(match);
          matchId++;
        }
      }
    }
    setMatches(matches.reverse());
  };

  const GameComponent = (props: any) => {
    return (
      <BracketGame
        {...props}
        styles={{
          backgroundColor: "#000",
          hoverBackgroundColor: "#222",
          scoreBackground: "#787a80",
          winningScoreBackground: "#00813C",
          teamNameStyle: {
            fill: "#fff",
            fontSize: 12,
            textShadow: "1px 1px 1px #222"
          },
          teamScoreStyle: { fill: "#23252d", fontSize: 12 },
          gameNameStyle: { fill: "#999", fontSize: 10 },
          gameTimeStyle: { fill: "#999", fontSize: 10 },
          teamSeparatorStyle: { stroke: "#444549", strokeWidth: 1 }
        }}
      />
    );
  };

  if (matches.length) {
    return (
      <Wrapper>
        {currentUser === organizer && (
          <Update>
            <div>
              <p>Match #</p>
              <Input type="text" onChange={handleMatchIdChange}></Input>
            </div>
            <div>
              <p>Player 1 Score</p>
              <Input type="text" onChange={handleScore1Change}></Input>
            </div>
            <div>
              <p>Player 2 Score</p>
              <Input type="text" onChange={handleScore2Change}></Input>
            </div>
            <ButtonGreen onClick={handleUpdate}>
              <FontFix>UPDATE</FontFix>
            </ButtonGreen>
          </Update>
        )}
        <div
          style={{
            marginTop:
              numTeams -
                Math.pow(2, Math.round(Math.log(numTeams) / Math.log(2))) !==
              0
                ? "-40px"
                : "0"
          }}
        >
          <Bracket
            GameComponent={GameComponent}
            game={_.findWhere(JSOG.decode(matches), {
              id: matches[matches.length - 1].id
            })}
            homeOnTop={true}
          />
        </div>
      </Wrapper>
    );
  } else {
    return <div></div>;
  }
};

export { Tournament };
