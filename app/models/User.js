export default class User {
  constructor({
    _id = null,
    userGroupId = null,
    isAdmin = null,
    name = null,
    alias = null,
    setState = null
  }) {
    this._id = _id;
    this.userGroupId = userGroupId;
    this.isAdmin = isAdmin;
    this.name = name;
    this.alias = alias;
    this.setState = setState;
  }

  async updateDatabase(property, value) {
    try {
      await fetch("/api/doctors", {
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

  async changeAlias(newAlias) {
    this.alias = newAlias;
    if (this.setState) {
      this.setState(this);
    }
    await this.updateDatabase("alias", this.alias);
  }

  async changePassword(newPassword) {
    await this.updateDatabase("password", newPassword);
  }
}
