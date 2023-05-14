# Beschreibung

Hier soll eine Version 2.0 des DienstplanProgramms entstehen.

## Ziele

- Verbesserte Performance
- Verbesserter Algorithmus zur Planerstellung
- universellerer Code, sodass ggf. auch andere 24h-Dienstemodelle dieses Tool nutzen können
- Verfügbarkeit als WebApp
- Verfügbarkeit als DesktopApp

# Komponenten

## Struktur

### Filestruktur

```
├── app
│   ├── api
	├── lib
		├── random-data
			├──
			└──
		└──
│   ├── pages.js
│   └── layout.js
└── public
```

### Datenstrukturen

#### Config

Diese Config wird in `page.js` im App-Directory eingestellt (später dann über das Frontend) und gibt wichtige Einstellungen an die Logic-Funktionen weiter.

```
config: {
	userGrupId: String,
	admins: [String],
	month: {month: Number, year: Number},
	initializationSize: Number,
	populationSize: Number,
	dutyColumns: [
		{name: String, autoAssignment: Boolean}
	],
	groups: [
		{name: String, maximum: Number, exclusion: [Number]},
	]
}
```

`initializationSize` gibt an, wie groß die Startpopulation zufällig generierter Pläne sein soll.
`populationSize` gibt an, die wieviel besten in die jeweils nächste Generation mitgenommen werden.
`autoAssignment` bei `dutyColumns` gibt an, ob diese Dienstreihe von Algorithmus besetzt werden soll oder nicht.
`exclusion` bei `groups` gibt an, ob bestimmte Wochentage nicht mitgezählt werden sollen.

#### Monat

Wird von `random-data/generate-month.js` generiert.
Feiertage werden von einer [Web-API](https://feiertage-api.de) bezogen.
Beim Erstellen wird eine Kopie von `doctors` erzeugt und diese um einige Attribute erweitert

```
{
	id: String,
	userGrupId: String,
	doctors: {
		id: {
			...doctor,
			blacklist: [Number],
			greenlist: [Number],
			duties: [Number],
			weekends: [Number],
			points: Number,
		}
	},
	roster: {
		"Number String": {
			date: Number,
			weekday: Number,
			holiday: Boolean,
			month: Number,
			year: Number,
			dutyColumns: {
				dutyColumnName1: {
					duty: [doctorId] | false,
					autoAssignment: Boolean
				},
				dutyColumnName2: {
					duty: [doctorId] | false,
					autoAssignment: Boolean
				}
			}
		}
	}
}
```

#### Doctor

##### From Database
```
[
{
userGrupId: String,
userAccount: String,
id: String,
name: String,
groups: [String],
dutyColumns: [String],
only12: Boolean,
nonWorkingDays: [Number]
}
]
```

##### Für Roster-Calculation (wird im Roster gespeichert)

```
{
	doctor.id: {
		... doctor,
		blacklist: [Number],
		greenlist: [Number],
		duties: [Number],
		weekends: [Number],
		points: Number,
	}
}
```

## Datenbank

## Algorithmus

Der Algorithmus wird zur Erstellung des Dienstplans verwendet. Hier soll der Ablauf durch die einzelnen Funktionen und Module abgebildet werden.

- `random-data/generate-doctors` erstellt einen zufälligen Test-Datensatz an Ärzten (fällt im production build weg)
- `random-data/generate-month` erstellt einen leeren Roster
- `random-data/generate-imc-roster` füllt den Roster der IMC zufällig (fällt im production build weg)
- `initialize-population/initialize-population` erstellt eine zufällige Population (Größe in config.initializationSize)
  - Wünsche werden eingetragen
  - es werden die DutyColumns belegt, die in `config.dutyColumns` eingestellt wurden
    - Es wird immer der Tag mit der niedrigsten Anzahl verfügbarer Ärzte als nächster besetzt
    - Es wird immer der Arzt eingetragen, (_welcher an den wenigsten Tagen kann_ ist bisher nicht implementiert, wäre aber sicher sinnvoll!!!) die wenigsten Punkte und Dienste hat
    - Nicht-Wünsche werden berücksichtigt
    - Gruppen werden eingehalten wie in `config.groups` festgelegt
  - gibt die besten (Anzahl in `config.populationSize`) davon als Array zurück
    - `fitness/fitness-function` wird verwendet, um die Fitness der Dienste zu berechnen, im Array selbst werden die Dienste als Unter-Array mit ihrer Fitness zusammen gespeichert und nach dieser wird das Array sortiert
      `fitness/count-duties` ist ein helper für die anderen evaluation-Funktionen, und gibt ein Objekt aller doctors zurück, welches die Punkte, Dienste und Wochenenden bereits gezählt enthält
    - `fitness/evaluate-*` wird von der Fitness-function verwendet, um eine Bewertung anhand der entsprechenden Kriterien vorzunehmen
      - `clinics` schaut, ob Gruppenregeln eingehalten wurden
      - `duty-distribution` schaut, ob die Dienstanzahl gleichmäßig verteilt ist
      - `duty-value-distribution` schaut, ob die Punkte gleichmäßig verteilt sind
      - `proximity` schaut, dass keine Dienste am gleichen Tag oder innerhalb von 24h sind
      - `spacing` schaut, dass die Dienste eines einzelnen möglichst weit voneinander entfernt liegen = über den Monat gleichmäßig verteilt sind

## API

## Oberfläche

# Modules

[[Next.js]]
[[Tailwind CSS]]

# Tests

- Laufen mit einem Test-Datensatz für einen Monat mit 31 Tagen (`__tests__/test-data.json`)

# Context
- Aktuell wird der Context in `/context/pageContext` gehalte
- Dieser Context soll auf alles übertragen werden und die gesamte Session halten
	- `doctors` (nach Einloggen geladen)
	- `userGroupId` (nach Einloggen geladen)
	- `userId` (nach Einloggen geladen, regelt auch den LoginState)
	- `rosters` (nach Einloggen geladen)
	- `currentRoster` (nach Auswahl festgelegt)
	- `config` (nach Einloggen geladen)
- aktuell sieht man in `doctors/page.js` exemplarisch, wie der Context abgerufen werden kann