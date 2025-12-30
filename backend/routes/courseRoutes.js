import express from "express";
import { createCourse, deleteCourseById, getAllCourses, getCourseById, updateCourseById } from "../controllers/courseController.js";

const router = express.Router();

router.post('/courses', createCourse);
router.get('/courses', getAllCourses);
router.get('/courses/:id', getCourseById);
router.put('/courses/:id', updateCourseById);
router.delete('/courses/:id', deleteCourseById);

export default router;