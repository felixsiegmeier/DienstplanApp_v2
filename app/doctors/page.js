"use client";
import { useEffect, useState } from "react";
import TableMobile from "./components/TableMobile";
import Table from "./components/Table";
import { usePageContext } from "../context/pageContext";

export default function Doctors() {

  const {doctors, setDoctors} = usePageContext();
  const {config, setConfig} = usePageContext();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({
      user: "siegmeier",
      password: "123Start"
    })
  })

  useEffect(() => {
    getData()
    async function getData(){
        const data = await fetch("/api/doctors?userGroupId=123ABCD")
        const doctorArray = await data.json()
        setDoctors(doctorArray)
    }
  }, []);

  useEffect(() => {
    testLogin()
    async function testLogin(){
        const res = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify({
            user: "siegmeier",
            password: "1223qwwe"
          })
        })
        const doctorArray = await res.json()
        console.log(doctorArray)
    }
  }, []);

  return (
    <>
    {isMobile ? <TableMobile doctors={doctors} saveDoctors={saveDoctors} config={config} /> : <Table doctors={doctors} saveDoctors={saveDoctors} config={config}/>}
    </>
    
  );

  function saveDoctors(doctor) {
    const updatedDoctors = [...doctors];
    for (let i = 0; i < updatedDoctors.length; i++) {
      if (updatedDoctors[i].id === doctor.id) {
        updatedDoctors[i] = doctor;
        setDoctors(updatedDoctors);
        break;
      }
    }
  }
}
