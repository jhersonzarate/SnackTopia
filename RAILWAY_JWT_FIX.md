# 🔧 GUÍA RÁPIDA: Verificar y Fijar JWT_SECRET en Railway

## ⚡ 5 Pasos Rápidos

### Paso 1: Accede a Railway
```
1. Abre https://railway.app
2. Inicia sesión con tu cuenta
3. Selecciona el proyecto "snacktopia-production"
```

### Paso 2: Abre Settings
```
1. Click en "Settings" (esquina inferior izquierda)
2. Busca la sección "Variables"
3. Scroll hacia abajo
```

### Paso 3: Revisa JWT_SECRET
```
Busca una variable llamada "JWT_SECRET"
- Si está: Copia su valor (puede estar como dots: ●●●●●)
- Si no está: Crea una nueva variable
```

### Paso 4: Compara y Actualiza
```
En tu archivo local:
backend/src/main/resources/application.yml

Busca:
jwt:
  secret: ${JWT_SECRET}
  expiration: ${JWT_EXPIRATION:86400000}

El valor de JWT_SECRET en Railway debe ser consistente.
```

### Paso 5: Deploy y Prueba
```
1. Si cambiaste el JWT_SECRET en Railway, haz un re-deploy
2. Inicia sesión nuevamente en https://snack-topia.vercel.app
3. Intenta hacer un pedido
4. Debería funcionar ✅
```

---

## 🆘 Checklist de Troubleshooting

| Problema | Solución |
|----------|----------|
| ❌ "Firma JWT inválida" en logs | JWT_SECRET diferente. Verifica en Railway. |
| ❌ "Token expirado" | Inicia sesión nuevamente para generar nuevo token. |
| ❌ "Usuario no encontrado" | El user Admin123@gmail.com no existe en BD. Registra uno nuevo. |
| ✅ "Token válido para usuario" | ¡Funciona! Si aún hay 403, revisar permisos. |

---

## 📌 Variables de Entorno Necesarias en Railway

Asegúrate que tengas TODAS estas variables:

```
DATABASE_URL       ← PostgreSQL connection string
JWT_SECRET         ← Tu secret key (IMPORTANTE!)
JWT_EXPIRATION     ← 86400000 (24 horas)
FRONTEND_URL       ← https://snack-topia.vercel.app
PORT               ← 8080
```

Si falta alguna, agrégala siguiendo los pasos arriba.

---

## 🧪 Comando para Ver Logs (Alternativa)

Si tienes Railway CLI instalado:
```bash
railway login
railway link
railway logs --tail
```

Busca para líneas con emojis 🔐 ✅ ❌

---

## 💡 Tip: Generar un JWT_SECRET Nuevo

Si necesitas generar un nuevo secret (más seguro):

**Windows PowerShell:**
```powershell
$bytes = [System.Security.Cryptography.RandomNumberGenerator]::GetBytes(64)
[Convert]::ToBase64String($bytes)
```

**Mac/Linux:**
```bash
openssl rand -base64 64
```

Luego copia ese valor en Railway como JWT_SECRET.

---

## ✅ Verificación Final

Después de todo, deberías ver en Railway logs:
```
✅ Token válido para usuario: Admin123@gmail.com
👤 Usuario cargado con roles: [ROLE_USER]
🔓 Autenticación asignada al contexto
📦 POST /api/pedidos - Usuario: Admin123@gmail.com
📝 Creando pedido para: Admin123@gmail.com
✅ Pedido creado exitosamente: [numero]
```

¡Listo! Tu pedido se procesó correctamente.
