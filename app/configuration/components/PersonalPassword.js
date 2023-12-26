import ButtonCyan from "@/app/components/ButtonCyan";
import { usePageContext } from "@/app/context/pageContext";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PersonalPassword() {
  const { user, doctors } = usePageContext();
  const doctor = doctors.find((doctor) => doctor._id === user._id);
  const [currentPassword, setCurrentPassword] = useState("");
  const [firstNewPassword, setFirstNewPassword] = useState("");
  const [secondNewPassword, setSecondNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("green-500");

  const resetFields = () => {
    setCurrentPassword("");
    setFirstNewPassword("");
    setSecondNewPassword("");
  };

  const changePassword = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.alias, password: currentPassword }),
    });
    const data = await response.json();
    if (data) {
      if (!(firstNewPassword === secondNewPassword)) {
        toast.error("Passwörter nicht identisch!", {
          position: toast.POSITION.TOP_CENTER,
        });
        resetFields();
        return;
      }
      if (firstNewPassword.length < 8) {
        toast.error("Passwort nicht lang genug, bitte mindestens 8 Zeichen!", {
          position: toast.POSITION.TOP_CENTER,
        });
        resetFields();
        return;
      }
      await doctor.updateDatabase("password", firstNewPassword);
      toast.success("Passwort erfolgreich geändert!", {
        position: toast.POSITION.TOP_CENTER,
      });
      resetFields();
    } else {
      toast.error("Passwort falsch!", { position: toast.POSITION.TOP_CENTER });
      resetFields();
    }
  };

  return (
    <div className="mt-6 flex justify-center">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-center mb-2">Passwort ändern</h1>
        Altes Passwort:{" "}
        <input
          className="text-black mb-6"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          type="password"
        />
        Neues Passwort (mindestens 8 Zeichen):{" "}
        <input
          className="text-black mb-2"
          value={firstNewPassword}
          onChange={(e) => setFirstNewPassword(e.target.value)}
          type="password"
        />
        Wiederholen:{" "}
        <input
          className="text-black mb-4"
          value={secondNewPassword}
          onChange={(e) => setSecondNewPassword(e.target.value)}
          type="password"
        />
        <div className="flex justify-center">
          <ButtonCyan text="Passwort ändern" onClick={changePassword} />
        </div>
        <p className={`mt-4 text-center text-${messageColor}`}>{message}</p>
      </div>
      <ToastContainer />
    </div>
  );
}
