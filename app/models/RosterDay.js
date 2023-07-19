export default class RosterDay{
    constructor({
        date,
        holiday,
        dutyColumns,
        value = 0,
        updateParentArray,
        updateDatabase
    }){
        this.date = date;
        this.holiday = holiday;
        this.dutyColumns = dutyColumns;
        this.value = value;
        this. updateParentArray = updateParentArray;
        this.updateDatabase = updateDatabase;
    }

    async updateDuty(dutyColumn, assignment) {
        this.dutyColumns[dutyColumn] = assignment;
        this.updateParentArray();
        await this.updateDatabase("days", this.days);
      }
    
}