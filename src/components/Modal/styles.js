import styled from 'styled-components';

export const Content = styled.div`
  width: 450px;
  height: 100%;

  strong {
    color: #333;
  }

  div.order {
    display: flex;
    flex-direction: column;
    margin: 0 0 15px 0;

    span {
      color: #666;
      margin: 2px 0;
    }
  }

  div.date {
    display: flex;
    flex-direction: column;
    margin: 0 0 15px 0;

    strong {
      color: #666;
      margin: 2px 0;
      span {
        margin: 2px 0;
        font-weight: normal;
      }
    }
  }

  div.signature {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    img {
      text-align: center;
      margin-top: 10px;

      width: 450px;
      height: 80px;
    }
  }

  div.problem {
    margin-top: 10px;
    text-align: justify;

    span {
      color: #666;
    }
  }
`;
