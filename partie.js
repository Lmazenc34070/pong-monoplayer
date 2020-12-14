class Partie {
    /**
     * La classe Partie répresente un échange dans la partie
     */
    constructor() {
        let me=this;

        /**
         * Le bouton pour démarrer une partie
         * @type {JQuery<HTMLElement>}
         */
        this.$btnGo = $(".btnGo");

        this.$btnGo.on("click",function (e) {
            e.preventDefault();
            me.demarreNouveauJeu();
            //plein écran
            $("body")[0].requestFullscreen();
        });
    }
    /**
     * Masque l'écran de début, fait une pause de 3 secondes et lance la balle !
     */
    demarreNouveauJeu() {
        terrain.masqueEcranDebut();
        let me = this;
        //stop pendant 3 secondes
        setTimeout(
            function () {
                balle.recentrer();
            },
            3000
        );
    }

}