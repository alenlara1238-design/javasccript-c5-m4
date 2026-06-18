# Guía definitiva de Angular Signals

En Angular, el ecosistema de las **Signals** es bastante limpio.
Básicamente existen tres formas principales de crear o derivar señales,
y la elección de cada una depende de quién debe tener el control sobre
los datos y de si el valor depende de otra señal.

# 1. Writable Signals (Señales Modificables)

Son las señales origen o fuentes de la verdad.

Almacenan un valor y permiten cambiarlo manualmente.

## ¿Cómo se crea?

Se crean con la función `signal()`.

``` typescript
const contador = signal(0);
```

## ¿Cómo se modifica?

Métodos disponibles:

-   `.set(nuevoValor)`
-   `.update(valor => nuevoValor)`

Ejemplo:

``` typescript
contador.set(10);
contador.update(valor => valor + 1);
```

## ¿Cuándo elegirla?

Cuando necesitas guardar un estado propio que cambia por:

-   Acciones del usuario.
-   Eventos del sistema.
-   Cambios internos.

Ejemplos:

-   Formularios.
-   Contadores.
-   Estado de modales.
-   Datos de APIs.

------------------------------------------------------------------------

# 2. Computed Signals (Señales Calculadas o Derivadas)

Son señales que dependen de otras señales.

Su valor se calcula automáticamente y Angular mantiene un caché del
resultado.

## Creación

``` typescript
const contador = signal(2);

const doble = computed(() => contador() * 2);
```

Resultado:

    doble = 4

## Modificación

No se pueden modificar manualmente.

No tienen:

``` typescript
.set()
.update()
```

## ¿Cuándo elegirla?

Cuando necesitas valores derivados:

-   Filtrar listas.
-   Calcular totales.
-   Combinar estados.
-   Crear reglas de interfaz.

------------------------------------------------------------------------

# 3. Read-Only Signals (Señales de Solo Lectura)

Es una forma de proteger una señal modificable existente.

Se crea usando `.asReadonly()`.

``` typescript
private _estado = signal('secreto');

public estado = this._estado.asReadonly();
```

## ¿Cuándo elegirla?

Principalmente en servicios.

Permite que:

-   El servicio modifique el estado.
-   Los componentes solamente lo consulten.

Ejemplo:

``` typescript
@Injectable({
 providedIn: 'root'
})
export class UsuarioService {

 private _usuario = signal('Carlos');

 usuario = this._usuario.asReadonly();

 cambiarUsuario(nombre:string){
   this._usuario.set(nombre);
 }
}
```

------------------------------------------------------------------------

# Resumen: ¿Cuál elegir?

## ¿El valor depende de otra señal?

Sí:

    computed()

No:

Preguntar quién modifica:

-   Solo un servicio:

```{=html}
<!-- -->
```
    signal() privada + asReadonly() pública

-   Cualquier consumidor:

```{=html}
<!-- -->
```
    signal()

------------------------------------------------------------------------

# Otras herramientas del ecosistema reactivo

# effect()

No es una señal.

Es un consumidor de señales que ejecuta código automáticamente cuando
cambia alguna señal utilizada dentro.

## Uso

Sirve para efectos secundarios:

-   Guardar en localStorage.
-   Logs.
-   Sincronización con librerías externas.

Ejemplo:

``` typescript
effect(() => {

 console.log(`El contador actual es: ${contador()}`);

});
```

------------------------------------------------------------------------

# Resumen final

  Herramienta    Puede modificar   Depende de señales   Uso
  -------------- ----------------- -------------------- ---------------------
  signal()       Sí                No                   Crear estados
  computed()     No                Sí                   Valores derivados
  asReadonly()   No                Sí                   Proteger estados
  effect()       No                Sí                   Efectos secundarios

Angular Signals permite separar responsabilidades:

-   signal() → Guarda datos.
-   computed() → Calcula datos.
-   asReadonly() → Protege datos.
-   effect() → Reacciona a cambios.
