import { Component } from 'react';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';

export default class App extends Component {
  state = {
    query: '',
  };

  handleSubmit = query => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;
    const handleSubmit = this;
    return (
      <>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery query={query} />
      </>
    );
  }
}
