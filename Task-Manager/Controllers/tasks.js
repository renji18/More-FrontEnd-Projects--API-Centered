const Task = require('../Models/tasks')
const asyncWrapper = require('../Middleware/async')

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.json({ tasks }).status(200)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

// const getAllTasks = asyncWrapper( async (req, res) => {
//   const tasks = await Task.find({})
//   res.json({ tasks }).status(200)
// })

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.json({ task }).status(201)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getTask = async (req, res) => {
  // two types of errors one in case the syntax is wrong(more or less charactes) and one in case the number of characters are correct, but one of the characters is wrong
  try {
    const taskID = req.params.id
    // const {id:taskID} = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
      return res.json({ msg: `Something wrong with the id: ${taskID}` }).status(404)
    }
    res.json({ task }).status(200)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const deleteTask = async (req, res) => {
  try {
    const taskID = req.params.id
    // findOneAndDelete  ||  findByIdAndDelete
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (!task) {
      return res.json({ msg: `No task with ID ${taskID}` }).status(404)
    }
    // res.json({ task: null, status: 'success' }).status(200)
    res.json({ task }).status(200)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const updateTask = async (req, res) => {
  try {
    const taskID = req.params.id
    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
      new: true,
      runValidators: true,
    })
    if(!task){
      return res.status(404).json({msg: `No data with id ${taskID}`})
    }
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}