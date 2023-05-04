import { uid } from "uid";

const clinics = [
	"Kardiologie",
	"Gastroenterologie",
	"Rhythmologie",
	"Geriatrie",
	"Ohne"
	]

const nachnamen = [
  'Schmidt',
  'Müller',
  'Schneider',
  'Fischer',
  'Weber',
  'Schulz',
  'Becker',
  'Hoffmann',
  'Schäfer',
  'Koch',
  'Bauer',
  'Richter',
  'Klein',
  'Wolf',
  'Schröder',
  'Neumann',
  'Schwarz',
  'Zimmermann',
  'Braun',
  'Krüger',
  'Wagner',
  'Hartmann',
  'Lange',
  'Krause',
  'Meier',
  'Lehmann',
  'Köhler',
  'Maier',
  'Huber',
  'Mayer',
  'Herrmann',
  'Walter',
  'König',
  'Menzel',
  'Jung',
  'Baumann',
  'Beyer',
  'Vogel',
  'Schmitz',
  'Franke',
  'Maurer',
  'Brandt',
  'Ziegler',
  'Simon',
  'Böhm',
  'Riedel',
  'Fuchs',
  'Günther',
  'Arnold'
];

function generateDoctors(length, monthLength){
	const doctors = {}
	for(let i = 0; i < length; i++){
		const id = uid(10)
		doctors[id] = {
			id: id,
			name: nachnamen[i],
			blacklist: [],
			greenlist: [],
			groups: [clinics[Math.floor(Math.random()*clinics.length)]] ,
			imc: false,
      dutyColumns: [],
      duties: [],
      weekends : [],
      points: 0
		}

    if(Math.random()*100 < 90){doctors[id].dutyColumns.push("Hausdienst")}
    if(Math.random()*100 < 65){doctors[id].dutyColumns.push("Notaufnahme")}

		for(let j = 1; j < monthLength+1; j++){
			if((Math.random()*monthLength)<Math.floor(monthLength*0.3)){
				if((Math.random()*100)<25){
					if(!doctors[id].greenlist.includes(j-1)){doctors[id].greenlist.push(j)}
				}
				else{
					doctors[id].blacklist.push(j)
				}
			}
		}
	}
	return doctors
}

module.exports.generateDoctors = generateDoctors