import express from "express";
import hotelController from "../controllers/hotelController";
import upload from "../middlewares/upload";

const router = express.Router();

router.post("/hotel", upload.array("images", 10), hotelController.createHotel);
router.post("/images", upload.array("images", 10), hotelController.uploadImages);
router.get("/hotel/:hotelId", hotelController.getHotel);
router.get("/hotel", hotelController.getHotels);
router.put("/hotel/:hotelId", hotelController.updateHotel);

export default router;
