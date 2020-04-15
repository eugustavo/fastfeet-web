import React, {useState, useEffect} from 'react';
import Avatar from 'react-avatar';
import { FaSearch, FaPlus, FaEllipsisH, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
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
 } from './styles';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadOrders(){
      const response = await api.get('/orders', {
        params: {
          page
        }
      });

      const data = response.data.map(order => ({
        ...order,
        status:
          order.canceled_at ?
            'CANCELADA'
          : order.start_date && order.end_date ?
            'ENTREGUE'
          : order.start_date ?
            'RETIRADA'
          : 'PENDENTE'
      }));
      setOrders(data);
      console.log(data);
    }

    loadOrders();
  }, [page]);

  function handlePage(action) {
    setPage( action === 'back' ? page - 1 : page + 1 );
  }

  async function filterOrder(search) {
    const response = await api.get('/orders', {
      params: {
        page,
        findProduct: search
      }
    });

    const data = response.data.map(order => ({
      ...order,
      status:
        order.canceled_at ?
          'CANCELADA'
        : order.start_date && order.end_date ?
          'ENTREGUE'
        : order.start_date ?
          'RETIRADA'
        : 'PENDENTE'
    }));
    setOrders(data);
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
            onChange={e => filterOrder(e.target.value)}
          />
        </Search>

        <button onClick={() => history.push('/orderform')} >
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
            {orders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.recipient.name}</td>

                <td>
                  <div>
                    {order.deliveryman.avatar
                      ? <img src={order.deliveryman.avatar.url} alt="Avatar" />
                      : <Avatar
                          name={order.deliveryman.name}
                          maxInitials={2}
                          size="32"
                          round={true}
                        />
                    }
                    {order.deliveryman.name}
                  </div>
                </td>

                <td>{order.recipient.city}</td>
                <td>{order.recipient.state}</td>

                <td>
                  <Status status={order.status}>
                    <div />
                    {order.status}
                  </Status>
                </td>

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
