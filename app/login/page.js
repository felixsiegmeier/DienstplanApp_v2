import { useState } from "react";
import { usePageContext } from "../context/pageContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {setUserId, setUserGroupId} = usePageContext();

  async function handler() {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data){
        setUserGroupId(data.setUserGroupId)
        setUserId(data.userId)
    }else {
      setError("Benutzername oder Passwort falsch!");
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handler();
    }
  }

  return (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl text-slate-200 font-bold mb-4 text-center mt-14">Willkommen zur Dienstplanerstellung</h1>
        <h2 className="text-xl text-slate-200 font-bold mb-4 text-center mt-4">Bitte logge dich ein!</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
            <label className="block text-slate-300 font-bold mb-4 mt-4" htmlFor="username">
              Username:
            </label>
            <input
              className="border rounded px-3 py-2 mb-4 text-slate-900"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="block text-slate-300 font-bold mb-4 mt-4" htmlFor="password">
              Password:
            </label>
            <input
              className="border rounded px-3 py-2 text-slate-900"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          <button
            className="bg-cyan-500 hover:bg-blue-600 text-slate-300 font-bold py-2 px-6 rounded mt-8"
            type="button"
            onClick={handler}
          >
            Login
          </button>
      </div>
  );
}