import styled from 'styled-components'

interface AlertInterface {
    type?: string
}

export const Alert = styled.div<AlertInterface>`
    width: 100%;
    height: auto;
    text-align: center;
    border-radius: 6px;
    padding: 30px 15px;
    font-size: 20px;
    
    // Changing by type
    color: ${({ type }) => type === 'danger' ? '#721c24' : '#004085'};
    background-color:${({ type }) => type === 'danger' ? '#f8d7da' : '#cce5ff'};;
    border-color: ${({ type }) => type === 'danger' ? '#f5c6cb' : '#b8daff'};;
`
