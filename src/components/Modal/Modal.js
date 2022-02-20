import { StyledOverlay, StyledModal, StyledImg } from './Modal.styled';

const Modal = ({ src, alt }) => {
  return (
    <StyledOverlay>
      <StyledModal>
        <StyledImg src={src} alt={alt} />
      </StyledModal>
    </StyledOverlay>
  );
};

export default Modal;
