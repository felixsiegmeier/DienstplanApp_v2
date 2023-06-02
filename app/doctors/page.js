"use client";
import { useEffect, useState } from "react";
import TableMobile from "./components/TableMobile";
import Table from "./components/Table";
import { usePageContext } from "../context/pageContext";
import AddDoctorButton from "./components/AddDoctorButton";
import NewDoctorModal from "./components/NewDoctorModal";

export default function Doctors() {
  const {doctors, setDoctors, config, setConfig, loading} = usePageContext();
  const [isMobile, setIsMobile] = useState(false);
  const [openNewDoctorModal, setOpenNewDoctorModal] = useState(false);

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

  return (
    <div>
    <NewDoctorModal isMobile={isMobile} open={openNewDoctorModal} setOpen={setOpenNewDoctorModal} />
    {!loading && (isMobile ? <TableMobile/> : <Table/>)}
    <AddDoctorButton openModal={() => {setOpenNewDoctorModal(true)}}/>
    </div>
    
  );
}
