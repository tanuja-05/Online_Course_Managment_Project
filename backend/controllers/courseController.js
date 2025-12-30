import Course from '../models/courseModel.js';

export const createCourse = async(req,res) => {
    try {
        const {courseCode, courseName, category, duration} = req.body;
        const newCourse = new Course({
            courseCode,
            courseName,
            category,
            duration
        })

        await newCourse.save();
        res.status(201)
        .json({
            message: 'Course created successfully...',
            newCourse
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error! While creating course...',
            error: error.message
        })
    }
}

export const getAllCourses = async(req,res) => {
    try {
        const courses = await Course.find({});
        res.status(200)
        .json({
            message: 'Courses fetched successfully...',
            courses
        })
    } catch (error) {
        res.staus(500)
        .json({
            message: 'Error! While fetching courses...',
            error: error.message
        })
    }
}

export const getCourseById = async(req,res) => {
    try {
        const {id} = req.params;
        const course = await Course.findById(id);

        if(!course){
            return res.status(404)
            .json({
                message: `Course with id ${id} not found`
            })
        }

        res.status(200)
        .json({
            message: `Course with id ${id} fetched successfully...`,
            course
        })
    } catch (error) {
        res.status(500)
        .json({
            message: 'Error! While fetching course by id...',
            error: error.message
        })
    }
}

export const updateCourseById = async(req,res) => {
    try {
        const {id} = req.params;

        const updatedCourse = await Course.findByIdAndUpdate(id, 
            {$set: req.body}, 
            {new: true}, 
            {runValidators: true}
        );

        if(!updatedCourse){
            return res.status(404)
            .json({
                message: `Course with id ${id} not found`
            })
        }

        res.status(200)
        .json({
            messsage: `Course with id ${id} updated successfully...`,
            updatedCourse
        });
    } catch (error) {
        res.status(500)
        .json({
            message: 'Error! While updating course by id...',
            error: error.message
        })
    }
}

export const deleteCourseById = async(req,res) => {
    try {
        const {id} = req.params;
        const deletedCourse = await Course.findByIdAndDelete(id);

        if(!deletedCourse){
            return res.status(404)
            .json({
                message: `Course with id ${id} not found`
            })
        }

        res.status(200)
        .json({
            message: `Course with id ${id} deleted successfully...`,
            deletedCourse
        })
    } catch (error) {
        res.status(500)
        .json({
            message: 'Error! While deleting course by id...',
            error: error.message
        })
    }
}