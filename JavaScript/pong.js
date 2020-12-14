//Création de plusieurs objets
/**
 * @type {Terrain}
 */
let terrain = new Terrain($("#terrain"));
/**
 * @type {Balle}
 */
let balle = new Balle($("#balle"));
/**
 * @type {Raquette}
 */
let raquetteGauche = new Raquette($("#gauche"),$("#scoreJoueur"), $("#viesJoueur"));
/**
 * @type {Raquette}
 */
let raquetteDroite = new Raquette($("#droite"));
/**
 * @type {HTMLElement}
 */
let boutonDepart = document.getElementById("btnDepart");
/**
 * @type {HTMLElement}
 */
let removeEcran = document.getElementById("ecran-debut");


let demarrer = false;

setInterval(function () {
    if (demarrer){
        //Utilisation des fonctions présentes dans leurs classes respectives
        balle.bouger();
        raquetteGauche.bouger();
        raquetteDroite.bouger();
    }
}, 10);


boutonDepart.addEventListener("click", () => {
    if(getComputedStyle(removeEcran).display != "none"){
        removeEcran.style.display = "none";
    } else {
        removeEcran.style.display = "block";
    }
    demarrer = true;
})



//Permet d'identifier sur quelle touche du clavier se passe l'appuie
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return
    }

    //Les touches bougent avec les appuies sur les touches respectives
    if (event.key === "h") {
        raquetteGauche.monter();
        raquetteDroite.descendre();
    }
    if (event.key === "b") {
        raquetteGauche.descendre();
        raquetteDroite.monter();
    }
    event.preventDefault();
}, true);


window.addEventListener("keyup", function (event) {
    if (event.defaultPrevented) {
        return
    }
    //Quand on relache les touches, les raquettes ne bougent plus
    if (event.key === "h" || event.key === "b") {
        raquetteGauche.arret();
        raquetteDroite.arret();
    }
    event.preventDefault();
}, true);