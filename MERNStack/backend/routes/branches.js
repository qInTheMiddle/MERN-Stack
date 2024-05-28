const express = require('express')
const {
    createBranch, 
    getBranches,
    // getBranch,
    deleteBranch,
    updateBranch,
    bestBranches,
    worstBranches
} = require('../controllers/branchController')

const router = express.Router()

// GET all branches
router.get('/', getBranches)

// // GET a single branch
// router.get('/:id', getBranch)

// POST a new branch
router.post('/', createBranch)

// DELETE a workout
router.delete('/:id', deleteBranch)

// UPDATE a workout
router.put('/:id', updateBranch)

// Best Performing Branch
router.get('/best-performing', bestBranches)

// Low Performing Branch
router.get('/low-performing', worstBranches)


module.exports = router