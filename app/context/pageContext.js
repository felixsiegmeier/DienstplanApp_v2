"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import Login from "../login/page";
import Doctor from "../models/Doctor";
import User from "../models/User";
import Roster from "../models/Roster";
import Config from "../models/Config";

const PageContext = createContext({});

// ... Importe wie zuvor ...

export const PageContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [rosters, setRosters] = useState([]);
  const [roster, setRoster] = useState({});
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState({});
  const [reload, setReload] = useState(true);

  function toggleContextUpdateFromDatabase() {
    setReload((prevReload) => !prevReload);
  }

  async function fetchDataFromDatabase({userId, userGroupId}) {
    try {
      const [
        doctorsData,
        rostersData,
        configData,
      ] = await Promise.all([
        fetch(`/api/doctors?userGroupId=${userGroupId}`),
        fetch(`/api/rosters?userGroupId=${userGroupId}`),
        fetch(`/api/config?_id=${userGroupId}`),
      ]);

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
          })
      setConfig(configObject);

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
    if (user._id) {
      fetchDataFromDatabase({userId: user._id, userGroupId: user.userGroupId});
    } else {
      clearData();
    }

    function clearData() {
      setDoctors([]);
      setRosters([]);
      setRoster({});
      setLoading(true);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [user._id, reload]);

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
        config,
        setConfig,
        loading,
        setLoading,
        toggleContextUpdateFromDatabase,
        isMobile,
        setReload
      }}
    >
      {user._id ? children : <Login />}
    </PageContext.Provider>
  );
};

export const usePageContext = () => useContext(PageContext);
