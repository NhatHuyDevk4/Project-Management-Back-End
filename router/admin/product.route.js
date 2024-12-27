const express = require("express");
// Thằng multer là thư viện dùng để upload file
const multer = require("multer");
const router = express.Router();
const storageMulter = require("../../helpers/storageMulter.helpers");
const upload = multer({ storage: storageMulter() });

const controller = require("../../controller/admin/product.controller");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);

// upload.single("thumbnail") means upload only one file with the name "thumbnail"
router.post("/create", upload.single("thumbnail"), controller.createPost);

module.exports = router;
