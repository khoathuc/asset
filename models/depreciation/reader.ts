import {
  getDateOfBeginOfMonth,
  getDateOfEndOfMonth,
} from "@/lib/utils/datetime";
import { Location } from "@/models/location/location";

export class Reader {
  public formData?: FormData;
  public year?: number;

  constructor(formData: FormData) {
    this.formData = formData;

    return this;
  }

  private readName() {
    var name = this.formData?.get("name")?.toString();
    if (!name) {
      var period_from = this.formData?.get("period_from")?.toString();
      var period_to = this.formData?.get("period_to")?.toString();

      name = `Depreciation record - year ${this.getYear()} - Period ${period_from} - ${period_to}`;
    }

    return name;
  }

  getYear() {
    return this.year;
  }

  setYear(year: string | number) {
    const parsedYear = typeof year === "string" ? parseInt(year, 10) : year;

    if (isNaN(parsedYear) || parsedYear.toString().length !== 4) {
      throw new Error("Invalid year. Year must be a 4-digit integer.");
    }

    this.year = parsedYear;
  }

  private readEndDate() {
    const period_to = this.formData?.get("period_to")?.toString();

    if (!period_to) {
      throw new Error("Invalid period_to");
    }

    const year = this.getYear();
    if (!year) {
      throw new Error("Invalid year(2)");
    }

    const start_date = getDateOfBeginOfMonth(year, parseInt(period_to));

    if (!start_date) {
      throw new Error("Invalid start date");
    }

    return start_date;
  }

  private readStartDate() {
    const period_from = this.formData?.get("period_from")?.toString();

    if (!period_from) {
      throw new Error("Invalid period_from");
    }

    const year = this.getYear();
    if (!year) {
      throw new Error("Invalid year(2)");
    }

    const start_date = getDateOfEndOfMonth(year, parseInt(period_from));

    if (!start_date) {
      throw new Error("Invalid start date");
    }

    return start_date;
  }

  async readLocations() {
    const locations = this.formData?.get("locations")?.toString();
    if (!locations || locations.length == 0) {
      throw new Error("Empty or invalid locations");
    }

    const location_ids = JSON.parse(locations);
    location_ids.forEach(async (location_id: number) => {
      const location = await Location.loader().getById(location_id);
      if (!location) {
        throw new Error("This location is not exist");
      }

      if (!location.status) {
        throw new Error(`${location.name} is not active`);
      }
    });

    return location_ids;
  }

  private readDesc() {
    return this.formData?.get("description")?.toString();
  }

  async read() {
    const year = this.formData?.get("year")?.toString();
    if (!year) {
      throw new Error("Year of depreciation period is required");
    }
    this.setYear(year);

    const start_date = this.readStartDate();
    const end_date = this.readEndDate();

    const name = this.readName();
    const locations = await this.readLocations();
    const description = this.readDesc();

    return { name, locations, start_date, end_date, description };
  }
}
