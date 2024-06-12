import { useState } from "react"
import { useBranchesContext } from '../hooks/useBranchesContext'

const BranchForm = () => {
    const { dispatch } = useBranchesContext()

    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [performanceScore, setPerformanceScore] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (b) => {
        b.preventDefault()

        const branch = {name, location, performanceScore}

        const response = await fetch('/api/branches', {
            method: 'POST',
            body: JSON.stringify(branch),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setName('')
            setLocation('')
            setPerformanceScore('')
            setError(null)
            setEmptyFields([])
            console.log('new branch added', json)
            dispatch({type: 'CREATE_BRANCH', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Branch</h3>

            <label>Branch Name</label>
            <input 
                type="text"
                onChange={(b) => setName(b.target.value)}
                value={name}    
                className={emptyFields.includes('name') ? 'error' : ''}            
            />

            <label>Location</label>
            <input 
                type="text"
                onChange={(b) => setLocation(b.target.value)}
                value={location}                
                className={emptyFields.includes('location') ? 'error' : ''}
            />

            <label>Performance Score</label>
            <input 
                type="number"
                onChange={(b) => setPerformanceScore(b.target.value)}
                value={performanceScore}
                className={emptyFields.includes('performanceScore') ? 'error' : ''}                
            />

            <button>Add Branch</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default BranchForm
