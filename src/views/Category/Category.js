import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Wrapper, Title, FormWrapper, Input, FormRow, Label, ErrorMsg } from './Styles';
import { EditBookService, NewBookService } from '../../services/BooksService';
import * as Yup from "yup";
import { Formik } from "formik";
import { FetchCategoryService } from '../../services/CategoriesService';
import Toast from '../../components/Toast/Toast';
const uuid = require('uuid');

/**
* CategorySchema
* @type Yup Object
* @description Yup schema to validate values used in Catgory details 
* @returns Yup Schema Object
*/

const CategorySchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Title is required")
        .nullable()
}); 


/**
* Category
* @type View Component
* @description view to Edit Category Details or Add new Category
* @param {object} props component props
* @returns Category Component
*/

const Category = (props) => {
    const isMounted = useRef(false);
    const [category, setCategory] = useState({name: ''})
    const [categoryKey, setCategoryKey] = useState('');
    const [toast, setToast] = useState({toastTitle: '', toastType: '', showToast: false})
    const [isLoading, setIsLoading] = useState(false);
    const { id } = props.match.params;
    const type = props.match.path.indexOf('new') > -1 ? 'new' : 'edit';


    // Effect to be done on Component first load
    useEffect(()=> {
        isMounted.current = true;
        if(type === 'edit'){
            FetchCategoryService(id).then(res => {
                setCategoryKey(Object.keys(res.data)[0])
            }).catch(e => {
                console.log('error', e)
            })
        }

        return () => isMounted.current = false;
    },[id, type])

    // Form Submit Handler
    const _handleSubmit = useCallback(async (e, category)=> {
        e.preventDefault();
        setIsLoading(true);
        
        let submitForm, categoryId;
        if(type === 'edit'){
            let categoryData = {
                [categoryKey]: category
            }
            submitForm = EditBookService(categoryData);
        } else {
            let categoryData = category;
            categoryId = uuid.v4();
            categoryData.id = categoryId;
            submitForm = NewBookService(categoryData);
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
                    setTimeout(()=> props.history.push(type === 'edit'? `/category/${res.data[categoryKey].id}`: `/category/${categoryId}`),2000)
                    
                }
        }).catch(e => {
            console.log('error', e);
            setToast({
                toastTitle: 'Error Happened', 
                toastType: 'error', 
                showToast: true
            });
        })
    }, [categoryKey, type, props])

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
                    Edit Category: {category.name}
                </Title>
            }
            
            <Formik
                enableReinitialize={true}
                initialValues={category}
                validateOnBlur={true}
                validationSchema={CategorySchema}
                displayName='Category'
            >
                {
                    props => {
                        const { values, errors, handleChange } = props;
                        const disableSubmit = Object.keys(errors).length > 0;
                        return (
                            <FormWrapper>
                                <form onSubmit={(e)=> _handleSubmit(e, values)}>
                                    {/* Category Name */}
                                    <FormRow>
                                        <Label>
                                            Name

                                            <Input
                                                placeholder='Name'
                                                type='text'
                                                value={values.name}
                                                onChange={handleChange('name')}
                                            />
                                            {
                                                errors.name
                                                &&
                                                <ErrorMsg>
                                                    {errors.name}
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

export default Category;