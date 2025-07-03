# 🗓️ Proyecto 10 - Gestión de Eventos

Aplicación full-stack para gestionar eventos, permitir registros, confirmación de asistencia, y subida de carteles con imágenes.

## 🔗 Demo online

- Frontend: [https://proyecto10-frontend.vercel.app](https://proyecto10-frontend.vercel.app)
- Backend: [https://proyecto10-api.onrender.com](https://proyecto10-api.onrender.com)

> 🌐 Sustituí las URLs por las reales cuando estén desplegadas.

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


---

## 🔐 Autenticación

- Registro (`/auth/register`)
- Login (`/auth/login`)
- Middleware `auth` para proteger rutas privadas
- Token guardado en `localStorage`

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

## 🧪 Endpoints principales (backend)

```http
POST   /auth/register       # Crear cuenta
POST   /auth/login          # Login
GET    /events/all          # Obtener todos los eventos
GET    /events/search?q=    # Buscar eventos
POST   /events/create       # Crear evento (auth)
GET    /events/:id          # Ver detalle de evento
POST   /events/:id/attend   # Confirmar asistencia (auth)
