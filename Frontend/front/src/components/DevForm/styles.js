import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      font-size: 16px;
      font-weight: normal;
      color: #737f8d;
      width: 320px;
      display: block;
      padding-bottom: 2px;
    }

    input {
      width: 100%;
      border: 0;
      border-radius: 4px;
      border-bottom: 1px solid #eee;
      background: rgba(0, 0, 0, 0.06);
      height: 38px;
      color: #666;
      font-size: 14px;
      padding: 0 15px;
      margin: 0 0 10px;

      &::placeholder {
        color: #fff;
      }
    }

    h2 {
      color: #737f8d;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
      font-size: 18px;
      padding-bottom: 5px;
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 10px 0 0px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #7d40e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: backgroud 0.2s;

      &:hover {
        background: ${darken(0.03, '#AB63C1')};
      }
    }
  }

  > button {
    width: 100%;
    margin: 10px 0 0;
    height: 44px;
    background: #f64c75;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: backgroud 0.2s;

    &:hover {
      background: ${darken(0.08, '#f64c75')};
    }
  }
`;

export const InputBlock = styled.div`
  flex-direction: column;
  display: flex;
`;


