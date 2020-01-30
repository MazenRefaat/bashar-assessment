import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Header, Content, Title, UList, Link, ListItem, ListItemWrapper } from './Styles';
import { FetchDataService } from '../../services/DataService';

/**
* Widget
* @type Component
* @description component to render any widget type (Books, Categories or Authors)
* @param {object} props props data to be rendered in widget
* @returns Widget component
*/
const Widget = (props) => {
    const [items, setItems] = useState([])

    useEffect(()=> {
        FetchDataService({type: props.title.toLowerCase()}).then(res => {
            setItems(Object.values(res.data))
        }).catch(e => {
            console.log('error', e);
        })
    }, [props.title])

    return (
        <Wrapper>
            <Header>
                <Title>
                    {props.title}
                </Title>
            </Header>

            <Content>
                <UList>
                    {
                        items.map((item, key)=> (
                            <ListItem key={key}>
                                <ListItemWrapper>
                                    <Link to={`/${props.type}/${item.id}`} >
                                        {item.name}
                                    </Link>
                                </ListItemWrapper>
                            </ListItem>
                        ))
                    }
                </UList>
            </Content>
        </Wrapper>
    )
}


Widget.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    data: PropTypes.array
}

export default Widget;