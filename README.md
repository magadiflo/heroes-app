# HeroesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

---


## Ruta hijas y LazyLoad

En el **AppRoutingModule** definimos nuestras rutas principales aplicando **LazyLoad**. Únicamente aplicaremos **LazyLoad** al módulo de **Auth** y al **Heroes**, mientras que el módulo **Shared**  será importado directamente en el **AppModule**, de esa forma utilizaremos los componentes definidos en el **Shared** de manera directa, tal como sucede con el componente **Error404PageComponent**.

```typescript
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), //<-- Aplicando LazyLoad
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule), //<-- Aplicando LazyLoad
  },
  {
    path: '404',
    component: Error404PageComponent, // <-- Agregando componente directo
  },
  { path: '', redirectTo: 'heroes', pathMatch: 'full', }, //Esta ruta vacía '', sería la raíz de nuestro dominio: Ejmp. www.my-web-site.com 
  { path: '**', redirectTo: '404', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## pathMatch: 'full'

Observamos que en las rutas principales definidas en la sección superior, nuestra ruta vacía tiene la propiedad **pathMatch: 'full'**:

```javascript
{ path: '', redirectTo: 'heroes', pathMatch: 'full', }
```

**CONSIDERACIONES**

- **El path vacío ''** hace referencia a la **raíz de nuestro dominio**: Ejmp. www.my-web-site.com
- **Una ruta vacía es un prefijo de cualquier URL**, eso significa que por ejemplo nuestra ruta **auth**, **heroes**, etc. tienen como prefijo
  una ruta vacía.
- **Todas las rutas** tienen **por defecto** el **pathMatch en 'prefix'**.
- A nuestra ruta vacía (raíz del dominio) le agregamos la propiedad  **pathMatch: 'full'** para decirle que para acceder a esta ruta, el usuario debe escribir en el navegador exactamente tal cual está definida aquí, en pocas palabras escribir la raíz del dominio.


**El pathMatch**, es una estrategia que determina si una url pertenece o no a una ruta.
El atributo pathMatch, puede tomar 2 valores: **full o prefix:**

- **full**, debe coincidir la ruta completa con la URL completa. **Se aplica a la ruta vacía,** ya que la misma es un prefijo de cualquier URL y puede provocar un bucle sin fin.
- **prefix (por defecto)**, significa que se elige la primera ruta donde la ruta coincide con el inicio de la URL, pero luego el algoritmo de coincidencia de ruta continúa buscando rutas secundarias coincidentes donde coincide el resto de la URL.


Con el **pathMatch 'full'** estamos indicándole a angular **que solo entre a esa ruta si el path es exactamente ese, ni más ni menos.** Si no es exactamente ese, no entra. **¿Por qué esto?** Bueno, el **comportamiento por defecto es pathMach: 'prefix'**, que este básicamente busca de izquierda a derecha, y cuando la ruta haga match con el path (aunque pueda no ser la ruta completa) entrará. También ten en cuenta cómo declaramos las rutas, y que estas se leen de arriba hacia abajo. Si tienes una ruta que siempre se cumpla sin el pathMatch: 'full', aunque abajo de esta tengas otra ruta declarada con un path más específico, no entrará a esa, porque en la primera que entra se queda, no busca más. De ahí que o uses pathMatch: 'full', o declares las rutas de la más específica a la menos.

## Paths de las rutas faltantes

Construimos las rutas hijas, en este caso la de **heroes**:

```typescript
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new-hero', component: NewPageComponent, },
      { path: 'search', component: SearchPageComponent, },
      { path: 'edit/:id', component: NewPageComponent, },
      { path: 'list', component: ListPageComponent, },
      { path: ':id', component: HeroPageComponent, }, //<-- Es importante que este vaya casi al final
      { path: '**', redirectTo: 'list', },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
