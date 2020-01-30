import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Header, Title, Content, CardWrapper } from './Styles';
import Card from '../Card/Card';

/**
* ListView
* @type Component
* @description component to render any Lists of items
* @param {object} props props data to be rendered in list
* @returns ListView component
*/
const ListView = (props) => {
    
    return (
        <Wrapper>
            <Header>
                <Title>
                    {props.title}
                </Title>
            </Header>

            <Content>
                {
                    props.data.map((item, key)=> (
                        <CardWrapper key={key}>
                            <Card type='book' item={item} key={key}/>
                        </CardWrapper>
                    ))
                }
            </Content>
        </Wrapper>
    )
}


ListView.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    data: PropTypes.array
}

export default ListView;