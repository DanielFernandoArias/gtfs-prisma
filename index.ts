import { AgencyConfig } from "./type";
import http from "http";
import fs from "fs";
import { downloadFile, extractZip, makeDir } from "./utils/files";

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
  for (const agency of agencies) {
    const fileName = `.zip/${agency.id}.zip`;
    const outDir = `.zip/csv/${agency.id}`;
    await downloadFile(agency.url, fileName);
    extractZip(fileName, outDir);
  }
};



main();
