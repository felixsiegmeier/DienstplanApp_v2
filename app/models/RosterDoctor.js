export default class RosterDoctor{
    constructor({
        _id,
        name,
        dutyColumns = [],
        blacklist = [],
        greenlist = [],
        duties = [],
        weekends = [],
        points = 0,
        updateParentArray,
        updateDatabase
    }){
        this._id = _id;
        this.name = name;
        this.dutyColumns = dutyColumns;
        this.blacklist = blacklist.map(wish => new Date(wish));
        this.greenlist = greenlist.map(wish => new Date(wish));
        this.duties = duties.map(wish => new Date(wish));
        this.weekends = weekends.map(wish => new Date(wish));
        this.points = points;
        this. updateParentArray = updateParentArray;
        this.updateDatabase = updateDatabase;
    }

    async addToDoctorBlacklist(entry) {
      if (!this.isInBlacklist(entry)) {
        this.blacklist.push(entry);
        this.removeFromDoctorGreenlist(entry);
        this.updateParentArray();
        await this.updateDatabase("doctors");
      }
    }
  
    async removeFromDoctorBlacklist(entryToRemove) {
      this.blacklist = this.blacklist.filter((entry) => entry.getTime() !== entryToRemove.getTime());
      this.updateParentArray();
      await this.updateDatabase("doctors");
    }
  
    async addToDoctorGreenlist(entry) {
      if (!this.isInGreenlist(entry)) {
        this.greenlist.push(entry);
        this.removeFromDoctorBlacklist(entry);
        this.updateParentArray();
        await this.updateDatabase("doctors");
      }
    }
  
    async removeFromDoctorGreenlist(entryToRemove) {
      this.greenlist = this.greenlist.filter((entry) => entry.getTime() !== entryToRemove.getTime());
      this.updateParentArray();
      await this.updateDatabase("doctors");
    }
  
    isInBlacklist(entry) {
      return this.blacklist.some((blacklistDay) => blacklistDay.getTime() === entry.getTime());
    }
  
    isInGreenlist(entry) {
      return this.greenlist.some((greenlistDay) => greenlistDay.getTime() === entry.getTime());
    }
  
  async addToDoctorDuties(entry) {
    this.duties.push(entry);
    this.updateParentArray();
    await this.updateDatabase("doctors");
  }
  
  async removeFromDoctorDuties(entryToRemove) {
    this.duties = this.duties.filter((entry) => entry !== entryToRemove);
    this.updateParentArray();
    await this.updateDatabase("doctors");
  }
  
  async addToDoctorWeekends(entry) {
    this.weekends.push(entry);
    this.updateParentArray();
    await this.updateDatabase("doctors");
  }
  
  async removeFromDoctorWeekends(entryToRemove) {
    this.weekends = this.weekends.filter((entry) => entry !== entryToRemove);
    this.updateParentArray();
    await this.updateDatabase("doctors");
  }
  
  async addPointsToDoctor(points) {
    this.points += points;
    this.updateParentArray();
    await this.updateDatabase("doctors");
  }
  
  async subtractPointsFromDoctor(points) {
    this.points -= points;
    this.updateParentArray();
    await this.updateDatabase("doctors");
  }
  
}






/**
     // Funktion zum Hinzufügen eines Tages zur Blacklist und Entfernen aus der Greenlist
    const addToBlacklistAndRemoveFromGreenlist = (addDay) => {
      doctor.addToDoctorBlacklist(addDay);
      doctor.removeFromDoctorGreenlist(addDay);
    };
  
    // Funktion zum Hinzufügen eines Tages zur Greenlist und Entfernen aus der Blacklist
    const addToGreenlistAndRemoveFromBlacklist = (addDay) => {
      doctor.addToDoctorGreenlist(addDay);
      doctor.removeFromDoctorBlacklist(addDay);
    };
 */