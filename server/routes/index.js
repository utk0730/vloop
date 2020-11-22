const express = require('express');
const leaderBoardController = require('../controller/leaderBoardController.js');
const router = express.Router();
router.post('/add-leader', leaderBoardController.addLeader);
router.get('/fetch-leaders', leaderBoardController.getAllLeaders);
router.patch('/update-leader-point',leaderBoardController.updateLeaderPoint)
module.exports = router;