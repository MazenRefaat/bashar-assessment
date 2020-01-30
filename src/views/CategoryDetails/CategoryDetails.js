import React, { useEffect, useState } from 'react';
import { Content, InfoWrapper, TitleWrapper, Title, EditImg, Label, InfoImgWrapper } from './Styles';
import { SkeletonWrapper } from '../../styles/Styles';
import { EditContext } from '../../App';
import { Link } from 'react-router-dom';
import editIcon from '../../assets/edit_icon.svg';
import { FetchBooksByCategoryService } from '../../services/BooksService';
import ListView from '../../components/ListView/ListView';
import { FetchCategoryService } from '../../services/CategoriesService';

/**
* CategoryDetails
* @type View Component
* @description view to render Book Details
* @param {object} props component props
* @returns CategoryDetails Component
*/
const CategoryDetails = (props) => {
    const [category, setCategory] = useState({})
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const { id } = props.match.params;
    useEffect(()=> {
        setIsLoading(true);
        FetchCategoryService(id).then(async (res) => {
            setIsLoading(false);
            setCategory(Object.values(res.data)[0])
        })
        .catch(e => {
            console.log('error', e)
        })

        FetchBooksByCategoryService({id}).then(async (res) => {
            setIsLoading(false);
            setBooks(Object.values(res.data))
        })
        .catch(e => {
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
                                {category.name}
                            </Title>
                        }

                        {
                            editMode
                            &&
                            <Link to={`/category/${category.id}/edit`}>
                                <EditImg src={editIcon} alt='Edit' title='Edit' />
                            </Link>
                        }
                        </TitleWrapper>
                    </InfoWrapper>
                </InfoImgWrapper>

                <section>
                    <Label>
                        Books:
                    </Label>
                    <ListView title="Books" type="book" data={books} />
                </section>
            </Content>
            )
        }
        </EditContext.Consumer>
    )
}

export default CategoryDetails