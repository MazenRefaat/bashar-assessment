import styled from 'styled-components';
import { Link as rLink } from 'react-router-dom';
import { greenColor } from '../../styles/Colors';

export const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 25px;
    background-color: ${greenColor};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    box-shadow: 0 0 10px -1px #777;
`;

export const Link = styled(rLink)`
    color: white;
    text-decoration: none;
`;

export const HomeLink = styled(Link)`
    font-size: 24px;
    font-weight: bold;
`

export const NavList = styled.ul`
    display: flex;
    align-items: center;
`

export const NavLink = styled(Link)`
    font-size: 16px;
    margin-right: 15px;
`

export const EditButton = styled.a`
    display: inline-flex;
    font-size: 18px;
    font-weight: 300;
    text-decoration: none;
    color: ${props => props.edit ? '#05ac72' : '#fff'  } ;
    background-color: ${props => props.edit ? '#fff' : '#05ac72' } ;
    padding: 10px 25px;
    border-radius: 8px;
    box-shadow: 0 0 10px -1px #444;
`