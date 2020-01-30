import styled from 'styled-components';
import { darkBlueColor } from '../../styles/Colors';

export const Wrapper = styled.div`
    position: fixed;
    bottom: 30px;
    right: 30px;
    box-shadow: 0 0 10px -2px #999;
    border-radius: 4px;
    background-color: #fff;
    padding: 15px 25px;
    transition: display 0.3s linear;
`

export const Title = styled.h3`
    font-size: 16px; 
    font-weight: bold;
    color: ${props => props.type === 'error' ? 'red' : darkBlueColor};
`