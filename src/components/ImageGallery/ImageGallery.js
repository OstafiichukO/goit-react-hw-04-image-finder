import { Component } from 'react';
import { StyledUl } from './ImageGallery.styled';

export default class ImageGallery extends Component {
  state = {
    query: '',
    images: [],
    error: null,
  };
  render() {
    return <StyledUl class="gallery"></StyledUl>;
  }
}
