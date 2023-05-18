"use client";
import { useEffect, useState } from "react";
import TableMobile from "./components/TableMobile";
import Table from "./components/Table";
import { usePageContext } from "../context/pageContext";

export default function Doctors() {
  const {doctors, setDoctors, config, setConfig, loading} = usePageContext();
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

  return (
    <>
    {!loading && (isMobile ? <TableMobile/> : <Table/>)}
    </>
    
  );
}
