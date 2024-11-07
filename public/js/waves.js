document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    document.querySelector(".particle-background").appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const waves = [];
    const mouse = { x: null, y: null };
    let lastMoveTime = 0; // Temps du dernier mouvement de la souris
    let spawnInterval = 150; // Intervalle entre chaque génération de cercle (en ms)
    let nextSpawnTime = 0; // Temps auquel le prochain cercle peut apparaître
    let generateWavesInterval = 200; // Intervalle entre chaque génération (quand la souris ne bouge pas)

    // Initialisation des vagues
    function initWaves() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Fonction pour générer une nouvelle vague
    function generateWave(x, y) {
        waves.push({
            x: x,
            y: y,
            radius: 0, // Le rayon commence à 0
            maxRadius: Math.random() * 150 + 100, // Rayon maximal
            speed: Math.random() * 1.5 + 0.5, // Vitesse de propagation réduite
            alpha: 1, // Transparence qui diminue au fur et à mesure
            color: `rgba(${Math.random() * 30 + 30}, ${Math.random() * 30 + 60}, ${Math.random() * 100 + 150}, 0.8)` // Couleur bleue aléatoire
        });
    }

    // Mise à jour des vagues
    function updateWaves() {
        // Créer une nouvelle vague seulement si le délai entre deux vagues est passé
        if (mouse.x && mouse.y && Date.now() >= nextSpawnTime) {
            generateWave(mouse.x, mouse.y); // Créer une vague autour de la souris
            nextSpawnTime = Date.now() + spawnInterval; // Définir le temps du prochain cercle
        }

        // Mise à jour des vagues existantes
        for (let i = 0; i < waves.length; i++) {
            const wave = waves[i];
            wave.radius += wave.speed;
            wave.alpha -= 0.01; // Diminution de la transparence
            if (wave.alpha <= 0) {
                waves.splice(i, 1); // Supprimer la vague lorsque l'alpha devient 0
                i--; // Pour ne pas sauter un élément
            }
        }
    }

    // Dessin des vagues
    function drawWaves() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Dessiner chaque vague avec une couleur bleue différente
        waves.forEach(wave => {
            context.beginPath();
            context.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
            context.strokeStyle = wave.color; // Appliquer la couleur de la vague
            context.lineWidth = 2;
            context.stroke();
            context.closePath();
        });
    }

    // Animation des vagues
    function animateWaves() {
        updateWaves();
        drawWaves();
        requestAnimationFrame(animateWaves);
    }

    // Réajuster la taille du canvas lors du redimensionnement
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Suivre la position de la souris et marquer son mouvement
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
        lastMoveTime = Date.now(); // Enregistrer le temps du dernier mouvement de la souris
    });

    // Générer des vagues même si la souris ne bouge pas
    function generateWavesPeriodically() {
        setInterval(() => {
            if (mouse.x && mouse.y) {
                generateWave(mouse.x, mouse.y); // Créer une vague autour de la dernière position de la souris
            }
        }, generateWavesInterval); // Créer une vague toutes les `generateWavesInterval` millisecondes
    }

    initWaves();
    generateWavesPeriodically(); // Appeler la génération de vagues périodiquement
    animateWaves();
});
