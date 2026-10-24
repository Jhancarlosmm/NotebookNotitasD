# Actualizar las publicaciones desde Google Sheets

La página comprueba la hoja cada minuto. WhatsApp Channels no ofrece una API pública para importar publicaciones directamente, así que esta conexión usa Google Sheets como fuente.

1. Crea una hoja con estas columnas, en este orden: `categoria`, `titulo`, `fecha`, `texto`, `nota`.
2. En `categoria`, usa `poesia` o `diario`. Cada fila representa una publicación. `nota` puede quedar vacía.
3. En Google Sheets, abre **Archivo > Compartir > Publicar en la Web**, selecciona la hoja y el formato CSV, y publícala.
4. Copia la URL CSV publicada y pégala entre las comillas de `config.js`:

```js
window.NOTEBOOK_CSV_URL = 'URL_CSV_PUBLICADA';
```

Las publicaciones locales se mantienen como respaldo si la hoja no responde. La URL publicada es de lectura pública; no pongas información privada en esa hoja.