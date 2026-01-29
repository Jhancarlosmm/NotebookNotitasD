const contenidos = {
    'poesia': {
        titulo: "Versos de Medianoche",
        fecha: "15 de Diciembre, 2025",
        texto: "La luna se derrama sobre el papel,<br>versos que nacen sin querer.<br>Tinta negra, alma blanca,<br>la pluma nunca se cansa.",
        nota: "Inspirado en el frío del invierno."
    },
    'diario': {
        titulo: "El Eco del Tintero",
        fecha: "21 de Enero, 2026",
        texto: "Las palabras parecen cobrar vida propia bajo la luz de la vela. Hay algo en la textura del papel que invita a la confesión... A veces, el silencio es más ruidoso que cualquier estruendo.",
        nota: "Recordar: Revisar el capítulo sobre los sueños perdidos."
    }
};

function filter(category) {
    const container = document.getElementById('story-container');
    const data = contenidos[category];

    // Efecto de desvanecimiento
    container.style.opacity = 0;

    setTimeout(() => {
        if (data) {
            container.innerHTML = `
                <article class="page">
                    <span class="date">${data.fecha}</span>
                    <h2>${data.titulo}</h2>
                    <p>${data.texto}</p>
                    <div class="sticky-note">
                        ${data.nota}
                    </div>
                </article>
            `;
        }
        container.style.opacity = 1;
    }, 300);
}

document.querySelector('.whatsapp').addEventListener('click', () => {
    console.log("Abriendo comunicación por telegrama moderno...");
});