```

**NOTA**
> Es importante tener en cuenta el orden que le definamos a las rutas. En el ejemplo anterior, observemos el path
> **:id** se encuentra definido de manera intencional casi al final de las rutas, esto debido a que si lo definimos, 
> por ejemplo como primer elemento del conjunto de rutas, cualquier otra ruta a la que queramos ingresar, por ejemplo
> la ruta **search**, se detendrá en nuestra ruta **:id** (que en este ejemplo está como primer elemento), porque tomará 
> el path **search** como si fuera el **id** que espera, por eso lo definimos casi al final.

## Instalación de [Angular Material](https://material.angular.io/guide/getting-started)

- Comenzaremos instalando **Angular Material**, para eso ejecutamos el siguiente comando:

```bash
ng add @angular/material
```
- Luego de verificar nos pedirá que elijamos un tema, yo eligiré: **Pink/Blue Grey**, aunque también está el **Custom** para hacerlo más personalizado.
- Luego nos preguntará ¿Configurar estilos tipográficos globales de material angular?, de damos en **Yes**
- Finalmente, nos preguntará si ¿incluir el módulo de animaciones angulares?, seleccionamos **Include and enable animation**

## Instalando [Primeflex css](https://primeflex.org/installation)

PrimeFlex es una biblioteca de utilidades CSS que presenta varios helpers, como un sistema de cuadrícula, flexbox, espaciado, elevación y más.
PrimeFlex es una biblioteca de utilidades de CSS liviana y receptiva **que acompaña a las bibliotecas Prime UI** y también a las páginas web estáticas.
Recordemos que **es el mismo que utilizamos en el proyecto de pipes-app**.

Ejecutar el siguiente comando en nuestro proyecto de Angular

```bash
npm install primeflex
```
Luego de la instalación incluir la librería agregándola desde el **angular.json**

```json
"styles": [
  "...",
  "node_modules/primeflex/primeflex.min.css",
  "..."
],
```
**NOTA**
> Otra forma de instalarlo es cargándolo mediante un CDN: <br>
> ``<link rel="stylesheet" href="https://unpkg.com/primeflex@latest/primeflex.css">``

## Íconos para Angular Material

Ir a esta dirección [fonts.google](https://fonts.google.com/icons?selected=Material+Icons:bookmark)

## Heroes Backend - json-server

En este punto del curso necesitamos un backend que nos proporcione endpoints para poder crear nuestra aplicación de héroes: listar, leer, eliminar, crear, etc. Para poder realizar este backend nos ayudaremos de una dependencia llamada **json-server**  y los datos los ubicaremos en un archivo llamado **db.json**.

### Datos a Usar como Base de Datos en db.json para nuestro "Backend"

Crearemos un .json con un conjunto de datos que simularán nuestros datos de héroes que serán usados por nuestro **backend** para ser enviados a nuestra aplicación de Angular.

En nuestro proyecto de **Angular** creamos un directorio llamado **/data** y dentro de él un archivo llamado **db.json** conteniendo datos de héroes y usuarios. Para ver los datos [visitar el siguiente enlace](https://gist.github.com/Klerith/e09f16f2ae9f6c9ebce6c648fc136072). Crearemos además otro archivo **db-back.json** para tener los datos originales respaldados.


### [json-server](https://www.npmjs.com/package/json-server)

Obtenga una API REST falsa completa sin codificación en menos de 30 segundos.

Para poder instalarlo, los creadores de esta dependencia nos recomiendan hacerlo de manera global **(-g)**, pero en nuestro caso lo haremos de manera local, dentro de nuestra aplicación de Angular y solo en nuestras dependencias de desarrollo (no estará disponible en las dependencias de producción), por lo tanto, abrimos una consola, nos ubicamos en nuestro proyecto y ejecutamos el siguiente comando:

````bash
npm install --save-dev json-server
````

Una vez finalizada la instalación de **json-server** veremos que el nombre de la dependencia se registró en las dependencias de desarrollo dentro del **package.json:**

````javascript
{
  "devDependencies": {
    "...",
    "json-server": "^0.17.3", //<-- Disponible en modo de desarrollo
    "..."
  }
}
````

Para ejecutar nuestro **json-server**, posicionados mediante la consola en la raiz del proyecto de angular, utilizaremos el siguiente comando:

````bash
npx json-server --watch .\data\db.json
````

**NOTA** en versiones anteriores se ejecutaba: ``json-server --watch db.json``, mientras que ahora hay que agregarle el prefijo **npx** sino no se ejecutará.

Como alternativa a ejecutar todo el comando mostrado del **json-server** podemos utilizar el **package.json** para poder crearnos un script de comandos más corto **(precisamente esta es la forma que usaré)**, para eso en el **package.json** agregamos nuestro comando:

````javascript
{
  "name": "heroes-app",
  "version": "0.0.0",
  "scripts": {
    "backend": "npx json-server --watch .\\data\\db.json", //<-- Nuestro nuevo comando más corto es: backend
    "..."
  }
}
````

Ahora, para poder ejecutarlo, simplemente posicionados en la raíz del proyecto ejecutamos:

````bash
npm run backend
````

Como resultado tenemos lo que se muestra en la imagen:

![json-server-running](./src/assets/json-server-running.png)

## [Variables de entorno - Angular 15+](https://angular.io/guide/build#configuring-application-environments)

Desde la versión 15 ya no vienen por defecto el directorio **/environments** donde defíamos en sus archivos nuestras variables de entorno. Para poder crearlas simplemente ejecutamos el siguiente comando:

````bash
ng generate environments
````

Se nos crearán los siguientes archivos:

```bash
CREATE src/environments/environment.ts
CREATE src/environments/environment.development.ts
UPDATE angular.json
```
Como estamos trabajando en desarrollo, nuestra **URL del json-server** lo configuramos en el archivo **environment.development.ts**:

````javascript
// environment.development.ts
export const environment = {
  apiUrl: 'http://localhost:3000',
};
````

Mientras que el archivo **environment.ts** lo dejamos vacío, ya que este archivo corresponde a un archivo de producción, eso significa que cuando construyamos el proyecto para producción, aquí debería ir la **URL** real, url del cual nuestra aplicación consumira en producción y al momento de construir la aplicación, angular tomará la url de este archivo:

````javascript
// environment.ts
export const environment = {
  apiUrl: '',
};
````

## HeroesService - Traer información de los héroes

Por lo general nuestras variables de entorno los usaremos en los **Services**. **La importación la debemos hacer del archivo de producción**, Angular sabe en qué ambiente nos encontramos, es decir, aunque ahora mismo estoy desarrollando me encuentro en ambiente de desarrollo, también el api del **json-server** está en el archivo **environment.development.ts**, pero la importación la debemos hacer del archivo **environment.ts** (el de producción) aunque este tenga el atributo **urlApi** vacío, como estamos desarrollando, Angular tomará el del archivo **environment.development.ts**.

````javascript
import { environment } from '../../../environments/environment'; //<--- Importando el archivo de producción
import { Hero } from '../interfaces/hero.interface';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private readonly apiUrl: string = environment.apiUrl;

}
````
