import React, { useState, useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import { Content } from './styles';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
};

Modal.setAppElement(document.getElementById('root'));

export default function InformationModal({ open, data }) {
  const [toggleModal, setToggleModal] = useState(false);
  const [recipient, setRecipient] = useState([]);
  const [date, setDate] = useState([]);
  console.tron.log(data);

  useEffect(() => {
    if (open) {
      setToggleModal(open);
    }
    setRecipient(data.recipient);
    formattedDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function formattedDate() {
    let formattedStart;
    let formattedEnd;

    if (data.start_date)
      formattedStart = format(parseISO(data.start_date), 'dd/MM/yyyy');

    if (data.end_date)
      formattedEnd = format(parseISO(data.end_date), 'dd/MM/yyyy');

    setDate({ formattedStart, formattedEnd });
  }

  function ToggleModal() {
    setToggleModal(!toggleModal);
  }

  return (
    <div>
      <Modal
        isOpen={toggleModal}
        onRequestClose={ToggleModal}
        style={customStyles}
      >
        <Content>
          {data.description ? (
            <>
              <strong>Visualizar problema</strong>
              <div className="problem">
                <span>{data.description}</span>
              </div>
            </>
          ) : (
            <>
              <strong>Informações da encomenda</strong>
              <div className="order">
                <span>
                  {recipient.street}, {recipient.street_number}
                </span>
                <span>
                  {recipient.city} - {recipient.state}
                </span>
                <span>{recipient.zipcode}</span>
              </div>

              <strong>Datas</strong>
              <div className="date">
                <strong>
                  {' '}
                  Retirada:{' '}
                  <span>
                    {data.start_date
                      ? date.formattedStart
                      : 'Ainda não foi retirada'}
                  </span>{' '}
                </strong>

                <strong>
                  {' '}
                  Entrega:{' '}
                  <span>
                    {data.end_date
                      ? date.formattedEnd
                      : date.formattedStart
                      ? 'Em rota'
                      : 'Ainda não foi retirada'}
                  </span>{' '}
                </strong>
              </div>

              <strong>Assinatura do destinatário</strong>
              <div className="signature">
                {data.signature ? (
                  <img src={data.signature.url} alt="Signature" />
                ) : (
                  ''
                )}
              </div>
            </>
          )}
        </Content>
      </Modal>
    </div>
  );
}

InformationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    product: PropTypes.string,
    description: PropTypes.string,
    signature: PropTypes.string,
    recipient: PropTypes.shape({
      street: PropTypes.string,
      street_number: PropTypes.number,
      city: PropTypes.string,
      state: PropTypes.string,
      zipcode: PropTypes.string,
    }),
  }),
};

InformationModal.defaultProps = {
  data: [],
};

ReactDOM.render(<InformationModal />, document.getElementById('root'));
