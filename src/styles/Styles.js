import styled from 'styled-components';

export const SkeletonWrapper = styled.div`
    background-color: #eee;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 20;
    &::after {
        display: block;
        content: '';
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .8), transparent);
        animation: loading 1.5s infinite;
    }

    @keyframes loading {
        100% {
            transform: translateX(100%);
        }
    }
`