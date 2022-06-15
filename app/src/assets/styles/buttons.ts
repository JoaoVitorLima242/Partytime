import styled from 'styled-components'

interface ButtonInterface {
    color?: string
}

export const Button = styled.button<ButtonInterface>`
    font-size: 20px;
    padding: 10px 20px;
    border-radius: 2px;
    color: white;
    margin: 10px 0;
    border: none;
    background-color: ${({ color }) => color ? `${color}` : '#303030'};
`
export const ButtonIcon = styled.button<ButtonInterface>`
    border: none;
    padding: 10px;
    color: ${({ color }) => color || '#303030'};
    background-color: transparent;
`
