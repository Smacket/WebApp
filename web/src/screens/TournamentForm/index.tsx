import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Nav } from '../Nav';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

import { useAuth0 } from "../../react-auth0-wrapper";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1d1d1d;
  height: 100vh;
`

const PageConstraint = styled.div`
  padding-top: 50px;
  width: 800px;
`

const Header = styled.h1`
  margin-top: 50px;
  margin-bottom: 5px;
  font-family: nexa;
  font-weight: normal;
  color: white;
`

const Form = styled.form`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 630px;
  padding-top: 50px;
  background: rgba(2,2,2,0.3);
  border-radius: 3px;
  font-family: roboto;
  color: white;

  textarea {
    height: 100px;
    margin-bottom: 10px;
    margin-top: 3px;
    background-color: #3A3A3A;
    border: 0;
    border-radius: 3px;
  }
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;

  .required {
    color: red;
  }
`

const Input = styled.input`
  border: transparent;
  border-radius: 3px;
  width: 100%;
  height: 40px;
  background: #373737;
  color: white;
  margin-top: 3px;
  margin-bottom: 10px;
  padding: 0 5px;
`

const FontFix = styled.span`
  position: relative;
  top: 0.1em;
`

const Time = styled.div`
  display: flex;
  margin-top: 10px;
`

const Start = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: 4px;
`

const End = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-bottom: 10px
  margin-top: 4px;
`

const Submit = styled.button`
  align-items: center;
  width: 150px;
  height: 40px;
  margin-top: 10px;
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

interface UserTypes {
  nickname: string,
  name: string,
  picture: string,
  updated_at: string,
  email: string,
  email_verified: boolean,
  sub: string
}

const TournamentForm: React.FC<{}> = (): JSX.Element => {
  const { isAuthenticated, user, loading } = useAuth0();
  const [startDate, setDate] = useState(new Date())
  useEffect(() => {
    console.log('signup')

    if(!loading) {
      console.log('yay')
    }
  })

  const handleDateChange = (date: any) => {
    setDate(date)
  }

  function onChange(value: any) {
    console.log(value && value.format('h:mm a'));
  }

    return (
      <Wrapper>
        <Nav />
        <PageConstraint>
          <Header>Create your tournament</Header>
          <Form>
            <InputWrapper>
              <label>Tournament Name <span className="required"> *</span></label>
              <Input type='text'></Input>
              <label>Location<span className="required"> *</span></label>
              <Input placeholder='Building and room #' type='text'></Input>
              <label>Start Date<span className="required"> *</span></label>
              <DatePicker selected={startDate} onChange={handleDateChange}/>
              <Time>
                <Start>
                  <label>Start Time<span className="required"> *</span></label>
                  <TimePicker
                    showSecond={false}
                    defaultValue={moment().hour(0).minute(0)}
                    className="xxx"
                    onChange={onChange}
                    format={'h:mm a'}
                    use12Hours
                    inputReadOnly
                  />
                </Start>
                <End>
                  <label>End time</label>
                  <TimePicker
                    showSecond={false}
                    defaultValue={moment().hour(0).minute(0)}
                    className="xxx"
                    onChange={onChange}
                    format={'h:mm a'}
                    use12Hours
                    inputReadOnly
                  />
                </End>
              </Time>
              <label>Tournament discription</label>
              <textarea></textarea>
              <label>Player names</label>
              <textarea placeholder='One player per line'></textarea>
              <Submit><FontFix>SUBMIT</FontFix></Submit>
            </InputWrapper>
          </Form>
        </PageConstraint>
      </Wrapper>
    );
}

export { TournamentForm };