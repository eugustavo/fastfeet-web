import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 0;
`;

export const Title = styled.div`
  font-size: 18px;
  color: #444;
  margin-bottom: 20px;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;

  table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;

    tr {
      border-bottom: 10px;
      border-bottom-style: solid;
      border-bottom-color: #f5f5f5;
    }

    td {
      background: #fff;

      button {
        background: none;
        border: 0;
      }

      div {
        display: flex;
        align-items: center;

        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-right: 5px;
        }

        div.sb-avatar.sb-avatar--text {
          margin-right: 5px;
        }
      }
    }

    th, td {
      padding: 15px;
      border-radius: 10px;
      text-align: left;
    }
  }
`;

export const PageNavigate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 20px;

  button {
    background: none;
    border: 0;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  span {
    margin: 0 10px;
    padding: 0 0 2px 0;
    font-weight: bold;
  }
`;
