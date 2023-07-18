"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import Login from "../login/page";
import Doctor from "../models/Doctor";
import User from "../models/User";

const PageContext = createContext({});

export const PageContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [rosters, setRosters] = useState([]);
  const [roster, setRoster] = useState({});
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState({})

  function toggleContextUpdateFromDatabase() {
    setReload(!reload);
  }

  useEffect(() => {
    console.log("invoking");
    if (user._id) {
      getData();
    } else {
      clearData();
    }

    async function getData() {
      console.log("getting Data");
      const doctorsDataStream = await fetch(
        `/api/doctors?userGroupId=${user.userGroupId}`
      );
      const doctorsData = await doctorsDataStream.json();
      const doctorObjects = doctorsData.map(
        (doctorData) =>
          new Doctor({
            ...doctorData,
            setParentArray: setDoctors,
          })
      );
      setDoctors(doctorObjects);

      const rostersData = await fetch(
        `/api/rosters?userGroupId=${user.userGroupId}`
      );
      const rosters = await rostersData.json();
      setRosters(rosters);

      const configData = await fetch(`/api/config?_id=${user.userGroupId}`);
      const config = await configData.json();
      setConfig(config);

      const userData = doctorObjects.find(doctor => doctor._id === user._id)
      if(userData){
        setUser(new User({
          _id: userData._id,
          userGroupId: userData.userGroupId,
          name: userData.name,
          alias: userData.alias,
          setState: setUser,
          isAdmin: config.admins.includes(userData._id)
        }))
      }

      setLoading(false);
    }

    function clearData() {
      console.log("clearing Data");
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
      }}
    >
      {user._id ? children : <Login />}
    </PageContext.Provider>
  );
};

export const usePageContext = () => useContext(PageContext);
