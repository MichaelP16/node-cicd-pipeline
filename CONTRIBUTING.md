# Guía de contribución

Gracias por contribuir a Node CI/CD Pipeline. Los cambios deben mantener la aplicación sencilla, probada y compatible con Node.js 20 o superior.

## Flujo de trabajo

1. Crea una rama desde `main` con un nombre descriptivo, por ejemplo `feat/eliminar-tareas`.
2. Instala dependencias con `npm ci`.
3. Implementa el cambio y agrega o actualiza las pruebas correspondientes.
4. Antes de abrir un pull request, ejecuta:

   ```bash
   npm run lint
   npm test
   docker build -t node-cicd-pipeline .
   ```

5. Abre un pull request hacia `main` y describe el cambio, cómo probarlo y cualquier limitación conocida.
6. Confirma que el workflow **CI/CD** pase. El despliegue a Pages se realiza únicamente después de un `push` a `main`.

## Criterios

- Conserva los mensajes y textos de la interfaz en español.
- Valida entradas y responde con códigos HTTP apropiados.
- Incluye pruebas unitarias para lógica aislada y pruebas de integración para rutas HTTP.
- No incluyas credenciales, archivos `node_modules/` ni resultados generados en el commit.
- Mantén el `package-lock.json` actualizado cuando cambien las dependencias.
