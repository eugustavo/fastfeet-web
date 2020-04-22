import React from 'react';
import { useLocation } from 'react-router-dom';

// import { Container } from './styles';

export default function OrderForm() {
  let {state} = useLocation();
  console.log(state);

  return (
    <h1>
      {state ? state.order.product : 'Cadastrar nova encomenda'}
    </h1>
  );
}
