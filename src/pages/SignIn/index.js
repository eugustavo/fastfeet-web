import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatorio'),
  password: Yup.string().required('A senha é obrigatoria'),
});

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="Logo Fastfeet" />

        <Form schema={schema} onSubmit={handleSubmit}>
          <label htmlFor="email">SEU E-MAIL</label>
          <Input name="email" type="email" placeholder="exemplo@email.com" />

          <label htmlFor="password">SUA SENHA</label>
          <Input name="password" type="password" placeholder="*************" />

          <button type="submit">ENTRAR NO SISTEMA</button>
        </Form>
      </Content>
    </Container>
  );
}
