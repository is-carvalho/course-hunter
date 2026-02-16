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

      const course_queries = courses.map((course) => {
        const { query, params } = getQueriesToCourses(
          course.specialization_course_name,
        );

        return {
          course: course.specialization_course_name,
          query,
          params,
        };
      });
      return { course_queries };
    }
  }
}
