import styled, {css} from 'styled-components';
import { mainColor } from '../../styles/Colors';

export const Wrapper = styled.section`
`

export const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: ${mainColor};
`

export const FormWrapper = styled.section`
    width: 100%;
`

export const FormRow = styled.div`
    display: flex;
    width: 100%;
`

export const Label = styled.label`
    flex: 1;
    position: relative;
    display: block;
    font-size: 16px;
    font-weight: bold;
    color: ${mainColor};
    margin: 15px 5px 0 5px;
`

const styledFormField = css`
    width: 100%;
    display: block;
    font-size: 16px;
    color: ${mainColor};
    padding: 7px 15px;
    border-radius: 8px; 
    border: 2px solid #aaa;
    box-shadow: none;
    box-sizing: border-box;
    margin-top: 10px;

    &:focus {
        outline: none;
        box-shadow: none;
    }
`

export const Input = styled.input`
    ${styledFormField}    
    height: 40px;
    opacity: ${props => props.disabled ? '0.3' : '1'} ;

    ${props => 
        props.type === 'submit' 
        &&`
            color: #fff;
            background-color: #456789;
            width: 150px;
            margin: 15px 5px 0 auto;
            cursor: pointer;
        `
    }
`

export const Select = styled.select`
    ${styledFormField}
    height: 40px;
`

export const TextArea = styled.textarea`
    ${styledFormField}
    resize: none;
`

export const ErrorMsg = styled.span`
    position: absolute;
    right: 10px;
    top: 5px;
    color: red;
    font-weight: bold;
    font-size: 14px;
`