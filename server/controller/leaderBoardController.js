const Leader = require("../models/index");
const Pusher = require("pusher");

const pusher = new Pusher({
  // TODO : move all these keys to env file
  appId: "1110913",
  key: "510318c8d0c6b32e86b9",
  secret: "2852d8af3dfc2c9508ab",
  cluster: "ap2",
});

exports.addLeader = async (req, res, next) => {
  try {
    const _allLeaders = await Leader.find();
    const _newLeader = new Leader({
      point: 1,
      name: `Leader ${!_allLeaders.length ? 1 : _allLeaders.length + 1}`,
    });
    const _n = await _newLeader.save();
    const data = await Leader.find();

    // sending data back but not using in frontend ,
    // instead using data send by pusher trigger,
    // not sure if this is ideal approach, some feedbaack from reviewer is highly appreciated
    res.send(data);
    pusher.trigger("watch-leaderboard", "watch-all-leaders", data);
  } catch (error) {
    throw new Error("Unable to add leader to board");
  }
};

exports.getAllLeaders = async (req, res, next) => {
  const data = await Leader.find();
  if (data) {
    // sending data back but not using in frontend ,
    // instead using data send by pusher trigger,
    // not sure if this is ideal approach, some feedbaack from reviewer is highly appreciated
    res.send(data);
    pusher.trigger("watch-leaderboard", "watch-all-leaders", data);
  }
};

exports.updateLeaderPoint = async (req, res, next) => {
  try {
    const { id: _id, point } = req.body;
    const _updated = await Leader.findByIdAndUpdate(
      { _id },
      {
        point,
      }
    );
    if (_updated) {
      const _newValue = await Leader.findById({ _id });
      const data = await Leader.find();
      // sending data back but not using in frontend ,
      // instead using data send by pusher trigger,
      // not sure if this is ideal approach, some feedbaack from reviewer is highly appreciated
      res.send(data);
      pusher.trigger("watch-leaderboard", "watch-all-leaders", data);
    }
  } catch (error) {
    throw new Error("falied to udpate leader score");
  }
};
