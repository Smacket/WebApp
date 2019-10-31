import React from "react";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 730px;
  height: 107px;
  padding: 10px 0;
  border-top: 1px solid #475e51;
  
  h1 {
    font-size: 24px;
    margin-bottom: 5px;
    text-transform: uppercase;
  }
`;

const TournamentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 375px;

  div {
    display: flex;
  }

  img {
    width: 17px;
    margin-right: 3px;
  }

  p {
    margin: 0;
    font-size: 14px;
    font-family: roboto;
    color: #475e51;
  }

  span {
    color: #00813c;
  }
`;

const Description = styled.p`
  font-size: 15px;
  margin-top: 5px;
`;

const ButtonGreen = styled.button`
  margin-right: 50px;
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
  name: string;
  participants: number;
  date: number;
  description: string;
  uuid: string;
}

const Tournament: React.FC<IProps> = (props): JSX.Element => {
  const { name, participants, date, description, uuid } = props;

  return (
    <Wrapper>
      <div style={{ marginLeft: "25px" }}>
        <h1>{name}</h1>
        <TournamentInfo>
          <div>
            <img src={require("../../static/img/people.png")} alt="people"/>
            <p>{participants} PARTICIPANTS</p>
          </div>
          <div className="date">
            <img
              style={{ width: "17px", height: "17px" }}
              src={require("../../static/img/calendar.png")}
              alt="calendar"
            />
            <p>
              <span>
                {moment.unix(date).format("MMMM Do YYYY [at] h:mm a")}
              </span>
            </p>
          </div>
        </TournamentInfo>
        <Description>{description}</Description>
      </div>
      <div>
        <Link
          to={"/tournaments/view/" + uuid}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ButtonGreen>
            <FontFix>VIEW</FontFix>
          </ButtonGreen>
        </Link>
      </div>
    </Wrapper>
  );
};

export { Tournament };
