import React from 'react';
import { SkeletonWrapper } from '../../styles/Styles';
import { Wrapper, Title, ImgWrapper, Content, TitleWrapper, DescriptionWrapper, Description, NavLink, EditImg } from './Styles';
import { EditContext } from '../../App';
import editIcon from '../../assets/edit_icon.svg';
import { Link } from 'react-router-dom';
import Image from '../Image/Image';
import PropTypes from 'prop-types';

/**
* Card
* @type Component
* @description component to render given data
* @param {object} props props data to be rendered in card
* @returns Card component
*/

const Card = (props) => {
    return(
        <EditContext.Consumer>
            {({editMode}) => (
            <Wrapper>
                {
                    !editMode 
                    &&
                    <NavLink to={`/${props.type}/${props.item.id}`} />
                }
                <ImgWrapper>
                    <Image src={props.item.image} title={props.item.title}/>
                </ImgWrapper>

                <Content>
                    <TitleWrapper>
                        {
                            props.item.title
                            ?
                                <Title>
                                    {props.item.title}
                                </Title>
                            :
                            <SkeletonWrapper />
                        }
                        {
                            editMode
                            &&
                            <Link to={`/${props.type}/${props.item.id}/edit`}>
                                <EditImg src={editIcon} alt='Edit' title='Edit' />
                            </Link>
                        }
                    </TitleWrapper>

                    <DescriptionWrapper>
                        {
                            props.item.title
                            ?
                                <Description>
                                    {
                                        props.item.description.length > 200
                                        ?
                                        props.item.description.substring(0, 200) + '...'
                                        :
                                        props.item.description
                                    }
                                </Description>
                            :
                            <SkeletonWrapper />
                        }
                    </DescriptionWrapper>
                </Content>
            </Wrapper>
            )}
        </EditContext.Consumer>
    )
}

Card.propTypes = {
    item: PropTypes.object,
    type: PropTypes.string
}

export default Card;