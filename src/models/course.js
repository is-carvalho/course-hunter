import { mongoose } from "../config/database.js";
const { Schema } = mongoose;

const CourseSchema = new Schema(
  {
    ies_code: { type: Number, required: true },
    institution: { type: String, required: true },
    abbreviation: { type: String, required: true },
    administrative_category: { type: String, required: true },
    course_code: { type: Number, required: true },
    specialization_course_name: { type: String, required: true },
    area: { type: String, required: true },
    modality: { type: String, required: true },
    total_hours: { type: Number, required: false },
    location: { type: String, required: true },
    spots: { type: Number, required: false },
    start_date: { type: Date, required: false },
  },
  {
    collection: "course",
  },
);

export const Course = mongoose.model("Course", CourseSchema);
