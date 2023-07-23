# Beschreibung

Hier soll eine Version 2.0 des DienstplanProgramms entstehen.

## Ziele

- Verbesserte Performance
- Verbesserter Algorithmus zur Planerstellung
- universellerer Code, sodass ggf. auch andere 24h-Dienstemodelle dieses Tool nutzen können
- Verfügbarkeit als WebApp
- Verfügbarkeit als DesktopApp

# Datenmodelle

## Config

Diese Config wird in `page.js` im App-Directory eingestellt (später dann über das Frontend) und gibt wichtige Einstellungen an die Logic-Funktionen weiter.

```
config: {
	_id: String,
	admins: [String],
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

## Monat

Wird von `random-data/generate-month.js` generiert.
Feiertage werden von einer [Web-API](https://feiertage-api.de) bezogen.
Beim Erstellen wird eine Kopie von `doctors` erzeugt und diese um einige Attribute erweitert

**Cave: Das ist so doof. Bitte ändern, sodass roster ein Array von Tagen enthält. Diese sollen außerdem nicht Jahr, Monat, Wochentag und Tag als Attribute haben sondern besser ein Date()-Objekt! Außerdem benötigt es noch einen Changelog, der wiederum enthalten muss [Änderung, Verursacher, Date(); damit dieser später auch was nützt, muss der Finale Plan gespeichert werden, damit später nur fortbestehende Änderungen vom Original gezeigt werden]**

```
{
	_id: String,
	name: String,
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
			date: new Date(),
			holiday: Boolean,
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

## Doctor

### From Database

```
[
{
userGroupId: String,
alias: String,
_id: String,
name: String,
groups: [String],
dutyColumns: [String],
only12: Boolean,
nonWorkingDays: [Number],
maximum: Number,
password: String
}
]
```

### Für Roster-Calculation (wird im Roster gespeichert)

```
{
	doctor.id: {
		... doctor,
		blacklist: [Number],
		vacation: [Number],
		greenlist: [Number],
		duties: [Number],
		weekends: [Number],
		points: Number,
	}
}
```
## Vacations
- Muss noch angelegt werden

# Algorithmus

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

# API

# Oberfläche

## Context

- Aktuell wird der Context in `/context/pageContext` gehalte
- Dieser Context soll auf alles übertragen werden und die gesamte Session halten
  - `doctors` (nach Einloggen geladen)
  - `userGroupId` (nach Einloggen geladen)
  - `userId` (nach Einloggen geladen, regelt auch den LoginState)
  - `rosters` (nach Einloggen geladen)
  - `currentRoster` (nach Auswahl festgelegt)
  - `config` (nach Einloggen geladen)
  - `isMobile` - darüber wird die Responsiveness der gesamten Page gesteuert
  - `isAdmin` - darüber wird das rendern der Admin-Funktionen gesteuert

## Layout

- Layout stellt den Context-provider zur verfügung, welcher wiederum `children` rendert
- Wenn keine userId vorhanden ist, wird die Login-Page gerendert, wenn es eine userId gibt, wird `children` gerendert = Navbar und Page

## Login
- Auf der Login-Page werden Username und Passwort eingegeben und via POST an das Backend geschickt. Dort erfolgt der Abgleich mit dem Hash-Value in der MongoDB. Bei erfolgreicher Verifizierung werden userId und userGroupId zurückgegeben. Andernfalls false
  - userId und oderGroupId werden dann in den Context geladen => damit wird automatisch die Startseite gerendert.

## Main
- Hier werden Cards angezeigt, von denen man zu den Sub-Pages kommt.
- Abhängig davon, ob man Admin oder oder nicht (`id` in `config.admins` enthalten?) stehen hier verschiedene zur Auswahl
	- Admin: Pläne, Ärzteverwaltung, Einstellungen (persönlich), Einstellungen (Gruppe), Urlaubsplan (alle)
	- Kein Admin: Pläne, Einstellungen (persönlich), Urlaubsplan (nur eigener) 

## Doctors

- rendert abhängig von der Größe die `table` oder die `TableMobile`
- Tabellen rendern wiederum ihre spezifischen Zeilen, dafür wird über `doctors` aus dem Context gemapt
- jede Zeile kann auf Klick ein Optionsmenü öffnen (`ToggleBox`), in welchem die Ärzte konfiguriert werden können
  - Hier gibt es eine Funktion `saveDoctorChange`, welche die Daten im Context sichert Diese Funktion wird an die Unter-Componenten (`boxComponents`) vergeben, welche letztliche die einzelnen Attribute (Gruppen, Dienstreihen, Besonderheiten) darstellen und veränderlich machen
  - Die Veränderung in der Datenbank geschieht mittels POST-Request an `/api/doctors` und wird von jeder `boxComponent` einzeln aufgerufen. Das Backend führt dann ein updateOne() auf der Datenbank durch.
  - Außerdem gibt es einen Lösch-Button, der ein Modal öffnet zur Bestätigung und dann ans Backend funkt mit DELETE an `/api/doctors`
- Es gibt einen Button zum erstellen eines neuen Doctors. Dieser öffnet ein Modal, welches den Namen abfragt und einen PUT-Request an `/api/doctors` sendet. Sobald der Server die Neuanlage verarbeitet wird, wird der Context von der Datenbank aktualisiert.

## Rosters

- Hier werden die Pläne angezeigt
- Hier können neue Pläne angelegt werden (wenn Admin)
  - Aufruf eines Modals zum Erstellen
- Die zur Verfügung stehenden Optionen sind davon Abhängig, ob der Benutzer ein Admin ist oder nicht (in `config.admins` enthalten ist oder nicht)

# Modules

[[Next.js]]
[[Tailwind CSS]]
[[bcrypt]]

# Tests

- Laufen mit einem Test-Datensatz für einen Monat mit 31 Tagen (`__tests__/test-data.json`)

# Zukunftsaufgaben
- @app-pathing überall einführen
- Vacation hat eine methode "addSelf", die die _id vom Server erhält und den Urlaub in das parentArray schreibt. 
  Das muss ich für die Dienstpläne und die Ärzte auch noch implementieren und die Aktualisierung vom Server entsprechend löschen (toggleContextUpdateFromDatabase())

# Nächste Schritte
- Wunschliste implementieren