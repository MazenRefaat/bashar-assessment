import React from 'react';
import { Wrapper } from './Styles';

/**
* NotFound
* @type View Component
* @description view to show in wrong routes
* @param {object} props component props
* @returns NotFound Component
*/


const NotFound = ()=> (
    <Wrapper>
        <p>
            Page not Found
        </p>
    </Wrapper>
)

export default NotFound;