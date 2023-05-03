const express = require('express')

const {
  createNewPlayer,
  getAllPlayers,
  getSinglePlayer,
  deletePlayer,
  updatePlayer,
} = require('../controllers/methods')

const router = express.Router()

router.route('/').post(createNewPlayer).get(getAllPlayers)
router.route('/:mensID').get(getSinglePlayer).delete(deletePlayer).patch(updatePlayer)

module.exports = router