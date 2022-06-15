import styled from 'styled-components'

export const Wrapper = styled.div`
    h1 {
        text-align: center;
        margin: 20px 0;
        font-size: 40px;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        grid-gap: 60px;
        padding: 20px 0;

        .party {
            padding: 10px;
            border: 1px solid #30303025;
            border-radius: 2px;
            text-align: center;
            
            h3 {
                padding-top: 12px;
                font-size: 24px;
            }

            h4 {
                font-size: 16px;
            }

            img {
                width: 100%;
                border-radius: 4px;
            }
        }
    }
`
