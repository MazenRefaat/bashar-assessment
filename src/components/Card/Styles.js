import styled from 'styled-components';
import { mainColor, secondaryColor } from '../../styles/Colors';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    box-shadow: 0 0 10px -1px #aaa;
    background-color: #fff;
`

export const NavLink = styled(Link)`
    position: absolute;
    z-index: 15;
    width: 100%;
    height: 100%;
`

export const ImgWrapper = styled.div`
    flex-basis: 25%;
    background-color: #ddd;
    height: 150px;
    overflow:hidden;
    position: relative;
`

export const Img = styled.img`
    width: 100%;
    height: auto;
`

export const Content = styled.section`
    flex-basis: 70%;
    padding: 25px;
`

export const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    min-height: 20px;
    width: 100%;
    margin-bottom: 15px;
`

export const Title = styled.h3`
    font-size: 18px;
    font-weight: bold;
    color: ${mainColor};
`

export const EditImg = styled.img`
    width: 15px;
    height: auto;
`

export const DescriptionWrapper = styled.div`
    min-height: 40px;
    width: 100%;
`

export const Description = styled.p`
    font-size: 14px;
    font-weight: normal;
    color: ${secondaryColor};
`
