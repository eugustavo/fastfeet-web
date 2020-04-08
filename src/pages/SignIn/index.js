import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/module/auth/actions';

import logo from '~/assets/logo.svg';
import deliveryAnimation from '~/assets/animation/delivery.gif';
import { Container, Content, Loading } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatorio'),
  password: Yup.string().required('A senha é obrigatoria'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <Content>
        {loading ? (
          <Loading>
            <img src={deliveryAnimation} alt="Delivery Animation" />
          </Loading>
        ) : (
          <>
            <img src={logo} alt="Logo Fastfeet" />

            <Form schema={schema} onSubmit={handleSubmit}>
              <label htmlFor="email">SEU E-MAIL</label>
              <Input
                name="email"
                type="email"
                placeholder="exemplo@email.com"
              />

              <label htmlFor="password">SUA SENHA</label>
              <Input
                name="password"
                type="password"
                placeholder="*************"
              />

              <button type="submit">
                {loading ? 'Carregando...' : 'ENTRAR NO SISTEMA'}
              </button>
            </Form>
          </>
        )}
      </Content>
    </Container>
  );
}
