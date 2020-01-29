import styled from 'styled-components';
import { mainColor } from '../../styles/Colors';

export const Content = styled.div`
    display: flex;
    flex-direction: column;
`

export const InfoImgWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

export const InfoWrapper = styled.div`
    flex-basis: 60%;
`

export const TitleWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
    overflow: hidden;
    margin-bottom: 25px;
`

export const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: ${mainColor};
`

export const EditImg = styled.img`
    margin-left: 15px;
    width: 15px;
    height: auto;
`

export const InfoItem = styled.div`
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    height: 20px;
`

export const Label = styled.p`
    font-size: 16px;
    font-weight: bold;
    margin-right: 5px;
`

export const ImgWrapper = styled.div`
    overflow: hidden;
    width: 200px;
    height: 200px;
`

export const DescriptionWrapper = styled.div`
    min-height: 50px;
`

export const Description = styled.p`
    margin-top: 25px;
    font-size: 16px;
`