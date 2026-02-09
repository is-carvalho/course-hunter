import { env } from "../../../env/index.js";

const SEARCH_PARAMETERS = Object.freeze({
  date_filter: "m1",
  hq: "especialização",
  num: 10,
});

const buildQueryToCourse = (courseName) => {
  const params = new URLSearchParams();
  const URL_BASE = env.CUSTOM_SEARCH_API_URL;

  params.append("key", env.CUSTOM_SEARCH_API_KEY);
  params.append("cx", env.CUSTOM_SEARCH_API_SEARCH_ENGINE);
  params.append("dateRestrict", SEARCH_PARAMETERS.date_filter);
  params.append("hq", SEARCH_PARAMETERS.hq);
  params.append("num", String(SEARCH_PARAMETERS.num));
  params.append("q", courseName);

  return `${URL_BASE}?${params.toString()}`;
};

export const getQueriesToCourses = (courses) => {
  const queries = courses.map((course) => {
    return buildQueryToCourse(course);
  });

  return courses.map((course) => buildQueryToCourse(course));
};
