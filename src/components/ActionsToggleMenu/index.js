import React from 'react';
import { toast } from 'react-toastify';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '~/services/api';

import { ActionsMenu } from './styles';

export default function ActionsToggleMenu({
  data,
  view,
  edit,
  editLink,
  del,
  delLink,
  cancel,
}) {
  async function handleDelete(id) {
    const confirm = window.confirm(
      `Você realmente deseja excluir ${
        data.name ? `${data.name}` : `a entrega de ${data.product}`
      }`
    );

    if (confirm) {
      const response = await api.delete(`/${delLink}/${id}`);

      if (response.status === 200) {
        toast.success('Deletado com sucesso!');
      } else {
        toast.error('Não foi possível deletar');
      }
    }
  }
  return (
    <ActionsMenu>
      {view ? (
        <>
          <button type="button" onClick={() => {}}>
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
    </ActionsMenu>
  );
}

ActionsToggleMenu.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
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
