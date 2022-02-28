import { useState } from 'react';
import PropTypes from 'prop-types';
import Search from '../Icons';
import {
  StyledHeader,
  StyledForm,
  StyledButton,
  StyledSpan,
  StyledInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handlerSubmit = event => {
    event.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
  };

  const handlerChange = event => {
    const { value } = event.target;
    setInputValue(value);
  };

  return (
    <>
      <StyledHeader>
        <StyledForm onSubmit={handlerSubmit}>
          <StyledButton type="submit">
            <Search />
            <StyledSpan>Search</StyledSpan>
          </StyledButton>
          <StyledInput
            onChange={handlerChange}
            type="text"
            value={inputValue}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </StyledForm>
      </StyledHeader>
    </>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
