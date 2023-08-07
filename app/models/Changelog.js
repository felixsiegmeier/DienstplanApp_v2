export default class Changelog{
    constructor({
        date,
        dutyColumn,
        oldAssignment,
        newAssignment
    }){
        this.date = date;
        this.dutyColumn = dutyColumn;
        this.oldAssignment = oldAssignment;
        this.newAssignment = newAssignment;
        this.timestamp = new Date.now();
    }
}