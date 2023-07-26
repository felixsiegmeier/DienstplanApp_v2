export default class RosterDay{
    constructor({
        date,
        holiday,
        dutyColumns = {},
        value = 0,
        updateParentArray,
        updateDatabase
    }){
        this.date = new Date(date);
        this.holiday = holiday;
        this.dutyColumns = dutyColumns;
        this.value = value;
        this. updateParentArray = updateParentArray;
        this.updateDatabase = updateDatabase;
    }

    async updateDuty(dutyColumn, assignment) {
        if (assignment[0] === "/"){
            if(this.dutyColumns[dutyColumn].length === 1 && !this.dutyColumns[dutyColumn].includes(assignment.slice(1))){
                this.dutyColumns[dutyColumn].push(assignment.slice(1))
            } else {
                this.dutyColumns[dutyColumn] = [assignment.slice(1)]
            }
        } else {
            this.dutyColumns[dutyColumn] = [assignment]
        }
        this.updateParentArray();
        await this.updateDatabase("days");
      }
    
}