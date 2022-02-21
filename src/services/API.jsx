import axios from 'axios';

const KEY = '25016497-6e844d2237e7dc6bdc93b7c9e';
const IMAGE_TYPE = 'image_type';
const ORIENTATION = 'horizontal';
const PER_PAGE = 12;

const PixabayAPI = (query, page) => {
  const params = {
    q: query,
    page: page,
    key: KEY,
    image_type: IMAGE_TYPE,
    orientation: ORIENTATION,
    per_page: PER_PAGE,
  };

  return axios
    .get('https://pixabay.com/api/', { params: { ...params } })
    .then(response => {
      if (response.data.totalHits) {
        return {
          totalPages: Math.ceil(response.data.totalHits / PER_PAGE),
          images: response.data.hits.map(image => {
            const { id, webformatURL, largeImageURL } = image;
            return { id, webformatURL, largeImageURL };
          }),
        };
      }

      return Promise.reject(new Error(`No images found for "${query}"`));
    });
};

export default PixabayAPI;
