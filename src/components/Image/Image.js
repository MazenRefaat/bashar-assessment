import React, { useState, useCallback } from 'react';
import { Img } from './Styles';
import bookImg from '../../assets/book_fallback.png';
import { SkeletonWrapper } from '../../styles/Styles';



/**
* Image
* @type Component
* @description component to render Image
* @param {object} props props image to be rendered in card
* @returns Image component
*/

const Image = (props) => {
    
    const [imgStatus, setImageStatus] = useState('loading');

    const _handleStatusChange = useCallback((status) => {
        setImageStatus(status)
    },[]);


    return(
        <React.Fragment>
            <Img
                src={imgStatus === 'loadError' ? bookImg : props.src } 
                title={props.title} 
                alt={props.title} 
                onError={
                    () => _handleStatusChange('loadError')
                }
                onLoad={
                    () => _handleStatusChange('loaded')
                }
            /> 
            {
                imgStatus === 'loading'
                &&
                <SkeletonWrapper />
            }
        </React.Fragment>
    )
}

export default Image;