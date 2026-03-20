const express= require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const {listingSchema,reviewSchema } = require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");    
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");


// const validateReview = (req,res,next)=>{
//    let {error} =  reviewSchema.validate(req.body);    
//     if(error){
//       let errMsg = error.details.map((el)=> el.message).join(",");
//       throw new ExpressError(400, errMsg);
//     } else {
//       next();
//     }
// }

const reviewController = require("../controllers/reviews.js");
const review = require("../models/review.js");

// Reviews
//Reviews post route
router.post("/", isLoggedIn,reviewController.createReview);

// reviews delete route
router.delete("/:reviewId",isLoggedIn, isReviewAuthor,reviewController.destroyReview);
module.exports=router;