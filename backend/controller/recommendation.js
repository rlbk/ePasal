const express = require("express");
const { isSeller, isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");
const Order = require("../model/order");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const monk = require('monk');




router.get('/getRecommendation', async (req, res) => {
    const recommendadtion = await Product.aggregate([
      {
        $match: {
          "ratings": { $not: { $type: "string" } },
          "category": req.query.category,
          "_id":{$ne:monk.id(req.query._id)}
        }
      },
      {
        $project: {
          name: 1,
          sold_out: 1,
          stock: 1,
          category:1,
          distance: {
            $sqrt: {
              $add: [
                { $pow: [{ $subtract: [Number(req.query.ratings), "$ratings"] }, 2] }
              ]
            }
          }
        }
      },
      {
        $match: {
          distance: { $ne: null }
        }
      },
      {
        $sort: { distance: 1 },
      },
      {
        $limit: 5
      }
    ])
  
    res.json({
      recommendadtion
    })
  })
  

  module.exports = router