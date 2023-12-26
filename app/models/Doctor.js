export default class Doctor {
  constructor({
    _id,
    alias,
    dutyColumns = [],
    groups = [],
    maximum = 99,
    name,
    nonWorkingDays = [],
    only12 = false,
    userGroupId,
    setParentArray,
    isManager = false,
  }) {
    this._id = _id;
    this.alias = alias;
    this.dutyColumns = dutyColumns;
    this.groups = groups;
    this.maximum = maximum;
    this.name = name;
    this.nonWorkingDays = nonWorkingDays;
    this.only12 = only12;
    this.userGroupId = userGroupId;
    this.setParentArray = setParentArray;
    this.isManager = isManager;
  }

  async updateDatabase(property, value) {
    try {
      await fetch("/api/doctors", {
        method: "PUT",
        body: JSON.stringify({
          id: this._id,
          property,
          value,
        }),
      });
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Datenbank:", error);
    }
  }

  async addDutyColumn(newColumn) {
    this.dutyColumns.push(newColumn);
    this.updateDoctorsState();
    await this.updateDatabase("dutyColumns", this.dutyColumns);
  }

  async removeDutyColumn(columnToRemove) {
    this.dutyColumns = this.dutyColumns.filter(
      (column) => column !== columnToRemove
    );
    this.updateDoctorsState();
    await this.updateDatabase("dutyColumns", this.dutyColumns);
  }

  async addGroup(newGroup) {
    this.groups.push(newGroup);
    this.updateDoctorsState();
    await this.updateDatabase("groups", this.groups);
  }

  async removeGroup(groupToRemove) {
    this.groups = this.groups.filter((group) => group !== groupToRemove);
    this.updateDoctorsState();
    await this.updateDatabase("groups", this.groups);
  }

  async updateMaximum(newMaximum) {
    this.maximum = newMaximum;
    this.updateDoctorsState();
    await this.updateDatabase("maximum", this.maximum);
  }

  async addNonWorkingDay(newDay) {
    this.nonWorkingDays.push(newDay);
    this.updateDoctorsState();
    await this.updateDatabase("nonWorkingDays", this.nonWorkingDays);
  }

  async removeNonWorkingDay(dayToRemove) {
    this.nonWorkingDays = this.nonWorkingDays.filter(
      (day) => day !== dayToRemove
    );
    this.updateDoctorsState();
    await this.updateDatabase("nonWorkingDays", this.nonWorkingDays);
  }

  async toggleOnly12() {
    this.only12 = !this.only12;
    this.updateDoctorsState();
    await this.updateDatabase("only12", this.only12);
  }

  async toggleIsManager() {
    this.isManager = !this.isManager;
    this.updateDoctorsState();
    await this.updateDatabase("isManager", this.isManager);
  }

  updateDoctorsState() {
    if (this.setParentArray) {
      this.setParentArray((prevArray) => {
        const updatedDoctorsArray = [...prevArray];
        const index = updatedDoctorsArray.findIndex(
          (doctor) => doctor._id === this._id
        );
        if (index !== -1) {
          updatedDoctorsArray[index] = this;
        }
        return updatedDoctorsArray;
      });
    }
  }

  async deleteSelf() {
    if (this.setParentArray) {
      this.setParentArray((prevArray) =>
        prevArray.filter((doctor) => doctor._id !== this._id)
      );
    }

    try {
      await fetch("/api/doctors", {
        method: "DELETE",
        body: JSON.stringify({ id: this._id }),
      });
    } catch (error) {
      console.error("Fehler beim Löschen aus der Datenbank:", error);
    }
  }
}
