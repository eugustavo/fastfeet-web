import React, { useState, useEffect } from 'react';
import { FaEllipsisH, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import api from '~/services/api';

import {
  Container,
  Title,
  Content,
  Icon,
  ActionsMenu,
  PageNavigate,
} from './styles';

import ActionsToggleMenu from '~/components/ActionsToggleMenu';

export default function DeliveryProblems() {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleMenuId, setVisibleMenuId] = useState(0);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('/deliveryproblem', {
        params: {
          page,
        },
      });
      setProblems(response.data);
    }

    loadProblems();
  }, [page]);

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  function ToggleVisibleMenu(id) {
    if (visibleMenu && visibleMenuId !== id) {
      setVisibleMenuId(id);
    }
    if (visibleMenu && visibleMenuId === id) {
      setVisibleMenu(false);
      setVisibleMenuId(0);
    } else {
      setVisibleMenu(true);
      setVisibleMenuId(id);
    }
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
            {problems.map((problem) => (
              <tr key={problem.id}>
                <td>#{problem.id}</td>
                <td>{problem.description}</td>
                <td>
                  <button type="button">
                    <Icon>
                      <button
                        type="button"
                        onClick={() => ToggleVisibleMenu(problem.id)}
                      >
                        <FaEllipsisH />
                      </button>
                    </Icon>
                    <ActionsMenu>
                      {visibleMenu && visibleMenuId === problem.id ? (
                        <ActionsToggleMenu data={problem} view cancel />
                      ) : (
                        ''
                      )}
                    </ActionsMenu>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <PageNavigate>
          <button
            type="button"
            disabled={page < 2}
            onClick={() => handlePage('back')}
          >
            <FaArrowLeft />
          </button>

          <span> Página {page} </span>

          <button type="button" onClick={() => handlePage('next')}>
            <FaArrowRight />
          </button>
        </PageNavigate>
      </Content>
    </Container>
  );
}
