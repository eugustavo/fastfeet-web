import styled from 'styled-components';

export const Container = styled.div`
  background: #FFF;
  padding: 0 30px;
`;

export const Content = styled.div`
    height: 64px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    nav {
      display: flex;
      flex-direction: row;
      align-items: center;

      img {
        padding-right: 20px;
        margin-right: 20px;
        border-right: 1px solid #eee;
      }

      a {
        font-weight: bold;
        color: #999;
        transition: color 0.2s;

        &:hover {
          color: #333;
        }

        & + a {
          margin-left: 20px;
        }
      }

      a.active {
        color: #333;
      }
    }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;

  button {
    background: none;
    border: 0;
    color: red;
    margin-top: 5px;
  }
`;
