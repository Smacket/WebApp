import React, { useEffect, useState } from "react";
import { Bracket, BracketGame, Model } from "react-tournament-bracket";
import JSOG from "jsog";
import * as _ from "underscore";

const HomePage: React.FC<{}> = (): JSX.Element => {
  const teams = [
    "team1",
    "team2",
    "team3",
    "team4",
    "team5",
    "team6",
    "team7",
    "team8",
    "team9",
    "team10",
    "team11",
    "team12",
    "team13",
    "team14",
    "team15",
    "team16",
    "team17",
    "team18",
    "team19",
    "team20",
    "team21",
    "team22",
    "team23",
    "team24",
    "team25",
    "team26",
    "team27",
    "team28",
    "team29",
    "team30",
    "team31",
    "team32"
  ];
  const numTeams = 29;
  const [hoveredTeamId, setHoveredTeamId] = useState<string>("");
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    var numLevels: number = Math.log2(
      Math.pow(2, Math.ceil(Math.log2(numTeams)))
    );

    if (matches.length === 0) {
      var numByes =
        numTeams - Math.pow(2, Math.round(Math.log(numTeams) / Math.log(2)));

      var byeTeams: any[] = [];
      var otherTeams: any[] = teams.slice(0, numTeams).slice(Math.abs(numByes));

      if (numByes !== 0) {
        byeTeams = calculateByes(numByes);
      }

      generateBracket(numLevels, byeTeams, otherTeams);
    }
  });

  const calculateByes = (numByes: number) => {
    var byeTeams = teams.slice(0, Math.abs(numByes));
    var numByesLevels: number = Math.pow(2, Math.ceil(Math.log(Math.abs(numByes)) / Math.log(2)))
    var numByes1: number = Math.floor(Math.abs(numByes) / 2)
    var numByes2: number = Math.ceil(Math.abs(numByes) / 2)
    var a: number[] = []
    var b: number[] = []
    console.log(numByes1)
    console.log(numByes2)
    console.log(numByesLevels)
    
    for(var i = 0; i < numByesLevels; i++) {
      
    }


    return byeTeams
  }

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
        match = {
          id: matchId,
          "@id": matchId,
          name: "Match " + matchId,
          scheduled: Date.now(),
          sides: {
            home: {
              score: {
                score: null
              },
              team: {
                name: ""
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
                score: null
              },
              team: {
                name: ""
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
          match = {
            id: matchId,
            "@id": matchId,
            name: "Match " + matchId,
            scheduled: Date.now(),
            sides: {
              home: {
                score: {
                  score: null
                },
                team: {
                  name: ""
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
                  score: null
                },
                team: {
                  name: ""
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
          if (byeTeams.length !== previousMatches*2 && j === 1 || byeTeams.length === 0) {
            match = {
              id: matchId,
              "@id": matchId,
              name: "Match " + matchId,
              scheduled: Date.now(),
              sides: {
                home: {
                  score: {
                    score: null
                  },
                  team: {
                    name: ""
                  },
                  seed: {
                    sourceGame: { "@ref": otherCount++ },
                    sourcePool: null,
                    rank: 1,
                    displayName: "Winner of B4"
                  }
                },
                visitor: {
                  score: {
                    score: null
                  },
                  team: {
                    name: ""
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
          } else {
            match = {
              id: matchId,
              "@id": matchId,
              name: "Match " + matchId,
              scheduled: Date.now(),
              sides: {
                home: {
                  score: {
                    score: null
                  },
                  team: {
                    name: byeTeams[byeCount++]
                  }
                },
                visitor: {
                  score: {
                    score: null
                  },
                  team: {
                    name: ""
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
          match = {
            id: matchId,
            "@id": matchId,
            name: "Match " + matchId,
            scheduled: Date.now(),
            sides: {
              home: {
                score: {
                  score: null
                },
                team: {
                  name: otherTeams[j]
                }
              },
              visitor: {
                score: {
                  score: null
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
    //console.log(JSOG.decode(matches.reverse()))
    setMatches(matches.reverse());
  };

  /*if (matches.length === 0) {
      var numByes =
        teams.length -
        Math.pow(2, Math.round(Math.log(teams.length) / Math.log(2)));
      console.log(numByes)
      var newMatches: any = [];
      if (numByes) {
        var byeTeams: any[] = teams.slice(0, Math.abs(numByes));
        var otherTeams: any[] = teams.slice(Math.abs(numByes));
        for (var i = 0; i < Math.abs(numByes); i++) {
          var match = {
            id: i,
            "@id": i,
            name: "Match " + i,
            sides: {
              home: {
                score: {
                  score: 1
                },
                team: {
                  name: otherTeams[i*2]
                }
              },
              visitor: {
                score: {
                  score: 1
                },
                team: {
                  name: otherTeams[i*2 + 1]
                }
              }
            }
          };
          newMatches.push(match);
          console.log(match)
        }
        newMatches.push(
          ...generateBracket(newMatches, numByes, byeTeams, otherTeams)
        );
      } else {
        for (var i = 0; i < teams.length; i += 2) {
          var match3 = {
            id: i / 2,
            "@id": i / 2,
            name: "Match " + i / 2,
            sides: {
              home: {
                score: {
                  score: 1
                },
                team: {
                  name: teams[i]
                }
              },
              visitor: {
                score: {
                  score: 1
                },
                team: {
                  name: teams[i + 1]
                }
              }
            }
          };
          newMatches.push(match3);
        }
        newMatches.push(...generateBracket(newMatches));
      }
      setMatches(newMatches);
      console.log(matches);
    }*/

  /*const generateBracket = (
    matches: any,
    numByes?: number,
    byeTeams?: any[],
    otherTeams?: any[]
  ): any[] => {
    if (matches.length === 1 && !numByes) {
      return [];
    }
    var newMatches = [];
    if (numByes && byeTeams && otherTeams) {
      var matchId: number = matches.length
      for (var i = 0; i < byeTeams.length; i++) {
        var final = {
          id: matchId,
          "@id": matchId,
          name: "Match " + matchId,
          sides: {
            home: {
              score: {
                score: 1
              },
              team: {
                name: byeTeams[i]
              }
            },
            visitor: {
              score: {
                score: 1
              },
              team: {
                name: ""
              },
              seed: {
                sourceGame: { "@ref": matches[i].id },
                sourcePool: null,
                rank: 1,
                displayName: "Winner of B4"
              }
            }
          }
        };
        newMatches.push(final);
        console.log(final)
        matchId++;
      }
      if (numByes < 0) {
        for (var i = 0; i < matches.length-2; i++) {
          var final2 = {
            id: matchId,
            "@id": matchId,
            name: "Match " + matchId,
            sides: {
              home: {
                score: {
                  score: 1
                },
                team: {
                  name: otherTeams[i]
                },
                seed: {
                  sourceGame: { "@ref": matches[i].id },
                  sourcePool: null,
                  rank: 1,
                  displayName: "Winner of B4"
                }
              },
              visitor: {
                score: {
                  score: 1
                },
                team: {
                  name: otherTeams[i + 1]
                },
                seed: {
                  sourceGame: { "@ref": matches[i].id },
                  sourcePool: null,
                  rank: 1,
                  displayName: "Winner of B4"
                }
              },
            }
          };
          newMatches.push(final2);
          console.log(final2)
          matchId++;
        }  
      } else {
        for (var i = 2; i < otherTeams.length; i += 2) {
          var final3 = {
            id: matchId,
            "@id": matchId,
            name: "Match " + matchId,
            sides: {
              home: {
                score: {
                  score: 1
                },
                team: {
                  name: otherTeams[i]
                }
              },
              visitor: {
                score: {
                  score: 1
                },
                team: {
                  name: otherTeams[i + 1]
                }
              }
            }
          };
          newMatches.push(final3);
          matchId++;
        }
        console.log(newMatches);
      }
    } else {
      var matchId: number = matches[matches.length - 1].id + 1;
      for (var i = 0; i < matches.length; i += 2) {
        //console.log(matches[i].id);
        //console.log(matches[i + 1].id);
        var final4: any = {
          id: matchId,
          "@id": matchId,
          name: "Match " + matchId,
          sides: {
            home: {
              score: {
                score: 1
              },
              team: {
                name: teams[0]
              },
              seed: {
                sourceGame: { "@ref": matches[i].id },
                sourcePool: null,
                rank: 1,
                displayName: "Winner of B4"
              }
            },
            visitor: {
              score: {
                score: 1
              },
              team: {
                name: teams[2]
              },
              seed: {
                sourceGame: { "@ref": matches[i].id + 1 },
                sourcePool: null,
                rank: 1,
                displayName: "Winner of B4"
              }
            }
          }
        };
        newMatches.push(final4);
        matchId++;
      }
    }
    newMatches.push(...generateBracket(newMatches));
    return newMatches;
  };*/

  const changeHoveredTeamId = (hoveredTeamId: string) => {
    setHoveredTeamId(hoveredTeamId);
  };

  const handleClick = (game: Model.Game) => alert("clicked game: " + game.name);

  const GameComponent = (props: any) => {
    return (
      <BracketGame
        {...props}
        onHoveredTeamIdChange={changeHoveredTeamId}
        onClick={handleClick}
        hoveredTeamId={hoveredTeamId}
      />
    );
  };

  if (matches.length) {
    return (
      <div>
        <Bracket
          GameComponent={GameComponent}
          game={_.findWhere(JSOG.decode(matches), {
            id: matches[matches.length - 1].id
          })}
          homeOnTop={true}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export { HomePage };
