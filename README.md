# Node CI/CD Pipeline

Aplicación web sencilla de tareas para practicar integración continua y despliegue continuo con Node.js, GitHub Actions y GitHub Pages.

**Repositorio:** [MichaelP16/node-cicd-pipeline](https://github.com/MichaelP16/node-cicd-pipeline)  
**URL de Pages:** [michaelp16.github.io/node-cicd-pipeline](https://michaelp16.github.io/node-cicd-pipeline/) (disponible después de publicar la rama `main` y configurar Pages).

## Requisitos

- Node.js 20 o superior y npm.
- Git y una cuenta de GitHub.
- Docker Desktop (opcional, para ejecutar la aplicación en contenedor).

## Ejecutar localmente

```bash
npm ci
npm test
npm run lint
npm start
```

Abre <http://localhost:5501>. La aplicación local utiliza la API de Express. Si se sirve como sitio estático en GitHub Pages, las tareas se guardan en el almacenamiento local del navegador.

### Probar con Go Live en VS Code

Con la extensión **Live Server** instalada, abre esta carpeta como workspace y pulsa **Go Live**. La configuración de [`.vscode/settings.json`](.vscode/settings.json) sirve `public/` directamente en <http://localhost:5502>, sin interferir con el puerto 5500 ni con la API local de Node en 5501. En Go Live las tareas se guardan en el navegador; para usar la API, inicia `npm start` y abre <http://localhost:5501>.

### API

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/health` | Comprueba que el servicio está activo |
| `GET` | `/metrics` | Muestra solicitudes, errores, tareas y tiempo activo |
| `GET` | `/api/tareas` | Lista las tareas |
| `POST` | `/api/tareas` | Crea una tarea; requiere `{ "titulo": "..." }` |
| `PATCH` | `/api/tareas/:id` | Alterna el estado de una tarea |
| `DELETE` | `/api/tareas/:id` | Elimina una tarea |

La API mantiene sus datos en memoria; se reinician al detener el servidor. La demo de Pages usa `localStorage` del navegador y no comparte datos entre dispositivos.

### Pruebas y cobertura

```bash
npm test
```

Jest genera la cobertura en `coverage/`. Las pruebas unitarias comprueban la normalización del título y las pruebas de integración ejercitan la API HTTP mediante Supertest.

### Docker

```bash
docker build -t node-cicd-pipeline .
docker run --rm -p 5501:5501 node-cicd-pipeline
```

La imagen usa Node.js Alpine, instala solo dependencias de producción y define una comprobación de salud en `/health`.

## Pipeline de GitHub Actions

El workflow está en [`.github/workflows/ci.yml`](.github/workflows/ci.yml) y se ejecuta en cada `push` a `main`, en los pull requests dirigidos a `main` y manualmente desde **Actions → CI/CD → Run workflow**.

1. **Preparación:** descarga el código y configura Node.js 20 con caché de npm.
2. **Instalación reproducible:** `npm ci` instala las versiones del `package-lock.json`.
3. **Revisión estática:** `npm run lint` verifica la sintaxis de los módulos del servidor.
4. **Pruebas y cobertura:** `npm test` ejecuta Jest y publica el resumen de cobertura en los logs.
5. **Build:** construye la imagen Docker. El job falla si alguna etapa anterior falla.
6. **Despliegue:** después de un `push` exitoso a `main`, carga `public/` como artefacto y lo publica en GitHub Pages. Los pull requests solo ejecutan CI, no publican.

Los permisos de escritura para Pages están limitados al job de despliegue.

## Configurar y publicar en GitHub

El repositorio vinculado a este proyecto ya fue creado, pero debe tener estos archivos y el primer `push` para iniciar el workflow:

1. Desde la carpeta del proyecto, instala dependencias para generar el lockfile si todavía no existe:

   ```bash
   npm install
   ```

2. Inicializa Git y publica la rama `main`:

   ```bash
   git init
   git add .
   git commit -m "Configurar aplicación y pipeline CI/CD"
   git branch -M main
   git remote add origin https://github.com/MichaelP16/node-cicd-pipeline.git
   git push -u origin main
   ```

   Si ya existe un remoto llamado `origin`, usa `git remote set-url origin https://github.com/MichaelP16/node-cicd-pipeline.git` en vez de `git remote add`.

3. En GitHub, abre **Settings → Pages** y selecciona **GitHub Actions** como fuente de despliegue.
4. Abre **Actions** y comprueba que el workflow **CI/CD** finalice correctamente. El job **Despliegue a GitHub Pages** muestra la URL publicada.
5. Para la demostración, enseña la ejecución verde en Actions y abre la URL de Pages. Si haces un cambio y lo subes a `main`, se ejecutará de nuevo.

## Estructura

```text
.github/workflows/ci.yml   Automatización CI/CD
public/index.html          Interfaz y modo estático para Pages
src/app.js                 Aplicación Express y API
src/server.js              Inicio del servidor
src/validacion.js          Validación unitaria del título
tests/                     Pruebas unitarias e integración
Dockerfile                 Imagen de producción
CONTRIBUTING.md            Guía para contribuir
docs/INFORME_IMPLEMENTACION.md  Informe de implementación
```

## Documentación adicional

- [Guía de contribución](CONTRIBUTING.md)
- [Informe de implementación y demostración](docs/INFORME_IMPLEMENTACION.md)
