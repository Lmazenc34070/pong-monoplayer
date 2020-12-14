//Classe de création d'un objet balle
class Balle {
    /**
     *
     * @param $html
     */
    constructor($html) {
        this.$element = $html;

        /**
         *
         * @type {number}
         */
        this.hauteur = $html.height();

        /**
         *
         * @type {number}
         */
        this.largeur = $html.width();

        /**
         *
         * @type {number}
         */
        this.gauche = parseInt($html.css("left"));

        /**
         *
         * @type {number}
         */
        this.haut = parseInt($html.css("top"));

        /**
         *
         * @type {number}
         */
        this.vitesseBase = terrain.largeur / 500;

        /**
         *
         * @type {number}
         */
        this.vitesse = this.vitesseBase;

        /**
         *
         * @type {number}
         */
        this.vitesseMax = terrain.largeur / 200;

        /**
         *
         * @type {number}
         */
        this.acceleration = 1.2;

        /**
         *
         * @type {number}
         */
        this.buf = Math.random();

        /**
         *
         * @type {number}
         */
        this.angle = this.defAngle();
    }

    /**
     *
     * @returns {number}
     */
    get bas() {
        return this.haut + this.hauteur;
    }

    /**
     *
     * @param value
     */
    set bas(value) {
        this.haut = value - this.hauteur;
    }

    /**
     *
     * @returns {number}
     */
    get droite() {
        return this.gauche + this.largeur;
    }

    /**
     *
     * @param value
     */
    set droite(value) {
        this.gauche = value - this.largeur;
    }

    /**
     *
     * @returns {number}
     */
    defAngle() {
        return this.buf < 0.5 ? (5 * Math.PI / 4) - Math.random() * (2 * Math.PI / 4) : (Math.PI / 4) - Math.random() * (2 * Math.PI / 4);
    }

    /**
     *Augmente la vitesse de la balle jusqu'au maximum
     */
    accelerer() {
        if (Math.abs(this.vitesse) < this.vitesseMax) {
            this.vitesse *= this.acceleration;
            console.log(Math.abs(this.vitesse));
        }
        else {
            this.vitesse = this.vitesseMax;
        }
    }

    /**
     *Recentre la balle dans le terrain
     */
    recentrer() {
        this.gauche = terrain.largeur / 2 - this.largeur / 2;
        this.haut = terrain.hauteur / 2 - this.hauteur / 2;

        this.angle = this.defAngle();
        this.vitesseDeBase();
    }

    /**
     *Remet la vitesse de la balle à celle de base
     */
    vitesseDeBase() {
        this.vitesse = this.vitesseBase;
    }

    /**
     *Donne un mouvement à la balle
     */
    bouger() {
        this.gauche += Math.cos(this.angle) * this.vitesse;
        this.haut += Math.sin(this.angle) * this.vitesse;
        console.log(this.vitesse);

        this.limite();
        this.majHTML();
    }

    /**
     *Permet de faire rebondire la balle
     */
    limite() {
        //droite
        if ((this.droite) > terrain.largeur) {
            terrain.tiltDroite();

            this.buf = 0.75;

            this.droite = terrain.largeur;
            this.angle = Math.PI - this.angle;
            this.recentrer();
            raquetteGauche.gagne();
        }
        //gauche
        if (this.gauche < 0) {
            terrain.tiltGauche();

            this.buf = 0.25;

            this.gauche = 0;
            this.angle = Math.PI - this.angle;
            this.recentrer();
            raquetteDroite.gagne();

        }
        //bas
        if (this.bas > terrain.hauteur) {
            terrain.tiltBas();

            this.bas = terrain.hauteur;
            this.angle = -(this.angle);
        }
        //haut
        if (this.haut < 0) {
            terrain.tiltHaut();

            this.haut = 0;
            this.angle = -(this.angle);
        }
        //Rebonds sur les raquettes
        //Gauche
        if (this.gauche < raquetteGauche.droite) { //si la balle dépasse à gauche de la raquette gauche
            if (this.bas > raquetteGauche.haut) { //et si la balle est plus basse que le haut de la raquette
                if (this.haut < raquetteGauche.bas) { // et si la balle est plus haute que le bas de la raquette

                    this.accelerer();
                    this.angle = Math.PI - this.angle;
                    raquetteGauche.tiltRGauche();
                }
            }
        }
        //Droite
        if (this.droite > raquetteDroite.gauche) { //si la balle dépasse à droite la raquette droite
            if (this.bas > raquetteDroite.haut) { //et si la balle est plus basse que le haut de la raquette
                if (this.haut < raquetteDroite.bas) { // et si la balle est plus haute que le bas de la raquette

                    this.accelerer();
                    this.angle = Math.PI - this.angle;

                    raquetteDroite.tiltRDroite();
                }
            }
        }
    }

    /**
     *
     */
    majHTML() {
        this.$element.css("left", balle.gauche);
        this.$element.css("top", balle.haut);
    }
}