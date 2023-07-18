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
  }

  addDutyColumn(newColumn) {
    this.dutyColumns.push(newColumn);
    this.updateDoctorsState();

    fetch("/api/doctors", {
        method: "POST",
        body: JSON.stringify({
          id: this._id,
          property: "dutyColumns",
          value: this.dutyColumns,
        }),
      });
  }

  removeDutyColumn(columnToRemove) {
    this.dutyColumns = this.dutyColumns.filter(
      (column) => column !== columnToRemove
    );
    this.updateDoctorsState();

    fetch("/api/doctors", {
        method: "POST",
        body: JSON.stringify({
          id: this._id,
          property: "dutyColumns",
          value: this.dutyColumns,
        }),
      });
  }

  addGroup(newGroup) {
    this.groups.push(newGroup);
    this.updateDoctorsState();

    fetch("/api/doctors", {
        method: "POST",
        body: JSON.stringify({
          id: this._id,
          property: "groups",
          value: this.groups,
        }),
      });
  }

  removeGroup(groupToRemove) {
    this.groups = this.groups.filter((group) => group !== groupToRemove);
    this.updateDoctorsState();

    fetch("/api/doctors", {
        method: "POST",
        body: JSON.stringify({
          id: this._id,
          property: "groups",
          value: this.groups,
        }),
      });
  }

  updateMaximum(newMaximum) {
    this.maximum = newMaximum;
    this.updateDoctorsState();

    fetch("/api/doctors", {
        method: "POST",
        body: JSON.stringify({
          id: this._id,
          property: "maximum",
          value: this.maximum,
        }),
      });
  }

  addNonWorkingDay(newDay) {
    this.nonWorkingDays.push(newDay);
    this.updateDoctorsState()

    fetch("/api/doctors", {
        method: "POST",
        body: JSON.stringify({
          id: this._id,
          property: "nonWorkingDays",
          value: this.nonWorkingDays,
        }),
      });
  }

  removeNonWorkingDay(dayToRemove) {
    this.nonWorkingDays = this.nonWorkingDays.filter(
      (day) => day !== dayToRemove
    );
    this.updateDoctorsState();

    fetch("/api/doctors", {
        method: "POST",
        body: JSON.stringify({
          id: this._id,
          property: "nonWorkingDays",
          value: this.nonWorkingDays,
        }),
      });
  }

  toggleOnly12() {
    this.only12 = !this.only12;
    this.updateDoctorsState();

    fetch("/api/doctors", {
        method: "POST",
        body: JSON.stringify({
          id: this._id,
          property: "only12",
          value: this.only12,
        }),
      });
  }

  updateDoctorsState() {
    if (this.setParentArray) {
      this.setParentArray(prevArray => {
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

  deleteSelf() {
    if (this.setParentArray) {
      this.setParentArray(prevArray => prevArray.filter(
        (doctor) => doctor._id !== this._id
      ));
    }

    fetch("/api/doctors", {
        method: "DELETE",
        body: JSON.stringify({id: this._id})
      })
  }
}
