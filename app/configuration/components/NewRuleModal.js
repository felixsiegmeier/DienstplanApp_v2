import ButtonCyan from "@/app/components/ButtonCyan";
import React from "react";
export default function NewRuleModal({
  open,
  setOpen,
  isMobile,
  doctors,
  config,
  addRule,
}) {
  if (!open) return null;

  const [selectedRuleType, setSelectedRuleType] = React.useState("");
  const [ruleParameters, setRuleParameters] = React.useState({});

  const ruleTypes = {
    "person-exclusion-by-distance-in-dutyColumns": {
      title: "Ärzt:innen nicht gleichzeitig im Abstand von ? Tagen",
      description:
        "Legt fest, dass zwei Ärzt:innen nicht in einem Abstand von ? Tagen Dienst haben dürfen. Wähle bspw. 0 für den gleichen Tag oder 1 für aufeinander folgende Tage (bspw. bei Ehepartner:innen mit kleinen Kindern).",
    },
    "duty-distance-by-groups": {
      title: "Minimaler Abstand zwischen Diensten in Dienstreihen",
      description:
        "Stellt sicher, dass zwischen den Diensten einer bestimmten Gruppe in ausgewählten Dienstreihen ein minimaler Abstand von Tagen eingehalten wird.",
    },
    "group-max-in-dutyColumns": {
      title: "Maximale Anzahl einer Gruppe in Dienstreihen",
      description:
        "Begrenzt die Anzahl der Mitglieder einer bestimmten Gruppe, die gleichzeitig in ausgewählten Dienstreihen arbeiten dürfen. Dies kann zur Sicherstellung gleichmäßiger Beanspruchungen von beteiligten Kliniken genutzt werden.",
    },
    "group-min-in-dutyColumns": {
      title: "Minimale Anzahl einer Gruppe in Dienstreihen",
      description:
        "Garantiert, dass eine Mindestanzahl von Mitgliedern einer bestimmten Gruppe in den ausgewählten Dienstreihen eingeteilt ist. Dies kann wichtig sein, um beispielsweise immer eine:n Fachärzt:in anwesend zu haben.",
    },
    "group-no-double-assignment": {
      title: "In Dienstreihen nicht parallel besetzen",
      description:
        "Verhindert, dass ein:e Ärzt:in gleichzeitig in mehr als einer der ausgewählten Dienstreihen eingeteilt wird. Dies ist bei Bereitschaftsdiensten erforderlich, ermöglicht aber bespielsweise indirekt die Doppelzuweisung von Ruf- und Bereitschaftsdiensten für eine einzelne Person.",
    },
  };

  const handleRuleTypeChange = (event) => {
    setSelectedRuleType(event.target.value);
    setRuleParameters({}); // Reset parameters when rule type changes
  };

  const AddRuleButton = () => {
    return (
      <ButtonCyan
        className="mt-2 mb-2 px-4"
        text="Neue Regel erstellen"
        onClick={() => {
          handleAddRule();
          setOpen(false);
        }}
      />
    );
  };

  const handleAddRule = () => {
    switch (selectedRuleType) {
      case "person-exclusion-by-distance-in-dutyColumns":
        return null;
      case "duty-distance-by-groups":
        return null;
      case "group-max-in-dutyColumns":
        return null;
      case "group-min-in-dutyColumns":
        return null;
      case "group-no-double-assignment":
        return null;
      default:
        return null;
    }
  };

  const renderRuleParametersForm = () => {
    switch (selectedRuleType) {
      case "person-exclusion-by-distance-in-dutyColumns":
        return (
          <div className="mt-2 flex-row text-center gap-4">
            <select
              className="text-black"
              value={ruleParameters?.name1}
              onChange={(e) =>
                setRuleParameters((prev) => ({
                  ...prev,
                  name1: e.target.value,
                }))
              }
            >
              <option value="">Wähle einen Namen</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </option>
              ))}
            </select>
            <p>und</p>
            <select
              className="text-black"
              value={ruleParameters?.name2}
              onChange={(e) =>
                setRuleParameters((prev) => ({
                  ...prev,
                  name2: e.target.value,
                }))
              }
            >
              <option value="">Wähle einen Namen</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </option>
              ))}
            </select>
            <p>nicht im Abstand von</p>
            <select
              className="text-black"
              value={ruleParameters?.days}
              onChange={(e) =>
                setRuleParameters((prev) => ({ ...prev, days: e.target.value }))
              }
            >
              {[0, 1, 2, 3, 4, 5].map((days) => (
                <option key={days} value={days}>
                  {days}
                </option>
              ))}
            </select>
            <p>Tagen</p>
            {AddRuleButton()}
          </div>
        );
      case "duty-distance-by-groups":
        return (
          <div className="mt-2">
            <label className="block text-white">Wähle eine Gruppe</label>
            <select
              className="text-black"
              value={ruleParameters?.group}
              onChange={(e) =>
                setRuleParameters((prev) => ({
                  ...prev,
                  group: e.target.value,
                }))
              }
            >
              <option value="">Wähle eine Gruppe</option>
              {config.groups.map((group) => (
                <option key={group.name} value={group.name}>
                  {group.name}
                </option>
              ))}
            </select>
            {/* Eingabe für den minimalen Abstand */}
          </div>
        );
      case "group-max-in-dutyColumns":
        return (
          <div className="mt-2">
            <label className="block text-white">
              Wähle eine Gruppe und Maximalanzahl
            </label>
            {/* Auswahl für Gruppe */}
            <select
              className="text-black"
              value={ruleParameters?.group}
              onChange={(e) =>
                setRuleParameters((prev) => ({
                  ...prev,
                  group: e.target.value,
                }))
              }
            >
              <option value="">Wähle eine Gruppe</option>
              {config.groups.map((group) => (
                <option key={group.name} value={group.name}>
                  {group.name}
                </option>
              ))}
            </select>
            {/* Eingabefeld für die Maximalanzahl */}
          </div>
        );
      case "group-min-in-dutyColumns":
        return (
          <div className="mt-2">
            <label className="block text-white">
              Wähle eine Gruppe und Minimalanzahl
            </label>
            {/* Auswahl für Gruppe */}
            <select
              className="text-black"
              value={ruleParameters?.group}
              onChange={(e) =>
                setRuleParameters((prev) => ({
                  ...prev,
                  group: e.target.value,
                }))
              }
            >
              <option value="">Wähle eine Gruppe</option>
              {config.groups.map((group) => (
                <option key={group.name} value={group.name}>
                  {group.name}
                </option>
              ))}
            </select>
            {/* Eingabefeld für die Minimalanzahl */}
          </div>
        );
      case "group-no-double-assignment":
        return (
          <div className="mt-2">
            <label className="block text-white">
              Wähle Dienstreihen, für die Doppelbesetzungen vermieden werden
              sollen
            </label>
            {/* Auswahl für Dienstreihen */}
            <select
              className="text-black"
              value={ruleParameters?.dutyColumn}
              onChange={(e) =>
                setRuleParameters((prev) => ({
                  ...prev,
                  dutyColumn: e.target.value,
                }))
              }
            >
              <option value="">Wähle Dienstreihen</option>
              {config.dutyColumns.map((column) => (
                <option key={column.name} value={column.name}>
                  {column.name}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 bg-opacity-70 bg-slate-800 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative shadow-md ${
          isMobile ? "w-[80%]" : "w-[50%]"
        } h-[80%] overflow-auto p-4 rounded-md shadow-black border-slate-400 border bg-slate-800 transition-opacity`}
      >
        <div className="flex flex-col justify-center items-center gap-0">
          <h1 className="text-lg font-bold mb-3">Neuen Regel hinzufügen</h1>
          <h1 className="text-md font-bold mb-3 mt-6">Wähle einen Regel-Typ</h1>
          <select
            className="text-black mt-2"
            value={selectedRuleType}
            onChange={handleRuleTypeChange}
          >
            <option value="">Wähle eine Regelart</option>
            {Object.entries(ruleTypes).map(([key, rule]) => (
              <option key={key} value={key}>
                {rule.title}
              </option>
            ))}
          </select>
          <i className="text-center m-4 text-sm text-slate-500">
            {ruleTypes[selectedRuleType]?.description}
          </i>
          {renderRuleParametersForm()}
        </div>
      </div>
    </div>
  );
}
