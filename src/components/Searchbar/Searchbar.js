import { Component } from 'react';
import { StyledSearchbar, Form, Button, Input } from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    inputValue: '',
  };
  render() {
    return (
      <>
        <StyledSearchbar>
          <Form>
            <Input placeholder="Search images and photo" />
            <Button />
          </Form>
        </StyledSearchbar>
      </>
    );
  }
}
