import React, { useState, useEffect } from 'react';
import { Main, Aside, Content, WidgetWrapper } from './Styles';
import Widget from '../../components/Widget/Widget';
import { CategoriesService } from '../../services/CategoriesService';
import { AuthorsService } from '../../services/AuthorsService';

/**
 * Home
 * @type View Component
 * @description view component to render books
 * @returns Home component
 */

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    useEffect(()=> {
        CategoriesService({limit: 5}).then(data => {
            setCategories(Object.values(data.data));
        });

        AuthorsService({limit: 5}).then(data => {
            setAuthors(Object.values(data.data));
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
                Books List
            </Content>
        </Main>
    )
}

export default Home;