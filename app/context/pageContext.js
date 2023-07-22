/*
Diese Komponente stellt einen React-Kontext bereit, der verschiedene Zustandsvariablen und Funktionen enthält, 
die von verschiedenen Komponenten innerhalb der Anwendung genutzt werden können. 
Der Kontext ermöglicht den Zugriff auf Daten wie Ärzte, Dienstpläne, Urlaube, Konfigurationseinstellungen und Benutzerinformationen aus der Datenbank. 
Außerdem bietet er Funktionen zum Aktualisieren des Kontexts basierend auf Datenbankänderungen sowie 
zur Aktualisierung des isMobile-Zustands bei Änderungen der Fenstergröße. Die Komponente "Login" wird gerendert, 
wenn kein Benutzer eingeloggt ist, andernfalls werden die Kindkomponenten mit Zugriff auf den Kontext gerendert, 
um die Anwendung basierend auf den Benutzerdaten anzuzeigen.
*/

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Login from "../login/page";
import Doctor from "../models/Doctor";
import User from "../models/User";
import Roster from "../models/Roster";
import Config from "../models/Config";
import Vacation from "../models/Vacation";

// Erstelle den Kontext, der später von Komponenten genutzt werden kann
const PageContext = createContext({});

export const PageContextProvider = ({ children }) => {
  // Zustandsvariablen, die von den Komponenten im Kontext genutzt werden können
  const [doctors, setDoctors] = useState([]);
  const [rosters, setRosters] = useState([]);
  const [roster, setRoster] = useState({});
  const [config, setConfig] = useState({});
  const [vacations, setVacations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState({});
  const [reload, setReload] = useState(true);

  // Funktion, um den Kontext-Update vom Datenbank-Update zu toggeln
  function toggleContextUpdateFromDatabase() {
    setReload((prevReload) => !prevReload);
  }

  // Funktion zum Abrufen der Daten aus der Datenbank basierend auf user._id und user.userGroupId
  async function fetchDataFromDatabase({ userId, userGroupId }) {
    try {
      // Sendet Anfragen zum Abrufen von Daten aus der Datenbank
      const [doctorsData, rostersData, configData, vacationsData] =
        await Promise.all([
          fetch(`/api/doctors?userGroupId=${userGroupId}`),
          fetch(`/api/rosters?userGroupId=${userGroupId}`),
          fetch(`/api/config?_id=${userGroupId}`),
          fetch(`/api/vacations?_id=${userGroupId}`),
        ]);

      // Verarbeite die erhaltenen Daten und erstelle entsprechende Objekte
      const doctorsJson = await doctorsData.json();
      const doctorObjects = doctorsJson.map(
        (doctorData) =>
          new Doctor({
            ...doctorData,
            setParentArray: setDoctors,
          })
      );
      setDoctors(doctorObjects);

      const rostersJson = await rostersData.json();
      const rosterObjects = rostersJson.map(
        (rosterData) =>
          new Roster({
            ...rosterData,
            setParentArray: setRosters,
          })
      );
      setRosters(rosterObjects);

      const configJson = await configData.json();
      const configObject = new Config({
        ...configJson,
        setState: setConfig,
      });
      setConfig(configObject);

      const vacationsJson = await vacationsData.json();
      const vacationsObjects = vacationsJson.map(
        (vacationData) =>
          new Vacation({
            ...vacationData,
            setParentArray: setVacations,
          })
      );
      setVacations(vacationsObjects);

      // Suche den aktuellen Benutzer basierend auf der _id und setze die user-Zustandsvariable
      const userData = doctorObjects.find((doctor) => doctor._id === userId);
      if (userData) {
        setUser(
          new User({
            _id: userData._id,
            userGroupId: userData.userGroupId,
            name: userData.name,
            alias: userData.alias,
            setState: setUser,
            isAdmin: configJson.admins.includes(userData._id),
          })
        );
      }

      setLoading(false);
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten aus der Datenbank:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    // Wenn user._id vorhanden ist, hole die Daten aus der Datenbank, sonst lösche die Zustandsvariablen
    if (user._id) {
      fetchDataFromDatabase({
        userId: user._id,
        userGroupId: user.userGroupId,
      });
    } else {
      clearData();
    }

    // Funktion, um die Daten zu löschen, wenn der Benutzer nicht eingeloggt ist
    function clearData() {
      setDoctors([]);
      setRosters([]);
      setRoster({});
      setLoading(true);
    }

    // Funktion, um den isMobile-Zustand bei einer Fenstergrößenänderung zu aktualisieren
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [user._id, reload]);

  // Stelle den erstellten Kontext zur Verfügung, um in anderen Komponenten darauf zuzugreifen
  return (
    <PageContext.Provider
      value={{
        doctors,
        setDoctors,
        user,
        setUser,
        rosters,
        setRosters,
        roster,
        setRoster,
        vacations,
        setVacations,
        config,
        setConfig,
        loading,
        setLoading,
        toggleContextUpdateFromDatabase,
        isMobile,
        setReload,
      }}
    >
      {/* Zeige die Kindkomponenten, wenn der Benutzer eingeloggt ist, andernfalls zeige die Login-Komponente */}
      {user._id ? children : <Login />}
    </PageContext.Provider>
  );
};

// Custom Hook, um auf den PageContext zuzugreifen
export const usePageContext = () => useContext(PageContext);
