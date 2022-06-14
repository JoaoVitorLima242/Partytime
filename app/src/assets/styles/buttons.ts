import styled from 'styled-components'

interface ButtonInterface {
    color?: string
}

export const Button = styled.button<ButtonInterface>`
    font-size: 20px;
    padding: 10px 20px;
    border-radius: 8px;
    color: white;
    margin: 10px 0;
    border: none;
    background-color: ${(props) => props.color ? `${props.color}` : '#2F6CEC'};
`
export const ButtonIcon = styled.button<ButtonInterface>`
    border: none;
    background-color: transparent;
`
