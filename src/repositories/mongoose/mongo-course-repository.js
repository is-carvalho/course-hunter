import { ICourseRepository } from "../course-repository.js";
import { Course } from "../../models/course.js";

export class MongoCourseRepository extends ICourseRepository {
  async findMany() {
    return await Course.find();
  }
}
