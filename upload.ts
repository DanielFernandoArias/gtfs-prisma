import { prisma } from "./index";
import csvtojson from "csvtojson";

const agencyImport = async (agencyId: string, fileLoc: string) => {
  const json = await csvtojson({
    checkType: true,
  }).fromFile(`.zip/csv/${agencyId}/${fileLoc}`);

  console.log(json);

  await prisma.agency.createMany({
    data: json.map((el) => {
      return {
        tc_agency_id: agencyId,
        id: el.id,
        agency_id: el.agency_id,
        agency_name: el.agency_name,
        agency_url: el.agency_url,
        agency_timezone: el.agency_timezone,
        agency_lang: el.agency_lang,
        agency_phone: el.agency_phone,
        agency_fare_url: el.agency_fare_url,
        agency_email: el.agency_email,
        updated_at: new Date(),
      };
    }),
  });
};

export const agencyFileUpload = async (outDir: string, fileLocs: string[]) => {
  for (const fileName of fileLocs) {
    switch (fileName) {
      case "agency.txt":
        await agencyImport(outDir, fileName);
        break;
      case "calendar.txt":
        break;
      case "calendar_dates.txt":
        break;
      case "routes.txt":
        break;
      case "shapes.txt":
        break;
      case "stop_times.txt":
        break;
      case "stops.txt":
        break;
      case "transfers.txt":
        break;
      case "trips.txt":
        break;
      case "value":
        break;

      default:
        break;
    }
  }
};
