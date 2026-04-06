# 🚀 Pasos para Desplegar los Cambios a Railway

## 📤 Opción 1: Push a GitHub (Recomendado)

Si tu proyecto está en GitHub:

```bash
# 1. Desde la carpeta raíz del proyecto
cd "c:\Users\Jherson Silva\SnacksToPia-2.0"

# 2. Agrega los cambios
git add .

# 3. Haz commit
git commit -m "fix: agregar logs detallados para debug del error 403 en JWT"

# 4. Push a GitHub
git push origin main

# 5. Railway automáticamente verá los cambios y hará re-deploy
```

Los cambios se verán reflejados en Railway en 2-3 minutos.

---

## 📝 Opción 2: Deploy Local sin GitHub

Si no tienes GitHub configurado:

```bash
# 1. Asegúrate que Railway CLI esté instalado
railway --version

# 2. Loguéate a Railway
railway login

# 3. Link tu proyecto
railway link

# 4. Deploy manual
railway up
```

---

## ✅ Verificar el Deploy

### Desde Railway Dashboard:
1. Ve a tu proyecto "snacktopia-production"
2. Mira el estado en la sección "Deployments"
3. El nuevo deploy debería aparecer con estado "Running" ✅

### Ver Logs en Tiempo Real:
```bash
railway logs --tail
```

O en el dashboard:
1. Click en tu app
2. Tab "Logs"
3. Busca mensajes con emojis: 🔐 ✅ ❌ 📦

---

## ⚠️ Importante: Variables de Entorno

ANTES de hacer deploy, asegúrate que en Railway tienes:

```
JWT_SECRET      ← ⭐ CRÍTICO - Debe ser la MISMA que usaste para generar el token
JWT_EXPIRATION  ← 86400000
DATABASE_URL    ← Tu conexión PostgreSQL
FRONTEND_URL    ← https://snack-topia.vercel.app
```

**Si JWT_SECRET está vacío o es diferente, los tokens no funcionarán.**

---

## 🧪 Test Después del Deploy

Después de 3-5 minutos que termine el deploy:

1. Abre https://snack-topia.vercel.app/auth/login
2. Inicia sesión con: Admin123@gmail.com / Password
3. Ve a productos y haz un pedido
4. Si ves el nuevo error, good! Significa que llegó al backend.
5. Revisa los logs en Railway para ver qué pasó

---

## 🔍 ¿Qué Verás en los Logs?

### ✅ Si funciona correctamente:
```log
🔐 JWT Token recibido para: /api/pedidos
✅ Token válido para usuario: Admin123@gmail.com
👤 Usuario cargado con roles: [ROLE_USER]
🔓 Autenticación asignado al contexto
📦 POST /api/pedidos - Usuario: Admin123@gmail.com
✅ Pedido creado exitosamente: 12345
```

### ❌ Si hay problema con JWT:
```log
❌ Firma JWT inválida - Probablemente JWT_SECRET diferente
```
→ Significa que JWT_SECRET en Railway es diferente al que generó el token.

### ⏰ Si token expiró:
```log
⏰ Token expirado en: 2026-04-06 22:43:29
```
→ Genera un nuevo token iniciando sesión nuevamente.

---

## 🐛 Rollback (Si algo sale mal)

Si necesitas volver atrás:

```bash
# Ver historial de deployments
railway deployments

# Revertir a la versión anterior
railway rollback [deployment-id]
```

---

## 📞 Si Sigues con Problemas

Comparte:
1. Screenshot de Railway → Logs (últimos 30 líneas)
2. El mensaje exacto de error en el navegador
3. El timestamp del error

Entonces podré diagnosticar más profundamente.
