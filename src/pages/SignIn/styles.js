import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;

  background: #fff;

  img {
    width: 260px;
    height: 260px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  width: 100%;
  max-width: 360px;
  max-height: 425px;

  background: #fff;
  border-radius: 4px;
  padding: 50px 30px;

  img {
    width: 260px;
    /* height: 45px; */
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    width: 100%;

    label {
      font-weight: bold;
      color: #444;
      text-align: left;
      margin-top: 15px;
    }

    input {
      height: 45px;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 0 10px;

      &::placeholder {
        color: #999;
      }
    }

    span {
      color: red;
      font-weight: bold;
    }

    button {
      border: none;
      background: #7159c1;
      padding: 15px 30px;
      border-radius: 4px;
      color: #fff;
      margin-top: 15px;
      width: 100%;
      height: 45px;
      font-weight: bold;
      transition: background 0.4s;

      &:hover {
        background: ${darken(0.05, '#7159c1')};
      }
    }
  }
`;
