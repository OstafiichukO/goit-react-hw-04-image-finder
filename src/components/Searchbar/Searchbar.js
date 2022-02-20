import { Component } from 'react';
import PropTypes from 'prop-types';
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

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  render() {
    const { inputValue } = this.state;
    const { handlleChange, handlleSubmit } = this;
    return (
      <StyledHeader>
        <StyledForm onSubmit={handlleSubmit}>
          <StyledButton type="submit">
            <StyledSpan class="button-label">Search</StyledSpan>
          </StyledButton>

          <StyledInput
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={handlleChange}
            value={inputValue}
          />
        </StyledForm>
      </StyledHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
