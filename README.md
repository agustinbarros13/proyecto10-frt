# 🗓️ Proyecto 10 - Gestión de Eventos

Aplicación full-stack para gestionar eventos: permite a los usuarios registrarse, iniciar sesión, crear eventos, subir carteles con imágenes, buscar eventos y confirmar asistencia.

---

## 🔗 Demo online

- **Frontend (Vercel)**: [https://proyecto10-frt.vercel.app](https://proyecto10-frt.vercel.app)
- **Backend (Render)**: [https://proyecto10-bk.onrender.com](https://proyecto10-bk.onrender.com)

---

## 📦 Tecnologías

### 🖥️ Frontend
- Vite + React
- React Router
- Context API (Auth)
- Hooks personalizados
- Fetch centralizado (`utils/api.js`)

### 🌐 Backend
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT (autenticación)
- Cloudinary (subida de imágenes)
- Middleware y rutas protegidas

---

## 📁 Estructura del proyecto

> Ambos proyectos están separados en sus respectivos repositorios:

- **Frontend** → carpeta: `frontend/`
- **Backend** → carpeta: `backend/`

Cada uno cuenta con su propia arquitectura limpia, modular y profesional.

---

## 🔐 Autenticación

- Registro (`POST /auth/register`)
- Login (`POST /auth/login`)
- Middleware `auth` para proteger rutas privadas
- Token JWT guardado en `localStorage`

---

## 🛠️ Funcionalidades principales

### 👤 Usuario
- Registro e inicio de sesión
- Crear eventos con título, descripción, fecha, ubicación y cartel
- Buscar eventos
- Ver detalles
- Confirmar asistencia
- Ver asistentes

---

## 🧪 Endpoints principales (Backend)

```http
POST   /auth/register       # Crear cuenta
POST   /auth/login          # Login
GET    /events/all          # Obtener todos los eventos
GET    /events/search?q=    # Buscar eventos
POST   /events/create       # Crear evento (auth)
GET    /events/:id          # Ver detalle de evento
POST   /events/:id/attend   # Confirmar asistencia (auth)
