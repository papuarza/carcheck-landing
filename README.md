# CarCheck — Landing

Sitio estático de [carcheck.com.py](https://carcheck.com.py): informes de historial vehicular en Paraguay.

- `index.html` — página única (HTML semántico, sin frameworks)
- `css/styles.css` — estilos (tokens de marca: `#121212`, `#03598C`, `#049DD9`)
- `js/main.js` — menú mobile, buscador VIN → formulario, envío del formulario, animaciones
- `assets/` — logos SVG y favicon · `img/` — fotos

Diseño de referencia en Figma: `CarCheck – Landing`.

## Publicación
Se publica con GitHub Pages desde la rama `main` (raíz). El archivo `CNAME` fija el dominio.

## Formulario de contacto
Usa [Web3Forms](https://web3forms.com). Reemplazar `REEMPLAZAR_CON_ACCESS_KEY_WEB3FORMS` en `index.html` por la access key
asociada a `info@carcheck.com.py`. Mientras no haya key, el botón abre el cliente de correo (mailto) con los datos cargados.

## Buscador VIN
Todavía no hay backend: el buscador lleva al formulario de contacto con el VIN precargado. Cuando exista la API,
reemplazar el handler en `js/main.js` (`vin-form` / `vin-form-2`).
