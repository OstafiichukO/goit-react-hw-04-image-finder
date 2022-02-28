import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { StyledOverlay, StyledModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handlerKeyDown);
    return () => {
      window.removeEventListener('keydown', handlerKeyDown);
    };
  });

  const handlerKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handlerOverlay = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <StyledOverlay onClick={handlerOverlay}>
      <StyledModal>{children}</StyledModal>
    </StyledOverlay>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
