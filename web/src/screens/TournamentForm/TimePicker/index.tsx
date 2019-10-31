import styled from "styled-components";
import TimePicker from "./TimePicker";

const StyledTimePicker = styled(TimePicker)`
  & .rc-time-picker-panel-select-option-selected {
    background-color: black;
    color: #00813c;
    font-weight: normal;
  }

  & .rc-time-picker-clear,
  & .rc-time-picker-clear-icon:after {
    display: none;
  }

  & .rc-time-picker-panel-inner {
    height: 200px;
  }

  & .rc-time-picker-panel-combobox {
    height: 100%;
  }

  & .rc-time-picker-panel-select {
    height: 150px !important;
  }

  & .rc-time-picker-panel-input-wrap,
  & .rc-time-picker-panel-input {
    background: #373737;
  }

  & .rc-time-picker-input {
    width: 245px;
  }

  & .rc-time-picker-panel-select,
  & .rc-time-picker-input,
  & .rc-time-picker-panel-input {
    font-family: Roboto;
    font-size: 16px;
    color: white;
    height: 40px;
    border: transparent;
    border-radius: 3px;
    cursor: pointer;
    background: #373737;

    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`;

export default StyledTimePicker;
