import { getQueriesToCourses } from "./helpers/queries-build.js";

export type CourseQuery = {
  course: string;
  query: string;
  params: URLSearchParams;
};

export class QueryGenerator {
  #courseRepository;
  constructor(courseRepository: any) {
    this.#courseRepository = courseRepository;
  }

  async execute() {
    {
      const courses = await this.#courseRepository.findMany();

      if (!courses.length) {
        throw new Error("courses repository is empty");
      }

      const course_queries: CourseQuery[] = courses.map((course: any) => {
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
