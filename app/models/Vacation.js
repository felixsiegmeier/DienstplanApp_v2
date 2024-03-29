export default class Vacation {
    constructor({
      _id = null,
      userGroupId,
      doctorId,
      date,
      setParentArray,
    }) {
      // Initialisiere die Eigenschaften der Klasse mit den übergebenen Werten
      this._id = _id;
      this.userGroupId = userGroupId;
      this.doctorId = doctorId;
      this.date = new Date(date);
      this.setParentArray = setParentArray;

      if(this._id === null){this.addSelf()}
    }
  
    async addSelf() {
      try {
        // Erstelle eine tiefe Kopie des aktuellen Vacation-Objekts und entferne das _id (soll nicht übermittelt werden)
        const vacationCopy = { ...this };
        delete vacationCopy._id;
  
        // Sende eine POST-Anfrage zum Server, um das Vacation-Objekt hinzuzufügen
        const response = await fetch("/api/vacations", {
          method: "POST",
          body: JSON.stringify(vacationCopy),
        });
  
        if (response.ok) {
          // Verarbeite die Serverantwort und aktualisiere die _id-Eigenschaft mit der vom Server generierten ID
          const newVacation = await response.json();
          this._id = newVacation.insertedId;
          
          // Füge das Vacation-Objekt dem übergeordneten Array hinzu, wenn setParentArray definiert ist
          
          if (this.setParentArray) {
            this.setParentArray((prevArray) => [...prevArray, this]);
          }
        } else {
          // Falls die Serverantwort nicht erfolgreich war, zeige den Statuscode als Fehler an
          console.error("Fehler beim Hinzufügen zum Server:", response.status);
        }
      } catch (error) {
        // Behandle Fehler, die während der Anfrage oder Verarbeitung auftreten können
        console.error("Fehler beim Hinzufügen zum übergeordneten Array:", error);
      }
    }
  
    async deleteSelf() {
      if (this.setParentArray) {
        // Entferne das Vacation-Objekt aus dem übergeordneten Array, wenn setParentArray definiert ist
        this.setParentArray((prevArray) =>
          prevArray.filter((vacation) => vacation._id !== this._id)
        );
      }
  
      try {
        // Sende eine DELETE-Anfrage zum Server, um das Vacation-Objekt aus der Datenbank zu löschen
        await fetch("/api/vacations", {
          method: "DELETE",
          body: JSON.stringify({ id: this._id }),
        });
      } catch (error) {
        // Behandle Fehler, die während der Anfrage oder Verarbeitung auftreten können
        console.error("Fehler beim Löschen aus der Datenbank:", error);
      }
    }
  }
  