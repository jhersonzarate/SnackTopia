# 🚀 SOLUCIÓN: Error 403 Forbidden en POST /api/pedidos

## 📋 Resumen del Problema
Al hacer un pedido, recibía error `403 Forbidden` en la petición POST a `/api/pedidos`, aunque el token JWT estaba presente en el header.

---

## 🔍 Diagnóstico Realizado

He agregado **logs detallados** al backend para identificar exactamente por qué se rechaza el request:

### Archivos modificados:
1. **JwtFilter.java** - Logs en la validación del token
2. **JwtUtil.java** - Logs de validación de firma y expiración
3. **PedidoController.java** - Logs del endpoint POST

Los logs ahora mostrarán:
```
✅ Token válido para usuario: Admin123@gmail.com
👤 Usuario cargado con roles: [ROLE_USER]
🔓 Autenticación asignada al contexto
```

O si hay problema:
```
❌ Firma JWT inválida - Probablemente JWT_SECRET diferente
```

---

## ⚠️ CAUSA PROBABLE: JWT_SECRET Diferente en Railway

Tu token fue generado durante desarrollo con un `JWT_SECRET` local, pero Railway está usando un `JWT_SECRET` diferente, causando que la validación de firma falle.

### Pasos para Solucionar:

#### 1️⃣ Verifica el JWT_SECRET en Railway
```
1. Ve a https://railway.app
2. Selecciona tu proyecto "snacktopia-production"
3. Ve a "Settings" → "Variables"
4. Busca JWT_SECRET
5. Copia el valor (puede estar oculto con dots)
```

#### 2️⃣ Asegúrate que sea consistente
```
- Si está vacío o diferente, actualízalo
- Debe ser una cadena suficientemente larga (mínimo 64 caracteres recomendable)
- IMPORTANTE: Debe ser el mismo que usaste en desarrollo
```

#### 3️⃣ Regenera un token con el SECRET correcto
```
- Ve a https://snack-topia.vercel.app/auth/login
- Inicia sesión con: Admin123@gmail.com / Password
- Esto generará un nuevo token con el JWT_SECRET correcto
```

#### 4️⃣ Intenta hacer el pedido nuevamente
```
- Ve a checkout
- Selecciona productos
- Haz el pago
- Debería funcionar ✅
```

---

## 🔑 Configuración Recomendada de JWT_SECRET

Si no tienes uno, genera un secret seguro:

```bash
# En Linux/Mac:
openssl rand -base64 64

# En Windows PowerShell:
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(48))
```

Ejemplo de JWT_SECRET válido:
```
your-super-secret-key-min-64-chars-abcdefghijklmnopqrstuvwxyz123456789
```

---

## 📝 Variables de Entorno Necesarias en Railway

```yaml
DATABASE_URL=postgresql://user:password@host:5432/snacktopia
JWT_SECRET=your-long-secret-key-here  # ⭐ IMPORTANTE
JWT_EXPIRATION=86400000  # 24 horas en milisegundos
FRONTEND_URL=https://snack-topia.vercel.app
PORT=8080
```

---

## 🧪 Verificar que Funciona

Después de hacer los cambios:

1. **Revisa los logs en Railway:**
```
Railway Dashboard → tu app → Logs
Deberías ver:
✅ Token válido para usuario: Admin123@gmail.com
```

2. **Si siguen apareciendo errores como:**
```
❌ Firma JWT inválida - Probablemente JWT_SECRET diferente
```
Significa que aún hay inconsistencia en el JWT_SECRET.

3. **Si ves:**
```
⏰ Token expirado en: [fecha]
```
Genera un token nuevo iniciando sesión nuevamente.

---

## 🆘 Si Aún No Funciona

Comparte los logs de Railway (pasos sobre):
1. Ve a Railway logs
2. Busca líneas con `❌ Firma JWT inválida` o `⏰ Token expirado`
3. Comparte esos logs

Entonces podré diagnosticar exactamente qué está sucediendo.

---

## ✨ Cambios Implementados en el Código

Los siguientes archivos fueron modificados para agregar logging:

- `backend/src/main/java/com/snacktopiaaa/backend/security/JwtFilter.java`
- `backend/src/main/java/com/snacktopiaaa/backend/security/JwtUtil.java`
- `backend/src/main/java/com/snacktopiaaa/backend/controller/PedidoController.java`

Todos los cambios son **solo para debugging** y no afectan la funcionalidad principal.
