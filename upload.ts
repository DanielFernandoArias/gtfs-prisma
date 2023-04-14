import { prisma } from "./index";
import csvtojson from "csvtojson";

const colParser = {
  service_id: "string",
  route_id: "string",
  route_short_name: "string",
  route_long_name: "string",
  network_id: "string",
  route_text_color: "string",
  route_color: "string",
  shape_id: "string",
  stop_id:"string",
  stop_code: "string",
  wheelchair_boarding: "string",
  tc_agency_id: "string",
  stop_name: "string",
  tts_stop_name: "string",
  stop_desc: "string",
  stop_lat: "string",
  stop_lon: "string",
  zone_id: "string",
  stop_url: "string",
  location_type: "string",
  parent_station: "string",
  stop_timezone: "string",
  level_id: "string",
  platform_code: "string",
  from_stop_id: "string",   
  to_stop_id: "string",     
  from_route_id: "string",  
  to_route_id: "string",    
  from_trip_id: "string",   
  to_trip_id: "string",    
  trip_id:"string",                 
  trip_headsign:"string",       
  trip_short_name:"string",     
  direction_id:"string",     
  block_id:"string",            
  wheelchair_accessible:"string",
  bikes_allowed:"string",          
};

const agencyImport = async (agencyId: string, fileLoc: string) => {
  const json = await csvtojson({
    colParser,
    checkType: true,
  }).fromFile(`.zip/csv/${agencyId}/${fileLoc}`);

  await prisma.$transaction([
    prisma.agency.deleteMany({
      where: { tc_agency_id: agencyId },
    }),
    prisma.agency.createMany({
      data: json.map((el) => {
        return {
          ...el,
          tc_agency_id: agencyId,
          updated_at: new Date(),
        };
      }),
    }),
  ]);
};
const calendarImport = async (agencyId: string, fileLoc: string) => {
  const json = await csvtojson({
    colParser,
    checkType: true,
  }).fromFile(`.zip/csv/${agencyId}/${fileLoc}`);

  await prisma.$transaction([
    prisma.calendar.deleteMany({
      where: { tc_agency_id: agencyId },
    }),
    prisma.calendar.createMany({
      data: json.map((el) => {
        return {
          ...el,
          tc_agency_id: agencyId,
          updated_at: new Date(),
        };
      }),
    }),
  ]);
};

const calendarDatesImport = async (agencyId: string, fileLoc: string) => {
  const json = await csvtojson({
    colParser,
    checkType: true,
  }).fromFile(`.zip/csv/${agencyId}/${fileLoc}`);
  await prisma.$transaction([
    prisma.calendar_dates.deleteMany({
      where: { tc_agency_id: agencyId },
    }),
    prisma.calendar_dates.createMany({
      data: json.map((el) => {
        return {
          ...el,
          tc_agency_id: agencyId,
          updated_at: new Date(),
        };
      }),
    }),
  ]);
};
const routesImport = async (agencyId: string, fileLoc: string) => {
  const json = await csvtojson({
    colParser,
    checkType: true,
  }).fromFile(`.zip/csv/${agencyId}/${fileLoc}`);
  await prisma.$transaction([
    prisma.routes.deleteMany({
      where: { tc_agency_id: agencyId },
    }),
    prisma.routes.createMany({
      data: json.map((el) => {
        return {
          ...el,
          tc_agency_id: agencyId,
          updated_at: new Date(),
        };
      }),
    }),
  ]);
};
const shapesImport = async (agencyId: string, fileLoc: string) => {
  const json = await csvtojson({
    colParser,
    checkType: true,
  }).fromFile(`.zip/csv/${agencyId}/${fileLoc}`);
  await prisma.$transaction([
    prisma.shapes.deleteMany({
      where: { tc_agency_id: agencyId },
    }),
    prisma.shapes.createMany({
      data: json.map((el) => {
        return {
          ...el,
          tc_agency_id: agencyId,
          updated_at: new Date(),
        };
      }),
    }),
  ]);
};
const stopTimesImport = async (agencyId: string, fileLoc: string) => {
  const json = await csvtojson({ colParser, checkType: true }).fromFile(
    `.zip/csv/${agencyId}/${fileLoc}`
  );

  const bulkAdds = (json: any[]) => {
    const adds = [];

    for (let i = 0; i <= json.length; i + 1000) {
      adds.push(
        prisma.stop_times.createMany({
          data: json
            .slice(i, i + 1000 < json.length ? i : json.length)
            .map((el) => {
              return {
                ...el,
                tc_agency_id: agencyId,
                updated_at: new Date(),
              };
            }),
        })
      );
    }

    return adds;
  };

  await prisma.$transaction([
    prisma.stop_times.deleteMany({
      where: { tc_agency_id: agencyId },
    }),
    ...bulkAdds(json),
  ]);
};
const stopsImport = async (agencyId: string, fileLoc: string) => {
  const json = await csvtojson({ colParser, checkType: true }).fromFile(
    `.zip/csv/${agencyId}/${fileLoc}`
  );
  await prisma.$transaction([
    prisma.stops.deleteMany({
      where: { tc_agency_id: agencyId },
    }),
    prisma.stops.createMany({
      data: json.map((el) => {
        return {
          ...el,
          tc_agency_id: agencyId,
          updated_at: new Date(),
        };
      }),
    }),
  ]);
};
const transfersImport = async (agencyId: string, fileLoc: string) => {
  const json = await csvtojson({ colParser, checkType: true }).fromFile(
    `.zip/csv/${agencyId}/${fileLoc}`
  );
  await prisma.$transaction([
    prisma.transfers.deleteMany({
      where: { tc_agency_id: agencyId },
    }),
    prisma.transfers.createMany({
      data: json.map((el) => {
        return {
          ...el,
          tc_agency_id: agencyId,
          updated_at: new Date(),
        };
      }),
    }),
  ]);
};
const tripsImport = async (agencyId: string, fileLoc: string) => {
  const json = await csvtojson({ colParser, checkType: true }).fromFile(
    `.zip/csv/${agencyId}/${fileLoc}`
  );
  await prisma.$transaction([
    prisma.trips.deleteMany({
      where: { tc_agency_id: agencyId },
    }),
    prisma.trips.createMany({
      data: json.map((el) => {
        return {
          ...el,
          tc_agency_id: agencyId,
          updated_at: new Date(),
        };
      }),
    }),
  ]);
};

export const agencyFileUpload = async (outDir: string, fileLocs: string[]) => {
  for (const fileName of fileLocs) {
    console.log(`start of ${fileName}`);
    switch (fileName) {
      case "agency.txt":
        await agencyImport(outDir, fileName);
        break;
      case "calendar.txt":
        await calendarImport(outDir, fileName);
        break;
      case "calendar_dates.txt":
        await calendarDatesImport(outDir, fileName);
        break;
      case "routes.txt":
        await routesImport(outDir, fileName);
        break;
      case "shapes.txt":
        await shapesImport(outDir, fileName);
        break;
      // case "stop_times.txt":
      //   await stopTimesImport(outDir, fileName);
      //   break;
      case "stops.txt":
        await stopsImport(outDir, fileName);
        break;
      case "transfers.txt":
        await transfersImport(outDir, fileName);
        break;
      case "trips.txt":
        await tripsImport(outDir, fileName);
        break;
      default:
        console.log("unknown file");
        break;
    }
    console.log(`end of ${fileName}`);
  }
};
