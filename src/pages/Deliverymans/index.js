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
 } from './styles';

export default function Deliverymans() {
  const [deliverymans, setDeliverymans] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadDeliverymans(){
      const response = await api.get('/deliverymans', {
        params: {
          page
        }
      });
      setDeliverymans(response.data);
      console.log(response.data);
    }

    loadDeliverymans();
  }, [page]);

  function handlePage(action) {
    setPage( action === 'back' ? page - 1 : page + 1 );
  }

  async function filterDeliveryman(search) {
    const response = await api.get('/deliverymans', {
      params: {
        page,
        findDeliveryman: search
      }
    });
    setDeliverymans(response.data);
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
            onChange={e => filterDeliveryman(e.target.value)}
          />
        </Search>

        <button onClick={() => history.push('/deliverymanform')}>
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
            {deliverymans.map(deliveryman => (
              <tr key={deliveryman.id}>
                <td>#{deliveryman.id}</td>

                <td>
                  <div>
                    {deliveryman.avatar
                      ? <img src={deliveryman.avatar.url} alt="Avatar" />
                      : <Avatar
                          name={deliveryman.name}
                          maxInitials={2}
                          size="32"
                          round={true}
                        />
                    }
                  </div>
                </td>

                <td>{deliveryman.name}</td>
                <td>{deliveryman.email}</td>
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
