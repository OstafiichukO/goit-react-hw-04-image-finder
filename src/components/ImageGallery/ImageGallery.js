import { Component } from 'react';
import PropTypes from 'prop-types';

import API from '../../services/API';

import ImageGalleryItem from './ImageGalleryItem';
import Loader from '../Loader';
import Modal from '../Modal';
import Button from '../Button';

import { StyledUl, StyledSpan, StyledImg } from './ImageGallery.styled';

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

  handlerLoadMore = page => {
    this.setState({ page });
  };

  toggleModal = () => {
    const { isModal } = this.state;
    this.setState({ isModal: !isModal });
  };

  findID = event => {
    const { id } = event.target;
    this.setState({ idImage: +id });
    this.toggleModal();
  };

  findImagebyID = () => {
    const { images, idImage } = this.state;
    if (idImage) {
      return images.find(image => image.id === idImage);
    }
  };

  render() {
    const { images, query, page, totalPages, status, error, isModal } =
      this.state;
    const { handlerLoadMore, toggleModal, findID } = this;
    const findedImage = this.findImagebyID();

    if (status === 'idle') {
      return <StyledSpan>Fill in the input field</StyledSpan>;
    }

    if (status === 'pending') {
      return (
        <>
          <StyledUl>
            <ImageGalleryItem images={images} alt={query} />
          </StyledUl>
          <Loader />
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <StyledUl>
            <ImageGalleryItem images={images} alt={query} onClick={findID} />
          </StyledUl>
          {totalPages !== page ? (
            <Button onClick={handlerLoadMore} page={page} />
          ) : (
            <StyledSpan>
              On request "{query}" all search results are shown
            </StyledSpan>
          )}
          {isModal && (
            <Modal onClose={toggleModal}>
              <StyledImg src={findedImage.largeImageURL} alt={query} />
            </Modal>
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return <StyledSpan>{error.message}</StyledSpan>;
    }
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
