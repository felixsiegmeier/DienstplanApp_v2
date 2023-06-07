"use client";
import { usePageContext } from "../context/pageContext";
import AdminView from "./components/AdminView";
import ClientView from "./components/ClientView";

export default function Rosters() {
  const { config, userId } = usePageContext();

  if (config?.admins?.includes(userId)) return <AdminView />;
  return <ClientView />;
}
