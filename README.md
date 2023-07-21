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
