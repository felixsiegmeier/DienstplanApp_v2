import { usePageContext } from "@/app/context/pageContext";
import Rule from "./Rule";
import ButtonCyan from "@/app/components/ButtonCyan";
import { useEffect, useState } from "react";
import NewRuleModal from "./NewRuleModal";

export default function GroupRules() {
  const { config, doctors, isMobile } = usePageContext();
  // Einführung eines neuen Zustands zur Kontrolle des Neurenderns
  const [reRender, setReRender] = useState(false);
  const [open, setOpen] = useState(false);

  // Funktion zum Hinzufügen einer Regel und Auslösen der Neurenderung
  const addRuleAndReRender = (rule) => {
    config.addRule(rule);
    // Umschalten des reRender Zustands, um ein Neurendern zu erzwingen
    setReRender((prev) => !prev);
  };

  return (
    <div className="mt-6 flex justify-center mb-8">
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold text-center mb-2 mt-4">Individuelle Regeln</h1>
        {config.rules.map((rule, index) => (
          <Rule
            rule={rule}
            index={index}
            key={index}
            deleteSelf={() => {
              config.removeRuleByIndex(index);
              // Auch hier ein Neurendern erzwingen
              setReRender((prev) => !prev);
            }}
          />
        ))}
        <ButtonCyan
          className="mt-2 mb-2 px-4"
          text="Neue Regel"
          onClick={() => setOpen(prev => !prev)}
        />
        <NewRuleModal open={open} setOpen={setOpen} addRule={addRuleAndReRender} doctors={doctors} config={config} isMobile={isMobile} />
      </div>
    </div>
  );
}
