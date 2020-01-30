import React from 'react';
import { Wrapper, Title } from './Styles';
import PropTypes from 'prop-types';

/**
* Toast
* @type Component
* @description component to render toast
* @param {object} props props data to be rendered in toast
* @returns Toast component
*/


const Toast = (props) => (
    <Wrapper>
        <Title type={props.type}>
            {props.title}
        </Title>
    </Wrapper>
)

Toast.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string
}

export default Toast;