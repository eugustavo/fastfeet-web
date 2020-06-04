import React from 'react';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import { useLocation } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { Container, Title, Actions, Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('É obrigatório informar o nome do destinatário'),
  street: Yup.string().required('É obrigatório informar o nome do rua'),
  street_number: Yup.string().required(
    'É obrigatório informar o número do rua'
  ),
  complement: Yup.string().required('É obrigatório informar o complemento'),
  city: Yup.string().required('É obrigatório informar o nome da cidade'),
  state: Yup.string().required('É obrigatório informar as siglas da estado'),
  zipcode: Yup.string().required('É obrigatório informar o CEP'),
});

export default function RecipientForm() {
  const { state } = useLocation();
  const id = state ? state.data.id : null;

  async function handleSubmit(data, { resetForm }) {
    console.tron.log(data);
    const { name, street, complement, city, state, zipcode } = data;
    const street_number = Number(data.street_number);

    if (id) {
      try {
        await api.put(`recipients/${id}`, {
          name,
          street,
          street_number,
          complement,
          city,
          state,
          zipcode,
        });
        toast.success('Destinatário alterado com sucesso!');
      } catch (err) {
        console.tron.log(err);
        toast.error('Não foi possivel alterar os dados de destinatário');
      }
    } else {
      try {
        await api.post('recipients', {
          name,
          street,
          street_number,
          complement,
          city,
          state,
          zipcode,
        });
        toast.success('Destinatário cadastrado com sucesso!');
      } catch (err) {
        console.tron.log(err);
        toast.error(
          'Não foi possivel cadastrar destinatário, por favor, revise os dados'
        );
      }
    }
    resetForm();
  }

  return (
    <Container>
      <header>
        <Title>
          <strong>
            {state ? 'Edição de destinatário' : 'Cadastro de destinatário'}
          </strong>
        </Title>

        <Actions>
          <button
            type="button"
            className="back"
            onClick={() => history.push('/recipients')}
          >
            <FaChevronLeft color="#FFF" size={16} />
            VOLTAR
          </button>

          <button type="submit" form="form-recipient" className="save">
            <FaCheck color="#FFF" size={16} />
            SALVAR
          </button>
        </Actions>
      </header>

      <Content>
        <Form
          id="form-recipient"
          initialData={state ? state.data : ''}
          onSubmit={handleSubmit}
          schema={schema}
        >
          <label htmlFor="name"> Nome </label>
          <Input name="name" placeholder="Nome completo" />

          <div className="info">
            <div className="info_align_street">
              <label htmlFor="street"> Rua </label>
              <Input name="street" placeholder="Nome da rua" />
            </div>

            <div className="info_align">
              <label htmlFor="street_number"> Número </label>
              <Input
                name="street_number"
                type="number"
                placeholder="Número da rua"
              />
            </div>

            <div className="info_align">
              <label htmlFor="complement"> Complemento </label>
              <Input name="complement" placeholder="Exemplo: Casa" />
            </div>
          </div>

          <div className="info">
            <div className="info_align_city">
              <label htmlFor="city"> Cidade </label>
              <Input name="city" placeholder="Nome da sua cidade" />
            </div>

            <div className="info_align_city">
              <label htmlFor="state"> Estado </label>
              <Input
                name="state"
                placeholder="Nome do seu estado"
                className="inputState"
                maxLength="2"
              />
            </div>

            <div className="info_align_city">
              <label htmlFor="zipcode"> CEP </label>
              <InputMask mask="99999-999">
                <Input name="zipcode" placeholder="CEP da sua cidade" />
              </InputMask>
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
