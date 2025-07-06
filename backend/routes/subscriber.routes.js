import express from "express";
import {
  createSubscriber,
  //   getAllSubscribers,
  //   deleteSubscriber,
} from "../controllers/subscriber.controller.js";

const router = express.Router();

// router.get("/", getAllSubscribers);
router.post("/", createSubscriber);
// router.delete("/:id", deleteSubscriber);

export default router;
