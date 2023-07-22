"use client";
import { useEffect, useState } from "react";
import TableMobile from "./components/TableMobile";
import Table from "./components/Table";
import { usePageContext } from "../context/pageContext";
import AddDoctorButton from "./components/AddDoctorButton";
import NewDoctorModal from "./components/NewDoctorModal";

export default function Doctors() {
  const { loading, isMobile, user } =
    usePageContext();
  const [openNewDoctorModal, setOpenNewDoctorModal] = useState(false);

  return (
    <div className="text-center mt-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4"> Ärzte </h1>
      <NewDoctorModal
        isMobile={isMobile}
        open={openNewDoctorModal}
        setOpen={setOpenNewDoctorModal}
      />
      {!loading && (isMobile ? <TableMobile /> : <Table />)}
      {user.isAdmin && <AddDoctorButton
        openModal={() => {
          setOpenNewDoctorModal(true);
        }}
      />}
      <br />
      <br />
    </div>
  );
}
