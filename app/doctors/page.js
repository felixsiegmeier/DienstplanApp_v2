"use client";
import { useEffect, useState } from "react";
import TableMobile from "./components/TableMobile";
import Table from "./components/Table";

export default function Doctors() {

  const [openIndex, setOpenIndex] = useState(-1);
  const [doctors, setDoctors] = useState([])
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

  useEffect(() => {
    getData()
    async function getData(){
        const data = await fetch("/api/doctors")
        const doctorArray = await data.json()
        setDoctors(doctorArray)
    }
  }, []);

  return (
    <>
    {isMobile ? <TableMobile doctors={doctors} /> : <Table doctors={doctors}/>}
    </>
    
  );
}
