import React, { useState, useEffect } from 'react';
import { Wrapper, Label } from './Styles';
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
    const [sortedBooks, setSortedBooks] = useState([]);

    useEffect(()=> {
        BooksService({limit: 20}).then(data => {
            setBooks(Object.values(data.data));
            setSortedBooks(Object.values(data.data));
        }).catch(e => {
            console.log('error', e)
        });
        
    }, [])

    const _handleSort = (e) => {
        const sortBy = e.target.value;
        if(sortBy === ''){
            setSortedBooks(books);
        } 
        else {
            let sortedBooks = books.sort((bookA, bookB)=>{
                if(bookA[sortBy] < bookB[sortBy]) return -1;
                if(bookA[sortBy] > bookB[sortBy]) return 1;
                return 0;
            })

            setSortedBooks(sortedBooks);
        }
    }
    
    return (
        <React.Fragment>
             <Label>
                Sort By
                <select
                    onChange={_handleSort}
                >
                    <option value=''>None</option>
                    <option value='title'>Title</option>
                </select>
            </Label>

            <Wrapper>
                <ListView title="Books" type="book" data={sortedBooks} />
            </Wrapper>
        </React.Fragment>
    )
}

export default Home;