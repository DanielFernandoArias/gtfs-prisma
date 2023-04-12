import { FeatureCollection, Point } from "geojson";
import { ImportConfig } from "gtfs/@types";

export type AgencyConfig = {
  id: string;
  name: string;
  timezone: string;
  exclude: string[];
  url: string;
  route_exclusions: string[];
};

export type ImportConfigPlus = ImportConfig & {
  exportPath: string;
};
