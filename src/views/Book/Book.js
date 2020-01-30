import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Wrapper, Title, FormWrapper, Input, FormRow, Label, ErrorMsg, TextArea, Select } from './Styles';
import { FetchBookDetailsService, EditBookService, NewBookService } from '../../services/BooksService';
import * as Yup from "yup";
import { Formik } from "formik";
import { CategoriesService } from '../../services/CategoriesService';
import { AuthorsService } from '../../services/AuthorsService';
import Toast from '../../components/Toast/Toast';
const uuid = require('uuid');

/**
* BookSchema
* @type Yup Object
* @description Yup schema to validate values used in book details 
* @returns Yup Schema Object
*/

const BookSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Title is required")
        .nullable(),
    category: Yup.string()
        .required("Category is required")
        .nullable(),
    author: Yup.string()
        .required("Author is required")
        .nullable(),
    description: Yup.string()
        .nullable(),
    isbn: Yup.string()
        .min(13, "Must be more than 13 numbers")
        .required("ISBN is required")
        .nullable(),
    pagesNumber: Yup.string()
        .required("Number of Pages is required")
        .test('pagesNumber', 'Must be number', (value)=> !isNaN(value)),
    publishYear: Yup.string()
        .required("Publish Year is required")
        .test('publishYear', 'Must be number', (value)=> !isNaN(value)),
    image: Yup.string()
        .test('Image URL', 'Must be valid URL ex: http:// or https://', (value)=> {if(value) return value.indexOf('http') > -1})
        .nullable(),
}); 


/**
* Book
* @type View Component
* @description view to Edit Book Details or Add new Book
* @param {object} props component props
* @returns Book Component
*/

