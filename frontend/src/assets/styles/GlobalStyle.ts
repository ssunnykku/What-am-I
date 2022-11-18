import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
        height: 100%;
        width: 100%;
        ul, li {
            list-style: none;
            padding: 0;
            margin: 0 auto;
        }
    }
`;

Object.freeze(GlobalStyle);
export default GlobalStyle;
