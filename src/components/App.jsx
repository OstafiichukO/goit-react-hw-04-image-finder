import { useState } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { StyledApp } from './App.styled';

const App = () => {
  const [query, setQuery] = useState('');

  const handlerSubmit = query => {
    setQuery(query);
  };

  return (
    <StyledApp>
      <Searchbar onSubmit={handlerSubmit} />
      <ImageGallery query={query} />
    </StyledApp>
  );
};

export default App;
