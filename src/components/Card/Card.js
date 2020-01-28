import React, { useState, useCallback } from 'react';
import { SkeletonWrapper } from '../../styles/Styles';
import { Wrapper, Title, ImgWrapper, Img, Content, TitleWrapper, DescriptionWrapper, Description, NavLink, EditImg } from './Styles';
import bookImg from '../../assets/book_fallback.png';
import { EditContext } from '../../App';
import editIcon from '../../assets/edit_icon.svg';
import { Link } from 'react-router-dom';

/**
* Card
* @type Component
* @description component to render given data
* @param {object} props props data to be rendered in card
* @returns Card component
*/

const Card = (props) => {
    const [imgStatus, setImageStatus] = useState('loading');

    const _handleImgStatusChange = useCallback((status) => {
        setImageStatus(status)
    },[]);

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
                    <Img
                        src={imgStatus === 'loadError' ? bookImg : props.item.image } 
                        title={props.item.title} 
                        alt={props.item.title} 
                        onError={
                            () => _handleImgStatusChange('loadError')
                        }
                        onLoad={
                            () => _handleImgStatusChange('loaded')
                        }
                    /> 
                    {
                        imgStatus === 'loading'
                        &&
                        <SkeletonWrapper />
                    }
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

export default Card;