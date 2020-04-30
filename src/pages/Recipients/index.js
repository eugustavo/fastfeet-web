import React, { useState, useEffect } from 'react';
import {
  FaSearch,
  FaPlus,
  FaEllipsisH,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';
import api from '~/services/api';
import history from '~/services/history';

import ActionsToggleMenu from '~/components/ActionsToggleMenu';

import {
  Container,
  Title,
  Actions,
  Search,
  Content,
  Icon,
  ActionsMenu,
  PageNavigate,
} from './styles';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [page, setPage] = useState(1);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleMenuId, setVisibleMenuId] = useState(0);

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('/recipients', {
        params: {
          page,
        },
      });
      setRecipients(response.data);
    }

    loadRecipients();
  }, [recipients, page]);

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  async function filterRecipient(search) {
    const response = await api.get('/recipients', {
      params: {
        page,
        findRecipient: search,
      },
    });
    setRecipients(response.data);
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
        <strong>Gerenciando destinatários</strong>
      </Title>

      <Actions>
        <Search>
          <div>
            <FaSearch color="#999" size={16} />
          </div>
          <input
            placeholder="Buscar por destinatário"
            onChange={(e) => filterRecipient(e.target.value)}
          />
        </Search>

        <button type="button" onClick={() => history.push('/recipientform')}>
          <FaPlus color="#FFF" size={16} />
          Cadastrar
        </button>
      </Actions>

      <Content>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map((recipient) => (
              <tr key={recipient.id}>
                <td>#{recipient.id}</td>
                <td>{recipient.name}</td>
                <td>
                  {recipient.street}, {recipient.street_number},{' '}
                  {recipient.city} - {recipient.state}
                </td>
                <td>
                  <Icon>
                    <button
                      type="button"
                      onClick={() => ToggleVisibleMenu(recipient.id)}
                    >
                      <FaEllipsisH />
                    </button>
                  </Icon>
                  <ActionsMenu>
                    {visibleMenu && visibleMenuId === recipient.id ? (
                      <ActionsToggleMenu
                        data={recipient}
                        edit
                        del
                        editLink="recipientform"
                        delLink="recipients"
                      />
                    ) : (
                      ''
                    )}
                  </ActionsMenu>
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
