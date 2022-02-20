import PropTypes from 'prop-types';
import { StyledLi, StyledImg } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ images, query, onClick }) => {
  return (
    <>
      {images.map(image => {
        const { id, webformatURL } = image;
        return (
          <StyledLi key={id}>
            <StyledImg
              src={webformatURL}
              alt={query}
              id={id}
              onClick={onClick}
            />
          </StyledLi>
        );
      })}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
