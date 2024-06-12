import { BranchesContext } from '../context/BranchContext'
import { useContext } from 'react'

export const useBranchesContext = () => {
    const context = useContext(BranchesContext)

    if (!context) {
        throw Error('useBranchesContext must be used inside an BranchesContextProvider')
    }

    return context
}
