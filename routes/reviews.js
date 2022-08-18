const router = require("express").Router();
const Reviews = require("../models/Reviews");
const { verifyTokenAndAdmin } = require("./verifyToken");

//create product
router.post("/", async (req, res) => { //verifyTokenAndAdmin
  const newReviews = new Reviews(req.body);
  try {
    const savedReviews = await newReviews.save();
    res.status(200).json(savedReviews);
  } catch {
    (err) => {
      res.status(500).json(err);
    };
  }
});

//update product
router.put("/:id", async (req, res) => {
  try {
    const updatedReviews = await Reviews.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedReviews);
  } catch {
    (err) => {
      res.status(500).json(err);
    };
  }
});

// //delete product
router.delete("/:id", async (req, res) => {
  try {
    await Reviews.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted succefully");
  } catch {
    (err) => {
      res.status(500).json(err);
    };
  }
});

// //get product
router.get("/find/:id", async (req, res) => {
  try {
    const reviews = await Reviews.findById(req.params.id);

    res.status(200).json(reviews);
  } catch {
    (err) => {
      res.status(500).json(err);
    };
  }
});

//get all product or selected product
router.get("/", async (req, res) => {
    try{

        const  reviews = await Reviews.find().sort({ createdAt: -1 }).limit(5);
        res.status(200).json(reviews)
    } catch {
        (err) => {
          res.status(500).json(err);
        };
      }

});

module.exports = router;
