import Router from 'next/router'
// icons
import { FaPen, FaSearch, FaTrashAlt } from 'react-icons/fa'

// types
import { PartyProps } from 'services/party'
// styles
import { TableParties } from './styles'
import { ButtonIcon } from 'assets/styles/buttons'
import Link from 'next/link'

type TableProps = {
    parties: PartyProps[]
    handleDeleteParties: (id: string) => Promise<void>
  }

const Table = (props: TableProps) => {
  const {
    parties,
    handleDeleteParties
  } = props

  return (
        <TableParties>
            <thead>
                <tr>
                    <th>Numero</th>
                    <th>Nome</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                {parties.map((party, count) => (
                    <tr key={party._id}>
                        <td>{count + 1}</td>
                        <td style={{ width: '75%' }}>{party.title}</td>
                        <td>
                            <Link href={`/party/${party._id}`}>
                                <ButtonIcon>
                                    <FaSearch />
                                </ButtonIcon>
                            </Link>
                            <Link href={`/party/edit/${party._id}`}>
                                <ButtonIcon
                                    color='#009879'
                                    /* onClick={() => Router.push(`/party/edit/${party._id}`)} */
                                >
                                    <FaPen />
                                </ButtonIcon>
                            </Link>
                            <ButtonIcon color='#f71427' onClick={() => handleDeleteParties(party._id)}>
                                <FaTrashAlt />
                            </ButtonIcon>
                        </td>
                    </tr>
                ))}
            </tbody>
        </TableParties>
  )
}

export default Table
