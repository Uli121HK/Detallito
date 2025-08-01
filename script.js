const petalsContainer = document.getElementById('petals-container');
document.addEventListener('DOMContentLoaded', () => {
    const chasers = document.querySelectorAll('.neon-chaser');
    // MODIFICAR: Longitud del trozo de neón visible (número más grande = trazo más largo)
    const neonSegmentLength = 100;

    chasers.forEach(chaserPath => {
        const pathLength = chaserPath.getTotalLength();
        chaserPath.style.setProperty('--path-length', pathLength);
        chaserPath.style.setProperty('--path-length-negative', -pathLength);
        const gapLength = pathLength - neonSegmentLength;
        chaserPath.style.strokeDasharray = `${neonSegmentLength} ${gapLength}`;
    });
     const messageDivs = document.querySelectorAll('.text-message');
    const miAudio = new Audio("interstellar.mp3");
    
    messageDivs.forEach(div => {
        div.addEventListener('click', () => {
            miAudio.currentTime = 0;
            miAudio.play().catch(error => {
                console.error("Error al intentar reproducir el audio:", error);
            });
        });
    });
});
function createClickParticles(e) {
    const x = e.clientX;
    const y = e.clientY;
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 50 + 50;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;

        requestAnimationFrame(() => {
            sparkle.style.transform = `translate(${targetX}px, ${targetY}px) scale(0)`;
            sparkle.style.opacity = '0';
        });

        petalsContainer.appendChild(sparkle);
        setTimeout(() => { sparkle.remove(); }, 800);
    }
}

function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = (Math.random() * 5 + 8) + 's';
    petal.style.animationDelay = (Math.random() * 2) + 's';
    const size = Math.random() * 8 + 6;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petalsContainer.appendChild(petal);
    setTimeout(() => { petal.remove(); }, 10000);
}

// MODIFICAR: Frecuencia con la que aparecen nuevos pétalos (en milisegundos). Menor número = más pétalos.
setInterval(createPetal, 300);