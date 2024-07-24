const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController  = require("../controller/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
    //index route
    .get(wrapAsync(listingController.index))
    //create route
    .post(
        isLoggedIn, 
        upload.single('listing[image]'),
        // validateListing,
        wrapAsync(listingController.create)
    );

//New route
router.get("/new",isLoggedIn, listingController.new );

router.route("/:id")
    //show route
    .get(wrapAsync(listingController.show))
    //Update route
    .put(
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        // validateListing,
        wrapAsync(listingController.update),)
    // Delete route
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.delete));

//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.edit));

module.exports = router;
