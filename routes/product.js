const router = require("express").Router();
const Product = require("../models/Products");
const { verifyTokenAndAdmin } = require("./verifyToken");

//create product
router.post("/", async (req, res) => { //verifyTokenAndAdmin
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch {
    (err) => {
      res.status(500).json(err);
    };
  }
});

//update product
router.put("/:id", async (req, res) => {
  try {
    const updatedProdut = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProdut);
  } catch {
    (err) => {
      res.status(500).json(err);
    };
  }
});

// //delete product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
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
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch {
    (err) => {
      res.status(500).json(err);
    };
  }
});

//get all product or selected product
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCat = req.query.category;
  const qBrand = req.query.brand;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCat) {
      products = await Product.find({
        category: { $in: [qCat] },
      });
    } else if (qBrand) {
      products = await Product.find({
        brand: { $in: qBrand },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch {
    (err) => {
      res.status(500).json(err);
    };
  }
});

router.get('/brand/:brandId',async (req, res)=>{

  try{

    const brandId = req.params.brandId;
    const products = await Product.find({brand : brandId});
    res.status(200).json(products);
  }
  catch(er){
    console.log(er);
    res.status(500).json(er)
  }

})


module.exports = router;
