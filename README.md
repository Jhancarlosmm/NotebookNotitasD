# Notitas Diarias

Sitio estático para publicar poemas y entradas de diario con estética de cuaderno. El contenido puede cargarse desde una hoja de Google publicada como CSV. La página consulta esa hoja al abrirse y vuelve a comprobarla cada minuto.

> Las publicaciones de un canal de WhatsApp no se importan directamente. WhatsApp Channels no ofrece una API pública para leer sus publicaciones. La hoja de Google funciona como fuente de contenido que puedes actualizar cuando quieras publicar algo nuevo.

## Configuración inicial

### 1. Crear la hoja

En Google Sheets, crea una hoja y pon estos encabezados en la primera fila. Puedes escribirlos en una sola fila, cada uno en su propia columna:

| categoria | titulo | fecha | texto | nota |
| --- | --- | --- | --- | --- |

Los nombres deben estar escritos así. El orden de las columnas puede cambiar, pero no cambies sus nombres. La columna `nota` es opcional para cada publicación; si no necesitas una nota, deja esa celda vacía.

### 2. Añadir publicaciones

Cada fila después de los encabezados representa una publicación. Completa los campos así:

- `categoria`: escribe `poesia` para que aparezca bajo **Mensajitos**, o `diario` para que aparezca bajo **Diario**. Usa una de esas dos palabras exactamente.
- `titulo`: título que aparecerá sobre el texto.
- `fecha`: fecha para mostrar, por ejemplo `23 de octubre de 2026`. El sitio muestra el texto tal como lo escribas.
- `texto`: contenido principal. Puedes usar comas, comillas y saltos de línea dentro de la celda; Google Sheets los exporta correctamente como CSV.
- `nota`: recordatorio o frase manuscrita que aparecerá al final. Puede quedar vacía.

Ejemplo de filas en la hoja:

| categoria | titulo | fecha | texto | nota |
| --- | --- | --- | --- | --- |
| poesia | Una luz pequeña | 23 de octubre de 2026 | La tarde guarda un poco de sol entre las páginas. | Para leer al atardecer. |
| diario | Viernes de lluvia | 24 de octubre de 2026 | Hoy escribí despacio y dejé que la lluvia acompañara la página. | |

No hace falta editar `script.js` para agregar publicaciones. Añade una fila al final de la hoja y guarda los cambios; la web la recogerá automáticamente en la próxima consulta.

### 3. Publicar la hoja como CSV

La página necesita una URL que permita leer la hoja sin iniciar sesión:

1. En Google Sheets, abre **Archivo > Compartir > Publicar en la Web**.
2. Selecciona la hoja que contiene las publicaciones.
3. Selecciona el formato **Valores separados por comas (.csv)** o **CSV**, según el idioma de la interfaz.
4. Pulsa **Publicar** y confirma.
5. Copia la URL publicada. Debe ser la dirección del CSV generado por Google, no simplemente la URL normal de edición de la hoja.

Al publicar el CSV, cualquier persona que tenga la URL puede leer las publicaciones. No incluyas datos privados o información que no quieras hacer pública.

### 4. Conectar la URL con el sitio

Abre `config.js` y reemplaza el valor vacío por la URL CSV que copiaste, dejando las comillas:

```js
window.NOTEBOOK_CSV_URL = 'PEGA_AQUI_LA_URL_CSV_PUBLICADA';
```

Guarda el archivo y publica los cambios del sitio en el mismo alojamiento donde está `index.html`. `config.js`, `script.js` e `index.html` deben permanecer juntos en la raíz del sitio.

## Cómo publicar una nueva entrada

1. Abre la hoja de Google conectada.
2. Agrega una fila nueva debajo de las existentes.
3. Completa categoría, título, fecha y texto; añade una nota si la necesitas.
4. No cambies ni elimines la fila de encabezados.
5. Abre o recarga el sitio. Si ya estaba abierto, espera hasta un minuto para que consulte la hoja otra vez.

El sitio descarga las filas actuales de la hoja y las usa como contenido de **ambas** categorías. Por eso, conserva en la hoja todas las publicaciones que quieras que sigan apareciendo. Si eliminas una fila de la hoja, desaparecerá del sitio después de la próxima sincronización. Si la hoja no está disponible o no contiene filas válidas, el sitio conserva el contenido local incluido como respaldo.

## Comprobar que funciona

- El mensaje bajo los filtros debe indicar **Contenido sincronizado** y mostrar la hora de la última consulta.
- Pulsa **Mensajitos** o **Diario** para comprobar que cada entrada aparece en su categoría.
- Si ves **Mostrando contenido guardado**, revisa que la URL esté configurada en `config.js` y que la página se haya vuelto a publicar.
- Si ves **Sin conexión**, el navegador no pudo leer la hoja; el contenido disponible se conserva.

Para probarlo localmente, abre el proyecto mediante un servidor local o la vista previa de VS Code. Algunos navegadores restringen las solicitudes de red cuando una página se abre directamente con una dirección `file://`.

## Solución de problemas

- **Sigue apareciendo el contenido anterior:** confirma que agregaste la fila a la hoja correcta y que la hoja publicada incluye esa pestaña. Espera hasta un minuto o recarga el sitio.
- **No aparece ninguna entrada de una categoría:** revisa que `categoria` sea exactamente `poesia` o `diario`, y que la fila tenga título y texto.
- **El indicador no cambia a “Contenido sincronizado”:** comprueba que `config.js` tenga la URL CSV pública, que esté publicada como CSV y que no sea una URL que solicite iniciar sesión.
- **Los cambios de la hoja publicada tardan en verse:** vuelve a publicar la hoja si Google lo solicita y recarga la página. El sitio intenta evitar la caché del navegador, pero la publicación puede tardar en reflejar cambios.
- **La página se abre como archivo local y no carga la hoja:** ejecútala desde un servidor local o publícala en un alojamiento web HTTPS.
- **Aparece el contenido local en vez de la hoja:** ese es el respaldo integrado; la URL no está configurada o la descarga no pudo completarse.

## Contenido local de respaldo

Las entradas incluidas inicialmente en `script.js` se muestran cuando no hay una URL configurada o cuando no se puede obtener un CSV válido. Una vez que la sincronización funciona, la hoja es la fuente de contenido visible. Para cambiar el respaldo, edita el objeto `contenidos` en `script.js`.