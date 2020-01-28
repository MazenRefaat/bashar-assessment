import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Header, Content, Title, UList, Link, ListItem, EditImg, ListItemWrapper } from './Styles';
import { EditContext } from '../../App';
import editIcon from '../../assets/edit_icon.svg';

/**
* Widget
* @type Component
* @description component to render any widget type (Books, Categories or Authors)
* @param {object} props props data to be rendered in widget
* @returns Widget component
*/
const Widget = (props) => (
    
    <EditContext.Consumer>
        {({editMode}) => (
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
                                    <ListItemWrapper>
                                        <Link to={`/${props.type}/${item.id}`} >
                                            {item.name}
                                        </Link>

                                        {
                                            editMode
                                            &&
                                            <Link to={`/${props.type}/${item.id}/edit`}>
                                                <EditImg src={editIcon} alt='Edit' title='Edit' />
                                            </Link>
                                        }
                                    </ListItemWrapper>
                                </ListItem>
                            ))
                        }
                    </UList>
                </Content>
            </Wrapper>
        )}
    </EditContext.Consumer>
)


Widget.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    data: PropTypes.array
}

export default Widget;