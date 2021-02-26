const CLEAPI = '6fbf739752280f9ef37af35f1534adbf';
let resultatsAPI;

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
        });
       
}