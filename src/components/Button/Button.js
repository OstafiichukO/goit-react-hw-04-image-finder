import PropTypes from 'prop-types';
import { StyledDiv, StyledButton } from './Button.styled';

const Button = ({ onClick, page }) => {
  const handlleClick = () => {
    onClick(page + 1);
  };

  return (
    <StyledDiv>
      <StyledButton type="button" onClick={handlleClick}>
        Load more
      </StyledButton>
    </StyledDiv>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default Button;
