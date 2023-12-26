export default class RosterDay {
  constructor({
    date,
    holiday,
    dutyColumns = {},
    value = 0,
    updateParentArray,
    updateDatabase,
    addToChangelog,
  }) {
    this.date = new Date(date);
    this.holiday = holiday;
    this.dutyColumns = dutyColumns;
    this.value = value;
    this.updateParentArray = updateParentArray;
    this.updateDatabase = updateDatabase;
    this.addToChangelog = addToChangelog;
  }

  async updateDuty({ dutyColumn, assignment, user }) {
    const oldAssignment = this.dutyColumns[dutyColumn];
    if (assignment[0] === "/") {
      if (
        this.dutyColumns[dutyColumn].length === 1 &&
        !this.dutyColumns[dutyColumn].includes(assignment.slice(1))
      ) {
        this.dutyColumns[dutyColumn].push(assignment.slice(1));
      } else {
        this.dutyColumns[dutyColumn] = [assignment.slice(1)];
      }
    } else {
      if (assignment === "") {
        this.dutyColumns[dutyColumn] = [];
      } else {
        this.dutyColumns[dutyColumn] = [assignment];
      }
    }
    this.addToChangelog({
      date: this.date,
      dutyColumn,
      assignment: this.dutyColumns[dutyColumn],
      oldAssignment,
      user,
    });
    this.updateParentArray();
    await this.updateDatabase("days");
  }
}
