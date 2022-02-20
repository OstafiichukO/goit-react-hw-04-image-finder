import { Component } from 'react';
import PropTypes from 'prop-types';
import Search from '../../components/Icons';
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
    const { onSubmit } = this.props;
    const { inputValue } = this.state;
    onSubmit(inputValue);
    this.setState({ inputValue: '' });
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({ inputValue: value });
  };

  render() {
    const { inputValue } = this.state;
    const { handlleChange, handlleSubmit } = this;
    return (
      <StyledHeader>
        <StyledForm onSubmit={handlleSubmit}>
          <StyledButton type="submit">
            <Search />
            <StyledSpan>Search</StyledSpan>
          </StyledButton>
          <StyledInput
            onChange={handlleChange}
            type="text"
            value={inputValue}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </StyledForm>
      </StyledHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
