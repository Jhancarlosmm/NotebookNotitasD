const contenidos = {
    'poesia': [
        {
            titulo: "Versos de Medianoche",
            fecha: "15 de Diciembre, 2025",
            texto: "La luna se derrama sobre el papel,<br>versos que nacen sin querer.<br>Tinta negra, alma blanca,<br>la pluma nunca se cansa.",
            nota: "Inspirado en el frío del invierno."
        },
        {
            titulo: "Bruma de Tinta",
            fecha: "18 de Enero, 2026",
            texto: "Entre páginas suaves y café humeante, las letras encuentran un ritmo propio.<br>Cada verso es una pincelada de luz en la penumbra de la tarde.",
            nota: "Guardar este poema para el libro de otoño."
        }
    ],
    'diario': [
        {
            titulo: "El Eco del Tintero",
            fecha: "21 de Enero, 2026",
            texto: "Las palabras parecen cobrar vida propia bajo la luz de la vela. Hay algo en la textura del papel que invita a la confesión... A veces, el silencio es más ruidoso que cualquier estruendo.",
            nota: "Recordar: Revisar el capítulo sobre los sueños perdidos."
        },
        {
            titulo: "Amanecer en Papel",
            fecha: "27 de Enero, 2026",
            texto: "Los primeros rayos de sol dibujan sombras suaves en la hoja. Anotar lo que no se dijo anoche para no perder la memoria.",
            nota: "Anotar las sensaciones del amanecer en la libreta verde."
        }
    ]
};

function generarArticulo(entry) {
    return `
        <article class="page">
            <span class="date">${entry.fecha}</span>
            <h2>${entry.titulo}</h2>
            <p>${entry.texto}</p>
            <div class="sticky-note">
                ${entry.nota}
            </div>
        </article>
    `;
}

function filter(category) {
    const container = document.getElementById('story-container');
    const data = contenidos[category] || [];
    const botones = document.querySelectorAll('.filters button');

    botones.forEach(button => {
        const isActive = button.getAttribute('onclick')?.includes(category);
        button.style.opacity = isActive ? '1' : '0.75';
        button.style.transform = isActive ? 'translateY(-1px)' : 'translateY(0)';
    });

    container.style.transition = 'opacity 0.25s ease';
    container.style.opacity = 0;

    setTimeout(() => {
        container.innerHTML = data.map(generarArticulo).join('');
        container.style.opacity = 1;
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    filter('poesia');
});

document.querySelector('.whatsapp').addEventListener('click', () => {
    console.log("Abriendo comunicación por telegrama moderno...");
});