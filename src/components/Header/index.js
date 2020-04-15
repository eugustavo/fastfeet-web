import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '~/store/module/auth/actions';

import logo from '~/assets/logo.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut(){
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Logo Fastfeet" />
          <NavLink
            to="/orders"
            activeClassName="active"
          >
            ENCOMENDAS
          </NavLink>

          <NavLink
            to="/deliverymans"
            activeClassName="active"
          >
            ENTREGADORES
          </NavLink>

          <NavLink
            to="/recipients"
            activeClassName="active"
          >
            DESTINATÁRIOS
          </NavLink>

          <NavLink
            to="/deliveriesproblems"
            activeClassName="active"
          >
            PROBLEMAS
          </NavLink>
        </nav>

        <aside>
          <Profile>
            <strong>Admin FastFeet</strong>
            <button onClick={handleSignOut}>Sair do Sistema</button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
