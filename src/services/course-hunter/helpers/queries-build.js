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

  const query = `${URL_BASE}?${params.toString()}`;

  return {
    query,
    params,
  };
};

export const getQueriesToCourses = (course) => {
  const { query, params } = buildQueryToCourse(course);

  return {
    query,
    params,
  };
};
