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

let categoriaActual = 'poesia';

function escaparHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[character]);
}

function generarArticulo(entry) {
    const texto = escaparHTML(entry.texto).replace(/&lt;br\s*\/?&gt;/gi, '<br>').replace(/\r?\n/g, '<br>');
    return `
        <article class="page">
            <span class="date">${escaparHTML(entry.fecha)}</span>
            <h2>${escaparHTML(entry.titulo)}</h2>
            <p>${texto}</p>
            ${entry.nota ? `<div class="sticky-note">${escaparHTML(entry.nota)}</div>` : ''}
        </article>
    `;
}

function filter(category) {
    categoriaActual = category;
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

function analizarCSV(csv) {
    const rows = [];
    let row = [];
    let field = '';
    let quoted = false;

    for (let index = 0; index < csv.length; index += 1) {
        const character = csv[index];
        if (character === '"' && quoted && csv[index + 1] === '"') {
            field += '"';
            index += 1;
        } else if (character === '"') {
            quoted = !quoted;
        } else if (character === ',' && !quoted) {
            row.push(field.trim());
            field = '';
        } else if ((character === '\n' || character === '\r') && !quoted) {
            if (character === '\r' && csv[index + 1] === '\n') index += 1;
            row.push(field.trim());
            if (row.some(Boolean)) rows.push(row);
            row = [];
            field = '';
        } else {
            field += character;
        }
    }

    row.push(field.trim());
    if (row.some(Boolean)) rows.push(row);
    if (rows.length < 2) return [];

    const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const headers = rows[0].map(value => normalize(value.replace(/^\uFEFF/, '')));
    const column = name => headers.indexOf(name);
    const categoryColumn = column('categoria');
    const titleColumn = column('titulo');
    const dateColumn = column('fecha');
    const textColumn = column('texto');
    const noteColumn = column('nota');

    if ([categoryColumn, titleColumn, dateColumn, textColumn].some(index => index < 0)) return [];

    return rows.slice(1).map(values => ({
        categoria: (values[categoryColumn] || '').toLowerCase(),
        titulo: values[titleColumn] || '',
        fecha: values[dateColumn] || '',
        texto: values[textColumn] || '',
        nota: noteColumn < 0 ? '' : values[noteColumn] || ''
    })).filter(entry => ['poesia', 'diario'].includes(entry.categoria) && entry.titulo && entry.texto);
}

async function sincronizarContenido() {
    const status = document.getElementById('sync-status');
    const csvUrl = window.NOTEBOOK_CSV_URL;
    if (!csvUrl) {
        status.textContent = 'Mostrando contenido guardado';
        return;
    }

    try {
        const response = await fetch(csvUrl, { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const entries = analizarCSV(await response.text());
        if (!entries.length) throw new Error('No se encontraron publicaciones válidas');

        ['poesia', 'diario'].forEach(category => {
            contenidos[category] = entries.filter(entry => entry.categoria === category).map(entry => ({
                titulo: entry.titulo,
                fecha: entry.fecha,
                texto: entry.texto,
                nota: entry.nota
            }));
        });

        status.textContent = `Contenido sincronizado · ${new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}`;
        filter(categoriaActual);
    } catch (error) {
        console.error('No se pudo sincronizar el contenido:', error);
        status.textContent = 'Sin conexión; se conserva el contenido disponible';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    filter('poesia');
    sincronizarContenido();
    window.setInterval(sincronizarContenido, 60_000);
});

document.querySelector('.whatsapp').addEventListener('click', () => {
    console.log("Abriendo comunicación por telegrama moderno...");
});