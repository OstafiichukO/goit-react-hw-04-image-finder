import { Component } from 'react';
import { GoSearch } from 'react-icons/go';
import s from './Icons.module.css';

export default class Search extends Component {
    render() {
        return (
            <>
                <GoSearch
                    className={s.search} 
                />
            </>
        );
    };
};