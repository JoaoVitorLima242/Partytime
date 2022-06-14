import styled from 'styled-components'

export const TableParties = styled.table`
    border-collapse: collapse;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    width: 100%;
    margin-top: 20px;

    thead tr {
        background-color: #2F6CEC;
        color: #ffffff;
        text-align: left;
    }

    th, td {
        padding: 12px 15px;
        font-size: 18px;
    }

    tbody tr {
        border-bottom: 1px solid #dddddd;
    }
    tbody tr:nth-of-type(even) {
        background-color: #f3f3f3;
    }
    tbody tr:last-of-type {
        border-bottom: 4px solid #2F6CEC;   
    }
    tbody tr.active-row {
        font-weight: bold;
        color: #2F6CEC;
    }

`
