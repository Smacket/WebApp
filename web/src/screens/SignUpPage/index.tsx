import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Nav } from "../Nav";
import styled from "styled-components";
import { useAuth0 } from "../../react-auth0-wrapper";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageConstraint = styled.div`
  width: 800px;
`;

const Header = styled.h1`
  margin-top: 50px;
  margin-bottom: 0;
  font-family: nexa;
  font-weight: normal;
`;

const Form = styled.form`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 500px;
  padding-top: 50px;
  background: rgba(2, 2, 2, 0.3);
  border-radius: 3px;
  font-family: roboto;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 100px;
  width: 21.88%;

  img {
    width: 175px;
    border-radius: 50%;
  }

  input[type="file"] {
    display: none;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 100px;
  width: 350px;

  .required {
    color: red;
  }
`;

const DivGreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
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
`;

const FontFix = styled.span`
  position: relative;
  top: 0.1em;
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

const URL: string = "http://localhost:5000"

const SignUpPage: React.FC<{}> = (): JSX.Element => {
  const { isAuthenticated, user } = useAuth0();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNameChange = (event: any) => {
    setName(event.target.name);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const post = () => {
      const data = {name: name, email: email }
      fetch(URL + "/add", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
      })
    }

    post()
    setSubmitted(true);
  }

  if (isAuthenticated) {
    var profile: UserTypes = user;

    if(email === '')
      setEmail(profile.email)

    if(submitted) {
      return <Redirect to="/" />
    } else {
      return (
        <Wrapper>
          <Nav />
          <PageConstraint>
            <Header>Create your profile</Header>
            <Form>
              <ImageWrapper>
                <img
                  src={require("../../static/img/profile-placeholder.png")}
                  alt="profile"
                />
                <label htmlFor="file-upload">
                  <DivGreen>
                    <FontFix>UPLOAD</FontFix>
                  </DivGreen>
                </label>
                <input id="file-upload" type="file" />
              </ImageWrapper>
              <InputWrapper>
                <label>
                  Name <span className='required'>*</span>
                </label>
                <Input type="text" name="name" onChange={handleNameChange}></Input>
                <label>Email</label>
                <Input type="text" value={profile.email} disabled></Input>
                <ButtonGreen type="submit" onClick={handleSubmit}>
                  <FontFix>SUBMIT</FontFix>
                </ButtonGreen>
              </InputWrapper>
            </Form>
          </PageConstraint>
        </Wrapper>
      );
    }
  } else {
    return <Redirect to="/" />;
  }
};

export { SignUpPage };
