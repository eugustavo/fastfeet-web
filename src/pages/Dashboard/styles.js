import styled, { css } from 'styled-components';
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

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  button {
    background: #7159c1;
    border: 0;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: bold;
    color: #fff;

    display: flex;
    align-items: center;
    transition: background 0.4s;

    &:hover {
      background: ${darken(0.05, '#7159c1')};
    }

    svg {
      margin-right: 5px;
    }
  }
`;

export const Search = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 240px;

  border-radius: 6px;
  border: 1px solid #ddd;
  background: #fff;

  div {
    background: #fff;
    padding: 7px 10px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  input {
    background: none;
    border: 0;
    margin-left: 5px;

    &::placeholder {
      font-size: 14px;
    }
  }
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

    th,
    td {
      padding: 10px;
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

export const Status = styled.div`
  display: flex;
  justify-content: center;

  max-width: 120px;
  padding: 5px 2px;
  font-weight: bold;
  border-radius: 12px;

  ${(props) =>
    props.status === 'PENDENTE' &&
    css`
      background: #f0f0df;
      color: #c1bc35;
    `}

  ${(props) =>
    props.status === 'ENTREGUE' &&
    css`
      background: #dff0df;
      color: #2ca42b;
    `}

  ${(props) =>
    props.status === 'RETIRADA' &&
    css`
      background: #bad2ff;
      color: #4d85ee;
    `}

  ${(props) =>
    props.status === 'CANCELADA' &&
    css`
      background: #fab0b0;
      color: #de3b3b;
    `}

  div {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 5px;

    ${(props) =>
      props.status === 'PENDENTE' &&
      css`
        background: #c1bc35;
      `}

    ${(props) =>
      props.status === 'ENTREGUE' &&
      css`
        background: #2ca42b;
      `}

    ${(props) =>
      props.status === 'RETIRADA' &&
      css`
        background: #4d85ee;
      `}

    ${(props) =>
      props.status === 'CANCELADA' &&
      css`
        background: #de3b3b;
      `}
  }
`;

export const Icon = styled.div`
  display: none;
  align-items: left;
  justify-content: center;
`;

export const ActionsMenu = styled.div`
  position: relative;
  top: 53px;
  left: 37px;
`;
