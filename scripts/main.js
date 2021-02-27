const CLEAPI = '6fbf739752280f9ef37af35f1534adbf';
let resultatsAPI;

//récupérer les éléments HTML
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');

// on  vérifie si le navigateur a la fonctionnalité géolocation
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        //console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long, lat);

    }, // si l'utilisateur refuse que google accède à sa position 
        () => {
            alert(`Vous avez refusé la géolocalisation, 
            l'application ne peut pas fonctionner,
            veuillez l'activer !`);
        });
    
}

function AppelAPI(long, lat) {
    /* la méthode fecth qui permet d'aller faire
     une requette http pour aller prendre des données
    depuis cette API 
    fetch retourne une promise, c a d qu'elle va se 
    resoudre lorsque la requette sera bien effectuée
    lorsque les données seront présentes
    */
    /*exclude veut dire, est-ce que je veux rétirer et
    units pour ajouter quelque chose dans l'API
    toujours en mettant un & entre les caractère 
    quand on rajoute*/
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`)
        /*l'API passe au format JSON, 
        elle retourne toujourrs en format JSON*/
        .then((reponse) => {
            return reponse.json();
        })
        /*ce que l'API va retourner en format, son les
        données que je vais utiliser, donc encore un then
        pour récupérer les données au format JSON*/
        .then((data) => {
            console.log(data);
            resultatsAPI = data;

            //affecter automatiquement nos données API aux HTML
            temps.innerText = resultatsAPI.current.weather[0].description;
            temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;
            localisation.innerText = resultatsAPI.timezone;
           
            //les heures, par tranche de trois, avec leur température
            
            //récupération de l'heure actuelle en JS
            let heureActuelle = new Date().getHours();

            //Je parcours le tableau de toutes les heures des paragraphes que j'ai récupére avec mon HTML
            for(let i = 0; i < heure.length; i++) {
                //j'incrémente l'heure actuelle de 3 fois après la première itération
                let heureIncr = heureActuelle + i * 3;

                /*Affichage dans chaque bloc d'heure et  
                qu'il passe au jour précedent si je dépasse 24h*/
                if(heureIncr > 24) {
                    heure[i].innerText = `${heureIncr - 24} h`;
                } else if(heureIncr === 24) {
                    heure[i].innerText = "00 h";
                }
                else {
                    heure[i].innerText = `${heureIncr} h`;
                }
                
            }

            /*Je parcours le tableau de tous les temps des paragraphes que j'ai récupére avec mon HTML
            Affichage dans chaque bloc de temps par tranche de 3 heures
            */
            for(let j = 0; j < tempPourH.length; j++) {
                //hourly, c'est les températures par heure que renvoie l'API
                tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)} °`;
            }
        });
       
}