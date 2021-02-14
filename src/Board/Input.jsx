import React, { useState } from 'react';
import styled from 'styled-components';


const InputField = styled.input`
    width: 100%;
    height: 50px;
    border-radius: 0.8rem;
    border: none;
    outline: none;
    font-size: 1.4rem;
    font-weight: 500px;
    padding: 5px 10px;
    color: #4F96C3;
    background: #202931;
    box-shadow: inset 2px 1px 5px 2px #385877;
    :focus{
        box-shadow: 2px 1px 5px 2px #385877;
    }
`;

const Input = ({value, changed, pressed, ph}) => {

    
    return (
        <InputField placeholder={ph} autoFocus value={value} onChange={changed} onKeyPress={pressed} />
    )
}

export default Input;
