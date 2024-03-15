// routes/api/products.js
const express = require("express");
const multer = require("multer");
const router = express.Router();
const { Product } = require("../../models/product");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Insert a record with an image without array 
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     let product = new Product({
//       name: req.body.name,
//       price: req.body.price,
//       breed: req.body.breed,
//       color: req.body.color,
//       image: req.file.filename,
//     });
//     await product.save();
//     return res.send(product);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Internal Server Error");
//   }
// });




//Insert multer 



router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    let product = new Product({
      name: req.body.name,
      price: req.body.price,
      breed: req.body.breed,
      color: req.body.color,
      images: req.files.map((file) => file.filename),
    });

    await product.save();
    return res.send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});





// Get products without array 
// router.get("/", async (req, res) => {
//   try {
//     let products = await Product.find();
//     return res.send({ products });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Internal Server Error");
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     let products = await Product.findOne({ _id: req.params.id });
//     return res.send({ products });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Internal Server Error");
//   }
// });


// // With array 

router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    return res.send({ products });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    return res.send({ product });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});







router.delete("/:id", async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  return res.send(product);
});




// // Update a record without array old method 
// router.put("/:id", upload.single("image"), async (req, res) => {
//   try {
//     let product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).send("Product not found");
//     }

//     // Update fields
//     product.name = req.body.name || product.name;
//     product.price = req.body.price || product.price;
//     product.breed = req.body.breed || product.breed;
//     product.color = req.body.color || product.color;

//     // Update image if a new one is provided
//     if (req.file) {
//       product.image = req.file.filename;
//     }

//     await product.save();
//     return res.send(product);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Internal Server Error");
//   }
// });







// Update a record with array of images
router.put("/:id", upload.array("images", 5), async (req, res) => {
  try {

    console.log("hello" ) ; 
    
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Update fields
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.breed = req.body.breed || product.breed;
    product.color = req.body.color || product.color;
    console.log("hello" ) ; 
    
   

    // Update images if new ones are provided
    if (req.files && req.files.length > 0) {

      console.log("hello" ) ; 
      console.log(req.files.name) ; 
    
      const newImages = req.files.map((file) => file.filename);
      product.images = product.images.concat(newImages);
    }

    await product.save();
    return res.send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});



module.exports = router;
