# 🎬 WinitMoney — Personal Portfolio

Este es el portfolio personal de Javier Lorente, filmmaker, director creativo y narrador visual. Desarrollado con **Next.js** y estilizado con **Tailwind CSS**, este sitio web presenta una selección de trabajos visuales y servicios audiovisuales de alto nivel.

---

## 🚀 Tecnologías

- [Next.js](https://nextjs.org/) — Framework de React
- [Tailwind CSS](https://tailwindcss.com/) — Estilado utilitario
- [Notion CMS](https://www.notion.so/) — Contenido dinámico desde Notion (con integración prevista)
- [Vercel](https://vercel.com/) — Despliegue automático

---

## 📁 Estructura del proyecto

├── components/ # Componentes reutilizables (Header, Footer, etc.)
├── pages/ # Rutas del sitio (index.js, etc.)
├── public/ # Archivos estáticos (logo, imágenes, vídeos)
├── styles/ # Archivos CSS globales
├── .gitignore # Archivos y carpetas ignoradas por Git
└── README.md # Este archivo


---

## 🖼️ Imágenes y Vídeos

- Las imágenes de fondo se muestran en un slideshow dinámico.
- La sección "Selected Work" incluye vídeos embebidos desde YouTube.
- Puedes ajustar los IDs de los vídeos fácilmente en `components/Portfolio.js`.

---

## 🔧 Instalación local

```bash
# Clonar el proyecto
git clone https://github.com/tu-usuario/tu-repo.git

# Entrar en el directorio
cd winitmoney-next-site

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

🌐 Despliegue
Este sitio está listo para ser desplegado con Vercel:

Crea una cuenta en Vercel y conéctala con tu repositorio GitHub.

Vercel detectará automáticamente que es un proyecto Next.js.

Haz clic en "Deploy" y listo.

📌 Personalización
Cambia el logo en public/logo.png

Ajusta el fondo en components/BackgroundSlideshow.js

Actualiza tus vídeos de YouTube en components/Portfolio.js

Edita textos en pages/index.js o conecta con Notion para CMS dinámico

📬 Contacto
¿Quieres trabajar conmigo o colaborar en algún proyecto?

📧 javierllarena@gmail.com


---

## 📝 Publicar en el Foro

Las publicaciones del foro son archivos de texto en `content/foro/`. Solo quien tiene acceso al repositorio puede publicar.

Para crear una publicación nueva desde GitHub (también desde el móvil):

1. Entra en el repositorio → carpeta `content/foro` → **Add file → Create new file**.
2. Nombre del archivo: fecha + título corto, por ejemplo `2026-11-02-rodaje-jornada-laboral.md`.
3. Escribe así:

```
---
title: El título de la publicación
date: 2026-11-02
cover: /images/foro/mi-foto.jpg
excerpt: Una o dos frases que salen en la lista del foro.
---
Primer párrafo del texto. Puedes usar **negrita**, *cursiva* y [enlaces](https://...).

## Un subtítulo

- Una lista
- de cosas

![Pie de foto](/images/foro/otra-foto.jpg)
```

4. Pulsa **Commit changes**. Vercel publica la web sola en uno o dos minutos.

- `cover` y `excerpt` son opcionales.
- Las fotos se suben a `public/images/foro/` (Add file → Upload files).
- Versión en inglés (opcional): crea otro archivo con el mismo nombre terminado en `.en.md` (por ejemplo `2026-11-02-rodaje-jornada-laboral.en.md`) con su `title`, `excerpt` y texto. Si no existe, en inglés se muestra la versión en español.
