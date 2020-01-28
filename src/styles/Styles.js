import styled from 'styled-components';

export const SkeletonWrapper = styled.div`
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