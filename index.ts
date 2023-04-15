import { AgencyConfig } from "./type";
import { downloadFile, extractZip, listDir, makeDir } from "./utils/files";
import { agencyFileUpload } from "./upload";
import { PrismaClient } from "@prisma/client";
import pgPromise from "pg-promise";
import dotenv from 'dotenv'


export const { parsed: CONFIG = {} } = dotenv.config();

export const prisma = new PrismaClient();
export const pgp = pgPromise()
export const pgClient = pgp(CONFIG.DATABASE_URL)

export const stlouisConfig: AgencyConfig = {
  id: "stlouis",
  name: "St Louis",
  url: "https://metrostlouis.org/Transit/google_transit.zip",
  exclude: ["directions"],
  timezone: "America/Chicago",
  route_exclusions: ["Metrolink"],
};

const main = async () => {
  makeDir(".zip");
  makeDir(".zip/csv");
  const agencies = [stlouisConfig];

  // download and extract all gtfs files
  for (const agency of agencies) {
    const fileName = `.zip/${agency.id}.zip`;
    const outDir = `.zip/csv/${agency.id}`;
    await downloadFile(agency.url, fileName);
    extractZip(fileName, outDir);
    const files = listDir(outDir).filter(
      (fileName) => !agency.exclude.includes(fileName.split(".")[0])
    );
    await agencyFileUpload(agency.id, files);
    console.log("fin");
  }
};

main();
