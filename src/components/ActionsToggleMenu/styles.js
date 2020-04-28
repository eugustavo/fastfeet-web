import styled from 'styled-components';
import { darken } from 'polished';

export const ActionsMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  margin-top: 5px;

  position: absolute;
  background: ${darken(0.09, '#fff')};
  right: 4.6%;
  border-radius: 4px;
  padding: 15px;
  border: 1px solid #eee;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 12px);
    top: -10px;
    width: 0;
    height: 0;

    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${darken(0.09, '#fff')};
  }

  hr {
    border: 1px solid ${darken(0.0, '#fff')};
    width: 100%;
    margin: 7px 0;
  }

  a {
    color: #999;
  }

  button {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    color: #999;

    svg {
      margin-right: 5px;
    }
  }
`;
