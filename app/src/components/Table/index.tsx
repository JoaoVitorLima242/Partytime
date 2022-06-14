// icons
import { ButtonIcon } from 'assets/styles/buttons'
import { FaPen, FaSearch, FaTrashAlt } from 'react-icons/fa'
// types
import { PartyProps } from 'services/party'
// styles
import { TableParties } from './styles'

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
                            <ButtonIcon>
                                <FaSearch />
                            </ButtonIcon>
                            <ButtonIcon color='#009879'>
                                <FaPen />
                            </ButtonIcon>
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
