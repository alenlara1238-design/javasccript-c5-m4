# Angular Moderno - Ejercicio Guiado: Tienda de Productos

## Objetivos

En este ejercicio practicarás:

- Jerarquía de componentes.
- Organización de carpetas.
- Comunicación Padre → Hijo (`@Input`).
- Comunicación Hijo → Padre (`@Output`).
- Renderizado dinámico con `@for` (Angular moderno).
- Preparación para el uso de servicios compartidos.

---

# Contexto

Construiremos una mini aplicación de tienda virtual.

La interfaz tendrá la siguiente jerarquía:

```text
AppComponent
│
├── NavbarComponent
│
└── CatalogoProductosComponent
    │
    ├── ProductoCardComponent
    ├── ProductoCardComponent
    └── ProductoCardComponent
```

---

# Paso 1 - Diseñar la estructura de carpetas

Analiza la siguiente estructura:

```text
app
│
├── shared
│   │
│   └── navbar
│
├── features
│   │
│   └── catalogo-productos
│       │
│       └── producto-card
│
└── app.component
```

## Preguntas

1. ¿Por qué `navbar` está dentro de `shared`?
2. ¿Por qué `catalogo-productos` está dentro de `features`?
3. ¿Por qué `producto-card` se encuentra cerca del catálogo?

---

# Paso 2 - Generar componentes

Genera los siguientes componentes:

```bash
ng generate component shared/navbar

ng generate component features/catalogo-productos

ng generate component features/catalogo-productos/producto-card
```

## Verificación

Comprueba que Angular creó las carpetas y archivos correspondientes.

---

# Paso 3 - Construir la jerarquía visual

Configura los templates para obtener la siguiente estructura:

```text
AppComponent
│
├── NavbarComponent
│
└── CatalogoProductosComponent
    │
    ├── ProductoCardComponent
    ├── ProductoCardComponent
    └── ProductoCardComponent
```

## Tarea

- Diseña el HTML del Navbar.
- Diseña el HTML del Catálogo.
- Inserta tres tarjetas de producto dentro del catálogo.
- Inserta Navbar y Catálogo dentro de AppComponent.

## Preguntas

1. ¿Quién es el padre de `ProductoCardComponent`?
2. ¿Quién es el padre de `CatalogoProductosComponent`?
3. ¿La relación padre-hijo depende de las carpetas o de los selectores usados en los templates?

---

# Paso 4 - Comunicación Padre → Hijo

Actualmente todas las tarjetas muestran exactamente lo mismo.

Ahora cada tarjeta deberá mostrar un producto diferente.

## Tarea

En `ProductoCardComponent`:

- Declara una propiedad que reciba el nombre del producto.
- Utiliza `@Input()`.
- Muestra el valor recibido en la plantilla.

En `CatalogoProductosComponent`:

- Envía nombres distintos a cada tarjeta.

## Resultado esperado

```text
Laptop
Mouse
Teclado
```

## Preguntas

1. ¿Quién es dueño de la información?
2. ¿Quién recibe la información?
3. ¿Qué ocurriría si eliminas `@Input()`?

---

# Paso 5 - Renderizado dinámico con Angular moderno

Actualmente los componentes están escritos manualmente.

```html
<app-producto-card></app-producto-card>
<app-producto-card></app-producto-card>
<app-producto-card></app-producto-card>
```

## Tarea

1. Crea un arreglo de productos.
2. Utiliza `@for` para recorrerlo.
3. Genera las tarjetas dinámicamente.
4. Envía la información a cada tarjeta mediante property binding.

## Preguntas

1. ¿Quién conoce la lista completa de productos?
2. ¿Puede una tarjeta conocer todos los productos?
3. ¿Por qué?

---

# Paso 6 - Comunicación Hijo → Padre

Cada tarjeta tendrá un botón:

```text
Agregar al carrito
```

Cuando el usuario haga clic:

- El hijo detectará el clic.
- El padre actualizará el total de productos agregados.

## Tarea

En el componente hijo:

- Declara un `@Output()`.
- Crea un `EventEmitter`.
- Emite un evento cuando se pulse el botón.

En el componente padre:

- Escucha el evento.
- Incrementa un contador.

## Resultado esperado

```text
Productos en carrito: 0
```

Después de varios clics:

```text
Productos en carrito: 3
```

## Preguntas

1. ¿Por qué el hijo no debería modificar directamente el contador?
2. ¿Cuál es la responsabilidad del padre?
3. ¿Cuál es la responsabilidad del hijo?

---

# Paso 7 - Enviar datos al padre

Hasta ahora el hijo solamente avisa que ocurrió algo.

Ahora deberá indicar qué producto fue agregado.

## Tarea

Modifica el evento para que envíe:

```text
Nombre del producto
```

El padre deberá:

- Recibir el dato mediante `$event`.
- Guardar el último producto agregado.

## Resultado esperado

```text
Productos en carrito: 4

Último producto agregado:
Laptop
```

## Preguntas

1. ¿Qué contiene `$event`?
2. ¿Quién genera el valor de `$event`?
3. ¿Quién decide qué hacer con la información recibida?

---

# Paso 8 - Reflexión final

Analiza el siguiente flujo:

```text
Padre
│
├── entrega datos
│
▼
Hijo
│
├── genera eventos
│
▼
Padre
```

## Responde

1. ¿Cuándo usarías `@Input()`?
2. ¿Cuándo usarías `@Output()`?
3. ¿Qué limitación tienen estos mecanismos?
4. ¿Qué ocurriría si Navbar y ProductoCard necesitaran compartir información sin ser padre e hijo?

---

# Próximo tema

Una vez completado este ejercicio, investiga:

- Services
- Dependency Injection
- Estado compartido
- Signals
- Observables

Estos mecanismos permiten comunicar componentes que no tienen relación directa de parentesco.
