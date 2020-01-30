import React, { useState, useEffect } from 'react';
import { Wrapper } from './Styles';
import { BooksService } from '../../services/BooksService';
import ListView from '../../components/ListView/ListView';

/**
 * Home
 * @type View Component
 * @description view component to render books
 * @returns Home component
 */

const Home = () => {
    const [books, setBooks] = useState([]);
    useEffect(()=> {
        BooksService({limit: 20}).then(data => {
            setBooks(Object.values(data.data));
        }).catch(e => {
            console.log('error', e)
        });
        
    }, [])

    return (
        <Wrapper>
            <ListView title="Books" type="book" data={books} />
        </Wrapper>
    )
}

export default Home;