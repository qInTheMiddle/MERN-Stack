import React, { useState } from 'react';
import { useBranchesContext } from '../hooks/useBranchesContext'

const UpdateForm = ({ branch, onClose }) => {
    const { dispatch, setError, setEmptyFields, error, emptyFields } = useBranchesContext();
    const [name, setName] = useState(branch.name);
    const [location, setLocation] = useState(branch.location);
    const [performanceScore, setPerformanceScore] = useState(branch.performanceScore);

    const handleSubmit = async (b) => {
        b.preventDefault();

        const updatedBranchData = {
            name,
            location,
            performanceScore,
        };

        
        const response = await fetch(`/api/branches/${branch._id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedBranchData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        
        if (response.ok) {
            const json = await response.json()
            // dispatch({ type: 'UPDATE_BRANCH', payload: json })  
            dispatch({ type: 'SET_UPDATE_FORM_OPEN', payload: json })
            onClose();  
            setError(null);  
            setEmptyFields([]);  
        } else {
            const json = await response.json();
            setError(json.error);  
            setEmptyFields(json.emptyFields || []);  
            
        }
        
    };

  return (
    <div className="update-form">
      <h2>Update Branch</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(b) => setName(b.target.value)} />
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" value={location} onChange={(b) => setLocation(b.target.value)} />
        <label htmlFor="performanceScore">Performance Score:</label>
        <input type="number" id="performanceScore" value={performanceScore} onChange={(b) => setPerformanceScore(b.target.value)} />
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>Cancel</button>  
        {error && <div className="error">{error}</div>} {/* Utilizing error */}
        {emptyFields.length > 0 && <div className="error">Please fill in all fields</div>} {/* Utilizing emptyFields */} 
      </form>
    </div>
  );
}

export default UpdateForm;
