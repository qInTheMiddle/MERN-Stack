import { createContext, useReducer, useState } from 'react'

export const BranchesContext = createContext()


export const branchesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BRANCHES':
            return {
                ...state,
                branches: action.payload.map(branch => ({ ...branch, updateFormOpen: false }))
            }
        case 'CREATE_BRANCH':
            return {
                ...state,
                branches: [{ ...action.payload, updateFormOpen: false }, ...state.branches]
            }
        case 'DELETE_BRANCH':
            return {
                ...state,
                branches: state.branches.filter((b) => b._id !== action.payload._id)
            }
        case 'SET_UPDATE_FORM_OPEN':
            console.log('SET_UPDATE_FORM_OPEN action:', action.payload);
            const { branchId, isOpen } = action.payload;
            
            return {
                ...state,
                
                branches: state.branches.map(branch =>
                    branch._id === branchId ? { ...branch, updateFormOpen: isOpen } : branch
                )
            };
        default:
            return state
    }
}

export const BranchesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(branchesReducer, {
        branches: [],
        
        
    })

    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const setUpdateFormOpen = (branchId, isOpen) => {
        console.log('setUpdateFormOpen called with:',branchId, isOpen);
        dispatch({ type: 'SET_UPDATE_FORM_OPEN', payload: { branchId, isOpen } });
      };  

    return (
        <BranchesContext.Provider value={{ ...state, dispatch, setUpdateFormOpen, setError, setEmptyFields, error, emptyFields }}>
            { children }
        </BranchesContext.Provider>
    )
}