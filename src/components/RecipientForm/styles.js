import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 0;

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  div.css-2b097c-container {
    width: 405px;
    height: 45px;
    margin-top: 5px;
  }
`;

export const Title = styled.div`
  font-size: 24px;
  color: #444;
  margin-bottom: 20px;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;

  button {
    border: 0;
    padding: 10px 20px;
    margin-right: 10px;
    border-radius: 4px;
    font-weight: bold;
    color: #fff;

    display: flex;
    align-items: center;
    transition: background 0.4s;

    svg {
      margin-right: 5px;
    }
  }

  button.back {
    background: #ccc;

    &:hover {
      background: ${darken(0.08, '#ccc')};
    }
  }
  button.save {
    background: #7159c1;

    &:hover {
      background: ${darken(0.05, '#7159c1')};
    }
  }
`;

export const Content = styled.div`
  display: flex;
  background: #fff;
  border-radius: 4px;

  max-width: 900px;
  max-height: 400px;
  margin: 0 auto;
  padding: 30px 20px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 10px 0 0 10px;

    input {
      height: 45px;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 0 10px;
      margin: 0 10px 20px 0;
    }

    label {
      color: #444;
      font-weight: bold;
      margin-bottom: 5px;
    }

    span {
      color: red;
      font-weight: bold;
    }
  }

  div.info {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    div.info_align {
      display: flex;
      flex-direction: column;
    }

    div.info_align_street {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 455px;
    }

    div.info_align_city {
      display: flex;
      flex-direction: column;
      width: 100%;

      input.inputState {
        text-transform: uppercase;

        &::placeholder {
          text-transform: initial;
        }
      }
    }
  }
`;
