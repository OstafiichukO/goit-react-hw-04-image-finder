import { Bars } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
    return (
        <div className={s.loader}>
            <Bars
                color="#00BFFF"
                height={40}
                width={40} 
            />
        </div>
    );
};

export default Loader;