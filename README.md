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
	month: {month: 5, year: 2023},
	initializationSize: 500,
	populationSize: 100,
	dutyColumns: [
		{name: "Notaufnahme", autoAssignment: true}, 
		{name: "Hausdienst", autoAssignment: true}, 
		{name: "IMC", autoAssignment: false}
	],
	groups: [
		{name: "Kardiologie", maximum: 2, exclusion: [5,6]},
		{name: "Gastroenterologie", maximum: 2, exclusion: [5,6]},
		{name: "Geriatrie", maximum: 2, exclusion: [5,6]},
		{name: "Rhythmologie", maximum: 2, exclusion: [5,6]},
		{name: "Surugiu", maximum: 1}
	]
}
```
`initializationSize` gibt an, wie groß die Startpopulation zufällig generierter Pläne sein soll.
`populationSize` gibt an, die wieviel besten in die jeweils nächste Generation mitgenommen werden.
`autoAssignment` bei `dutyColumns` gibt an, ob diese Dienstreihe von Algorithmus besetzt werden soll oder nicht.
`exclusion` bei `groups` gibt an, ob bestimmte Wochentage nicht mitgezählt werden sollen.
#### Monat
wird von `random-data/generate-month.js` generiert.
Feiertage werden von einer [Web-API](https://feiertage-api.de) bezogen.
```
roster: {
	"1": {
		date: 1,
		weekday: Number,
		holiday: boolean,
		month: Number,
		year: Number,
		dutyColumns: {
			dutyColumnName1: {
				duty: DoctorObject | false,
				autoAssignment: Boolean
			},
			dutyColumnName2: {
				duty: DoctorObject | false,
				autoAssignment: Boolean
			}
		}
	},
	"2": {
		date: 2,
		weekday: Number,
		holiday: boolean,
		month: Number,
		year: Number,
		dutyColumns: {
			dutyColumnName1: {
				duty: DoctorObject | false,
				autoAssignment: Boolean
			},
			dutyColumnName2: {
				duty: DoctorObject | false,
				autoAssignment: Boolean
			}
		}
	},
	
}
```
#### Doctor
```
{
	doctorId1: {
		id: String,
		name: String,
		blacklist: [Number],
		greenlist: [Number],
		groups: [String],
		dutyColumns: [String],
		duties: [Number],
		weekends: [Number],
		points: Number
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
		- Es wird immer der Arzt eingetragen, (*welcher an den wenigsten Tagen kann* ist bisher nicht implementiert, wäre aber sicher sinnvoll!!!) die wenigsten Punkte und Dienste hat
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