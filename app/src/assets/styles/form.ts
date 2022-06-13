import styled from 'styled-components'

interface InputInterface {
    maxWidth?: number | null
}
interface FomrInterface {
    maxWidth?: number | null
}

export const Form = styled.form<FomrInterface>`
    max-width: ${(props) => props.maxWidth ? `${props.maxWidth}px` : 'auto'};
    margin: 30px auto;

    label {
        font-size: 21px;
        text-align: start;
        margin: 20px 0 4px;
    }
`

export const Input = styled.input<InputInterface>`
    font-weight: 400;
    font-size: 16px;
    padding: 0 10px;
    line-height: 150%;
    width: 100%;
    height: 40px;
    max-width: ${(props) => props.maxWidth ? `${props.maxWidth}px` : 'auto'};
    border-radius: 8px;
    border: 1px solid #aaa;

    :focus-visible {
        border: 1px solid #288A82;
        box-shadow: 0px 0px 0px 2px rgba(40, 138, 200, 0.37);
        outline: none;
        border-radius: 8px;
    }
`
export const Checkbox = styled.div<InputInterface>`
    display: flex;
    align-items: center;
    margin: 20px 0 4px;

    label {
        margin: 0;
    }

    input {
        width: 17px;
        height: 17px;
        margin-left: 10px;
    }
`

export const InputFile = styled.input<InputInterface>`
    font-weight: 400;
    font-size: 16px;
    padding: 10px;
    line-height: 150%;
    width: 100%;
    max-width: ${(props) => props.maxWidth ? `${props.maxWidth}px` : 'auto'};
    border-radius: 8px;
    border: 1px solid #aaa;
    
    :focus-visible {
        border: 1px solid #288A82;
        box-shadow: 0px 0px 0px 2px rgba(40, 138, 200, 0.37);
        outline: none;
        border-radius: 8px;
    }
    
`
export const TextArea = styled.textarea<InputInterface>`
    font-weight: 400;
    font-size: 16px;
    padding: 10px;
    line-height: 150%;
    width: 100%;
    min-height: 100px;
    max-width: ${(props) => props.maxWidth ? `${props.maxWidth}px` : 'auto'};
    border-radius: 8px;
    border: 1px solid #aaa;

    :focus-visible {
        border: 1px solid #288A82;
        box-shadow: 0px 0px 0px 2px rgba(40, 138, 200, 0.37);
        outline: none;
        border-radius: 8px;
    }
`
