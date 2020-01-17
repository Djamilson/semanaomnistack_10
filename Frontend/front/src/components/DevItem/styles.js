import styled from 'styled-components';

export const Container = styled.li`
  background: #fff;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
  padding: 20px;
  border-radius: 2px;

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      height: 54px;
      width: 54px;
      border-radius: 50%;
    }
  }
  div {
    margin-left: 10px;
    strong {
      display: block;
      font-size: 16px;
      color: #333;
    }
    span {
      font-size: 13px;
      color: #999;
      margin-top: 2px;
      margin-left: 15px;
    }
  }
  p {
    color: #666;
    font-size: 14px;
    line-height: 20px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  a {
    color: #8e4dff;
    margin-top: 15px;
    font-size: 14px;
    opacity: 0.8;
    text-decoration: none;

    &:hover {
      opacity: 1;
      color: #5a2ea6;
    }
  }
`;
