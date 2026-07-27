import { clerkClient, getAuth } from "@clerk/express";
import { v2 as cloudinary} from "cloudinary";
import Course from "../models/Course.js";


// Update role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    const auth = getAuth(req);

    // console.log("Auth:", auth.userId);

    const userId = auth.userId;

    // console.log("User ID:", userId);

    return res.json({
      success: true,
      userId,
      auth,
    });

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
      msg:'updateRoleToEducator'
    })
  }
}

// Add new course
export const addCourse = async (req, res) => {
  try {
    // Get logged-in user
    const { userId: educatorId } = getAuth(req);

    console.log("Educator ID:", educatorId);

    if (!educatorId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { courseData } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail Not Attached",
      });
    }

    const parsedCourseData = JSON.parse(courseData);
    parsedCourseData.educator = educatorId;

    const newCourse = await Course.create(parsedCourseData);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    newCourse.courseThumbnail = imageUpload.secure_url;

    await newCourse.save();

    return res.status(200).json({
      success: true,
      message: "Course Added Successfully",
      course: newCourse,
    });

  } catch (error) {
    console.error("Add Course Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};