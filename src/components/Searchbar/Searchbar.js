import { Component } from 'react';
import PropTypes from 'prop-types';
import Search from '../Icons';
import {
  StyledHeader,
  StyledForm,
  StyledButton,
  StyledSpan,
  StyledInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handlerSubmit = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { inputValue } = this.state;
    onSubmit(inputValue);
    this.setState({ inputValue: '' });
  };

  handlerChange = event => {
    const { value } = event.target;
    this.setState({ inputValue: value });
  };

  render() {
    const { inputValue } = this.state;
    const { handlerChange, handlerSubmit } = this;
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
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
