import prisma from "@/lib/db/prisma";

export class Stat {
  async all() {
    const stat = await prisma.locations.count();

    return stat;
  }

  async aggregateAuditing() {
    const auditing_location_stat = await prisma.locations.aggregate({
      _count: {
        auditing: true,
      },
    });

    return auditing_location_stat;
  }
}
