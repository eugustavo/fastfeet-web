import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import {
  FaSearch,
  FaPlus,
  FaEllipsisH,
  FaArrowLeft,
  FaArrowRight,
  FaEye,
  FaPen,
  FaTrash,
} from 'react-icons/fa'
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

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [visibleMenu, setVisibleMenu] = useState(0);

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

  function ToggleVisibleMenu(orderId) {
    if(visibleMenu === orderId){
      setVisibleMenu(0);
    }
    setVisibleMenu(orderId);
  }

  async function handleDelete(id) {
    const confirm = window.confirm('Você realmente deseja excluir essa encomenda?');

    if(confirm){
      const response = await api.delete(`/orders/${id}`);

      if(response.status === 200) {
        toast.success("Encomenda deletada com sucesso!");
      } else {
        toast.error("Não foi possível deletar a encomenda");
      }
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

                <td>
                  <Icon>
                    <button onClick={() => ToggleVisibleMenu(order.id)}>
                        <FaEllipsisH />
                    </button>
                  </Icon>
                  {visibleMenu === order.id
                    &&
                    <ActionsMenu>
                      <button>
                        <FaEye size={12} color="#7159c1"/>
                        Visualizar
                      </button>

                      <hr />

                      <button>
                        <FaPen size={12} color="#4D85EE"/>
                        <Link
                          to={{
                            pathname: "/orderform",
                            state: { order }
                          }}
                        > Editar </Link>
                      </button>

                      <hr />

                      <button
                        onClick={() => handleDelete(order.id)}
                      >
                        <FaTrash size={12} color="#DE3B3B"/>
                        Excluir
                      </button>
                    </ActionsMenu>
                  }
                </td>
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
