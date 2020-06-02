import React, { useState, useEffect, useCallback } from 'react';
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
  Status,
  Icon,
  ActionsMenu,
} from './styles';

import ActionsToggleMenu from '~/components/ActionsToggleMenu';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleMenuId, setVisibleMenuId] = useState(0);

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  useCallback(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function loadOrders() {
    const response = await api.get('/orders', {
      params: {
        page,
      },
    });

    const data = response.data.map((order) => ({
      ...order,
      status: order.canceled_at
        ? 'CANCELADA'
        : order.start_date && order.end_date
        ? 'ENTREGUE'
        : order.start_date
        ? 'RETIRADA'
        : 'PENDENTE',
    }));
    setOrders(data);
  }

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  async function filterOrder(search) {
    const response = await api.get('/orders', {
      params: {
        page,
        findProduct: search,
      },
    });

    const data = response.data.map((order) => ({
      ...order,
      status: order.canceled_at
        ? 'CANCELADA'
        : order.start_date && order.end_date
        ? 'ENTREGUE'
        : order.start_date
        ? 'RETIRADA'
        : 'PENDENTE',
    }));
    setOrders(data);
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
        <strong>Gerenciando encomendas</strong>
      </Title>

      <Actions>
        <Search>
          <div>
            <FaSearch color="#999" size={16} />
          </div>
          <input
            placeholder="Buscar por encomendas"
            onChange={(e) => filterOrder(e.target.value)}
          />
        </Search>

        <button type="button" onClick={() => history.push('/orderform')}>
          <FaPlus color="#FFF" size={16} />
          Cadastrar
        </button>
      </Actions>

      <Content>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>
                  {order.recipient ? order.recipient.name : 'Sem destinatário'}
                </td>

                <td>
                  <div>
                    {order.deliveryman ? (
                      order.deliveryman.avatar ? (
                        <Avatar
                          name={order.deliveryman.name}
                          src={order.deliveryman.avatar.url}
                          maxInitials={2}
                          size="32"
                          round
                        />
                      ) : (
                        <Avatar
                          name={order.deliveryman.name}
                          maxInitials={2}
                          size="32"
                          round
                        />
                      )
                    ) : (
                      <Avatar
                        name={
                          order.deliveryman
                            ? order.deliveryman.name
                            : 'Sem entregador'
                        }
                        maxInitials={2}
                        size="32"
                        round
                      />
                    )}
                    <h4>
                      {order.deliveryman
                        ? order.deliveryman.name
                        : 'Sem entregador'}
                    </h4>
                  </div>
                </td>

                <td>{order.recipient ? order.recipient.city : '---'}</td>
                <td>{order.recipient ? order.recipient.state : '---'}</td>

                <td>
                  <Status status={order.status}>
                    <div />
                    {order.status}
                  </Status>
                </td>

                <td>
                  <Icon>
                    <button
                      type="button"
                      onClick={() => ToggleVisibleMenu(order.id)}
                    >
                      <FaEllipsisH />
                    </button>
                  </Icon>
                  <ActionsMenu>
                    {visibleMenu && visibleMenuId === order.id ? (
                      <ActionsToggleMenu
                        data={order}
                        view
                        edit
                        editLink="orderform"
                        del
                        delLink="orders"
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
