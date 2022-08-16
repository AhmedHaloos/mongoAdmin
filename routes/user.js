const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJs = require("crypto-js");
const router = require("express").Router();
const User = require("../models/Users");

//update user
router.put("/:id", async (req, res) => {  //verifyTokenAndAuthorization
  if (req.body.password) {
    req.body.password = CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PSS_SEC
    ).toString();
  }
  try {
    const updtaUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updtaUser);
  } catch {
    (err) => {
      res.status(500).json(err);
    };
  }
});

//delete user
router.delete("/:id", async (req, res) => {//verifyTokenAndAuthorization
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted succefully");
  } catch {
    (err) => {
      res.status(500).json(err);
    };
  }
});

//get user
router.get("/find/:id", async (req, res) => { //verifyTokenAndAdmin
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch {
    (err) => {
      res.status(500).json(err);
    };
  }
});

//get all user
router.get("/", async (req, res) => {//verifyTokenAndAdmin
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json(users);
  } catch {
    (err) => {
      res.status(500).json(err);
    };
  }
});

//get state
router.get("/stat", async (req, res) => {  //verifyTokenAndAdmin
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: { month: { $month: "$createdAt" } },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch {
    (err) => {
      res.status(500).json(err);
    };
  }
});

module.exports = router;
