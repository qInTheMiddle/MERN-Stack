import { Link } from 'react-router-dom'
import { useBranchesContext } from '../hooks/useBranchesContext';

const Navbar = () => {
    const { dispatch } = useBranchesContext();

    const handleBestPerforming = async () => {
        const response = await fetch('/api/branches/best-performing');
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'SET_BRANCHES', payload: json });
        }
    };
    
    const handleLowPerforming = async () => {
        const response = await fetch('/api/branches/low-performing');
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'SET_BRANCHES', payload: json });
        }
    };

    const handleShowAll = async () => {
        const response = await fetch('/api/branches');
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'SET_BRANCHES', payload: json });
        }
    };

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Branch Information Manager</h1>
                </Link>
                <div>
                    <button className="sort" onClick={handleBestPerforming}>Best Performing</button>
                    <button className="sort" onClick={handleLowPerforming}>Low Performing</button>
                    <button className="sort" onClick={handleShowAll}>Most Recent</button>
                </div>
            </div>
        </header>
    )
}

export default Navbar
