import React, { useState, useCallback, useEffect } from 'react';
import Avatar from 'react-avatar';
import {
  FaSearch,
  FaPlus,
  FaEllipsisH,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';
import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  Title,
  Actions,
  Search,
  Content,
  PageNavigate,
  Icon,
  ActionsMenu,
} from './styles';

import ActionsToggleMenu from '~/components/ActionsToggleMenu';

export default function Deliverymans() {
  const [deliverymans, setDeliverymans] = useState([]);
  const [page, setPage] = useState(1);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleMenuId, setVisibleMenuId] = useState(0);

  useEffect(() => {
    loadDeliverymans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useCallback(() => {
    loadDeliverymans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliverymans]);

  async function loadDeliverymans() {
    const response = await api.get('/deliverymans', {
      params: {
        page,
      },
    });
    setDeliverymans(response.data);
  }

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  async function filterDeliveryman(search) {
    const response = await api.get('/deliverymans', {
      params: {
        page,
        findDeliveryman: search,
      },
    });
    setDeliverymans(response.data);
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
        <strong>Gerenciando entregadores</strong>
      </Title>

      <Actions>
        <Search>
          <div>
            <FaSearch color="#999" size={16} />
          </div>
          <input
            placeholder="Buscar por entregador"
            onChange={(e) => filterDeliveryman(e.target.value)}
          />
        </Search>

        <button type="button" onClick={() => history.push('/deliverymanform')}>
          <FaPlus color="#FFF" size={16} />
          Cadastrar
        </button>
      </Actions>

      <Content>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {deliverymans.map((deliveryman) => (
              <tr key={deliveryman.id}>
                <td>#{deliveryman.id}</td>

                <td>
                  <div>
                    {deliveryman.avatar ? (
                      <img src={deliveryman.avatar.url} alt="Avatar" />
                    ) : (
                      <Avatar
                        name={deliveryman.name}
                        maxInitials={2}
                        size="32"
                        round
                      />
                    )}
                  </div>
                </td>

                <td>{deliveryman.name}</td>
                <td>{deliveryman.email}</td>
                <td>
                  <Icon>
                    <button
                      type="button"
                      onClick={() => ToggleVisibleMenu(deliveryman.id)}
                    >
                      <FaEllipsisH />
                    </button>
                  </Icon>
                  <ActionsMenu>
                    {visibleMenu && visibleMenuId === deliveryman.id ? (
                      <ActionsToggleMenu
                        data={deliveryman}
                        edit
                        del
                        editLink="deliverymanform"
                        delLink="deliverymans"
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
