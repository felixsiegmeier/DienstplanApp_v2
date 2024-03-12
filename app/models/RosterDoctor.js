export default class RosterDoctor{
    constructor({
        _id,
        name,
        dutyColumns = [],
        groups = [],
        only12 = false,
        isManager = false,
        optOut = true,
        nonWorkingDays = [],
        blacklist = [],
        greenlist = [],
        absence = [],
        compTime = [],
        updateParentArray,
        updateDatabase
    }){
        this._id = _id;
        this.name = name;
        this.dutyColumns = dutyColumns;
        this.groups = groups;
        this.only12 = only12;
        this.nonWorkingDays = nonWorkingDays;
        this.isManager = isManager;
        this.optOut = optOut;
        this.blacklist = blacklist.map(wish => new Date(wish));
        this.greenlist = greenlist.map(wish => new Date(wish));
        this.absence = absence;
        this.compTime = compTime;
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

    async addToAbsence(entry) {
      if (!this.isInAbsence(entry)) {
        this.absence.push(new Date(entry));
        this.updateParentArray();
        await this.updateDatabase("doctors");
      }
    }
  
    async removeFromAbsence(entryToRemove) {
      this.absence = this.absence.filter((entry) => entry.getTime() !== new Date(entryToRemove).getTime());
      this.updateParentArray();
      await this.updateDatabase("doctors");
    }
  
    async addToCompTime(entry) {
      if (!this.isInCompTime(entry)) {
        this.compTime.push(new Date(entry));
        this.updateParentArray();
        await this.updateDatabase("doctors");
      }
    }
  
    async removeFromCompTime(entryToRemove) {
      this.compTime = this.compTime.filter((entry) => entry.getTime() !== new Date(entryToRemove).getTime());
      this.updateParentArray();
      await this.updateDatabase("doctors");
    }
  
    isInAbsence(entry) {
      return this.absence.some((absenceDay) => absenceDay.getTime() === new Date(entry).getTime());
    }
  
    isInCompTime(entry) {
      return this.compTime.some((compDay) => compDay.getTime() === new Date(entry).getTime());
    }
  }