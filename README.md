# SORO™ - Sistema Odontológico de Respuesta Oportuna

Esta es la plataforma inteligente diseñada para automatizar la comunicación y gestión de pacientes en clínicas dentales.

## 🚀 Funcionalidades Implementadas

- **Asistente Virtual con IA**: Chatbot inteligente disponible 24/7 para resolver dudas de pacientes.
- **Embudo de Conversión (VSL)**: Página optimizada con video de ventas y captura de leads de alto interés.
- **Demo Multi-paso**: Cuestionario interactivo para clínicas con selección de servicios y modos de prueba (WhatsApp o Sandbox).
- **Panel de Administración**: Visualización centralizada de todos los prospectos (leads) capturados, organizados por origen.
- **Analítica Avanzada**: Integración con Google Analytics (G-8XX2L49GC7) y Píxel de Meta para seguimiento de eventos críticos (`Lead`, `Schedule`, `Contact`).
- **Diseño Responsive**: Interfaz optimizada para una experiencia fluida en dispositivos móviles y escritorio.

## 🛠️ Tecnologías

- **Framework**: Next.js 15 (App Router)
- **UI**: React, Tailwind CSS, Shadcn/UI, Framer Motion
- **Backend/Base de Datos**: Firebase (Firestore, Auth, App Hosting)
- **IA**: Google Genkit con modelos Gemini 2.5 Flash

## 📁 Estructura del Proyecto

- `src/app`: Rutas y páginas de la aplicación.
- `src/components`: Componentes de UI reutilizables y secciones de landing page.
- `src/ai`: Lógica de flujos de IA y configuraciones de Genkit.
- `src/firebase`: Configuración e integración con los servicios de Firebase.
- `docs`: Guías de configuración (Píxel, Backend).

## 💻 Guía de Comandos Git

### 1. Configurar el Repositorio (Solo si da error 'origin')
```bash
git remote add origin https://github.com/Mr-Espejo/SOROv1.git
```

### 2. Guardar y Subir Cambios Normales
```bash
git add .
git commit -m "Mejoras en el diseño y analítica"
git push -u origin main
```

### 3. Solución de Errores (Push Rejected / Force)
Si al intentar subir cambios te da un error de "rejected" porque el remoto tiene cambios que tú no tienes, y quieres **sobrescribir el remoto** con tu versión actual:
```bash
git push -u origin main --force
```

*Nota: Usa --force con precaución, ya que borrará cualquier cambio en GitHub que no esté en este editor.*

## 🛠️ Comandos de Desarrollo
- **Instalar dependencias**: `npm install`
- **Ejecutar en desarrollo**: `npm run dev`
- **Compilar para producción**: `npm run build`

## 📊 Seguimiento de Eventos
Para más detalles sobre cómo medimos el éxito de la plataforma, consulta la [Guía de Eventos del Píxel de Meta](./docs/pixel-events-guide.md).
