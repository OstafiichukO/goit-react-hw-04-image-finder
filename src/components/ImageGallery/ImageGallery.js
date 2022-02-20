import { Component } from 'react';
import PropTypes from 'prop-types';
import API from 'services/API';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import Button from 'components/Button';
import { StyledUl } from './ImageGallery.styled';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalPages: 0,
    error: null,
    status: STATUS.IDLE,
    isModal: false,
    idImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const queryPrev = prevProps.query;
    const pagePrev = prevState.page;
    const imagesPrev = prevState.images;
    const queryNext = this.props.query;
    const pageNext = this.state.page;
    const queryPrevEd = queryPrev.replace(/\s+/g, ' ').trim().toLowerCase();
    const queryNextEd = queryNext.replace(/\s+/g, ' ').trim().toLowerCase();

    if (queryPrevEd !== queryNextEd) {
      const firstPage = 1;
      this.setState({
        query: queryNext,
        page: firstPage,
        images: [],
        status: STATUS.PENDING,
      });

      API(queryNext, firstPage)
        .then(data => {
          const { images, totalPages } = data;
          this.setState({ images, totalPages, status: STATUS.RESOLVED });
        })
        .catch(error =>
          this.setState({ error, totalPages: 0, status: STATUS.REJECTED })
        );
    }

    if (pagePrev !== pageNext && pageNext !== 1) {
      this.setState({ page: pageNext, status: STATUS.PENDING });

      API(queryNext, pageNext)
        .then(data => {
          const { images } = data;
          this.setState({
            images: [...imagesPrev, ...images],
            status: STATUS.RESOLVED,
          });
        })
        .catch(error => this.setState({ error, status: STATUS.REJECTED }));
    }
  }

  render() {
    return <StyledUl class="gallery"></StyledUl>;
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
