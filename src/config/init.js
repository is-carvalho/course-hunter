import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Course } from "../models/course.js";

console.log("🆙 Init seed...");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedPath = path.join(
  __dirname,
  "./seeds/cursos_especializacao_seed.json",
);

console.log(`👀 Start read seed ${seedPath} json file`);

const _seedData = JSON.parse(fs.readFileSync(seedPath, "utf-8"));

const seedData = _seedData.map((register) => {
  return {
    ies_code: register["Código IES"],
    institution: register["Instituição(IES)"],
    abbreviation: register["Sigla"],
    administrative_category: register["Categoria Administrativa"],
    course_code: register["Código Curso"],
    specialization_course_name:
      register["Denominação do Curso de Especialização"],
    area: register["Área"],
    modality: register["Modalidade"],
    total_hours: register["Carga Horária"],
    location: register["UF de Oferta"],
    spots: register["Vagas"],
    start_date: register["Data de início"]
      ? new Date(register["Data de início"])
      : undefined,
  };
});

console.log("👀 Init seed course collection");

await Course.deleteMany({});
await Course.insertMany(seedData);

console.log("✔ Course collection seeded");
