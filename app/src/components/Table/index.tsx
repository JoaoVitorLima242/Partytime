// icons
import { ButtonIcon } from 'assets/styles/buttons'
import { FaPen, FaSearch, FaTrashAlt } from 'react-icons/fa'
// types
import { PartyProps } from 'services/party'
// styles
import { TableParties } from './styles'

type TableProps = {
    parties: PartyProps[]
  }

const Table = ({ parties }: TableProps) => {
  return (
        <TableParties>
            <thead>
                <th>Numero</th>
                <th>Nome</th>
                <th>Ação</th>
            </thead>
            <tbody>
                {parties.map((party, count) => (
                    <tr key={party._id}>
                        <td>{count + 1}</td>
                        <td>{party.title}</td>
                        <td>
                            <ButtonIcon>
                                <FaSearch />
                            </ButtonIcon>
                            <ButtonIcon>
                                <FaPen />
                            </ButtonIcon>
                            <ButtonIcon>
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
