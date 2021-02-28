/*il va servir à avoir un tableau avec
les jours de la semaine à partir du 
temps où vous regardez l'application 
météo, tout simplement pour pouvoir 
afficher la seconde rangée du jour à
partir où vous êtes 
*/

const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi',
'Samedi', 'Dimanche'];

// récupération de la date du jour
let ajd  = new Date();
//récupération du jour actuel en Français
let options = {weekday: 'long'};
let jourActuel = ajd.toLocaleDateString('fr-FR', options);
//console.log(jourActuel, ajd);

/*On récupére la première valeur, on met
la prémière lettre en majuscule et 
on ajoute le reste avec Slice*/ 
jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice();

/*Alignement automatique du tableau
JoursSemaine par rapport au jour où on
est actuellement */
/* slice permet de couper une partie de
ce tableau et retourner un nouveau 
tableau avec la partie qu'on a coupé
la première partie est le jour actuel
jusqu'à la fin du tableau, et on
concatène ce tableau là avec ce que 
ce même tableau jouractuel non inclus*/
let tabJoursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));
//console.log(tabJoursEnOrdre);

export default tabJoursEnOrdre;

