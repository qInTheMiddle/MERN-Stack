  const Branch = require('../models/branchModel')
  const mongoose = require('mongoose') 

  // get all branches:
  const getBranches = async (req, res) => {
      const branches = await Branch.find({}).sort({createdAt: -1})

      res.status(200).json(branches)
  };

  //get a single branch
  const getBranch = async (req,res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Invalid ID' });
    }

    const branch = await Branch.findById(id)
  
    if (!branch) {
      return res.status(404).json({error: 'No such branch'})
    }

    res.status(200).json(branch)
  }

  // create new branch
  const addBranch = async (req, res) => {
      const {name, location, performanceScore} = req.body

      let emptyFields = []

      if(!name) {
        emptyFields.push('name')
      }
      if(!location) {
        emptyFields.push('location')
      }
      if(!performanceScore) {
        emptyFields.push('performanceScore')
      }
      if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
      }

      
      try{
          const branch = await Branch.create({name, location, performanceScore})
          res.status(200).json(branch)
      } catch (error) {
          res.status(400).json({error: error.message})
      }
  };

  // delete a branch
  const deleteBranch = async (req, res) => {
      const { id } = req.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({error: 'No such branch'})
      }

      const branch = await Branch.findOneAndDelete({_id: id})

      if (!branch) {
          return res.status(404).json({error: 'No such branch'})
      }

      res.status(200).json(branch)
  };

  // update a branch
  const updateBranch = async (req, res) => {
      const { id } = req.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({error: 'No such branch'})
      }

      const branch = await Branch.findOneAndUpdate({_id: id}, {
          ...req.body
      })

      if(!branch) {
          return res.status(400).json({error: 'No such branch'})
      }

      res.status(200).json(branch)
  };


  // highest performing branches
  const bestBranches = async (req, res) => {
      try {
        
        const branches = await Branch.find({}).sort({ performanceScore: -1 });
    
        
        res.json(branches);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving branches' });
      }
    };


    // lowest performing branches
    const worstBranches = async (req, res) => {
      try {
        
        const branches = await Branch.find({}).sort({ performanceScore: 1 });
    
        
        res.json(branches);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving branches' });
      }
    };


  module.exports = {
      getBranches,
      getBranch,
      addBranch,
      deleteBranch,
      updateBranch,
      bestBranches,
      worstBranches
  }
