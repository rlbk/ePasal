const express = require("express");
const router = express.Router();
const Product = require("../model/product");

router.get("/getRecommendation", async (req, res) => {
  let product = await Product.updateMany({}, [
    {
      $addFields: {
        reviewsCount: {
          $convert: {
            input: { $size: "$reviews" },
            to: "int",
          },
        },
      },
    },
  ]);
  if (product) {
    const result = await Product.findOne({ _id: req.query._id });

    const recommendation = await Product.aggregate([
      {
        $match: {
          rating: { $not: { $type: "string" } },
          reviewsCount: { $not: { $type: "string" } },
          category: result.category,
          _id: { $ne: result._id },
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          tags: 1,
          originalPrice: 1,
          discountPricea: 1,
          stock: 1,
          images: 1,
          shopId: 1,
          shop: 1,
          sold_out: 1,
          ratings: 1,
          reviews: 1,
          category: 1,
          reviewsCount: 1,
          distance: {
            $sqrt: {
              $add: [
                {
                  $pow: [
                    {
                      $subtract: [
                        Number(result.reviewsCount),
                        Number("$reviewsCount"),
                      ],
                    },
                    2,
                  ],
                },
                {
                  $pow: [
                    { $subtract: [Number(result.ratings), Number("$ratings")] },
                    2,
                  ],
                },
              ],
            },
          },
        },
      },
      {
        $match: {
          distance: { $ne: null },
        },
      },
      {
        $sort: { distance: 1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.json({
      recommendation,
    });
  }
});

module.exports = router;
