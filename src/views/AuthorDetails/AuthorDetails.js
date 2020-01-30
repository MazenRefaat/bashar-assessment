import React, { useEffect, useState } from 'react';
import { Content, InfoWrapper, TitleWrapper, Title, EditImg, InfoItem, Label, InfoImgWrapper } from './Styles';
import { SkeletonWrapper } from '../../styles/Styles';
import { EditContext } from '../../App';
import { Link } from 'react-router-dom';
import editIcon from '../../assets/edit_icon.svg';
import { FetchAuthorService } from '../../services/AuthorsService';
import { FetchBooksByAuthorService } from '../../services/BooksService';
import ListView from '../../components/ListView/ListView';

/**
* AuthorDetails
* @type View Component
* @description view to render Book Details
* @param {object} props component props
* @returns AuthorDetails Component
*/
const AuthorDetails = (props) => {
    const [author, setAuthor] = useState({})
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const { id } = props.match.params;
    useEffect(()=> {
        setIsLoading(true);
        FetchAuthorService(id).then(async (res) => {
            if(Object.keys(res.data).length === 0){
                props.history.push('/404');
            } else {
                setIsLoading(false);
                setAuthor(Object.values(res.data)[0])
            }
        })
        .catch(e => {
            console.log('error', e)
        })

        FetchBooksByAuthorService({id}).then(async (res) => {
            setIsLoading(false);
            setBooks(Object.values(res.data))
        })
        .catch(e => {
            console.log('error', e)
        })
    },[id, props])


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
                                {author.name}
                            </Title>
                        }

                        {
                            editMode
                            &&
                            <Link to={`/author/${author.id}/edit`}>
                                <EditImg src={editIcon} alt='Edit' title='Edit' />
                            </Link>
                        }
                        </TitleWrapper>

                        <InfoItem>
                            {
                                isLoading
                                ?
                                <SkeletonWrapper />
                                :
                                <p>
                                    --
                                    {
                                        author.jobTitle
                                    }
                                </p>
                            }
                        </InfoItem>

                        <InfoItem>
                            {
                                isLoading
                                ?
                                <SkeletonWrapper />
                                :
                                <p>
                                    
                                    {
                                        author.bio
                                    }
                                </p>
                            }
                        </InfoItem>
                    </InfoWrapper>
                </InfoImgWrapper>

                <section>
                    <Label>
                        Their work:
                    </Label>
                    <ListView title="Books" type="book" data={books} />
                </section>
            </Content>
            )
        }
        </EditContext.Consumer>
    )
}

export default AuthorDetails