# Guía de Eventos del Píxel de Meta para SORO

Esta guía explica los eventos del Píxel de Meta que hemos configurado en tu aplicación. Estos eventos te ayudan a medir las acciones más importantes que los usuarios realizan en tu sitio web.

Puedes ver todos estos eventos y sus detalles en el [Administrador de Eventos de Meta](https://www.facebook.com/events_manager/).

---

### 1. Evento `PageView` (Vista de Página)

- **¿Qué es?**: Es el evento más básico. Se dispara cada vez que un usuario carga **cualquier página** de tu sitio web.
- **¿Para qué sirve?**: Te permite saber qué páginas son las más visitadas y rastrear el tráfico general.
- **¿Dónde se configura?**: Está en el código base del Píxel, dentro de `src/app/layout.tsx`. Se ejecuta automáticamente en todas las páginas.

---

### 2. Evento `Lead` (Prospecto)

- **¿Qué es?**: Este evento se dispara cuando un usuario completa y envía con éxito un **formulario para capturar sus datos**.
- **¿Para qué sirve?**: Es crucial para medir cuántos clientes potenciales estás generando a través de tus páginas de destino.
- **¿Dónde se configura?**:
    - En el archivo: `src/components/landing/lead-form.tsx`
    - Se activa dentro de la función `onSubmit`, justo después de que los datos del usuario se envían correctamente.
- **Páginas que lo utilizan**:
    - `/vsl-opt-in`
    - `/personalized-demo`
    - `/lead-magnet`

---

### 3. Evento `Schedule` (Agendar)

- **¿Qué es?**: Se dispara cuando un usuario completa **todos los pasos** del formulario de solicitud de demostración.
- **¿Para qué sirve?**: Mide la intención de un usuario de agendar una demostración, lo que lo califica como un prospecto de alto valor.
- **¿Dónde se configura?**:
    - En el archivo: `src/components/demo/multi-step-form.tsx`
    - Se activa en la función `saveData` cuando el usuario llega al último paso y se guardan sus preferencias.

---

### 4. Evento `Contact` (Contacto)

- **¿Qué es?**: Se dispara cada vez que un usuario hace clic en un botón o enlace que lo redirige a **WhatsApp**.
- **¿Para qué sirve?**: Te ayuda a medir cuántos usuarios prefieren un contacto directo e inmediato.
- **¿Dónde se configura?**:
    - `src/app/page.tsx`: En los botones "Hablar con un Especialista" y el enlace del menú "Contactar por WhatsApp".
    - `src/app/schedule-call/page.tsx`: En los botones que enlazan a WhatsApp.
    - `src/app/landing-pages/page.tsx`: (No aplica actualmente, pero si se añade un botón de WhatsApp aquí, debería usar este evento).

---

### 5. Evento `JoinGroup` (Unirse a Grupo)

- **¿Qué es?**: Un evento específico que se dispara cuando un usuario hace clic en el botón para **unirse al grupo de WhatsApp exclusivo para webinars**.
- **¿Para qué sirve?**: Mide el interés de tu audiencia en contenido educativo y te permite construir una comunidad.
- **¿Dónde se configura?**:
    - En el archivo: `src/app/webinars/page.tsx`
    - Se activa al hacer clic en el botón "Unirme al Grupo Exclusivo".

---

### ¿Cómo Probar los Eventos?

Puedes usar la extensión de navegador **"Meta Pixel Helper"** o la herramienta **"Probar eventos"** dentro de tu Administrador de Eventos de Meta para navegar por tu sitio y ver en tiempo real cómo se disparan estos eventos.
