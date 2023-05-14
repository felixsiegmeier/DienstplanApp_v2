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
  const [config, setConfig] = useState({})

  useEffect(() => {
    if(userId){
      getData()
    }else{
      clearData()
    }

    async function getData(){
      
    }

    function clearData(){
      return
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
        setConfig
      }}
    >
    {userId ? children : <Login/>}
    </PageContext.Provider>
  );
};

export const usePageContext = () => useContext(PageContext);