const Book = (props) => {
    const isMounted = useRef(false);
    const [book, setBook] = useState({title: '', category: '', author: '', description: '', isbn: '', pagesNumber: '0', publishYear: '', image: '' })
    const [bookKey, setBookKey] = useState('');
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [toast, setToast] = useState({toastTitle: '', toastType: '', showToast: false})
    const [isLoading, setIsLoading] = useState(false);
    const { id } = props.match.params;
    const type = props.match.path.indexOf('new') > -1 ? 'new' : 'edit';


    // Effect to be done on Component first load
    useEffect(()=> {
        isMounted.current = true;
        if(type === 'edit'){
            FetchBookDetailsService(id).then(res => {
                setBookKey(Object.keys(res.data)[0])
                setBook(Object.values(res.data)[0])
            }).catch(e => {
                console.log('error', e)
            })
        }
        CategoriesService({}).then(res => {
            setCategories(res.data);
        }).catch(e => {
            console.log('error', e)
        })

        AuthorsService({}).then(res => {
            setAuthors(res.data);
        }).catch(e => {
            console.log('error', e)
        })

        return () => isMounted.current = false;
    },[id, type])

    // Form Submit Handler
    const _handleSubmit = useCallback(async (e, book)=> {
        e.preventDefault();
        setIsLoading(true);
        
        let submitForm, bookId;
        if(type === 'edit'){
            let bookData = {
                [bookKey]: book
            }
            
            submitForm = EditBookService(bookData);
        } else {
            let bookData = book;
            bookId = uuid.v4();
            bookData.id = bookId;
            submitForm = NewBookService(bookData);
        }

        submitForm.then(res => {
            if(res.statusText === 'OK'){
                    if(isMounted.current){
                        setToast({
                            toastTitle: type === 'edit' ? 'Edit Successfully!': 'Added Successfully', 
                            toastType: 'success', 
                            showToast: true
                        });
                        setIsLoading(false);
                    }
                    setTimeout(()=> props.history.push(type === 'edit'? `/book/${res.data[bookKey].id}`: `/book/${bookId}`),2000)
                    
                }
        }).catch(e => {
            console.log('error', e);
            setToast({
                toastTitle: 'Error Happened', 
                toastType: 'error', 
                showToast: true
            });
        })
    }, [bookKey, props, type])

    // Toast to be shown on actions 
    const useToast = useCallback((title, type, visible)=> {
        if(visible){
            setTimeout(()=>{
                if(isMounted.current){
                    setToast({toastTitle: '', toastType: '', showToast: false})
                }
            }, 2000)
        }
        return (
            visible
            &&
            <Toast type={type} title={title} />
        )
    },[])


    return(
        <Wrapper>
            {
                type === 'edit'
                &&
                <Title>
                    Edit Book: {book.title}
                </Title>
            }
            
            <Formik
                enableReinitialize={true}
                initialValues={book}
                validateOnBlur={true}
                validationSchema={BookSchema}
                displayName='Book'
            >
                {
                    props => {
                        const { values, errors, handleChange } = props;
                        const disableSubmit = Object.keys(errors).length > 0;
                        return (
                            <FormWrapper>
                                <form onSubmit={(e)=> _handleSubmit(e, values)}>
                                    {/* Book Title */}
                                    <FormRow>
                                        <Label>
                                            Title

                                            <Input
                                                placeholder='Title'
                                                type='text'
                                                value={values.title}
                                                onChange={handleChange('title')}
                                            />
                                            {
                                                errors.title
                                                &&
                                                <ErrorMsg>
                                                    {errors.title}
                                                </ErrorMsg>
                                            }
                                        </Label>
                                    </FormRow>
                                    
                                    {/* Book Category & Author Name */}
                                    <FormRow>
                                        <Label>
                                            Category
                                            
                                            <Select
                                                value={values.category}
                                                onChange={handleChange('category')}
                                            >
                                            <option value="">Select Category</option>
                                            {
                                                categories.map((category, key)=>(
                                                    <option key={key} value={category.id}>{category.name}</option>
                                                ))
                                            }

                                            </Select>
                                            {
                                                errors.category
                                                &&
                                                <ErrorMsg>
                                                    {errors.category}
                                                </ErrorMsg>
                                            }
                                        </Label>

                                        <Label>
                                            Author

                                            <Select
                                                value={values.author}
                                                onChange={handleChange('author')}
                                            >
                                            <option value="">Select Author</option>
                                            {
                                                authors.map((author, key)=>(
                                                    <option key={key} value={author.id}>{author.name}</option>
                                                ))
                                            }
                                            </Select>
                                            {
                                                errors.author
                                                &&
                                                <ErrorMsg>
                                                    {errors.author}
                                                </ErrorMsg>
                                            }
                                        </Label>
                                    </FormRow>

                                    {/* Book Description */}
                                    <FormRow>
                                        <Label>
                                            Description

                                            <TextArea
                                                rows={7}
                                                placeholder='Description'
                                                type='text'
                                                value={values.description}
                                                onChange={handleChange('description')}
                                            />
                                            {
                                                errors.description
                                                &&
                                                <ErrorMsg>
                                                    {errors.description}
                                                </ErrorMsg>
                                            }
                                        </Label>
                                    </FormRow>

                                    {/* Book ISBN */}
                                    <FormRow>
                                        <Label>
                                            ISBN

                                            <Input
                                                placeholder='ISBN'
                                                type='text'
                                                value={values.isbn}
                                                onChange={handleChange('isbn')}
                                            />
                                            {
                                                errors.isbn
                                                &&
                                                <ErrorMsg>
                                                    {errors.isbn}
                                                </ErrorMsg>
                                            }
                                        </Label>
                                    </FormRow>

                                    {/* Number of Pages & Publish Year */}
                                    <FormRow>
                                        <Label>
                                            Number of Pages 

                                            <Input
                                                placeholder='Number of Pages'
                                                type='text'
                                                value={values.pagesNumber}
                                                onChange={handleChange('pagesNumber')}
                                            />
                                            {
                                                errors.pagesNumber
                                                &&
                                                <ErrorMsg>
                                                    {errors.pagesNumber}
                                                </ErrorMsg>
                                            }
                                        </Label>

                                        <Label>
                                            Publish Year

                                            <Input
                                                placeholder='Publish Year'
                                                type='text'
                                                value={values.publishYear}
                                                onChange={handleChange('publishYear')}
                                            />
                                            {
                                                errors.publishYear
                                                &&
                                                <ErrorMsg>
                                                    {errors.publishYear}
                                                </ErrorMsg>
                                            }
                                        </Label>
                                    </FormRow>

                                    {/* Book Image */}
                                    <FormRow>
                                        <Label>
                                            Image URL

                                            <Input
                                                placeholder='Image URL'
                                                type='text'
                                                value={values.image}
                                                onChange={handleChange('image')}
                                            />
                                            {
                                                errors.image
                                                &&
                                                <ErrorMsg>
                                                    {errors.image}
                                                </ErrorMsg>
                                            }
                                        </Label>
                                    </FormRow>

                                    {/* Save */}
                                    <FormRow>
                                        <Input
                                            disabled={disableSubmit || isLoading || props.initialValues === props.values }
                                            type='submit'
                                            value='Save'
                                         />
                                    </FormRow>
                                </form>
                            </FormWrapper>
                        )
                    }
                }
                
            </Formik>
            {
                useToast(toast.toastTitle, toast.toastType, toast.showToast)
            }
        </Wrapper>
    )
}

export default Book;