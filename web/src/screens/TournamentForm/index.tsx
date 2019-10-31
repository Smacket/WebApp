import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Nav } from "../Nav";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "./TimePicker";
import moment from "moment";
import uuid from 'uuid';

import { useAuth0 } from "../../react-auth0-wrapper";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1d1d1d;
  height: 100vh;
`;

const PageConstraint = styled.div`
  padding-top: 50px;
  width: 800px;
`;

const Header = styled.h1`
  margin-top: 50px;
  margin-bottom: 5px;
  font-family: nexa;
  font-weight: normal;
  color: white;
`;

const Form = styled.form`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 630px;
  padding-top: 25px;
  background: rgba(2, 2, 2, 0.3);
  border-radius: 3px;
  font-family: roboto;
  color: white;

  textarea {
    height: 100px;
    margin-bottom: 10px;
    margin-top: 3px;
    background-color: #3a3a3a;
    border: 0;
    border-radius: 3px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;

  .required {
    color: red;
  }

  textarea {
    color: white;
    padding: 5px;
    font-size: 15px;
    font-family: roboto;
    width: 100%;
    height: 75px;
  }

  .date-picker {
    background: #373737;
    width: 232.5px;
    height: 40px;
    border: transparent;
    border-radius: 3px;
    padding: 0 5px;
    color: white;
    font-family: roboto;
    margin-bottom: -15px;
  }

  label {
    margin-top: 10px;
  }
`;

const Input = styled.input`
  border: transparent;
  border-radius: 3px;
  width: 100%;
  height: 40px;
  background: #373737;
  color: white;
  padding: 0 5px;
`;

const FontFix = styled.span`
  position: relative;
  top: 0.1em;
`;

const Time = styled.div`
  display: flex;
  margin-top: 10px;
  width: 100%;
`;

const Start = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: 4px;
`;

const End = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-bottom: 10px
  margin-top: 4px;
`;

const Submit = styled.button`
  align-items: center;
  width: 150px;
  height: 40px;
  margin-top: 10px;
  border: transparent;
  border-radius: 3px;
  background: #00813c;
  color: white;
  font-size: 20px;
  font-family: nexa;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

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

const TournamentForm: React.FC<{}> = (): JSX.Element => {
  const { isAuthenticated, user } = useAuth0();
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [startDate, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<any>(moment(new Date()));
  const [description, setDescription] = useState<string>("");
  const [players, setPlayers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [_uuid, setUuid] = useState<string>('');

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleLocationChange = (event: any) => {
    setLocation(event.target.value);
  };

  const handleDateChange = (date: any) => {
    setDate(date);
  };

  const handleTimeChange = (value: any) => {
    var date = moment(startDate);
    date.set({ h: value.hour(), m: value.minute() });
    setStartTime(date);
    console.log(date.unix());
  };

  const handleDescChange = (event: any) => {
    setDescription(event.target.value);
  };

  const handlePlayerChange = (event: any) => {
    var _players: string[] = [];
    event.target.value.split("\n").map((value: any) => {
      _players.push(value);
      return _players;
    });
    setPlayers(_players);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    console.log('posting');

    const post = () => {
      if (isAuthenticated) {
        var profile: UserTypes = user;
        var uuidv4: string = uuid.v4().toString();
        setUuid(uuidv4)
        fetch(URL + "/get/" + profile.email, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "GET",
        }).then(response => {
          response.json().then(data =>{
            const newData = {
              name: name,
              location: location,
              date: startTime.unix(),
              description: description,
              players: players,
              organizer: data.username,
              uuid: uuidv4
            };
            console.log(JSON.stringify(newData))
            fetch(URL + "/tournaments/create", {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              method: "POST",
              body: JSON.stringify(newData)
            }).then(response => {
                setSubmitted(true);
            })
          })
        });
      }
    };

    post();
  };

  if(submitted) {
    return <Redirect to={"/tournaments/view/" + _uuid} />
  } else {
    return (
      <Wrapper>
        <Nav />
        <PageConstraint>
          <Header>Create your tournament</Header>
          <Form>
            <InputWrapper>
              <label>
                Tournament Name <span className="required"> *</span>
              </label>
              <Input
                type="text"
                value={name}
                name="name"
                onChange={handleNameChange}
              ></Input>
              <label>
                Location<span className="required"> *</span>
              </label>
              <Input
                placeholder="Building and room #"
                type="text"
                value={location}
                name="location"
                onChange={handleLocationChange}
              ></Input>
              <label>
                Start Date<span className="required"> *</span>
              </label>
              <DatePicker
                className="date-picker"
                selected={startDate}
                onChange={handleDateChange}
              />
              <Time>
                <Start>
                  <label>
                    Start Time<span className="required"> *</span>
                  </label>
                  <TimePicker onChange={handleTimeChange} />
                </Start>
                <End>
                  <label>End time</label>
                  <TimePicker />
                </End>
              </Time>
              <label>Tournament Description</label>
              <textarea
                name="description"
                value={description}
                onChange={handleDescChange}
              ></textarea>
              <label>Player Names</label>
              <textarea
                placeholder="Separate players by line"
                name="players"
                onChange={handlePlayerChange}
              ></textarea>
              <Submit type="submit" onClick={handleSubmit}>
                <FontFix>SUBMIT</FontFix>
              </Submit>
            </InputWrapper>
          </Form>
        </PageConstraint>
      </Wrapper>
    );
  }
};

export { TournamentForm };
