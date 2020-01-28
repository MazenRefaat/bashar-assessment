import styled from 'styled-components';
import { darkBlueColor} from '../../styles/Colors';

export const Wrapper = styled.section`
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border: 1px solid ${darkBlueColor};
    overflow: hidden;
    box-shadow: 0 0 10px -3px #999;
`
export const Header = styled.header`
    background-color: ${darkBlueColor};
    padding: 10px 15px;
`

export const Content = styled.div`
    padding: 25px;
`

export const Title = styled.h3`
    font-size: 16px;
    font-weight: bold;
    color: #fff;
`
export const CardWrapper = styled.div`
    margin-bottom: 25px;
`