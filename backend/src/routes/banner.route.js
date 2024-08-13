import { Router } from "express";
import { addBanner, getBanner, updateBanner } from "../controllers/banner.controller.js";

const router=Router()
router.route('/')
            .post(addBanner)
            .get(getBanner)
            .patch(updateBanner)


export default router