# Ejercicio Guiado: Desarrollo de un AuthService con JWT

## Objetivo

Desarrollar un servicio de autenticación (`AuthService`) capaz de
comunicarse con una API REST protegida mediante JWT, administrar el
token de autenticación y mantener el estado de la aplicación.

> **Importante:** Este ejercicio es guiado. Cada sección describe lo que
> debes construir, pero **no proporciona la implementación**.

------------------------------------------------------------------------

# Contexto

Una empresa ha desarrollado una API para autenticar a sus empleados. Tu
misión consiste en construir el servicio que permitirá a una aplicación
Angular consumir dicha API.

------------------------------------------------------------------------

# Endpoints disponibles

## POST /auth/login

Este endpoint valida las credenciales del usuario.

### Solicitud

``` json
{
    "email": "ana.lopez@empresa.com",
    "password": "123456"
}
```

### Respuesta

``` json
{
    "success": true,
    "accessToken": "eyJhbGcOiJIUzI1NiIs...",
    "expiresIn": 1800,
    "employee": {
        "employeeId": 15,
        "fullName": "Ana López",
        "department": "Tecnología"
    }
}
```

------------------------------------------------------------------------

## GET /auth/account

Este endpoint requiere autenticación.

Debe enviarse el siguiente encabezado:

``` text
Authorization: Bearer <accessToken>
```

### Respuesta

``` json
{
    "status": "OK",
    "account": {
        "employeeId": 15,
        "fullName": "Ana López",
        "department": "Tecnología",
        "email": "ana.lopez@empresa.com",
        "permissions": [
            "CREATE",
            "UPDATE",
            "DELETE"
        ]
    }
}
```

------------------------------------------------------------------------

# Parte 1. Analizando la API

Antes de escribir código, responde:

1.  ¿Qué información necesita el servidor para autenticar al usuario?
2.  ¿Qué información devuelve el servidor después de un inicio de sesión
    exitoso?
3.  ¿Qué dato será necesario conservar para futuras peticiones?
4.  ¿Qué información pertenece al usuario autenticado?

------------------------------------------------------------------------

# Parte 2. Diseñando las interfaces

Analiza cuidadosamente los objetos enviados y recibidos por la API.

A partir de ellos, crea las interfaces necesarias.

Preguntas:

-   ¿Cuántas interfaces necesitas crear?
-   ¿Existe algún objeto anidado que merezca tener su propia interfaz?
-   ¿Cuál debería ser el nombre de cada interfaz?

------------------------------------------------------------------------

# Parte 3. Crear el AuthService

Genera un servicio llamado:

``` text
AuthService
```

El servicio deberá centralizar toda la lógica relacionada con la
autenticación.

------------------------------------------------------------------------

# Parte 4. Preparar el estado de la aplicación

Utilizando **Signals**, declara el estado necesario para representar:

-   el token de autenticación;
-   la información de la cuenta del usuario.

Pregunta:

¿Qué valor inicial debería tener cada Signal?

------------------------------------------------------------------------

# Parte 5. Configurar la URL base

Declara una propiedad privada que almacene la URL base de la API.

Ejemplo:

``` text
http://localhost:3000
```

¿Por qué resulta conveniente definir la URL en un único lugar?

------------------------------------------------------------------------

# Parte 6. Implementar login()

Construye un método llamado:

``` text
login()
```

Este método deberá:

-   recibir las credenciales del usuario;
-   enviar una petición POST hacia `/auth/login`;
-   devolver la respuesta del servidor.

**No almacenes todavía el token.**

Preguntas:

-   ¿Qué interfaz representa las credenciales?
-   ¿Qué interfaz representa la respuesta del servidor?

------------------------------------------------------------------------

# Parte 7. Implementar saveToken()

Crea un método encargado de:

-   almacenar el token en `localStorage`;
-   actualizar el Signal correspondiente.

Pregunta:

¿Por qué es necesario realizar ambas acciones?

------------------------------------------------------------------------

# Parte 8. Implementar getToken()

Construye un método que recupere el token almacenado.

Reflexiona:

-   ¿Qué método de `localStorage` utilizarás?
-   ¿Qué devuelve cuando el token no existe?

------------------------------------------------------------------------

# Parte 9. Implementar loadToken()

Cuando el servicio sea creado, deberá verificar si existe un token
previamente almacenado.

Implementa un método que:

-   lea el token desde `localStorage`;
-   actualice el Signal correspondiente.

Finalmente, invoca este método desde el constructor del servicio.

------------------------------------------------------------------------

# Parte 10. Implementar removeToken()

Desarrolla un método que elimine el token almacenado y actualice el
estado de autenticación.

------------------------------------------------------------------------

# Parte 11. Implementar logout()

Implementa un método que represente el cierre de sesión.

Este método deberá:

-   eliminar el token;
-   limpiar la información de la cuenta del usuario.

------------------------------------------------------------------------

# Parte 12. Implementar getAccount()

Construye un método que consulte el endpoint:

``` text
GET /auth/account
```

Antes de realizar la petición:

1.  Recupera el token almacenado.
2.  Construye el encabezado HTTP:

``` text
Authorization: Bearer <accessToken>
```

3.  Envía la petición utilizando `HttpClient`.

------------------------------------------------------------------------

# Parte 13. Comprobación

Al finalizar el servicio, verifica:

## Escenario 1

Después del login:

-   El token queda almacenado en `localStorage`.

## Escenario 2

Después de recargar la página:

-   El Signal recupera automáticamente el token almacenado.

## Escenario 3

Al consultar la información de la cuenta:

-   La petición incluye correctamente el encabezado `Authorization`.

## Escenario 4

Después del logout:

-   El token desaparece de `localStorage`.
-   Los Signals vuelven a su estado inicial.

------------------------------------------------------------------------

# Desafío

Agrega un método llamado:

``` text
isAuthenticated()
```

Este método deberá indicar si el usuario se encuentra autenticado.

Restricciones:

-   No puedes crear variables adicionales.
-   No puedes realizar peticiones al servidor.
-   Debes tomar la decisión utilizando únicamente la información
    administrada por el `AuthService`.

Pregunta final:

¿Es suficiente con que exista un token para afirmar que el usuario sigue
autenticado? Justifica tu respuesta.
