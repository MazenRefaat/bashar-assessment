import styled from 'styled-components';
import { greenColor, mainColor } from '../../styles/Colors';
import { Link as rLink } from 'react-router-dom';

export const Wrapper = styled.section`
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border: 1px solid ${greenColor};
    overflow: hidden;
    box-shadow: 0 0 10px -3px #999;
`
export const Header = styled.header`
    background-color: ${greenColor};
    padding: 10px 15px;
`

export const Content = styled.div`
    padding: 10px 15px;
`

export const Title = styled.h3`
    font-size: 16px;
    font-weight: bold;
    color: #fff;
`

export const UList = styled.ul`
    list-style: disc;
    margin-left: 15px;
    color: ${mainColor};
`

export const ListItem = styled.li`
    margin-bottom: 10px;
`

export const Link = styled(rLink)`
    font-weight: bold;
    color: ${mainColor};
`