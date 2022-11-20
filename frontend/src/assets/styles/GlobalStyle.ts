import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
        width: auto;
        ul, li {
            list-style: none;
            padding: 0;
            margin: 0 auto;
        }
    }
`;

Object.freeze(GlobalStyle);
export default GlobalStyle;
