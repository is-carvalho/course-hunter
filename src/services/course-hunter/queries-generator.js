import { getQueriesToCourses } from "./helpers/queries-build.js";

export class QueryGenerator {
  #courseRepository;
  constructor(courseRepository) {
    this.#courseRepository = courseRepository;
  }

  async execute() {
    {
      const courses = await this.#courseRepository.findMany();

      if (!courses.length) {
        throw new Error("courses repository is empty");
      }

      const queries = courses.map((course) => {
        getQueriesToCourses(course.specialization_course_name);
      });
      return { queries };
    }
  }
}
