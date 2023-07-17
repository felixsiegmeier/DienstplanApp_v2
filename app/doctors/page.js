"use client";
import { useEffect, useState } from "react";
import TableMobile from "./components/TableMobile";
import Table from "./components/Table";
import { usePageContext } from "../context/pageContext";
import AddDoctorButton from "./components/AddDoctorButton";
import NewDoctorModal from "./components/NewDoctorModal";

export default function Doctors() {
  const { doctors, setDoctors, config, setConfig, loading, isMobile, isAdmin } =
    usePageContext();
  const [openNewDoctorModal, setOpenNewDoctorModal] = useState(false);

  return (
    <div>
      <NewDoctorModal
        isMobile={isMobile}
        open={openNewDoctorModal}
        setOpen={setOpenNewDoctorModal}
      />
      {!loading && (isMobile ? <TableMobile /> : <Table />)}
      {isAdmin && <AddDoctorButton
        openModal={() => {
          setOpenNewDoctorModal(true);
        }}
      />}
      <br />
      <br />
    </div>
  );
}
