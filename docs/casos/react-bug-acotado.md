# Bug acotado en React (lista + filtros)

**Para quién:** leads frontend y quien arma el `AGENTS.md` de un producto React (o React + Vite). Se comparte con el squad antes de un ticket de bug, no como manual general.

## Contexto

En un catálogo de producto ya en producción, el usuario cambia el filtro de categoría y la grilla queda vacía. La causa es estrecha: `FilterBar` actualiza la categoría y `ProductList` sigue pidiendo `page=4` de la página anterior. Los componentes existen (`FilterBar`, `ProductList`, `Pagination`). El contrato HTTP no cambia. No hay ticket de login, de panel de administración ni de rediseño.

El equipo usa React + Vite, tests con Vitest + Testing Library donde ya hay specs. El riesgo no es “no saber React”: es que un modelo rápido, sin mapa ni límites, convierta un reset de página en una reescritura.

## Qué falló sin MD / con modelo rápido

Sin `AGENTS.md` (o con un chat vago: “arreglar el filtro”), un modelo rápido suele:

- Inventar un `LoginPage` o un `AdminLayout` “porque va a hacer falta”.
- Introducir un store global (Zustand/Redux) para un estado que ya vive en el padre de la lista.
- Extraer un `useCatalog` genérico y mover tres pantallas que no estaban en el ticket.
- Cambiar el query string, el cliente HTTP o el diseño de las chips.

El síntoma se tapa o se “mejora”, pero el PR ya no es revisable: el revisor no puede decir si el bug quedó resuelto sin leer un diff de arquitectura.

Con un MD corto (carpetas, no ampliar alcance, tests existentes) el mismo modelo —incluso uno rápido— se queda en los tres componentes y en el test de la lista si existe.

## Qué poner en AGENTS.md

Bloque listo para pegar en la raíz de una app React / React + Vite. Ajustá nombres de carpetas al repo real; no copies rutas de otro producto.

```markdown
# AGENTS.md — frontend React (Vite)

## Mapa (no inventar carpetas)

- `src/components/` — UI reutilizable del producto (listas, filtros, paginación).
- `src/pages/` — pantallas. No crear páginas nuevas salvo que el ticket lo pida.
- `src/api/` — cliente HTTP. Un bug de UI no se “arregla” tocando el cliente
  salvo que el contrato esté mal y el ticket lo diga.
- `src/hooks/` — hooks que ya existen. No extraer un hook nuevo para un one-liner.
- Tests: `src/**/*.test.tsx` (Vitest + Testing Library). Si el archivo no tiene
  spec, no inventes una suite del módulo entero.

No hay `src/admin/`, `src/auth/` ni `src/features/` en este repo. No los crees.

## Alcance de un ticket

- Tocá solo los archivos que el bug nombra o los que ya renderizan ese flujo.
- No agregues login, rutas protegidas, paneles, ni “mejoras” de UX no pedidas.
- No cambies el contrato de la API ni el shape de los DTOs.
- No instales estado global ni librerías nuevas para un reset de paginación.
- Si el filtro y la página viven en el padre, el reset va ahí: al cambiar
  categoría (o cualquier filtro), `page` vuelve a 1. No “simplifiques” eso
  metiendo la página dentro de cada chip.

## Tests

- Si existe `ProductList.test.tsx` (o el spec de la lista), extendelo: al
  cambiar el filtro, la petición o el estado debe usar página 1.
- No reescribas tests verdes para que pasen con tu refactor.
- Corré el spec tocado, no “el monorepo entero”, salvo que el ticket lo pida.

## DoD mínimo de un bug de UI

1. El flujo del ticket se puede repetir a mano.
2. No hay archivos nuevos fuera del mapa.
3. El spec existente (si hay) cubre la regresión o se agregó un caso al mismo archivo.
```

## Modelo sugerido

**Composer** (o el modelo rápido del equipo) alcanza: el mapa está escrito, el fallo es local y no hay decisión de capas. Reservá un modelo más capaz (p. ej. Sonnet / Opus) solo si al abrir el código el estado del filtro resulta estar duplicado en tres padres y hay que elegir un solo dueño —eso ya no es un bug de una línea.

No uses un modelo de revisión (Opus) para escribir el parche. Usalo después, si el PR se infló pese a la regla.

## Cómo verificar (DoD)

- Cambiar de categoría con `page > 1` deja de mostrar grilla vacía; la lista pide o muestra página 1.
- `FilterBar`, `ProductList` y `Pagination` siguen siendo los mismos componentes (mismo rol, sin pantalla nueva).
- Diff acotado: no aparecen rutas de auth/admin ni un store nuevo.
- Si había `*.test.tsx` de la lista, el caso “filtro resetea página” queda rojo-al-principio / verde-al-final en ese archivo.
- Lint/test del paquete frontend en lo tocado; no un rewrite de Vite ni de tsconfig.
