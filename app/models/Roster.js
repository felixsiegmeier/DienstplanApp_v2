import Changelog from "@/app/models/Changelog";
import RosterDay from "./RosterDay";
import RosterDoctor from "./RosterDoctor";
import compareArrays from "../lib/compareArrays";

export default class Roster {
  constructor({
    _id,
    name,
    year,
    month,
    userGroupId,
    doctors = [],
    visible = true,
    wishOpen = true,
    days = [],
    changelog = {
      resetTimestamp: Date.now(),
      log: []
    },
    setParentArray,
  }) {
    this._id = _id;
    this.name = name;
    this.year = year;
    this.month = month;
    this.userGroupId = userGroupId;
    this.doctors = doctors.map((doctorData) => new RosterDoctor({...doctorData, updateParentArray: this.updateParentArray.bind(this), updateDatabase: this.updateDatabase.bind(this)}));
    this.visible = visible;
    this.wishOpen = wishOpen;
    this.days = days.map((dayData) => new RosterDay({...dayData, updateParentArray: this.updateParentArray.bind(this), updateDatabase: this.updateDatabase.bind(this), addToChangelog: this.addToChangelog.bind(this)}));
    this.changelog = changelog;
    this.setParentArray = setParentArray;
  }

  async updateDatabase(property) {
    try {
      await fetch("/api/rosters", {
        method: "PUT",
        body: JSON.stringify({
          id: this._id,
          property,
          value: this[property],
        }),
      });
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Datenbank:", error);
    }
  }

  async toggleVisible() {
    this.visible = !this.visible;
    this.updateParentArray();
    await this.updateDatabase("visible");
  }

  async toggleWishOpen() {
    this.wishOpen = !this.wishOpen;
    this.updateParentArray();
    await this.updateDatabase("wishOpen");
  }

  async addDoctor(doctor) {
    this.doctors.push(doctor);
    this.updateParentArray();
    await this.updateDatabase("doctors");
  }

  async removeDoctor(doctorId) {
    this.doctors = this.doctors.filter((doctor) => doctor._id !== doctorId);
    this.updateParentArray();
    await this.updateDatabase("doctors");
  }

  async addDay(newDay) {
    this.days.push(newDay);
    this.updateParentArray();
    await this.updateDatabase("days");
  }j

  async addToChangelog({date, dutyColumn, assignment, oldAssignment, user}) {
    if(compareArrays(assignment, oldAssignment)){return}
    const newChangelog = new Changelog({date, dutyColumn, oldAssignment, assignment, user})
    this.changelog.log.push(newChangelog);
    this.updateParentArray();
    await this.updateDatabase("changelog");
  }

  async resetChangelog() {
    this.changelog.resetTimestamp = Date.now();
    this.updateParentArray();
    await this.updateDatabase("changelog");
  }

  updateParentArray() {
    if (this.setParentArray) {
      this.setParentArray((prevArray) => {
        const updatedArray = prevArray.map((roster) => {
          if (roster._id === this._id) {
            return this;
          }
          return roster;
        });
        return updatedArray;
      });
    }
  }

  async deleteSelf() {
    if (this.setParentArray) {
      this.setParentArray((prevArray) =>
        prevArray.filter((roster) => roster._id !== this._id)
      );
    }

    try {
      await fetch("/api/rosters", {
        method: "DELETE",
        body: JSON.stringify({ id: this._id }),
      });
    } catch (error) {
      console.error("Fehler beim Löschen aus der Datenbank:", error);
    }
  }
}
