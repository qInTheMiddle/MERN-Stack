import { useBranchesContext } from '../hooks/useBranchesContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import UpdateForm from './UpdateForm';

const BranchDetails = ({ branch }) => {
    const { dispatch, setUpdateFormOpen } = useBranchesContext()

    // console.log('BranchDetails render, updateFormOpen:', updateFormOpen)

    const handleCloseUpdateForm = () => {
        console.log('Closing update form');
        
        setUpdateFormOpen(branch._id, false); 
      };

    const handleClick = async () => {
        const response = await fetch('/api/branches/' + branch._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_BRANCH', payload: json})
        }
    }

    

    return (
        <div className="branch-details">
            <h4>{branch.name}</h4>
            <p><strong>Location:</strong>{branch.location}</p>
            <p><strong>Performance Score:</strong>{branch.performanceScore}</p>
            <p>{formatDistanceToNow(new Date(branch.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            <button onClick={() => { console.log('Update clicked'); setUpdateFormOpen(branch._id, true); console.log('updateFormOpen should be true now:', branch.updateFormOpen ) }}>Update Branch</button>
            {branch.updateFormOpen && (
                <UpdateForm branch={branch} onClose={handleCloseUpdateForm} />
            )}
        </div>
    )
}

export default BranchDetails