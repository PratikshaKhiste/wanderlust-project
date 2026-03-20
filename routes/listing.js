const express= require("express");
const router = express.Router();
const {listingSchema,reviewSchema } = require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const wrapAsync = require("../utils/wrapAsync.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
.get(listingController.index) // Index Route
.post(isLoggedIn,
    validateListing,             // create route  
    upload.single('listing[image]'),
    listingController.createListing);


// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm
);

router.route("/:id")
.get(listingController.showListing) // show route
.put(isLoggedIn, 
    isOwner, 
    upload.single('listing[image]'),
    validateListing,
    listingController.updateListing)  
.delete(isLoggedIn,
    isOwner,
    listingController.destroyListing);

// Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,listingController.renderEditForm);

module.exports=router;