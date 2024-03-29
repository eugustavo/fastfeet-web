import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { Input, Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import history from '~/services/history';
import api from '~/services/api';
import SelectInput from './SelectInput';

import { Container, Title, Actions, Content } from './styles';

const schema = Yup.object().shape({
  product: Yup.string().required('É obrigatório informar o Produto'),
  recipient: Yup.array().required('É obrigatório informar um Destinatário'),
  deliveryman: Yup.array().required('É obrigatório informar um Entregador'),
});

export default function OrderForm() {
  const { state } = useLocation();

  const [deliverymans, setDeliverymans] = useState([]);
  const [recipients, setRecipients] = useState([]);

  async function loadDeliverymans() {
    const response = await api.get('deliverymans', {
      params: {
        page: 1,
      },
    });

    const { data } = response;

    if (data) {
      return setDeliverymans(
        data.map((deliveryman) => ({
          value: deliveryman.id,
          label: deliveryman.name,
        }))
      );
    }
    return setDeliverymans(data);
  }
  async function loadRecipients() {
    const response = await api.get('recipients', {
      params: {
        page: 1,
      },
    });

    const { data } = response;

    if (data) {
      return setRecipients(
        data.map((recipient) => ({
          value: recipient.id,
          label: recipient.name,
        }))
      );
    }
    return setRecipients(data);
  }

  useEffect(() => {
    loadDeliverymans();
    loadRecipients();
  }, []);

  async function handleSubmit(data, { resetForm }) {
    if (state) {
      let recipient;
      let deliveryman;
      const { id } = state.data;
      const { product } = data;

      if (data.recipient) {
        recipient = data.recipient.value;
      } else {
        recipient = state.data.recipient.id;
      }
      if (data.deliveryman) {
        deliveryman = data.deliveryman.value;
      } else {
        deliveryman = state.data.deliveryman.id;
      }

      try {
        const response = await api.put(`/edit-order/${id}`, {
          deliveryman_id: deliveryman,
          recipient_id: recipient,
          product,
        });

        if (response.status === 200) {
          toast.success('Encomenda alterada com sucesso');
        } else {
          toast.error(response.error);
        }
      } catch (err) {
        console.tron.log(err);
        toast.error('Não foi possível alterar sua encomenda');
      }
    } else {
      const { deliveryman, recipient, product } = data;
      try {
        const response = await api.post('orders', {
          deliveryman_id: deliveryman.value,
          recipient_id: recipient.value,
          product,
        });

        if (response.status === 200) {
          toast.success('Encomenda cadastrada com sucesso');
        } else {
          toast.error('Não foi possível cadastrar a encomenda');
        }
      } catch (err) {
        console.tron.log(err);
        toast.error('Não foi possível cadastrar a encomenda');
      }
    }
    resetForm();
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
          schema={schema}
        >
          <div className="contentInputs">
            <div className="selectInput">
              <SelectInput
                name="recipient"
                label="Destinatário"
                placeholder="Selecione um destinatário"
                options={recipients}
                EditActive={
                  state
                    ? state.data.recipient
                      ? state.data.recipient.name
                      : ''
                    : ''
                }
              />
            </div>
            <div className="selectInput">
              <SelectInput
                name="deliveryman"
                label="Entregador"
                placeholder="Selecione um entregador"
                options={deliverymans}
                EditActive={
                  state
                    ? state.data.deliveryman
                      ? state.data.deliveryman.name
                      : ''
                    : ''
                }
              />
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
