# 🔧 Diagnóstico del Error 403 en POST /api/pedidos

## Token JWT Decodificado
```
Header: {"alg":"HS512"}
Payload: {
  "sub": "Admin123@gmail.com",
  "rol": "USER",
  "iat": 1775462609,  // 2026-04-06 22:23:29 UTC
  "exp": 1775549009   // 2026-04-06 22:43:29 UTC (válido)
}
```

## Posibles Causas

### 1. JWT_SECRET en Producción Diferente ⚠️ PROBABLE
- El token fue generado con un JWT_SECRET (en dev)
- Pero Railway está usando un JWT_SECRET diferente
- Resultado: Validación de JWT falla → usuario no autenticado → 403 Forbidden

**Verificar:**
```bash
# En Railway, ir a Settings → Variables
# Buscar: JWT_SECRET
# Comparar con tu archivo local (si está en variables de entorno)
```

### 2. Usuario No Existe en BD de Producción
- El token contiene "sub": "Admin123@gmail.com"
- Pero ese usuario podría no existar en PostgreSQL de Production
- El JwtFilter lo busca en DB, y si no existe → 403

**Verificar:**
```sql
-- En la BD de Production en Railway:
SELECT * FROM usuario WHERE email = 'Admin123@gmail.com';
```

### 3. Configuración CORS/Spring Security
- Podría estar bloqueando peticiones POST desde Vercel
- Aunque el CORS parece estar bien configurado

---

## 🔨 Pasos de Solución

### Opción A: Sincronizar JWT_SECRET (RECOMENDADO)
1. Ve a Railway → tu proyecto → Settings → Variables
2. Asegúrate que `JWT_SECRET` sea **consistente** entre dev y producción
3. Regenera el token con el mismo secret
4. Prueba nuevamente

### Opción B: Crear Usuario en Producción
1. Si el usuario no existe, hazlo a través de `/api/auth/registro`
2. Asegúrate de que la BD de Production está sincronizada

### Opción C: Agregar Logs en Backend
Ver detalles de por qué falla la autenticación

---

## 📝 Información del Request
- **Endpoint:** POST /api/pedidos
- **Auth:** Bearer [JWT Token]
- **Token URL encoding:** Correcto
- **CORS:** Vercel → Railway ✓
- **Status Code:** 403 Forbidden
- **Response Body:** Vacío (content-length: 0)
