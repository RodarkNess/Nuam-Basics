# nuam · Mantenedor de calificaciones tributarias

Prototipo funcional de las cinco pantallas del mockup: inicio de sesión con MFA, resumen/búsqueda, detalle de documento, carga masiva y aprobaciones.

## Ejecutar

```bash
npm install
npm run dev
```

El acceso demo acepta cualquier correo y contraseña no vacíos. En el segundo paso se puede ingresar cualquier código de seis dígitos.

## Seguridad implementada

- MFA obligatorio en el flujo de acceso y cierre de sesión desde la navegación.
- Datos fiscales enmascarados en la interfaz; no se incluyen secretos en el repositorio.
- RBAC y aislamiento por organización/país preparados en [supabase/schema.sql](./supabase/schema.sql) mediante RLS.
- Auditoría append-only para lecturas, cambios, descargas, aprobaciones y fallos.
- Borrado lógico, UUID, restricciones de dominio, índices de búsqueda y hash SHA-256.
- El límite de carga del mockup se fija en 25 MB; se aceptan `.xlsx`, `.csv` y `.pdf`.

El esquema está preparado para Supabase Auth, Storage privado con URLs firmadas y despliegue en Vercel. Antes de producción deben conectarse el proveedor MFA, análisis antivirus, cálculo/verificación real del hash, políticas de retención y variables de entorno.
