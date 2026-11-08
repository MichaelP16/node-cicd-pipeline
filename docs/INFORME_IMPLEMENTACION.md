# Informe de implementación

## Resumen

El proyecto implementa una aplicación de tareas con Node.js y Express, pruebas automatizadas y un pipeline de GitHub Actions que valida el código, construye una imagen Docker y despliega la interfaz estática en GitHub Pages.

**Repositorio:** [MichaelP16/node-cicd-pipeline](https://github.com/MichaelP16/node-cicd-pipeline)  
**Sitio previsto:** [https://michaelp16.github.io/node-cicd-pipeline/](https://michaelp16.github.io/node-cicd-pipeline/)

## Implementación

- **Aplicación:** API REST para crear, listar, completar y eliminar tareas; endpoints de salud y métricas.
- **Interfaz:** lista de tareas que funciona con la API local. En GitHub Pages utiliza `localStorage`, ya que Pages solo sirve contenido estático.
- **Pruebas:** Jest y Supertest cubren la normalización del título y los flujos principales de la API, incluidos errores de validación y recursos inexistentes.
- **Cobertura:** se genera con `npm test` en el directorio `coverage/`.
- **Contenedor:** Dockerfile con Node.js Alpine, dependencias de producción y healthcheck.
- **CI/CD:** `.github/workflows/ci.yml` ejecuta instalación reproducible, revisión de sintaxis, pruebas con cobertura y build de Docker. En un `push` correcto a `main`, publica `public/` en GitHub Pages.
- **Permisos:** los permisos de despliegue de Pages se limitan al job que los necesita.

## Verificación local

Ejecutar desde la raíz del proyecto:

```bash
npm ci
npm run lint
npm test
docker build -t node-cicd-pipeline .
```

En la validación local, `npm ci`, `npm run lint` y las 11 pruebas de Jest pasaron; la cobertura total fue de 96.15 % en sentencias y 100 % en líneas. También se probó en navegador la creación, finalización y eliminación de tareas con la API, y la creación/eliminación en el modo estático de Pages. No fue posible completar `docker build` porque el daemon de Docker Desktop no estaba iniciado. El workflow vuelve a ejecutar las verificaciones y el build en GitHub para cada cambio a `main` y pull request.

## Demostración y evidencia

El repositorio GitHub indicado estaba vacío y todavía no tenía ejecuciones de Actions al preparar este informe. Por eso, la evidencia remota y la ejecución del workflow deben completarse después del primer `push`:

1. Publicar la rama `main` siguiendo los pasos del README.
2. En **Settings → Pages**, elegir **GitHub Actions** como fuente.
3. Guardar una captura de la ejecución exitosa en **Actions** y de la aplicación abierta en Pages.
4. Añadir ambas capturas o sus enlaces aquí para la presentación.

No se declara como completado un despliegue remoto hasta que esa ejecución aparezca en GitHub.

## Limitaciones y mejoras futuras

- La API almacena tareas en memoria; los datos se pierden al reiniciar el servidor.
- La demo estática almacena los datos en el navegador actual y no los sincroniza con la API.
- Como siguiente paso se puede añadir persistencia con SQLite y una política de cobertura mínima.
