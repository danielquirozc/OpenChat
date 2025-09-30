# OpenChat

OpenChat es una aplicación web de chat en tiempo real construida con **Next.js** y **TailwindCSS**.  
Su objetivo es proveer una experiencia de mensajería rápida, moderna y sencilla, inspirada en las principales plataformas de comunicación.

---

## 🚀 Tecnologías

- **[Next.js](https://nextjs.org/)** – Framework de React para aplicaciones web modernas.  
- **[TailwindCSS](https://tailwindcss.com/)** – Framework de estilos utilitario para diseño responsivo y consistente.  
- **TypeScript** – Tipado estático para mayor mantenibilidad.  
- **Socket.IO / WebSockets** – Comunicación en tiempo real (si aplica).  
- **Prisma / PostgreSQL** – Persistencia de datos (si aplica).  

---

## 📦 Instalación

Clona el repositorio y navega dentro del proyecto:

```bash
git clone https://github.com/tu-usuario/OpenChat.git
cd OpenChat
```

Instala las dependencias:

```bash
pnpm install
# o npm install / yarn install
```

Configura las variables de entorno en un archivo `.env`:

```env
DATABASE_URL=postgresql://usuario:password@localhost:5432/openchat
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## ▶️ Uso en Desarrollo

Ejecuta el servidor de desarrollo:

```bash
pnpm dev
# o npm run dev / yarn dev
```

La aplicación estará disponible en:

```
http://localhost:3000
```

### Inicializar Base de Datos en Desarrollo

Si la base de datos está vacía, sigue estos pasos:

1. Crear la primera migración:
```bash
npx prisma migrate dev --name init
```
2. Generar el cliente de Prisma:
```bash
npx prisma generate
```

> Nota: Puedes usar `npx prisma migrate reset` para dropear y recrear la DB de desarrollo si quieres empezar limpio. Esto **elimina todos los datos**.

---

## 🛠 Scripts principales

- `dev` – Inicia el entorno de desarrollo.  
- `build` – Compila la aplicación para producción.  
- `start` – Corre la aplicación compilada.  
- `lint` – Revisa errores de estilo y buenas prácticas.  

---


## 🤝 Contribución

1. Haz un **fork** del proyecto.  
2. Crea una nueva rama con tu feature:  
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Haz commit de tus cambios:  
   ```bash
   git commit -m "Agregada nueva funcionalidad"
   ```
4. Haz push a la rama:  
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Crea un **Pull Request**.

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**.  
Consulta el archivo [LICENSE](./LICENSE) para más detalles.
