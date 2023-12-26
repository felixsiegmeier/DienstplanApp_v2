export default class Config {
    constructor({
      _id,
      admins,
      initializationSize,
      populationSize,
      dutyColumns,
      groups,
      setState,
      superAdmin
    }) {
      this._id = _id;
      this.admins = admins;
      this.initializationSize = initializationSize;
      this.populationSize = populationSize;
      this.dutyColumns = dutyColumns;
      this.groups = groups;
      this.setState = setState;
      this.superAdmin = superAdmin;
    }
  
    async updateDatabase(property, value) {
      try {
        await fetch("/api/config", {
          method: "PUT",
          body: JSON.stringify({
            id: this._id,
            property,
            value,
          }),
        });
      } catch (error) {
        console.error("Fehler beim Aktualisieren der Datenbank:", error);
      }
    }
  
    async addAdmin(admin) {
      this.admins.push(admin);
      await this.updateDatabase("admins", this.admins);
      this.setState(this);
    }
  
    async removeAdmin(admin) {
      this.admins = this.admins.filter((a) => a !== admin);
      await this.updateDatabase("admins", this.admins);
      this.setState(this);
    }
  
    async changeInitializationSize(size) {
      this.initializationSize = size;
      await this.updateDatabase("initializationSize", this.initializationSize);
      this.setState(this);
    }
  
    async changePopulationSize(size) {
      this.populationSize = size;
      await this.updateDatabase("populationSize", this.populationSize);
      this.setState(this);
    }
  
    async addDutyColumnByName(name) {
      this.dutyColumns.push(
        {
          name: name,
          autoAssignment: false,
          present: true
        }
      );
      await this.updateDatabase("dutyColumns", this.dutyColumns);
      this.setState(this);
    }

    async toggleDutyColumnPresentByName(name) {
      this.dutyColumns = this.dutyColumns.map((dutyColumn) => {
        if (dutyColumn.name === name) {
          dutyColumn.present = !dutyColumn.present;
        }
        return dutyColumn;
      });
      await this.updateDatabase("dutyColumns", this.dutyColumns);
      this.setState(this);
    }
  
    async removeDutyColumnByName(name) {
      this.dutyColumns = this.dutyColumns.filter((dutyColumn) => dutyColumn.name !== name);
      await this.updateDatabase("dutyColumns", this.dutyColumns);
      this.setState(this);
    }

    async changeDutyColumnPosition(name, direction) {
      const index = this.dutyColumns.findIndex((column) => column.name === name);

      if (index === -1) {
          console.error(`DutyColumn mit dem Namen ${name} wurde nicht gefunden.`);
          return;
      }

      const newIndex = direction === "up" ? index - 1 : index + 1;

      if (newIndex < 0 || newIndex >= this.dutyColumns.length) {
          console.error("Die Verschiebung ist nicht möglich, da die neue Position außerhalb des Arrays liegt.");
          return;
      }

      // Tausche die DutyColumns aus
      const temp = this.dutyColumns[index];
      this.dutyColumns[index] = this.dutyColumns[newIndex];
      this.dutyColumns[newIndex] = temp;

      await this.updateDatabase("dutyColumns", this.dutyColumns);
      this.setState(this);
  }
  
    async toggleDutyColumnAutoAssignmentByName(name) {
      this.dutyColumns = this.dutyColumns.map((dutyColumn) => {
        if (dutyColumn.name === name) {
          dutyColumn.autoAssignment = !dutyColumn.autoAssignment;
        }
        return dutyColumn;
      });
      await this.updateDatabase("dutyColumns", this.dutyColumns);
      this.setState(this);
    }
  
    async addGroupByName(name) {
      this.groups.push({
        name: name,
        maximum: 99,
        exclusion: []
      });
      await this.updateDatabase("groups", this.groups);
      this.setState(this);
    }
  
    async removeGroupByName(name) {
      this.groups = this.groups.filter((group) => group.name !== name);
      await this.updateDatabase("groups", this.groups);
      this.setState(this);
    }
  
    async changeGroupMaximumByName(name, maximum) {
      this.groups = this.groups.map((group) => {
        if (group.name === name) {
          group.maximum = maximum;
        }
        return group;
      });
      await this.updateDatabase("groups", this.groups);
      this.setState(this);
    }
  
    async addGroupExclusionByName(name, exclusion) {
      this.groups = this.groups.map((group) => {
        if (group.name === name) {
          if (!group.exclusion.includes(exclusion)) {
            group.exclusion.push(exclusion);
          }
        }
        return group;
      });
      await this.updateDatabase("groups", this.groups);
      this.setState(this);
    }
  
    async removeGroupExclusionByName(name, exclusion) {
      this.groups = this.groups.map((group) => {
        if (group.name === name) {
          group.exclusion = group.exclusion.filter((ex) => ex !== exclusion);
        }
        return group;
      });
      await this.updateDatabase("groups", this.groups);
      this.setState(this);
    }
  }
  