const Task = require("../Models/task")
const asyncWrapper = require("../middleware/async")
const {createCustomError} = require("../errors/custom-error") 

const getAllTasks = asyncWrapper(async (req,res)=>{
    const tasks = await Task.find({})
    res.status(200).json({tasks})
})

const createTask = asyncWrapper(async (req,res)=>{
    const task = await Task.create(req.body)
    res.status(201).json({task})
})

const getTask = asyncWrapper(async (req,res,next)=>{
    const {id:taskID}=req.params
    const tasks = await Task.findOne({_id: taskID})
    if(!tasks)
    {
        return next(createCustomError(`No task with id: ${taskID}`,404))
        // return res.status(404).json({msg: `No task with id: ${taskID}`})
    }
    res.status(200).json({tasks})
})

const updateTask = asyncWrapper(async (req,res,next)=>{
    const {id:taskID}=req.params
    const tasks = await Task.findOneAndUpdate({_id: taskID},req.body,{
        new:true,
        runValidators:true,
    })
    if(!tasks)
    {
        return next(createCustomError(`No task with id: ${taskID}`,404))
        // return res.status(404).json({msg: `No task with id: ${taskID}`})
    }
    res.status(200).json({tasks})
})

const deleteTask = asyncWrapper(async (req,res)=>{
    const {id:taskID}=req.params
    const tasks = await Task.findOneAndDelete({_id: taskID})
    if(!tasks)
    {
        return next(createCustomError(`No task with id: ${taskID}`,404))
        // return res.status(404).json({msg: `No task with id: ${taskID}`})
    }
    res.status(200).json({tasks})
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}