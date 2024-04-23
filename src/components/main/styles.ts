import styled from "styled-components";

export const MainContainer = styled.main<{drawerwidth:string}>`
width: calc(100% - ${props => props.drawerwidth});
flex-grow: 1;
margin-left: ${props => props.drawerwidth};
margin-top: 93px;
padding: 10px;
`