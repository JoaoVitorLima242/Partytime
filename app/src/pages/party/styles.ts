import styled from 'styled-components'

export const Wrapper = styled.div`
    padding: 40px 0;


    img {
        width: 100%;
        height: 100%;
    }

    h1 {
        font-size: 45px;
        margin-bottom: 20px;
    }
    
    .images {
        display: flex;
        flex-direction: column;
        margin-right: 20px;
        .big {
            max-width: 360px;
            min-width: 300px;
            height: auto;
            margin-bottom: 20px;
        }

        .small-imgs {
            display: flex;

            .small {
                max-width: 100px;
                height: auto;
                margin-right: 10px;
            }
        }
    
    }

    .info {
        strong {
            font-size: 24px;
        }

        p {
            font-size: 18px;
        }
    }
`
