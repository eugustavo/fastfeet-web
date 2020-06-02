import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Dashboard from '~/pages/Dashboard';

import Deliverymans from '~/pages/Deliverymans';
import DeliverymanForm from '~/components/DeliverymanForm';

import DeliveryProblems from '~/pages/DeliveryProblems';

import Recipients from '~/pages/Recipients';
import RecipientForm from '~/components/RecipientForm';

import OrderForm from '~/components/OrderForm';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/dashboard" component={Dashboard} isPrivate />

      <Route path="/deliverymans" component={Deliverymans} isPrivate />
      <Route path="/deliverymanform" component={DeliverymanForm} isPrivate />
      <Route
        path="/deliveriesproblems"
        component={DeliveryProblems}
        isPrivate
      />

      <Route path="/recipients" component={Recipients} isPrivate />
      <Route path="/recipientform" component={RecipientForm} isPrivate />

      <Route path="/orderform" component={OrderForm} isPrivate />

      <Route path="/" component={() => <h1>404 - Page not found</h1>} />
    </Switch>
  );
}
