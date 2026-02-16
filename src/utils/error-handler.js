// Todo: Study if this file should be here on utils or be in a more specific folder

import { ResponseAdapter } from "./response-adapter";

export const errorHandle = (err, res) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error("💥 ERROR ON SYSTEM:", err);

  return ResponseAdapter.format(message, statusCode);
};
