class Raquette {
    constructor($html, $score) {

        this.$element = $html;
        /**
         * @type {number}
         */
        this.score = 0;
        this.$score = $score;
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
        this.direction = 0;
        /**
         *
         * @type {number}
         */
        this.vitesse = 3;
        /**
         * @type {number}
         */
        this.vies = 5;
    }


    gagne() {
        this.score = this.score + 10;
        this.$score.text(this.score);
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
     * @param value
     */
    set droite(value) {
        this.gauche = value - this.largeur;
    }

    tiltRDroite() {
        //ajouter une classe
        this.$element.addClass("tiltRDroite");
        let buffer = this;

        setTimeout(
            function () {
                //retirer une classe
                buffer.$element.removeClass("tiltRDroite");
            }, 200
        );
    }

    tiltRGauche() {
        //ajouter une classe
        this.$element.addClass("tiltRGauche");
        let buffer = this;

        setTimeout(
            function () {
                //retirer une classe
                buffer.$element.removeClass("tiltRGauche");
            }, 200
        );
    }

    bouger() {
        this.haut += this.vitesse * this.direction;
        this.limite();
        this.majHTML();
    }

    monter() {
        this.direction = -1;
    }

    descendre() {
        this.direction = 1;
    }

    arret() {
        this.direction = 0;
    }

    majHTML() {
        this.$element.css("top", this.haut);
    }

    limite() {
        if (this.bas > terrain.hauteur) {
            this.bas = terrain.hauteur;
            this.arret();
        }
        if (this.haut < 0) {
            this.haut = 0;
            this.arret();
        }
    }
}