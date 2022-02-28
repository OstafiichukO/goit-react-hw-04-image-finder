import { useState, useEffect } from 'react';
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

const ImageGallery = ({ queryValue }) => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [isModal, setIsModal] = useState(false);
  const [idImage, setIdImage] = useState('');

  useEffect(() => {
    if (query !== queryValue) {
      setQuery(queryValue);
      setPage(1);
      setImages([]);
      setStatus(STATUS.PENDING);

      API(queryValue, 1)
        .then(data => {
          setImages(data.images);
          setTotalPages(data.totalPages);
          setStatus(STATUS.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setTotalPages(0);
          setStatus(STATUS.REJECTED);
        });
      return;
    }

    if (page !== 1) {
      setPage(page);
      setStatus(STATUS.PENDING);

      API(query, page)
        .then(data => {
          setImages(prev => [...prev, ...data.images]);
          setStatus(STATUS.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(STATUS.REJECTED);
        });
      return;
    }
  }, [query, queryValue, page]);

  const handlerLoadMore = page => {
    setPage(page);
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const findID = event => {
    const { id } = event.target;
    setIdImage(+id);
    toggleModal();
  };

  const findImagebyID = (() => {
    if (idImage) {
      return images.find(image => image.id === idImage);
    }
  })();

  switch (status) {
    case 'idle':
      return <StyledSpan>Fill in the input field</StyledSpan>;

    case 'pending':
      return (
        <>
          <StyledUl>
            <ImageGalleryItem images={images} alt={query} />
          </StyledUl>
          <Loader />
        </>
      );

    case 'resolved':
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
              <StyledImg src={findImagebyID.largeImageURL} alt={query} />
            </Modal>
          )}
        </>
      );

    case 'rejected':
      return <StyledSpan>{error.message}</StyledSpan>;

    default:
      return;
  }
};

export default ImageGallery;

ImageGallery.propTypes = {
  queryValue: PropTypes.string.isRequired,
};
