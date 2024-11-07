document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    document.querySelector(".particle-background").appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const mouse = { x: null, y: null };

    // Initialisation des particules (les étoiles)
    function initParticles() {
        for (let i = 0; i < 150; i++) {  // Augmenter le nombre de particules pour plus d'étoiles
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,  // Taille des étoiles
                speedX: Math.random() * 0.3 - 0.15,
                speedY: Math.random() * 0.3 - 0.15,
                baseSpeedX: Math.random() * 0.3 - 0.15,  // Vitesse initiale
                baseSpeedY: Math.random() * 0.3 - 0.15,  // Vitesse initiale
                friction: 0.98 // Facteur de friction pour ralentir la particule
            });
        }
    }

    // Dessin des particules (étoiles)
    function drawParticles() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "rgba(255, 0, 0, 0.8)";  // Couleur des étoiles (blanc ou légèrement bleu)

        particles.forEach((p) => {
            context.beginPath();
            context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            context.closePath();
            context.fill();
        });
    }

    // Mise à jour des particules (étoiles)
    function updateParticles() {
        particles.forEach((p) => {
            // Application de la friction pour ralentir la particule progressivement
            p.speedX *= p.friction;
            p.speedY *= p.friction;

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > canvas.width) p.speedX = -p.speedX;
            if (p.y < 0 || p.y > canvas.height) p.speedY = -p.speedY;

            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Définition d'une portée d'effet plus douce
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                const repulsionStrength = 1; // Force de répulsion ajustée

                // Calcul de la vitesse avec une force de répulsion réduite
                p.speedX += Math.cos(angle) * repulsionStrength;
                p.speedY += Math.sin(angle) * repulsionStrength;
            }

            // Si la particule est éloignée de la souris, elle retourne à sa vitesse de base
            if (distance > 150) {
                p.speedX += (p.baseSpeedX - p.speedX) * 0.01; // Revient lentement à la vitesse de base
                p.speedY += (p.baseSpeedY - p.speedY) * 0.01; // Revient lentement à la vitesse de base
            }
        });
    }

    // Connexions entre particules pour créer des constellations
    function connectParticles() {
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach((p2) => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) {
                    context.strokeStyle = "rgba(255, 0, 0, 0.5)";  // Lignes des constellations (blanc)
                    context.lineWidth = 1;
                    context.beginPath();
                    context.moveTo(p1.x, p1.y);
                    context.lineTo(p2.x, p2.y);
                    context.stroke();
                }
            });
        });
    }

    // Animation des particules
    function animateParticles() {
        drawParticles();
        updateParticles();
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

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
