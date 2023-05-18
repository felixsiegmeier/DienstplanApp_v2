"use client";

import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  useEffect
} from "react";
import Login from "../login/page";

const PageContext = createContext({});

export const PageContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [rosters, setRosters] = useState([]);
  const [roster, setRoster] = useState({});
  const [userGroupId, setUserGroupId] = useState(false);
  const [userId, setUserId] = useState(false);
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("invoking")
    if(userId){
      getData()
    }else{
      clearData()
    }

    async function getData(){
      console.log("getting Data")
      const doctorsData = await fetch(`/api/doctors?userGroupId=${userGroupId}`)
      const doctors = await doctorsData.json()
      setDoctors(doctors)

      const rostersData = await fetch(`/api/rosters?userGroupId=${userGroupId}`)
      const rosters = await rostersData.json()
      setRosters(rosters)

      const configData = await fetch(`/api/config?userGroupId=${userGroupId}`)
      const config = await configData.json()
      setConfig(config)

      setLoading(false)
    }

    function clearData(){
      console.log("clearing Data")
      setDoctors([])
      setDoctors([])
      setDoctors({})
      setLoading(true)
    }
  }, [userId]);

  return (
    <PageContext.Provider
      value={{
        doctors,
        setDoctors,
        rosters,
        setRosters,
        roster,
        setRoster,
        userGroupId,
        setUserGroupId,
        userId,
        setUserId,
        config,
        setConfig,
        loading,
        setLoading
      }}
    >
    {userId ? children : <Login/>}
    </PageContext.Provider>
  );
};

export const usePageContext = () => useContext(PageContext);
