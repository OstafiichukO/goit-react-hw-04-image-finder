import { Bars } from 'react-loader-spinner';
import { StyledLoader } from './Loader.styled';

const Loader = () => {
  return (
    <StyledLoader>
      <Bars color="#20232a" height={40} width={40} />
    </StyledLoader>
  );
};

export default Loader;
