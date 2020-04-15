import React, {useState, useEffect} from 'react';
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

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadRecipients(){
      const response = await api.get('/recipients', {
        params: {
          page
        }
      });
      setRecipients(response.data);
      console.log(response.data);
    }

    loadRecipients();
  }, [page]);

  function handlePage(action) {
    setPage( action === 'back' ? page - 1 : page + 1 );
  }

  async function filterRecipient(search) {
    const response = await api.get('/recipients', {
      params: {
        page,
        findRecipient: search
      }
    });
    setRecipients(response.data);
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
            onChange={e => filterRecipient(e.target.value)}
          />
        </Search>

        <button onClick={() => history.push('/recipientform')}>
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
            {recipients.map(recipient => (
              <tr key={recipient.id}>
                <td>#{recipient.id}</td>
                <td>{recipient.name}</td>
                <td>
                  {recipient.street},{" "}
                  {recipient.street_number},{" "}
                  {recipient.city} - {" "}
                  {recipient.state}
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
