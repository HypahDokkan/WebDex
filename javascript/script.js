// Based on the string/type name given, it gives that type's image.
function getTypeImage(type) {
    switch(type) {
        case "bug":
            return "../images/bug.gif";
        case "dark":
            return "../images/dark.gif";
        case "dragon":
            return "../images/dragon.gif";
        case "electric":
            return "../images/electric.gif";
        case "fairy":
            return "../images/fairy.gif";
        case "fighting":
            return "../images/fighting.gif";
        case "fire":
            return "../images/fire.gif";
        case "flying":
            return "../images/flying.gif";
        case "ghost":
            return "../images/ghost.gif";
        case "grass":
            return "../images/grass.gif";
        case "ground":
            return "../images/ground.gif";
        case "ice":
            return "../images/ice.gif";
        case "normal":
            return "../images/normal.gif";
        case "poison":
            return "../images/poison.gif";
        case "psychic":
            return "../images/psychic.gif";
        case "rock":
            return "../images/rock.gif";
        case "steel":
            return "../images/steel.gif";
        case "water":
            return "../images/water.gif";
        
        default:
            return;
    }
}


// Based on the global variable counter, it will give out a color: this is done so as to give each ability title an unique color.
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

// Starts the fetch and puts the correct values in the correct places.
function fetchStart(fetcher) {
    fetch(fetcher)
    .then(response => {
        if (!response) {
            console.log("error");
        }
    
        return response.json();
    })
    
    .then(data => {
        // (Up to speed-stat) Puts the Pokémon's name, sprite and stats in the correct places.
        document.getElementById("name").innerText = data.species.name.toUpperCase();
        document.getElementById("image").src = data.sprites.front_default;
        document.getElementById("image").alt = data.species.name.charAt(0).toUpperCase() + data.species.name.slice(1);

        // Clears the div that keeps all the types, for when you select another Pokémon. 
        document.getElementById("types-spot").innerHTML = "";

        // For every type the Pokémon has, create an image with the info of each type.
        data.types.forEach(element => {
            let typesSpot = document.getElementById("types-spot");

            let type = document.createElement("img");
            type.id = element.type.name;
            type.src = getTypeImage(element.type.name);
            // Makes the first letter uppercase.
            type.alt = element.type.name.charAt(0).toUpperCase() + element.type.name.slice(1);
            type.classList = "type";

            typesSpot.appendChild(type);
        });       

        document.getElementById("hp-stat").innerText = data.stats[0].base_stat;
        document.getElementById("attack-stat").innerText = data.stats[1].base_stat;
        document.getElementById("defense-stat").innerText = data.stats[2].base_stat;
        document.getElementById("special-attack-stat").innerText = data.stats[3].base_stat;
        document.getElementById("special-defense-stat").innerText = data.stats[4].base_stat;
        document.getElementById("speed-stat").innerText = data.stats[5].base_stat;

        document.getElementById("abilities-spot").innerHTML = ""; // Clears the div that keeps all the abilities' contents, for when you select another Pokémon.
        
        data.abilities.forEach(element => {
            // (Up to appendChild) creates a div that will contain all about the ability, gives it an id with the same name as the ability and appends it inside the ability div that keeps all abilities.
            let abilitiesSpot = document.getElementById("abilities-spot");
            let ability = document.createElement("div");
            ability.id = element.ability.name;
            abilitiesSpot.appendChild(ability);

            // Adds classes to the div for styling.
            ability.classList = "small-margin";
            // If the ability is hidden, then make it italic.
            if (element.is_hidden) {
                ability.classList += " italic";
            }


            // (Up to appendChild) Creates an h3 title, gives it the name of the ability, applies styling and appends it to the ability's div.
            let stringo = element.ability.name

            let abilityTitle = document.createElement("h3");
            // Makes the first letter uppercase.
            abilityTitle.innerText = stringo.charAt(0).toUpperCase() + stringo.slice(1) + ":";

            abilityTitle.classList = "bold ";
            
            // Gives an unique color to the ability title. Does it through a global variable that changes value after each forloop that resets back to the first color/value when you pick another Pokémon.
            abilityTitle.classList += getColor();
            
            ability.appendChild(abilityTitle);


            // (Up to classList) creates the paragraph that will hold the ability's description and applies styling.
            let abilityDescription = document.createElement("p");
            abilityDescription.classList = "black normal small-margin";

            // (Up too appendChild) fetches the url that holds the JSON containing the ability description, puts it inside the paragraph and appends it to the ability's div.
            let abilityDescriptionData;
            fetch(element.ability.url)
            .then(res => res.json())
            .then(data => {
                abilityDescriptionData = data;

                // Checks every description's language until it finds the English one and applies it to the paragraph.
                // The if is needed because some Pokémons, starting from 984, have an empty effect_entries and instead have the description in flavor_text_entries.
                if (abilityDescriptionData.effect_entries.length !== 0) {
                    abilityDescriptionData.effect_entries.forEach(entry => {
                        if (entry.language.name === "en") {
                            abilityDescription.innerText = entry.effect;
                        }
                    });
                }
                
                else {
                    abilityDescriptionData.flavor_text_entries.forEach(entry => {
                        if (entry.language.name === "en") {
                            abilityDescription.innerText = entry.flavor_text;
                        }
                    });
                }                
             });            

             ability.appendChild(abilityDescription);
        });
        // Resets the counter for GetColor() back to 0, so that when another Pokémon is selected, it will start from the initial color again.
        counter = 0;
    })
    
    .catch(error => {
        console.error("Error:", error);
    })
}


function getPokemon(input) {
        // Takes the number from the input box, puts it inside the URL of PokéAPI and gives it to fetchStart() so that it can start the fetching.
        let fetcher = "https://pokeapi.co/api/v2/pokemon/" + input.toLowerCase();
        
        fetchStart(fetcher);
}