import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { StyledApp } from './App.styled';

export default class App extends Component {
  state = {
    query: '',
  };

  handlerSubmit = query => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;
    const { handlerSubmit } = this;

    return (
      <StyledApp>
        <Searchbar onSubmit={handlerSubmit} />
        <ImageGallery query={query} />
      </StyledApp>
    );
  }
}
