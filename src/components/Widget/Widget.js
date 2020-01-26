import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Header, Content, Title, UList, Link, ListItem } from './Styles';

/**
* Widget
* @type Component
* @description component to render any widget type (Books, Categories or Authors)
* @param {object} props props data to be rendered in widget
* @returns Header component
*/
const Widget = (props) => (
    <Wrapper>
        <Header>
            <Title>
                {props.title}
            </Title>
        </Header>

        <Content>
            <UList>
                {
                    props.data.map((item, key)=> (
                        <ListItem key={key}>
                            <Link to={`/${props.type}/${item.id}`} >
                                {item.name}
                            </Link>
                        </ListItem>
                    ))
                }
            </UList>
        </Content>
    </Wrapper>
)


Widget.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    data: PropTypes.array
}

export default Widget;