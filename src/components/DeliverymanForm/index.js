import React from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import history from '~/services/history';
import api from '~/services/api';

import AvatarInput from './AvatarInput';

import { Container, Title, Actions, Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatorio'),
});

export default function DeliverymanForm() {
  const { state } = useLocation();
  console.tron.log(state);

  async function handleSubmit(data) {
    const avatar_id = state
      ? state.data.avatar
        ? state.data.avatar.id
        : Number(data.avatar_id)
      : Number(data.avatar_id);

    if (state) {
      const { id } = state.data;
      const { name, email } = data;

      try {
        await api.put(`deliverymans/${id}`, { name, email, avatar_id });
        toast.success('Entregador alterado com sucesso!');
      } catch (err) {
        console.tron.log(err);
        toast.error('Não foi possivel alterar os dados do entregador');
      }
    } else {
      const { name, email } = data;

      try {
        await api.post('deliverymans', { name, email, avatar_id });
        toast.success('Entregador cadastrado com sucesso!');
      } catch (err) {
        console.tron.log(err);
        toast.error(
          'Não foi possivel cadastrar entregador, por favor, revise os dados'
        );
      }
    }
  }

  return (
    <Container>
      <header>
        <Title>
          <strong>
            {state ? 'Edição de entregador' : 'Cadastro de entregadores'}
          </strong>
        </Title>

        <Actions>
          <button
            type="button"
            className="back"
            onClick={() => history.push('/deliverymans')}
          >
            <FaChevronLeft color="#FFF" size={16} />
            VOLTAR
          </button>

          <button type="submit" form="form-deliveryman" className="save">
            <FaCheck color="#FFF" size={16} />
            SALVAR
          </button>
        </Actions>
      </header>

      <Content>
        <Form
          id="form-deliveryman"
          initialData={state ? state.data : ''}
          onSubmit={handleSubmit}
          schema={schema}
        >
          <AvatarInput name="avatar_id" />

          <label htmlFor="name"> Nome </label>
          <Input name="name" placeholder="Nome completo" />

          <label htmlFor="email"> Email </label>
          <Input name="email" type="email" placeholder="Endereço de e-mail" />
        </Form>
      </Content>
    </Container>
  );
}
