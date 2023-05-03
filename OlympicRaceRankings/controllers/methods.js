const MensRanking = require('../models/schema')
const { all } = require('../router/routes')

const createNewPlayer = async(req, res)=>{
  try {
    const newData = await new MensRanking(req.body)
    newData.save()
    res.status(201).send(newData)
  } catch (error) {
    res.status(400).send(error)
  }
}

const getAllPlayers = async(req, res)=>{
  try {
    const allData = await MensRanking.find().sort({"ranking":1})
    res.status(201).send(allData)
  } catch (error) {
    res.status(400).send(error)
  }
}

const getSinglePlayer = async(req, res)=>{
  try {
    const {mensID} = req.params
    const singleData = await MensRanking.findById({_id:mensID})
    res.status(201).send(singleData)
  } catch (error) {
    res.status(400).send(error)
  }
}

const deletePlayer = async(req, res)=>{
  try {
    const {mensID} = req.params
    const singleData = await MensRanking.findByIdAndDelete({_id:mensID})
    res.status(201).json({msg:'The following data is deleted', data:singleData})
  } catch (error) {
    res.status(400).send(error)
  }
}

const updatePlayer = async(req, res)=>{
  try {
    const {mensID} = req.params
    const singleData = await MensRanking.findByIdAndUpdate({_id:mensID}, req.body, {new:true})
    res.status(201).json({msg:'The following data is deleted', data:singleData})
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  createNewPlayer,
  getAllPlayers,
  getSinglePlayer,
  deletePlayer,
  updatePlayer,
}