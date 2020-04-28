import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';

import { Form, Input } from '@rocketseat/unform';
import AsyncSelect from 'react-select/async';

import history from '~/services/history';
import api from '~/services/api';

import { Container, Title, Actions, Content } from './styles';

export default function OrderForm() {
  const [deliverymans, setDeliverymans] = useState([]);
  const [recipients, setRecipients] = useState([]);

  const { state } = useLocation();
  console.log(state);

  useEffect(() => {
    async function loadDeliverymans() {
      const response = await api.get('/deliverymans', {
        params: {
          page: 1,
        },
      });
      setDeliverymans(response.data);
    }

    loadDeliverymans();
  }, []);

  async function handleSubmit() {
    console.log(deliverymans);
  }

  return (
    <Container>
      <header>
        <Title>
          <strong>
            {state ? 'Edição de encomendas' : 'Cadastro de encomendas'}
          </strong>
        </Title>

        <Actions>
          <button
            type="button"
            className="back"
            onClick={() => history.push('/dashboard')}
          >
            <FaChevronLeft color="#FFF" size={16} />
            VOLTAR
          </button>

          <button type="button" className="save" onClick={handleSubmit}>
            <FaCheck color="#FFF" size={16} />
            SALVAR
          </button>
        </Actions>
      </header>

      <Content>
        <Form initialData={state ? state.data : ''}>
          <div className="contentInputs">
            <div className="selectInput">
              <label htmlFor="recipient"> Destinatário </label>
              <AsyncSelect
                defaultInputValue="Selecione uma opção"
                loadOptions={() => {}}
              />
            </div>
            <div className="selectInput">
              <label htmlFor="deliveyman"> Entregador </label>
              <AsyncSelect
                defaultInputValue="Selecione uma opção"
                loadOptions={() => {}}
              />
            </div>
          </div>

          <div className="inputProduct">
            <label htmlFor="deliveyman"> Nome do Produto </label>
            <Input
              name="product"
              className="product"
              placeholder="Nome do produto"
            />
          </div>
        </Form>
      </Content>
    </Container>
  );
}
