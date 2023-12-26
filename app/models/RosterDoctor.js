export default class RosterDoctor{
    constructor({
        _id,
        name,
        dutyColumns = [],
        groups = [],
        blacklist = [],
        greenlist = [],
        updateParentArray,
        updateDatabase
    }){
        this._id = _id;
        this.name = name;
        this.dutyColumns = dutyColumns;
        this.groups = groups;
        this.blacklist = blacklist.map(wish => new Date(wish));
        this.greenlist = greenlist.map(wish => new Date(wish));
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
  }