import { useEffect } from 'react'
import { useBranchesContext } from '../hooks/useBranchesContext'

// components 
import BranchDetails from '../components/BranchDetails'
import BranchForm from '../components/BranchForm'


const Home = () => {
    const {branches, dispatch} = useBranchesContext()

    useEffect(() => {
        const fetchBranches = async () => {
            const response = await fetch('/api/branches')
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_BRANCHES', payload: json})
            }
        }

        fetchBranches()
    }, [dispatch])

    return (
        <div className="home">
            <div className="branches">
                {branches && branches.map((branch) => (
                    <BranchDetails key={branch._id} branch={branch} />
                ))}
            </div>
            <BranchForm />
        </div>
    )
}

export default Home