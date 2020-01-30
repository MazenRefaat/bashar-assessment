import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Header, Title, Content, CardWrapper, PaginationList, PaginationItem } from './Styles';
import Card from '../Card/Card';
/**
* ListView
* @type Component
* @description component to render any Lists of items
* @param {object} props props data to be rendered in list
* @returns ListView component
*/
const ListView = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    let pages = Array.from({length: props.data.length/5}, (v, k)=> k+1);

    const _handlePagination = useCallback((e, pageNum)=> {
        e.preventDefault();
        setCurrentPage(pageNum);
    }, [])

    return (
        <Wrapper>
            <Header>
                <Title>
                    {props.title}
                </Title>
            </Header>

            <Content>
                {
                    props.data.slice(pageSize*(currentPage-1), pageSize*(currentPage-1)+ pageSize).map((item, key)=> (
                        <CardWrapper key={key}>
                            <Card type='book' item={item} key={key}/>
                        </CardWrapper>
                    ))
                }
            </Content>


            <PaginationList>
                {
                    pages.map((item, key)=> (
                        <PaginationItem  key={key}>
                            <a onClick={(e)=>_handlePagination(e, item)} href='/'>{item}</a>
                        </PaginationItem>
                    ))
                }
            </PaginationList>
        </Wrapper>
    )
}


ListView.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    data: PropTypes.array
}

export default ListView;