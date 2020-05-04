import React, { useEffect, useState } from 'react';
// import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';

import { Form, Input } from '@rocketseat/unform';

import history from '~/services/history';
import api from '~/services/api';

import SelectInput from '~/components/SelectInput';

import { Container, Title, Actions, Content } from './styles';

export default function OrderForm() {
  const { state } = useLocation();

  const [deliverymans, setDeliverymans] = useState([]);
  // const [recipients, setRecipients] = useState([]);

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

  async function handleSubmit(data) {
    console.tron.log(data);
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

          <button type="submit" form="form-order" className="save">
            <FaCheck color="#FFF" size={16} />
            SALVAR
          </button>
        </Actions>
      </header>

      <Content>
        <Form
          id="form-order"
          initialData={state ? state.data : ''}
          onSubmit={handleSubmit}
        >
          <div className="contentInputs">
            <div className="selectInput">
              <label htmlFor="recipient"> Destinatário </label>
              <SelectInput name="deliveryman_id" options={deliverymans} />
            </div>
            <div className="selectInput">
              <label htmlFor="deliveyman"> Entregador </label>
              <SelectInput name="recipient_id" options={deliverymans} />
            </div>
          </div>

          <div className="inputProduct">
            <label htmlFor="product"> Nome do Produto </label>
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
