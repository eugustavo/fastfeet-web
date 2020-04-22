import React, { useState, useEffect } from 'react';
import { FaEllipsisH, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import api from '~/services/api';

import {
  Container,
  Title,
  Content,
  PageNavigate,
 } from './styles';

export default function DeliveryProblems() {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadProblems(){
      const response = await api.get('/deliveryproblem', {
        params: {
          page
        }
      });
      setProblems(response.data);
      console.log(response.data);
    }

    loadProblems();
  }, [page]);

  function handlePage(action) {
    setPage( action === 'back' ? page - 1 : page + 1 );
  }

  return (
    <Container>
      <Title>
        <strong>Problemas na entrega</strong>
      </Title>

      <Content>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Problema</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {problems.map(problem => (
              <tr key={problem.id}>
                <td>#{problem.id}</td>
                <td>{problem.description}</td>
                <td><button><FaEllipsisH/></button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <PageNavigate>
          <button
            disabled={page < 2}
            onClick={() => handlePage('back')}
          >
            <FaArrowLeft />
          </button>

          <span> Página {page} </span>

          <button
            onClick={() => handlePage('next')}
          >
            <FaArrowRight />
          </button>
        </PageNavigate>
      </Content>
    </Container>
  );
}
