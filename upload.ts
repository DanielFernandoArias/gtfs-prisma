import { prisma } from "./index";
import csvtojson from "csvtojson";

const agencyImport = async (agencyId: string, fileLoc: string) => {
  const json = await csvtojson({
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
  const json = await csvtojson({ checkType: true }).fromFile(
    `.zip/csv/${agencyId}/${fileLoc}`
  );
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
  const json = await csvtojson({ checkType: true }).fromFile(
    `.zip/csv/${agencyId}/${fileLoc}`
  );
  await prisma.$transaction([
    prisma.routes.deleteMany({
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
const shapesImport = async (agencyId: string, fileLoc: string) => {
  const json = await csvtojson({ checkType: true }).fromFile(
    `.zip/csv/${agencyId}/${fileLoc}`
  );
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
  const json = await csvtojson({ checkType: true }).fromFile(
    `.zip/csv/${agencyId}/${fileLoc}`
  );
  await prisma.$transaction([
    prisma.stop_times.deleteMany({
      where: { tc_agency_id: agencyId },
    }),
    prisma.stop_times.createMany({
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
const stopsImport = async (agencyId: string, fileLoc: string) => {
  const json = await csvtojson({ checkType: true }).fromFile(
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
  const json = await csvtojson({ checkType: true }).fromFile(
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
  const json = await csvtojson({ checkType: true }).fromFile(
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
      case "stop_times.txt":
        await stopTimesImport(outDir, fileName);
        break;
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
        break;
    }
  }
};
