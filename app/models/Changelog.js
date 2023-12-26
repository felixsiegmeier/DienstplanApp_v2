export default class Changelog{
    constructor({
        date,
        dutyColumn,
        oldAssignment,
        assignment, 
        user
    }){
        this.date = date;
        this.dutyColumn = dutyColumn;
        this.oldAssignment = oldAssignment;
        this.assignment = assignment;
        this.user = user.name;
        this.timestamp = Date.now();
    }
}