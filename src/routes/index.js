import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';

import Dashboard from '../pages/Dashboard';
import Deliverymans from '../pages/Deliverymans';
import DeliverymanForm from '../pages/DeliverymanForm';
import DeliveryProblems from '../pages/DeliveryProblems';
import Recipients from '../pages/Recipients';
import RecipientForm from '../pages/RecipientForm';
import OrderForm from '../pages/OrderForm';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/dashboard" component={Dashboard} />

      <Route path="/deliverymans" component={Deliverymans} />
      <Route path="/deliverymanform" component={DeliverymanForm} />
      <Route path="/deliveryproblems" component={DeliveryProblems} />

      <Route path="/recipients" component={Recipients} />
      <Route path="/recipientform" component={RecipientForm} />

      <Route path="/orderform" component={OrderForm} />
    </Switch>
  );
}
