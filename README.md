# English Coach

App web personal para practicar inglés de cara a entrevistas de trabajo y al examen **Aptis General (British Council)**, objetivo B2. Es para Guillén y está pensada para usarse en el móvil, sobre todo con Chrome en Android.

**App:** https://guillenbruna97.github.io/english-coach/

## Qué hace
- **Hablar:** conversación por voz continua (manos libres). Reconoce tu voz con la Web Speech API del navegador, responde con Gemini y te lee la respuesta en voz alta. Las correcciones salen en pantalla: el error, la forma correcta, el porqué en español y una versión más natural. Modos: Tu trabajo, Marcas y marketing, Viajes, Tema libre, Entrevista (con la oferta pegada) y Speaking Aptis. Botón «Valorar mi nivel».
- **Examen:** tareas con formato Aptis. Speaking partes 1 a 4, con micro para dictar. Writing partes 1 a 4. Cronómetro, contador de palabras, corrección con criterios Aptis, nivel orientativo y respuesta modelo.
- **Progreso:** racha, calendario de 28 días, errores frecuentes y tarjetas de repaso. Copia de seguridad en Ajustes para pasar el progreso a otro móvil.
- **Plan:** la rutina diaria y los podcasts recomendados.

## Cómo funciona
- Es un solo archivo `index.html`, sin build ni dependencias. Las fuentes vienen de Google Fonts.
- La IA es Gemini `gemini-2.5-flash` y se llama directamente desde el navegador. La **clave de Gemini NO está en el código**: cada usuario la pega en Ajustes y se guarda en el `localStorage` de su dispositivo. Clave gratis en https://aistudio.google.com/apikey
- Todo el progreso vive en el `localStorage` del dispositivo, no hay servidor.

## Cómo seguir trabajando en ella (desde cualquier ordenador)
1. `git clone https://github.com/guillenbruna97/english-coach.git`
2. Edita `index.html` (o pídeselo a Claude Code desde esa carpeta).
3. `git add -A && git commit -m "..." && git push`. GitHub Pages publica en uno o dos minutos.

Para probar en local, abre `index.html` en Chrome. El micro pide permiso la primera vez.

## Historial de decisiones
- Examen elegido: Aptis General, porque es barato, da el resultado en unas 48–72 h y tiene un formato sencillo.
- Gemini en vez de Claude porque tiene capa gratuita (restricción de 0 €).
- Antes existía una versión sin voz como artifact de Claude (claude.ai/artifact/VpiAo2qXFuWd7xYN5B2UE1). Esta app la sustituye.
- Pendiente de iterar: probarla en el móvil y ajustar la voz y los tiempos de escucha.
