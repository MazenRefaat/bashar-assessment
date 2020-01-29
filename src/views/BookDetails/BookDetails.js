import React, { useEffect, useState } from 'react';
import { Content, InfoWrapper, TitleWrapper, Title, EditImg, InfoItem, Label, InfoImgWrapper, ImgWrapper, DescriptionWrapper,Description } from './Styles';
import { FetchBookDetailsService } from '../../services/BooksService';
import { SkeletonWrapper } from '../../styles/Styles';
import Image from '../../components/Image/Image';
import { EditContext } from '../../App';
import { Link } from 'react-router-dom';
import editIcon from '../../assets/edit_icon.svg';

/**
* BookDetails
* @type View Component
* @description view to render Book Details
* @param {object} props component props
* @returns BookDetails Component
*/
const BookDetails = (props) => {
    const [book, setBook] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const { id } = props.match.params;
    useEffect(()=> {
        setIsLoading(true);
        FetchBookDetailsService(id).then(res => {
            setIsLoading(false);
            setBook(Object.values(res.data)[0])
        }).catch(e => {
            console.log('error', e)
        })
    },[id])

    return(
        <EditContext.Consumer>
        {({editMode}) => (
            <Content>
                <InfoImgWrapper>
                    <InfoWrapper>
                        <TitleWrapper>
                        {
                            isLoading
                            ?
                            <SkeletonWrapper />
                            :
                            <Title>
                                {book.title}
                            </Title>
                        }

                        {
                            editMode
                            &&
                            <Link to={`/book/${book.id}/edit`}>
                                <EditImg src={editIcon} alt='Edit' title='Edit' />
                            </Link>
                        }
                        </TitleWrapper>

                        <InfoItem>
                            <Label>
                                By:
                            </Label>
                            {
                                isLoading
                                ?
                                <SkeletonWrapper />
                                :
                                <p>
                                    {
                                        book.author
                                    }
                                </p>
                            }
                        </InfoItem>

                        <InfoItem>
                            <Label>
                                Number of Pages:
                            </Label>
                            {
                                isLoading
                                ?
                                <SkeletonWrapper />
                                :
                                <p>
                                    {
                                        book.pagesNumber
                                    }
                                </p>
                            }
                        </InfoItem>

                        <InfoItem>
                            <Label>
                                Publish Year:
                            </Label>
                            {
                                isLoading
                                ?
                                <SkeletonWrapper />
                                :
                                <p>
                                    {
                                        book.publishYear
                                    }
                                </p>
                            }
                        </InfoItem>

                        <InfoItem>
                            <Label>
                                Classification:
                            </Label>
                            {
                                isLoading
                                ?
                                <SkeletonWrapper />
                                :
                                <p>
                                    {
                                        book.category
                                    }
                                </p>
                            }
                        </InfoItem>
                    </InfoWrapper>
                            
                    <ImgWrapper>
                        <Image src={book.image} title={book.title} alt={book.title}/>
                    </ImgWrapper>
                </InfoImgWrapper>

                <DescriptionWrapper>
                    {
                        isLoading
                        ?
                        <SkeletonWrapper />
                        :
                        <Description>
                            {book.description}
                        </Description>
                    }
                    
                </DescriptionWrapper>
            </Content>
            )
        }
        </EditContext.Consumer>
    )
}

export default BookDetails