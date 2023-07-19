export default class RosterDoctor{
    constructor({
        _id,
        name,
        blacklist,
        greenlist,
        duties,
        weekends,
        points,
        updateParentArray,
        updateDatabase
    }){
        this._id = _id;
        this.name = name;
        this.blacklist = blacklist;
        this.greenlist = greenlist;
        this.duties = duties;
        this.weekends = weekends;
        this.points = points;
        this. updateParentArray = updateParentArray;
        this.updateDatabase = updateDatabase;
    }

async addToDoctorBlacklist(entry) {
    this.blacklist.push(entry);
    this.updateParentArray();
    await this.updateDatabase("doctors", this.doctors);
  }
  
  async removeFromDoctorBlacklist(entryToRemove) {
    this.blacklist = this.blacklist.filter((entry) => entry !== entryToRemove);
    this.updateParentArray();
    await this.updateDatabase("doctors", this.doctors);
  }
  
  async addToDoctorGreenlist(entry) {
    this.greenlist.push(entry);
    this.updateParentArray();
    await this.updateDatabase("doctors", this.doctors);
  }
  
  async removeFromDoctorGreenlist(entryToRemove) {
    this.greenlist = this.greenlist.filter((entry) => entry !== entryToRemove);
    this.updateParentArray();
    await this.updateDatabase("doctors", this.doctors);
  }
  
  async addToDoctorDuties(entry) {
    this.duties.push(entry);
    this.updateParentArray();
    await this.updateDatabase("doctors", this.doctors);
  }
  
  async removeFromDoctorDuties(entryToRemove) {
    this.duties = this.duties.filter((entry) => entry !== entryToRemove);
    this.updateParentArray();
    await this.updateDatabase("doctors", this.doctors);
  }
  
  async addToDoctorWeekends(entry) {
    this.weekends.push(entry);
    this.updateParentArray();
    await this.updateDatabase("doctors", this.doctors);
  }
  
  async removeFromDoctorWeekends(entryToRemove) {
    this.weekends = this.weekends.filter((entry) => entry !== entryToRemove);
    this.updateParentArray();
    await this.updateDatabase("doctors", this.doctors);
  }
  
  async addPointsToDoctor(points) {
    this.points += points;
    this.updateParentArray();
    await this.updateDatabase("doctors", this.doctors);
  }
  
  async subtractPointsFromDoctor(points) {
    this.points -= points;
    this.updateParentArray();
    await this.updateDatabase("doctors", this.doctors);
  }
  
}