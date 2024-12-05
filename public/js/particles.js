document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    document.querySelector(".particle-background").appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const mouse = { x: null, y: null };

    // Créer des particules
    function initParticles() {
        for (let i = 0; i < 200; i++) {
            let speedX = Math.random() * 1 - 0.5;
            let speedY = Math.random() * 1 - 0.5;

            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 4 + 1,
                speedX: speedX,
                speedY: speedY,
                initialSpeedX: speedX,  // Vitesse initiale
                initialSpeedY: speedY,  // Vitesse initiale
                repulsion: { x: 0, y: 0 }, // Effet de répulsion
                damping: 0.05 // Amortissement de la vitesse
            });
        }
    }

    // Dessiner les particules avec plus de transparence
    function drawParticles() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "rgba(255, 255, 255, 0.2)";  // Réduction de l'opacité

        particles.forEach((p) => {
            context.beginPath();
            context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            context.closePath();
            context.fill();
        });
    }

    // Déplacer les particules et recréer celles qui touchent le bord
    function updateParticles() {
        particles.forEach((p, index) => {
            // Appliquer la vitesse de repulsion (réaction à la souris)
            p.x += p.speedX + p.repulsion.x;
            p.y += p.speedY + p.repulsion.y;

            // Réduction de la vitesse de repulsion pour que la particule revienne à la normale
            p.repulsion.x *= (1 - p.damping);
            p.repulsion.y *= (1 - p.damping);

            // Si la particule touche un bord, on la recrée à un endroit aléatoire sur un bord
            if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
                // Suppression de la particule
                particles.splice(index, 1);

                // Créer une nouvelle particule aléatoire
                createParticle();
            }

            // Interaction avec la souris
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Étendre l'aura de la souris (par exemple, 150 pixels au lieu de 100)
            if (distance < 150) {  // Augmenter la distance de l'aura
                const angle = Math.atan2(dy, dx);
                const force = 1 - distance / 1000;  // Augmenter la force de répulsion

                // Repousser la particule
                p.repulsion.x += Math.cos(angle) * force;
                p.repulsion.y += Math.sin(angle) * force;
            }
        });
    }

    // Créer une nouvelle particule au hasard sur un bord
    function createParticle() {
        let side = Math.floor(Math.random() * 4); // Choisir aléatoirement un côté (haut, bas, gauche, droite)
        let x, y, speedX, speedY;

        // Créer une particule sur un bord aléatoire
        switch (side) {
            case 0: // Haut
                x = Math.random() * canvas.width;
                y = 0;
                speedX = Math.random() * 1 - 0.5;
                speedY = Math.random() * 1 + 0.5;
                break;
            case 1: // Bas
                x = Math.random() * canvas.width;
                y = canvas.height;
                speedX = Math.random() * 1 - 0.5;
                speedY = Math.random() * 1 - 0.5;
                break;
            case 2: // Gauche
                x = 0;
                y = Math.random() * canvas.height;
                speedX = Math.random() * 1 + 0.5;
                speedY = Math.random() * 1 - 0.5;
                break;
            case 3: // Droite
                x = canvas.width;
                y = Math.random() * canvas.height;
                speedX = Math.random() * 1 - 0.5;
                speedY = Math.random() * 1 - 0.5;
                break;
        }

        // Ajouter la nouvelle particule
        particles.push({
            x: x,
            y: y,
            size: Math.random() * 4 + 1,
            speedX: speedX,
            speedY: speedY,
            initialSpeedX: speedX,
            initialSpeedY: speedY,
            repulsion: { x: 0, y: 0 },
            damping: 0.05
        });
    }

    // Relier les particules proches
    function connectParticles() {
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach((p2) => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) {
                    context.strokeStyle = "rgba(255, 255, 255, 0)";  // Réduire la transparence
                    context.lineWidth = 1;
                    context.beginPath();
                    context.moveTo(p1.x, p1.y);
                    context.lineTo(p2.x, p2.y);
                    context.stroke();
                }
            });
        });
    }

    // Animation
    function animateParticles() {
        drawParticles();
        updateParticles();
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    // Événements de redimensionnement et de mouvement de la souris
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    initParticles();
    animateParticles();
});
