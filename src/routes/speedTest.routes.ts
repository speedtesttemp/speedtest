import { Router } from "express";
import speedTestController from "../controller/speedTest.controller";
const router = Router();

router.get("/", speedTestController.getSpeedTest);

router.get("/myIPs", speedTestController.getMyIPs);

router.get("/all", speedTestController.getAll);

module.exports = router;
