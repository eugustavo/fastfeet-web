/* eslint-disable no-alert */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '~/services/api';

import { ActionsMenu } from './styles';

import InformationModal from '~/components/Modal';

export default function ActionsToggleMenu({
  data,
  view,
  edit,
  editLink,
  del,
  delLink,
  cancel,
}) {
  const [toggleModal, setToggleModal] = useState(false);
  console.tron.log(`/${delLink}/${data.id}`);

  async function handleDelete(id) {
    if (delLink) {
      const confirm = window.confirm(
        `Você realmente deseja excluir ${
          data.name ? `${data.name}` : `a entrega de ${data.product}`
        }`
      );

      try {
        if (confirm) {
          console.tron.log(`/${delLink}/${id}`);
          const response = await api.delete(`/${delLink}/${id}`);

          if (response.status === 200) {
            toast.success('Deletado com sucesso!');
          } else {
            toast.error('Não foi possível deletar');
          }
        }
      } catch (err) {
        console.tron.log(err);
        toast.error('Não foi possível deletar');
      }
    } else {
      const confirm = window.confirm(
        `Você realmente deseja cancelar a encomenda?`
      );

      try {
        if (confirm) {
          const response = await api.delete(`/problem/${id}/cancel-delivery`);

          if (response.status === 200) {
            toast.success('Encomenda cancelada com sucesso!');
          } else {
            toast.error('Não foi possível cancelar a encomenda');
          }
        }
      } catch (err) {
        console.tron.log(err);
        toast.error('Não foi possível cancelar a encomenda');
      }
    }
  }

  function handleToggleModal() {
    setToggleModal(!toggleModal);
  }

  return (
    <ActionsMenu>
      {view ? (
        <>
          <button type="button" onClick={handleToggleModal}>
            <FaEye size={12} color="#7159c1" />
            Visualizar
          </button>
          <hr />
        </>
      ) : (
        ''
      )}

      {edit ? (
        <>
          <button type="button">
            <FaPen size={12} color="#4D85EE" />
            <Link
              to={{
                pathname: `/${editLink}`,
                state: { data },
              }}
            >
              Editar
            </Link>
          </button>
          <hr />
        </>
      ) : (
        ''
      )}

      {del ? (
        <button type="button" onClick={() => handleDelete(data.id)}>
          <FaTrash size={12} color="#DE3B3B" />
          Excluir
        </button>
      ) : (
        ''
      )}

      {cancel ? (
        <button type="button" onClick={() => handleDelete(data.id)}>
          <FaTrash size={12} color="#DE3B3B" />
          Cancelar
        </button>
      ) : (
        ''
      )}

      {toggleModal ? <InformationModal open data={data} /> : ''}
    </ActionsMenu>
  );
}

ActionsToggleMenu.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    delivery_id: PropTypes.number,
    product: PropTypes.string,
    name: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    recipient: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      street: PropTypes.string,
      street_number: PropTypes.number,
      city: PropTypes.string,
      state: PropTypes.string,
      zipcode: PropTypes.string,
    }),
    deliveryman: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }).isRequired,

  view: PropTypes.bool,
  edit: PropTypes.bool,
  del: PropTypes.bool,
  cancel: PropTypes.bool,
  editLink: PropTypes.string,
  delLink: PropTypes.string,
};

ActionsToggleMenu.defaultProps = {
  view: false,
  edit: false,
  del: false,
  cancel: false,
  editLink: '',
  delLink: '',
};
