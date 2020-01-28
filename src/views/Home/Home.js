import React, { useState, useEffect } from 'react';
import { Main, Aside, Content, WidgetWrapper } from './Styles';
import Widget from '../../components/Widget/Widget';
import { CategoriesService } from '../../services/CategoriesService';
import { AuthorsService } from '../../services/AuthorsService';
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
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    useEffect(()=> {
        CategoriesService({limit: 5}).then(data => {
            setCategories(Object.values(data.data));
        }).catch(e => {
            console.log('error', e)
        });

        AuthorsService({limit: 5}).then(data => {
            setAuthors(Object.values(data.data));
        }).catch(e => {
            console.log('error', e)
        });

        BooksService({limit: 10}).then(data => {
            setBooks(Object.values(data.data));
        }).catch(e => {
            console.log('error', e)
        });
    }, [])

    return (
        <Main>
            <Aside>
                <WidgetWrapper>
                    <Widget title="Categories" type="category" data={categories} />
                </WidgetWrapper>

                <WidgetWrapper>
                    <Widget title="Authors" type="author" data={authors} />
                </WidgetWrapper>
            </Aside>

            <Content>
                <ListView title="Books" type="book" data={books} />
            </Content>
        </Main>
    )
}

export default Home;