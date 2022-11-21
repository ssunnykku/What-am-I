import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
        width: 100%;
        margin: 0;
        ul, li {
            list-style: none;
            padding: 0;
            margin: 0 auto;
        }
    }
`;

Object.freeze(GlobalStyle);
export default GlobalStyle;
