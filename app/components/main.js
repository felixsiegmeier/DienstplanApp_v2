"use client"
import { useEffect } from "react";
import ButtonPlate from "./button-plate";
import { usePageContext } from "../context/pageContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainPage() {

  const {user, loading} = usePageContext();

  const checkPassword = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.alias, password: user.alias}),
    });
    const data = await response.json();
    if (data) {
      toast.error("Bitte Passwort ändern!", {position: toast.POSITION.TOP_CENTER})
    } else {
      return false;
    }
  };
  
  useEffect(() => {
    if(!loading){
      checkPassword();
    }
  }, [loading])
  

  return (
    <main className="flex-grow ">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold mb-4">
            Willkommen zur Dienstplanerstellung
          </h1>
          <p className="text-lg mb-6">
            Auf dieser Seite können vorhandene Dienstpläne verwaltet und neue
            erstellt werden.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ButtonPlate
              style="bg-lime-500 hover:bg-lime-600"
              title="Dienstpläne"
              explaination="Übersicht aller Dienstpläne mit Zugriff auf die Wunschlisten"
              link="/rosters"
            />
            <ButtonPlate
              style="bg-green-500 hover:bg-green-600"
              title="Urlaubsplan"
              explaination="Erhalte eine Übersicht über Urlaube und Anwesenheiten"
              link="/vacations"
            />
            <ButtonPlate
              style="bg-amber-500 hover:bg-amber-600"
              title="Ärzteverwaltung"
              explaination="Füge Ärtinnen und Arzte hinzu und verwalte ihre Gruppen und Einstellungen"
              link="/doctors"
            />
            <ButtonPlate
              style="bg-orange-500 hover:bg-orange-600"
              title="Einstellungen"
              explaination="Verwaltung der Grundeinstellungen für das Dienstmodell und den Algorithmus"
              link="/configuration"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
