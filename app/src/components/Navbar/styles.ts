import styled from 'styled-components'

export const Wrapper = styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #fff;
    position: sticky;
    width: 100%;
    background-color: #303030;

    div {
        display: flex;

        h2 {
            padding: 25px 5px;
        }
    }

    ul {
        list-style: none;

        a, span {
            font-size: 20px;
            color: #fff;
            text-decoration: none;
            margin: 0 10px;
        }
    }

`
