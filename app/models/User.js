export default class User{
    constructor({
        _id = null,
        userGroupId = null,
        isAdmin = null,
        name = null,
        alias = null,
        setState = null
    }){
        this._id = _id;
        this.userGroupId = userGroupId;
        this.isAdmin = isAdmin;
        this.name = name;
        this.alias = alias;
        this.setState = setState;
    }

    changeAlias(newAlias){
        this.alias = newAlias
        this.setState(this)
        
        fetch("/api/doctors", {
            method: "POST",
            body: JSON.stringify({
              id: this._id,
              property: "alias",
              value: this.alias,
            }),
          });
    }

    changePassword(newPassword){
        fetch("/api/doctors", {
            method: "POST",
            body: JSON.stringify({
              id: this._id,
              property: "password",
              value: newPassword,
            }),
          });
    }
}