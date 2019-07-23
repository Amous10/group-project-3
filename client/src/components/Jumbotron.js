import React from 'react'
import styled from 'styled-components'


const Div = styled.div`
    background-color: white;
    height: 200px;

`


const Jumbotron = (props) => {
    return (
        <Div>{props.children}</Div>




        
    )
}

export default Jumbotron