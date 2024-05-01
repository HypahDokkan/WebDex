var counter = 0;
function getColor() {
    counter++;
    switch (counter) {
        case 1:
            return "green";
        case 2:
            return "yellow";
        case 3:
            return "brown";
        case 4:
            return "aqua";
        case 5:
            return "blue";
        case 6:
            return "purple";
        
        default: return "black";
    }
}


function fetchStart(fetcher) {
    fetch(fetcher)
    .then(response => {
        if (!response) {
            console.log("error");
        }
    
        return response.json();
    })
    
    .then(data => {
        console.log(data);
        console.log(data.name)
        document.getElementById("name").innerText = data.species.name.toUpperCase()
        document.getElementById("image").src = data.sprites.front_default

        document.getElementById("hp-stat").innerText = data.stats[0].base_stat
        document.getElementById("attack-stat").innerText = data.stats[1].base_stat
        document.getElementById("defense-stat").innerText = data.stats[2].base_stat
        document.getElementById("special-attack-stat").innerText = data.stats[3].base_stat
        document.getElementById("special-defense-stat").innerText = data.stats[4].base_stat
        document.getElementById("speed-stat").innerText = data.stats[5].base_stat

        document.getElementById("abilities-spot").innerHTML = ""; // clears its contents, for when you select another pokemon
        
        data.abilities.forEach(element => {
            let abilitiesSpot = document.getElementById("abilities-spot");
            let ability = document.createElement("div");
            ability.id = element.ability.name;
            abilitiesSpot.appendChild(ability)

            //document.getElementById("abilities-spot").appendChild(document.createElement("div").id = element.ability.name)

            //document.getElementById("abilities-spot").classList = ""

            ability.classList = "small-margin"
            if (element.is_hidden) {
                ability.classList += " italic"
            }

            let stringo = element.ability.name

            let abilityTitle = document.createElement("h3");
            abilityTitle.innerText = stringo.charAt(0).toUpperCase() + stringo.slice(1) + ":";

            abilityTitle.classList = "bold ";
            
            abilityTitle.classList += getColor();
            

            ability.appendChild(abilityTitle);

            let abilityDescription = document.createElement("p");
            abilityDescription.classList = "black normal small-margin";
            console.log(abilityDescription.classList)
            let abilityDescriptionData;
            

            fetch(element.ability.url)
            .then(res => res.json())
            .then(data => {
                abilityDescriptionData = data;
                console.log(abilityDescriptionData);

                abilityDescriptionData.effect_entries.forEach(entry => {
                    if (entry.language.name === "en") {
                        abilityDescription.innerText = entry.effect;
                    }
                });
                
             });            

             ability.appendChild(abilityDescription);
        });
        counter = 0;
    })
    
    .catch(error => {
        console.error("Error:", error);
    })
}


function getPokemon(input) {
        let latestValue = input;
    
        let fetcher = "https://pokeapi.co/api/v2/pokemon/";
        
        fetcher += latestValue.toString();
        
        fetchStart(fetcher);
}