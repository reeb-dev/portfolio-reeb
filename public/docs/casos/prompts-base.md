# Prompts base para pegar

Plantillas de chat para un equipo de producto o consultora. No son el producto: se copian, se rellenan los corchetes y se pegan. El mapa del repo vive en `AGENTS.md` / `CLAUDE.md` (ya en Git), no en este archivo.

Complementan las [fichas cortas](README.md) (qué poner en el MD) y la [guía HTML](../guia-agentes-reglas-y-modelos.html) (cómo se inyectan las reglas y qué modelo elegir). Esto **no reemplaza** la documentación oficial de Cursor, Claude Code, OpenCode ni Copilot.

**Cómo usar una ficha:** chat **nuevo**, workspace en la **raíz**, modelo según la ficha. No pegues el `AGENTS.md` entero: si está en el repo, la herramienta lo inyecta. Rellená `[CORCHETES]`. Si el agente se desvía, pegá la **variante**, no sigas negociando en un hilo sucio. En Angular usá A1–A3 (no R2). En Android usá D1–D2 (no T3 como implementación).

---

## Índice

| Id | Situación | Modelo (rápido vs. pensar) |
| --- | --- | --- |
| [S1–S5](#qué-va-en-agentsmd-y-qué-va-en-el-chat) | Snippets de sistema (MD vs. chat) | — |
| [R1](#r1-bug-en-un-componente-que-ya-existe) | React: bug en un componente | Rápido |
| [R2](#r2-feature-ui--cliente-http) | React: feature UI + fetch | Rápido (plan aparte si cruza capas) |
| [R3](#r3-no-reescribir-carpetas) | React: no reescribir carpetas | Pensar (review) o rápido (parar) |
| [R4](#r4-no-agrandar-el-alcance) | React: no agrandar alcance | Rápido |
| [R5](#r5-tests-vitest--testing-library) | React: tests | Rápido |
| [R6](#r6-review-de-un-pr-generado-por-agente) | React: review de PR de agente | Pensar |
| [R7](#r7-useeffect-en-loop--closure-vieja) | React: useEffect en loop / closure vieja | Rápido |
| [R8](#r8-campo-extra-en-un-formulario-existente) | React: campo extra en un form existente | Rápido |
| [R9](#r9-no-migrar-class-components-a-hooks) | React: no migrar class a hooks | Rápido (pensar si el PR ya migró) |
| [R10](#r10-no-introducir-reduxzustand) | React: no meter Redux/Zustand | Rápido |
| [R11](#r11-ruta-nueva-mismo-patrón-de-react-router) | React: ruta nueva, mismo patrón | Rápido |
| [R12](#r12-vite--react-día-0--una-página--fetch) | React: Vite día 0 + una página + fetch | Pensar (mapa), luego rápido |
| [R13](#r13-no-mezclar-next-app-router-con-vite) | React: no mezclar Next App Router con Vite | Pensar (review) o rápido (parar) |
| [R14](#r14-un-test-de-componente-sin-cypress) | React: un test de componente, no Cypress | Rápido |
| [J1](#j1-endpoint-nuevo-en-capas) | Java: endpoint en capas | Rápido |
| [J2](#j2-legacy-sin-microservicios) | Java: legacy, un deploy | Rápido + pensar si propone split |
| [J3](#j3-el-controller-no-habla-con-la-base) | Java: controller ≠ DB | Pensar (review) o rápido (mover) |
| [J4](#j4-junit-del-invariante) | Java: JUnit | Rápido |
| [J5](#j5-review-de-un-pr-spring-generado-por-agente) | Java: review | Pensar |
| [A1](#a1-angular-cambio-en-el-módulo-que-ya-existe) | Angular: cambio en módulo existente | Rápido (T3 si duda el patrón) |
| [A2](#a2-angular-día-0--tajada-vertical) | Angular: día 0 + tajada | Pensar (mapa), luego rápido |
| [A3](#a3-angular-no-mezclar-patrones-react) | Angular: no mezclar React | Pensar (review) o rápido (parar) |
| [D1](#d1-android-mismo-patrón-que-el-vecino) | Android: mismo patrón | Rápido |
| [D2](#d2-android-no-reescribir-la-arquitectura) | Android: no reescribir arquitectura | Pensar (review) o rápido (parar) |
| [T1](#t1-primer-chat-del-día) | Primer chat del día | Rápido si el ticket es chico |
| [T2](#t2-después-de-editar-agentsmd-chat-nuevo) | Después de editar AGENTS.md | El que uses en el ticket |
| [T3](#t3-arquitectura-esto-rompe-el-patrón) | ¿Rompe el patrón? | Pensar |
| [T4](#t4-explicar-a-alguien-no-técnico) | Explicar a no técnico | Pensar (prosa) |
| [T5](#t5-ui-desde-una-captura) | UI desde captura | Visual, luego rápido |
| [T6](#t6-el-agente-inventó-datos) | Inventó cifras o clientes | Rápido o prosa |
| [T7](#t7-el-agente-hizo-commit-o-push) | Hizo commit / push | Humano; el chat no “deshace” Git |
| [T8](#t8-pairing-plan-con-opus-implementar-con-composer) | Plan (Opus) → implementar (Composer) | Pensar, luego rápido |

**Conteo:** 32 plantillas de situación (cada una con prompt + variante), más 5 snippets de sistema. Los nombres de modelos y de menús **caducan**; la lógica de cada ficha no.

---

## Qué va en AGENTS.md y qué va en el chat

El MD es la norma del **repo** (todos los chats, todo el equipo). El prompt es el **ticket de hoy**. Si algo debe valer el martes sin que nadie lo recuerde, va al MD, se commitea, y el siguiente chat es **nuevo**.

| | AGENTS.md / CLAUDE.md | Chat de hoy |
| --- | --- | --- |
| Mapa de carpetas y “quién habla con quién” | Sí | No lo copies; nombrá el path del ticket |
| “No inventar cifras / no agrandar / no commit” | Sí (una vez) | Solo si el agente ya pecó en *este* hilo |
| Síntoma, archivo, DoD de *este* ticket | No | Sí |
| “Leé este dump de Jenkins / 40 capturas” | No | Tampoco: recortá. Ver [Cuidar los tokens](../guia-agentes-reglas-y-modelos.html#cuidar-tokens) |

### S1. Mapa (va en AGENTS.md)

```markdown
# Mapa (este repo; no inventar carpetas)

- Front: `frontend/` — React. Páginas en `src/pages/`, UI en `src/components/`,
  HTTP solo en `src/api/`. No crear `src/features/` ni `src/admin/` si no están.
- API: `api/` — Spring Boot, un deploy. Controller → service → repository → DTO.
  El controller no habla con la base ni expone `*Entity`.
- Tests: front `npm test` (Vitest). API `./mvnw test` (JUnit 5).
```

### S2. Alcance (va en AGENTS.md)

```markdown
# Alcance de un ticket

- Tocá solo lo que el ticket nombra (y archivos que ese flujo ya usa).
- Prohibido login, pagos, admin, store global, microservicio o librería nueva
  “porque va a hacer falta”.
- Si el cambio exige otro árbol o otro deploy: parar y preguntar. No silenciarlo.
```

### S3. Datos (va en AGENTS.md)

```markdown
# Datos

- No inventar cifras, clientes, certificaciones, resultados ni nombres de
  personas. Si falta un dato: omitir o preguntar. No rellenar el hueco.
```

### S4. Git (va en AGENTS.md)

```markdown
# Git

- No commit, push, rebase, `--force` ni `--no-verify` sin pedido explícito
  en el chat de esa sesión.
```

### S5. Lo que NO va en el MD (sí puede ir en un chat, una vez)

El síntoma de hoy, el ID del ticket, “mirá `FilterBar.tsx` líneas X–Y”, “el CSV usa los mismos query params que la lista”, “el GET ya existe: `/api/orders/export`”. Eso caduca. Si lo grabás en el MD, el próximo ticket hereda un caso ajeno y gasta tokens.

Variante de **chat** (no la subas al MD):

```text
Este mensaje es solo para ESTE ticket. No lo trates como norma del repo.
Cuando termines, no agregues estas frases a AGENTS.md salvo que el equipo
las pida en un PR de docs.
```

---

## React

### R1. Bug en un componente que ya existe

**Cuándo usarlo.** Un síntoma en UI que ya está en producción: filtro, paginación, badge, estado local. Los componentes existen. El contrato HTTP no cambia. No es un rediseño.

**Modelo sugerido.** **Rápido** (Composer, Grok, Haiku). **Pensar** (Opus / Sonnet) solo si al abrir el código el estado está duplicado en varios padres y hay que elegir un dueño.

**Contexto que debe existir.** `AGENTS.md` (o anidado de front) ya en Git: mapa de `src/pages/`, `src/components/`, `src/api/`; no ampliar alcance; tests en `*.test.tsx` si el módulo los tiene. Workspace en la raíz. Chat nuevo. Ficha: [react-bug-acotado.md](react-bug-acotado.md).

**Prompt listo para pegar**

```text
Bug acotado. No rediseñes.

Síntoma: [DESCRIBÍ LO QUE VE EL USUARIO. Ej.: al cambiar la categoría en
FilterBar con page > 1, ProductList pide page=4 y la grilla queda vacía.]

Componentes que ya existen (no crees otros): [FilterBar, ProductList, Pagination].
Archivo(s) más probables: [src/components/ProductList.tsx y el padre que guarda page].

Reglas de este repo (ya están en AGENTS.md; no las reescribas):
- Tocá solo esos componentes y el spec si existe.
- Al cambiar un filtro, page vuelve a 1. No metas la página dentro de cada chip.
- No login, no admin, no store global, no librerías nuevas, no cambies el
  cliente HTTP ni el contrato.
- Si existe [ProductList.test.tsx], extendé ese archivo. No armes una suite
  nueva del módulo.

DoD:
1. El flujo del síntoma se puede repetir y ya no falla.
2. Diff acotado: mismos componentes, mismo rol.
3. Spec tocado en rojo-al-principio / verde-al-final si había spec.
4. No commit / no push.

Leé el código antes de editar. Si el estado vive en tres padres, parás y
preguntás quién es el dueño; no inventés un store.
```

**Variante si el agente se desvía** (empieza un Zustand, una ruta, o un `src/features/`)

```text
Pará. Estás agrandando el ticket.

Revertí o no sigas los archivos que no son [FilterBar / ProductList /
Pagination / el spec de la lista].
Borrá store, rutas, páginas y clientes HTTP nuevos de este diff.
El arreglo es: al cambiar el filtro, page = 1 en el estado que YA existe.
No propongas arquitectura. Listá los archivos que vas a tocar (máximo los
nombrados) y esperá un OK de una línea antes de seguir editando.
```

**Qué NO pedir en ese prompt.** “Mejorá la UX”, “aprovechá y extraé un hook genérico”, “pasalo a React Query”, “agregá login porque lo vamos a necesitar”, pegar el repo entero, pedir commit.

**DoD.** Categoría con `page > 1` deja de mostrar vacío; la lista usa página 1. No aparecen auth/admin ni store nuevo. El spec de la lista (si había) cubre la regresión. Lint/test del paquete tocado, no un rewrite de Vite.

---

### R2. Feature UI + cliente HTTP

**Cuándo usarlo.** Botón o bloque nuevo que llama a un endpoint **ya definido**. Misma pantalla, mismos filtros. Hay un `*Api.ts` (o el cliente del equipo) y casi siempre un hook.

**Modelo sugerido.** **Rápido** para implementar si el contrato y el cliente existen. Si hay que decidir “¿hook nuevo o extender `useOrders`?”, un chat **pensar** de 10 líneas y después el rápido. No un solo chat que diseñe y pegue `fetch` en el JSX.

**Contexto que debe existir.** MD de capas: UI no conoce URLs; HTTP solo en `src/api/`. Anidado `frontend/AGENTS.md` si el repo es mixto. Ficha: [react-feature-capas.md](react-feature-capas.md).

**Prompt listo para pegar**

```text
Feature acotada: UI + cliente HTTP que YA existe. No toques el backend.

Ticket: [Ej.: botón "Exportar CSV" en la lista de pedidos. Misma pantalla,
mismos filtros. GET /orders/export ya está definido; query params = los de
la lista.]

Archivos de partida (adaptá al disco; no inventes carpetas):
- Pantalla: [src/pages/OrderList.tsx]
- Cliente: [src/api/ordersApi.ts]
- Hook si existe: [src/hooks/useOrders.ts]

Reglas:
- El componente no pega fetch/axios ni hardcodea la URL. Extendé ordersApi
  (o el cliente que ya use el listado).
- Reutilizá los mismos query params / filtros que la lista. No inventes
  un contrato distinto ni pidas un endpoint nuevo en este chat.
- No crees src/features/, src/services/, store global, ni un router nuevo.
- Si hace falta un hook, extendé el existente. Un hook nuevo solo si el
  equipo ya extrae así las mutaciones de esa pantalla.
- Tests: si hay spec de OrderList o de ordersApi, agregá el caso de export.
  No reescribas tests verdes.

DoD:
1. El click usa el cliente en src/api/, no fetch en el onClick.
2. Filtros de la lista = filtros del export.
3. Sin archivos fuera del mapa del AGENTS.md.
4. No commit / no push.
```

**Variante si el agente se desvía** (`fetch` en el botón, `src/features/export/`, o cambia el back)

```text
Pará. Sacá el fetch/axios del componente. La URL vive solo en [ordersApi.ts].
No toques el backend en este chat. No crees src/features/ ni un segundo cliente.
El botón llama al hook o al método del api module que ya usa la lista, con
los mismos filtros. Mostrá el diff recortado a esos archivos y listo.
```

**Qué NO pedir.** “Y de paso el endpoint”, “pasá todo a React Query”, “un micro-frontend de export”, pegar OpenAPI entero, rediseñar la lista.

**DoD.** Click dispara el GET acordado vía `src/api/`. Misma query que el listado. Diff revisable. Sin store ni árbol nuevo.

---

### R3. No reescribir carpetas

**Cuándo usarlo.** El agente (o un PR) movió `src/` a `features/`, inventó `src/services/http.ts`, o metió `fetch` en un componente “para no cruzar carpetas”. El ticket original era un badge, un texto, un bug chico.

**Modelo sugerido.** **Pensar** (Opus / GPT) en **chat nuevo** para el veredicto. El hilo que ya movió carpetas suele **seguir** el árbol nuevo. El parche de vuelta al mapa: **rápido**, con la lista de archivos a restaurar.

**Contexto que debe existir.** El árbol del disco está escrito en el MD. Ficha: [react-arquitectura.md](react-arquitectura.md).

**Prompt listo para pegar**

```text
Review de estructura. No implementes una "mejora" de carpetas.

El mapa sagrado es el del disco (AGENTS.md):
- src/pages/ — pantallas
- src/components/ — UI
- src/api/ — HTTP
- src/hooks/ — orquestación de UI

Ticket original: [badge de stock en ProductCard / el síntoma real].

Hacé solo esto:
1. Listá cada archivo movido, creado o con fetch/axios fuera de src/api/.
   Path actual vs. path que debería tener según el mapa.
2. Para cada uno: ¿hace falta para el ticket original? sí/no.
3. No migres a src/features/, src/modules/, src/screens/ ni Next/Remix.
4. No "dejes el árbol nuevo porque ya compila".

Si el árbol actual es incómodo, una frase: "¿migrar a features/?" y esperá.
No migres de paso.

Salida: lista con paths. Cero refactors no pedidos. No commit.
```

**Variante si el agente se desvía** (sigue defendiendo `features/` o reescribe en el mismo hilo)

```text
Chat de review, no de migración. El árbol nuevo no está aprobado.
No sigas moviendo archivos. Devolvé el código al mapa de AGENTS.md
(pages / components / api / hooks). HTTP solo en src/api/.
El ticket es [el síntoma original], no un redesign. Si no podés
deshacer el árbol en este hilo, decilo en una frase: abriré chat nuevo
con git para restaurar y reaplicar solo el badge/bug.
```

**Qué NO pedir.** “Ordená src como en el libro de architecture”, “pasalo a feature-sliced”, implementar la migración en el mismo prompt de review.

**DoD.** Veredicto con paths. El PR del ticket no incluye un segundo árbol. `fetch` no quedó en JSX. Si hubo que revertir, el diff final es el síntoma original.

---

### R4. No agrandar el alcance

**Cuándo usarlo.** El ticket es una línea (validación, copy, un botón) y el modelo “completa el producto”: login, toasts, panel, i18n, storybook.

**Modelo sugerido.** **Rápido**, chat nuevo, límites en el primer mensaje. Si ya agrandó: no discutir features; recortar el diff.

**Contexto que debe existir.** En el MD: “solo lo pedido”. Si no está, este prompt lo dice para *este* chat; la segunda vez, una línea en el MD.

**Prompt listo para pegar**

```text
Alcance cerrado. Solo esto:

Pedido: [validar el email del formulario de contacto / el cambio literal
del ticket].
Fuera de alcance (no implementar, no "dejar preparado"):
- login, OAuth, pagos, admin, notificaciones, i18n extra, design system,
  storybook, store, router nuevo, dependencias nuevas.

Si algo de esa lista te parece necesario, una frase al final y esperás.
No lo codees.

Archivos esperables: [ContactForm.tsx y su spec si existe].
DoD: el pedido funciona; el diff se lee en minutos; no commit / no push.
```

**Variante si el agente se desvía**

```text
Eso no estaba en el pedido. Sacá del diff: [login / toasts / panel / …].
Dejá únicamente [la validación de email / el archivo del ticket].
No "lo dejo comentado". No abras PR de esas extras. Confirmá la lista
de archivos que quedan y parás.
```

**Qué NO pedir.** “Dejalo production-ready”, “pensá en el usuario final y agregá lo obvio”, “un MVP completo”.

**DoD.** Un reviewer cuenta los archivos con los dedos. No hay features parásitas. El ticket original se puede demo.

---

### R5. Tests (Vitest + Testing Library)

**Cuándo usarlo.** Hay que cubrir una regresión o un caso de negocio en el front. Ya hay runner y, ojalá, un spec vecino. No es “agregar Testing Library al monorepo”.

**Modelo sugerido.** **Rápido**. El spec copia el estilo del archivo de al lado. **Pensar** solo si hay que decidir qué es unit vs. qué es e2e — y igual no instales Playwright “de paso”.

**Contexto que debe existir.** Comando de test en el MD (`npm test` / `vitest`). “No reescribir tests verdes para que pasen con tu refactor.”

**Prompt listo para pegar**

```text
Tests del comportamiento, no de la implementación.

Caso a cubrir: [al cambiar el filtro de categoría, la lista pide o muestra
página 1. / el comportamiento del ticket].

Dónde:
- Si existe [src/components/ProductList.test.tsx] (o el spec del módulo),
  agregá el caso AHÍ.
- Si no existe spec, creá uno junto al archivo, mismo patrón que
  [el spec vecino más parecido; nombralo]. No una carpeta __tests__ nueva
  si el repo no la usa.

Reglas:
- Simulá lo que el usuario hace (click, change), no los internals.
- No mockees el mundo entero. Mockeá el cliente HTTP solo si el spec
  vecino ya lo hace.
- No reescribas tests que ya están verdes para esconder un refactor.
- Corré solo el spec tocado (vitest path), no "el monorepo entero",
  salvo que el ticket lo pida.
- No instales Jest/Cypress/Playwright si el runner es Vitest.

DoD: el caso nuevo falla en HEAD y pasa con el arreglo (o, si el arreglo
ya está, el caso queda rojo si revertís el fix). Mostrá el comando y
la salida. No commit.
```

**Variante si el agente se desvía** (suite nueva, snapshots gigantes, reescribe 20 tests)

```text
No. Un caso en el spec que ya existe (o un archivo junto al componente,
estilo vecino). Nada de snapshot del árbol, nada de migrar a otra lib,
nada de "describe.skip" para poner verde. Pegá el test que cubre
[el síntoma] y corré ese archivo.
```

**Qué NO pedir.** Coverage 100 %, e2e del producto, mockear `fetch` global si el equipo usa el api module, cambiar Vite “para que los tests anden”.

**DoD.** Un spec alineado al vecino. Comando corrido. El caso documenta la regresión. Cero infra nueva de test.

---

### R6. Review de un PR generado por agente

**Cuándo usarlo.** Vos (o un compañero) no escribiste el diff. Hay que decidir merge, recorte o rechazo. No es “que el agente abra el PR”.

**Modelo sugerido.** **Pensar** (Opus / GPT), chat **nuevo**, sin el hilo que generó el código. El autor del hilo ya “decidió” el árbol. Modelo rápido: solo para listar files, no para el veredicto de capas.

**Contexto que debe existir.** AGENTS.md mergeado. El diff a mano (rama, PR, o `git diff`). Vos sos responsable del merge; el modelo no firma.

**Prompt listo para pegar**

```text
Review de PR escrito por un agente. No implementes. No “mejores” el código.

Base de juicio: AGENTS.md de este repo (mapas y prohibiciones), no un
libro de arquitectura.

Diff: [pegá el enlace del PR / "leé la rama X contra main" / paths].
Ticket que se pidió: [una frase].

Respondé con esta tabla, nada más al principio:
| Path | ¿Estaba en el ticket? | ¿Rompe el mapa? (sí/no + una línea) | ¿Tests? |
Después:
1. Tres riesgos máximos (seguridad, contrato HTTP, alcance).
2. Qué recortar antes de merge (lista de paths o hunks).
3. Veredicto: merge / merge recortando / rechazar.
   Si rechazás: qué prompt de implementación usar (R1–R5), no reescribas
   vos el PR en este chat.

Prohibido en este review:
- Reescribir a src/features/ o a otro patrón "más clean".
- Aprobar porque "compila" o porque "los nombres se ven bien".
- Inventar que hay tests si no corrieron.
- Commit / push / merge.

Si no leíste un archivo, decí "no leí X"; no inventes el contenido.
```

**Variante si el agente se desvía** (empieza a “arreglar” el PR)

```text
Seguís en modo review. No edites archivos. No abras un contra-diff.
Completá la tabla path a path. El recorte lo hago yo (o un chat de
implementación aparte). Solo veredicto y lista de recortes.
```

**Qué NO pedir.** “Dejalo mergeable”, “aplicá tus sugerencias”, “force push”, inventar cobertura.

**DoD.** Tabla con paths. Veredicto explícito. Cero edits en ese chat. Si hay que rehacer, un chat nuevo con R1/R2, no este hilo.

---

### R7. useEffect en loop / closure vieja

**Cuándo usarlo.** Un componente que ya está en producción refetch en círculo, o un click/reintento ve el filtro de hace tres renders. El `useEffect` existe. El contrato HTTP no cambia. No es “pasalo a React Query”.

**Modelo sugerido.** **Rápido** (Composer, Grok, Haiku). **Pensar** solo si el estado vive en tres padres y hay que elegir dueño — igual no inventes store.

**Contexto que debe existir.** `AGENTS.md` (o anidado de front): mapa `src/pages/`, `src/components/`, `src/api/`; no ampliar alcance. Workspace en la raíz. Chat nuevo. Ficha práctica: [LR1](../casos-practicos-legacy-y-nuevos.html#l-r-1).

**Prompt listo para pegar**

```text
Bug de efecto. No rediseñes. No React Query.

Síntoma: [OrderList refetch en loop al montar o al cambiar filtro /
el botón Reintentar usa el filtro de hace tres renders.]

Componente que ya existe (no crees otro): [src/pages/OrderList.tsx].
Cliente HTTP: el que YA usa la lista [src/api/ordersApi.ts]. No lo reescribas.

Reglas de este repo (ya están en AGENTS.md; no las reescribas):
- Tocá solo ese componente y el spec si existe.
- Arreglá deps, identidad del objeto/array, o leé el filtro actual
  en el handler. No metas un store. No extraigas un hook genérico
  de tres pantallas.
- No eslint-disable de react-hooks/exhaustive-deps como único cambio.
- No login, no admin, no librerías nuevas, no cambies el contrato HTTP.

DoD:
1. Un cambio de filtro dispara un fetch (o el que el vecino ya haga), no un loop.
2. Reintentar / el click usa el filtro actual.
3. Diff acotado: mismo componente, mismo cliente, mismo rol.
4. Spec tocado en rojo-al-principio / verde-al-final si había spec.
5. No commit / no push.

Leé el efecto antes de editar. Si el estado vive en tres padres, parás
y preguntás quién es el dueño; no inventés un store.
```

**Variante si el agente se desvía** (React Query, Zustand, `eslint-disable`, hook genérico)

```text
Pará. Estás agrandando el ticket.

Revertí React Query, store, hooks nuevos y el eslint-disable de deps.
El arreglo es: deps estables o leer el filtro actual en el handler
que YA existe. Listá los archivos (máximo el componente y el spec)
y esperá un OK de una línea antes de seguir editando.
```

**Qué NO pedir en ese prompt.** “Pasalo a React Query”, “aprovechá y extraé un hook de data fetching”, “mejorá la UX”, pegar el repo entero, commit.

**DoD.** El loop se corta o el handler deja de ver estado viejo. Mismo componente, mismo cliente HTTP. Sin store ni lib nueva. Spec de la lista (si había) cubre la regresión.

---

### R8. Campo extra en un formulario existente

**Cuándo usarlo.** Un form que ya está en producción (contacto, alta de pedido). Ticket: un input más (`phone`, `notes`). Misma validación, mismo submit. El POST ya acepta la clave, o el ticket lo dice. No es auth ni un form nuevo.

**Modelo sugerido.** **Rápido** si el campo vecino está nombrado. **Pensar** si propone React Hook Form, Zod de cero, o login.

**Contexto que debe existir.** MD: UI no pega URLs; HTTP en `src/api/`; “solo lo que el ticket nombra”; no auth. Ficha práctica: [LR2](../casos-practicos-legacy-y-nuevos.html#l-r-2).

**Prompt listo para pegar**

```text
Campo extra en el formulario que YA existe. No reescribas el form.

Form: [src/components/ContactForm.tsx].
Campo nuevo: [phone / notes].
Campo vecino a copiar (markup + validación): [email / dueDate].
Submit: el mismo handler y el mismo cliente HTTP
[src/api/contactApi.ts / el que ya use el form].

Reglas:
- Un input más. Misma validación local que el vecino (required, max length).
- Si el POST ya acepta la clave, mandala en el mismo payload. Si no está
  en el contrato, pará y preguntá; no inventes el back.
- No login, OAuth, captcha, wizard, ni “lo dejo preparado”.
- No instales React Hook Form, Formik ni Zod si el form no los usa.
- Si existe spec del form, agregá un caso del campo nuevo ahí.
  No armes una suite nueva.

DoD:
1. El campo se ve, valida como el vecino y viaja en el mismo submit.
2. Diff: form + cliente solo si hace falta la clave + spec si existía.
3. Grep sin LoginPage, sin lib de forms nueva.
4. No commit / no push.

Listá archivos y esperá OK de una línea antes de editar.
```

**Variante si el agente se desvía** (RHF, login, segundo form)

```text
Pará. Sacá React Hook Form, Zod, login y el segundo formulario.
Dejá el form que ya existía con UN campo más, copiado del vecino
[email / dueDate]. Mismo submit. Listá files y parás.
```

**Qué NO pedir.** “Dejalo production-ready”, “y de paso el login”, “pasalo a RHF”, inventar el contrato del POST, commit.

**DoD.** El campo nuevo se demo en el flujo que ya está. Cero auth. Cero lib de forms nueva. Spec extendido si existía.

---

### R9. No migrar class components a hooks

**Cuándo usarlo.** El archivo es un class component. El ticket es un badge, un texto, una prop. El agente quiere `function` + hooks “de paso”. El backlog no pide migración.

**Modelo sugerido.** **Rápido** para el parche. **Pensar** (review, chat nuevo) si el PR ya convirtió el archivo.

**Contexto que debe existir.** MD: “no convertir class→función ni reescribir UI toolkit de paso”. Ficha práctica: [LR3](../casos-practicos-legacy-y-nuevos.html#l-r-3).

**Prompt listo para pegar**

```text
Cambio en una class que YA existe. No la pases a hooks.

Archivo: [src/components/UserCard.jsx].
Ticket: [badge de estado / una prop / el síntoma].

Reglas:
- Dejá class, lifecycle (componentDidMount / etc.) y this.state.
- No uses useState, useEffect ni extraigas hooks en ESTE componente.
- No reescribas el render a un árbol nuevo “equivalente”.
- Si el spec monta la class, extendé ese archivo. No lo reescribas
  a Testing Library "moderna" ni migres Enzyme de paso.
- No login, no store, no librería.

DoD:
1. El badge o la prop se ve en el flujo que ya está.
2. El archivo sigue siendo class Component / PureComponent.
3. Grep del archivo sin useState/useEffect nuevos.
4. No commit / no push.

Listá archivos (máximo la class y el spec) y esperá OK de una línea.
```

**Variante si el agente se desvía** (ya empezó `function UserCard`)

```text
Pará. Devolvé el componente a class. El ticket no es una migración.
Sacá useState, useEffect y el rewrite del render.
Aplicá solo [el badge / la prop] sobre la class original.
Si no podés deshacer en este hilo, decilo en una frase: abro chat nuevo.
```

**Qué NO pedir.** “Modernizalo”, “pasalo a hooks que es más simple”, “aprovechá y extraé un hook”, commit.

**DoD.** El cambio se ve. El archivo sigue siendo class. Cero migración. Spec extendido, no reescrito.

---

### R10. No introducir Redux/Zustand

**Cuándo usarlo.** El tema, el carrito o el filtro ya viven en `React.createContext` o en `useState` del padre. El ticket es un toggle, un chip, un valor más. El agente instala Zustand o Redux Toolkit.

**Modelo sugerido.** **Rápido**, límites en el primer mensaje. Si el PR ya metió el store: recortar, no discutir arquitectura.

**Contexto que debe existir.** MD: “no Redux/Zustand/Jotai si el disco no los tiene”. Ficha práctica: [LR4](../casos-practicos-legacy-y-nuevos.html#l-r-4).

**Prompt listo para pegar**

```text
Estado que YA existe. No instales store.

Dueño actual: [ThemeContext / CartContext / el useState de OrderList].
Ticket: [toggle dark / un filtro más / un valor en el carrito].

Reglas:
- Extendé ese Context o ese state. Mismos providers, mismos archivos.
- Prohibido: zustand, @reduxjs/toolkit, redux, jotai, recoil,
  src/store/, un Provider nuevo, una lib de estado.
- Si "el Context no escala" te parece un problema, una frase al final
  y esperás. No lo codees.
- No login, no admin, no router nuevo.

DoD:
1. El cambio usa el Context o el useState existente.
2. package.json sin store nuevo.
3. Grep sin src/store/, createSlice ni create() de zustand.
4. No commit / no push.

Listá archivos y esperá OK de una línea antes de editar.
```

**Variante si el agente se desvía** (instaló Zustand / creó `src/store/`)

```text
Pará. Desinstalá zustand/redux/jotai de este diff.
Borrá src/store/ y el hook use*Store.
El toggle/filtro vive en [ThemeContext / el state del padre].
Mostrá el diff recortado a esos archivos y listo.
```

**Qué NO pedir.** “Mejorá el estado”, “un store de verdad”, “Redux porque después va a hacer falta”, commit.

**DoD.** El cambio se demo con el dueño de estado que ya estaba. Cero dependencia de store. Cero carpeta `store/`.

---

### R11. Ruta nueva, mismo patrón de React Router

**Cuándo usarlo.** React Router ya está cableado (`<Routes>`/`<Route>` o `createBrowserRouter`). Ticket: una URL más (`/orders/:id`). Hay una ruta hermana. Nadie pidió data APIs, loaders, ni migrar de v5 a v6.

**Modelo sugerido.** **Rápido** si la vecina está nombrada. **Pensar** si propone cambiar de `Routes` a `createBrowserRouter` (o al revés).

**Contexto que debe existir.** MD: rutas donde el disco ya las declara; HTTP en `src/api/`; no Next `app/`. Ficha práctica: [LR5](../casos-practicos-legacy-y-nuevos.html#l-r-5).

**Prompt listo para pegar**

```text
Ruta nueva, mismo patrón que las que YA hay. No migres el router.

Archivo de rutas: [src/App.tsx / src/routes.tsx].
Ruta vecina a copiar: [/orders → OrderList / /customers/:id → CustomerDetail].
Ruta nueva: [/orders/:id → OrderDetail].
Página: [src/pages/OrderDetail.tsx] (o la carpeta de páginas del disco).
HTTP: [src/api/ordersApi.ts]. El GET de detalle [ya existe / se mockea
en el api module]. No inventes el back.

Reglas:
- Mismo helper de Router que el resto (Routes/Route o createBrowserRouter).
  No pases de uno al otro en este ticket.
- No loaders, no actions, no data APIs, si el disco no las usa.
- No app/ de Next, no next/link, no 'use client'.
- El componente no pega fetch ni hardcodea la URL.
- No login, no rutas protegidas, no librería de router nueva.

DoD:
1. La URL nueva abre la página del mapa.
2. Misma API de Router que las rutas hermanas.
3. HTTP solo en src/api/.
4. No commit / no push.

Listá archivos (rutas + página + api si hace falta el GET) y esperá OK.
```

**Variante si el agente se desvía** (migra el router, loader, `app/`)

```text
Pará. No migres a createBrowserRouter / no agregues loaders.
Sacá app/, next/link y el fetch del componente.
La ruta nueva copia [la vecina nombrada] en [el archivo de rutas].
HTTP en [ordersApi.ts]. Listá files y parás.
```

**Qué NO pedir.** “Actualizá React Router”, “pasalo a data router”, “y de paso el login del detalle”, mezclar Next, commit.

**DoD.** La URL funciona como las hermanas. Cero migración de router. Cero `app/` de Next. Cliente HTTP intacto en `src/api/`.

---

### R12. Vite + React día 0 + una página + fetch

**Cuándo usarlo.** Scaffold Vite + React (o repo que va a ser eso). La API **ya** existe en otro deploy. Primero el mapa (`AGENTS.md`). Después, chat nuevo: una página que lista un GET nombrado. No Next. No auth. No el producto entero.

**Modelo sugerido.** Mapa: **pensar** (¿raíz vs. anidado?). Página: **rápido** con paths ya escritos. Dos chats. No un solo Auto.

**Contexto que debe existir.** Workspace en la raíz. Chat 1 crea el MD; chat 2 (nuevo, T2) implementa. Ficha práctica: [NR1](../casos-practicos-legacy-y-nuevos.html#n-r-1). Snippets: [S1–S4](#qué-va-en-agentsmd-y-qué-va-en-el-chat) (decí React + Vite, no Angular).

**Prompt listo para pegar**

```text
Chat 1 — Día 0. Solo AGENTS.md (y anidado frontend/ si el repo es mixto).
No implementes producto.

Este front es React + Vite. Uno solo. No Next, no app/, no Angular.
Escribí el mapa del disco que VAMOS a usar:
- src/pages/ — pantallas
- src/components/ — UI
- src/api/ — HTTP
Quién habla con quién: el JSX no pega fetch ni URLs.
Tests: [npm test / npx vitest] si el scaffold ya los tiene.
No commit si no lo pido. Listá paths creados y pará.
La primera pantalla es OTRO chat.

---

Chat 2 — Chat NUEVO. Una tajada. El mapa ya está en Git.

Pantalla: [OrderList en src/pages/OrderList.tsx].
GET que YA existe: [GET /api/orders — URL base en [VITE_API_URL / la env
que el scaffold ya lea]]. No implementes el backend.
Cliente: [src/api/ordersApi.ts]. El componente no pega fetch ni hardcodea
la URL. Sin login, JWT, middleware, ni segundo recurso.
Si el GET exige token en prod, usá el mock/header que el MD nombre, o preguntá.

DoD:
1. La lista se ve con el DTO del GET nombrado (o vacío/error del cliente).
2. Grep sin LoginPage, next-auth, fetch/axios en el JSX, app/ de Next.
3. Sin archivos fuera del mapa.
4. No commit / no push.
```

**Variante si el agente se desvía** (Next, auth, `fetch` en el JSX, producto entero)

```text
Pará. Este repo es Vite + React, no Next.
Sacá app/, LoginPage, y el fetch del componente.
Chat 1 = solo MD. Chat 2 = una página + src/api/ contra el GET nombrado.
Nada más. Listá files y parás.
```

**Qué NO pedir.** “Dejalo production-ready”, “y de paso el login”, mezclar A2/R2 en un solo chat Auto, inventar el DTO, commit.

**DoD.** MD con “React + Vite, no Next”. Una página usa `src/api/` contra el GET existente. Cero auth. Cero `app/`. Dos chats.

---

### R13. No mezclar Next App Router con Vite

**Cuándo usarlo.** El disco es Vite + React (SPA) y el agente (o un PR) trajo `app/page.tsx`, `'use client'`, Server Actions o `next/link`. O el inverso: el repo es Next y alguien arma `src/pages/` de CRA/Vite. No es N3 (eso es React vs Angular).

**Modelo sugerido.** **Rápido** para escribir la línea en el MD. **Pensar** (review, chat nuevo) si el árbol ya se mezcló. El parche de vuelta: **rápido**, con la lista a restaurar.

**Contexto que debe existir.** El framework del disco está (o se escribe ahora) en el MD. Ficha práctica: [NR2](../casos-practicos-legacy-y-nuevos.html#n-r-2).

**Prompt listo para pegar**

```text
Review de stack. Este front es Vite + React (SPA). No Next.

El mapa sagrado es el del disco (AGENTS.md):
- src/pages/, src/components/, src/api/
- Rutas: React Router en [src/App.tsx / src/routes.tsx]
- Prohibido: app/, page.tsx de App Router, layout.tsx de Next,
  'use client', Server Actions, next/link, next/navigation,
  next/image, middleware.ts de Next.

Hacé solo esto:
1. Listá cada archivo de Next o con 'use client' / next/*.
   Path actual vs. path que debería tener en el Vite SPA.
2. Para cada uno: ¿hace falta para el ticket original? sí/no.
3. No instales next. No "dejes app/ porque ya compila".
4. Si solo faltaba la línea en el MD: escribí 4–6 líneas y pará.
   Feature en chat nuevo (T2).

Si el repo FUERA Next (app/), el inverso: no armes src/pages/ de Vite
ni React Router en paralelo. Un router. Un framework.

Salida: lista con paths. Cero producto nuevo en este chat. No commit.
```

**Variante si el agente se desvía** (sigue creando `app/` o instala `next`)

```text
Chat de review, no de migración a Next.
No instales next. Borrá app/, 'use client' y next/link de este diff.
Devolvé el código al mapa Vite (pages / components / api / React Router).
Si no podés deshacer en este hilo, decilo en una frase.
```

**Qué NO pedir.** “Dejalo listo para cuando pasemos a Next”, implementar la migración en el mismo prompt de review, mezclar A3 (eso es Angular).

**DoD.** El MD nombra Vite SPA y prohíbe Next. `package.json` sin `next`. Cero `app/**/page.tsx` en el PR del ticket. Si el repo es Next, cero árbol Vite paralelo.

---

### R14. Un test de componente, sin Cypress

**Cuándo usarlo.** Greenfield Vite + React. Hay que cubrir un comportamiento de la primera UI. El runner del scaffold es Vitest + Testing Library (o el que el disco ya tenga). No es “agregar Cypress al monorepo”. Para un módulo viejo usá R5.

**Modelo sugerido.** **Rápido**. El spec copia el estilo Vite/RTL. **Pensar** solo si hay que elegir unit vs. e2e — y igual no instales Cypress “de paso”.

**Contexto que debe existir.** Comando de test en el MD (`npm test` / `npx vitest`). Ficha práctica: [NR3](../casos-practicos-legacy-y-nuevos.html#n-r-3).

**Prompt listo para pegar**

```text
Un test de componente. No una suite e2e.

Componente: [src/components/ContactForm.tsx / src/pages/OrderList.tsx].
Caso a cubrir: [al submit, se envía phone / la lista vacía muestra
el estado vacío. / el comportamiento del ticket].

Dónde:
- Un archivo junto al componente, mismo patrón que el scaffold
  (Vitest + Testing Library): [ContactForm.test.tsx].
- No carpeta cypress/, e2e/, ni __tests__ nueva si el repo no la usa.

Reglas:
- Simulá lo que el usuario hace (click, change), no los internals.
- Mockeá el cliente HTTP solo si hace falta para el caso; no mockees
  el mundo entero.
- No instales Cypress, Playwright ni Jest si el runner es Vitest.
- No reescribas tests verdes. Corré solo ese spec (npx vitest path).
- Mostrá comando y salida. No afirmes verde si no corriste.

DoD: el caso nuevo falla sin el comportamiento y pasa con él
(o queda rojo si revertís el fix). Un spec. Cero infra e2e.
No commit.
```

**Variante si el agente se desvía** (Cypress, Playwright, carpeta e2e)

```text
No. Un spec junto al componente, Vitest + Testing Library.
Sacá cypress.config, playwright.config, la carpeta e2e/ y Jest.
Pegá el test que cubre [el síntoma] y corré ese archivo.
```

**Qué NO pedir.** Coverage 100 %, e2e del producto, “un SPA serio tiene Cypress”, cambiar Vite para los tests, commit.

**DoD.** Un spec alineado al scaffold. Comando corrido. `package.json` sin Cypress/Playwright. Cero carpeta e2e nueva.

---

## Java / Spring

### J1. Endpoint nuevo en capas

**Cuándo usarlo.** Recurso REST nuevo (o un GET extra) en un Spring Boot que **ya** tiene controller → service → repository. No es un bounded context nuevo.

**Modelo sugerido.** **Rápido** (Composer, Grok, Sonnet) con el vecino a copiar. **Pensar** si el agente propone módulo Maven, hexagonal o segundo Boot.

**Contexto que debe existir.** MD del API: controller delgado, DTO, no `*Entity` en JSON, JUnit. Ficha: [java-spring-endpoint.md](java-spring-endpoint.md).

**Prompt listo para pegar**

```text
Endpoint nuevo, mismas capas que el vecino. Un solo Spring Boot.

Ticket: [GET /api/shipments/{id}/events — historial de eventos de un envío].
Ya existen: [Shipment, ShipmentRepository, ShipmentController con GET del envío].
Paquete: [el de shipments, no un paquete nuevo "events-service"].

Capas (AGENTS.md):
1. Controller: path/query, llama al service, DTO o 404 que el módulo ya use.
2. Service: carga vía repository; arma el DTO. Regla de negocio acá si el
   equipo ya la pone en service (no inventes hexagonal).
3. Repository: método nuevo solo si el existente no alcanza.
4. Prohibido: EntityManager, @Query o JdbcTemplate en el controller.
5. Prohibido: devolver *Entity; segundo @SpringBootApplication; Kafka.

Tests: JUnit 5. Un test del service (Mockito del repo) o @WebMvcTest del
controller, según el patrón del módulo. No @SpringBootTest de contexto
completo si los GET vecinos no lo usan.

DoD:
- El GET responde DTO, no entidad JPA.
- Tres tipos (controller / service / repository o query en el repo).
- Camino feliz + "envío no existe" si ese 404 ya es convención.
- ./mvnw test (o Gradle) en el módulo. No commit / no push.

Copiá el estilo del GET vecino. No "mejores prácticas" de un tutorial.
```

**Variante si el agente se desvía** (SQL en el controller, segundo JAR, MapStruct masivo)

```text
Pará. Este servicio no se parte. No hay invoice-service ni un módulo nuevo.
Sacá SQL / EntityManager / repository del controller. El JSON es DTO.
Dejá el GET en [ShipmentController] + service + repository del mismo
paquete. JUnit del patrón vecino. Mostrá esos archivos y nada más.
```

**Qué NO pedir.** “Diseñá el bounded context”, “hexagonal de una vez”, OpenAPI generado si el equipo no lo usa, seguridad nueva, commit.

**DoD.** Capas visibles en el diff. DTO. Test. Un artefacto. Comando de test corrido.

---

### J2. Legacy sin microservicios

**Cuándo usarlo.** Monolito (un JAR, un esquema). El ticket es un campo, un filtro, un arreglo. El agente lee “facturación” y diseña tres servicios.

**Modelo sugerido.** **Rápido** para el campo. Si el prompt fue vago y ya apareció Kafka: **pensar** en chat nuevo, “¿hace falta un proceso nuevo? no”. Ficha: [java-spring-legacy.md](java-spring-legacy.md).

**Prompt listo para pegar**

```text
Este repo es un monolito: un Spring Boot, un artefacto, un deploy.
Nadie pidió microservicios.

Ticket: [agregar notes (texto corto) al DTO de factura y persistirlo en
la tabla que ya existe].

Paquete dueño: [invoice / el que ya posee la entidad]. Ahí van: columna
o campo, DTO, mapper si existe, API que ya expone la factura.

Prohibido en este ticket:
- Segundo @SpringBootApplication, *-service, módulo Maven de aplicación,
  docker-compose de varios servicios, Kafka, Rabbit, gRPC.
- Hexagonalizar o "pasar a DDD" el módulo de paso.
- Renombrar el paquete base.
- Reescribir InvoiceService en una clase por método.

El legacy se toca lo mínimo: mismo estilo que los vecinos del paquete.
Si el código mezcla un poco las capas, no lo uses de excusa para un split.

DoD: el campo ida y vuelta en el API existente; migración solo si el
equipo versiona schema (el mismo mecanismo de siempre); tests del mapper
o del service como los vecinos. No commit / no push.
```

**Variante si el agente se desvía**

```text
No hay invoice-service. Rechazá el split. Un campo en el paquete [invoice]
que ya está. Borrá módulos, docker-compose extra y topics. El ticket es
notes en la factura, no una plataforma. Listá archivos del paquete
existente y continuá solo con esos.
```

**Qué NO pedir.** “Mejorá la arquitectura mientras estás”, “preparalo para extraer el contexto”, ADRs de microservicios.

**DoD.** Un campo (o el arreglo) en el deploy actual. Cero procesos nuevos. Review de 15 minutos, no de topología.

---

### J3. El controller no habla con la base

**Cuándo usarlo.** Review o arreglo: el controller inyecta el repository, `EntityManager` o `JdbcTemplate`. El ticket puede ser “listar por estado”.

**Modelo sugerido.** **Pensar** para marcar el atajo y decir a dónde moverlo. **Rápido** para el parche: consulta al service, DTO, test. Ficha: [java-spring-capa.md](java-spring-capa.md).

**Prompt listo para pegar**

```text
Cauce HTTP ↔ persistencia. No lo saltees porque "es un GET".

Quién habla con quién (AGENTS.md):
- Controller → service (o use case). Nunca → Repository, EntityManager,
  JdbcTemplate.
- Service → repository. Nunca → HttpServletRequest.
- Repository → base. Sin reglas de anulación/pagos.

Ticket: [filtrar facturas por estado / el síntoma].
Hoy el atajo está en: [InvoiceController inyecta InvoiceRepository].

Trabajo:
1. La consulta vive en el service existente (o uno nuevo en el MISMO
   paquete). El controller solo mapea HTTP ↔ DTO.
2. No devuelvas *Entity. DTO o proyección que el módulo ya use.
3. No "dejes el repository en el controller porque es más simple".
4. Si el cambio exige romper esta regla: parar y preguntar. No lo
   silencies.

Test: el del service o @WebMvcTest que mockea el service, no el repo,
si ese es el patrón. DoD: grep del controller sin repository/EM/SQL.
No commit / no push.
```

**Variante si el agente se desvía** (deja el atajo o pasa a hexagonal)

```text
No hexagonalices. Mové findByStatus (o la query) al service. El
controller no declara InvoiceRepository. JSON = DTO. Un test. Eso es
todo el ticket. No extraigas puertos/adapters.
```

**Qué NO pedir.** Reescribir todos los controllers del monolito, introducir MapStruct en todo el módulo, “ya que estamos, use cases por operación”.

**DoD.** Controller sin persistencia. Service con la query. DTO. Test. El siguiente GET no tiene excusa para copiar el atajo.

---

### J4. JUnit del invariante

**Cuándo usarlo.** Cambió una regla (cancelar pedido enviado, anular factura pagada, stock). El agente tocó dominio o service y cerró sin test. O el test es `@SpringBootTest` de 40 segundos para un `if`.

**Modelo sugerido.** **Rápido**, copiando el test vecino. Si el invariante es de dominio y el equipo ya testea sin Spring, **no** subas el test a la capa web.

**Contexto que debe existir.** Comando `./mvnw test`. En el MD: “cambio de invariante → test”. Dónde vive (domain vs. service) según **este** repo, no según un libro.

**Prompt listo para pegar**

```text
Test del invariante. El cambio no cierra sin esto.

Regla de negocio: [un pedido con estado ENVIADO no se puede cancelar /
la regla literal].
Código que la implementa: [Pedido.cancelar() / InvoiceService.anular / path].

Dónde va el test:
- Si el invariante está en dominio sin Spring, el test va en domain
  (JUnit, sin @SpringBootTest).
- Si la regla hoy vive en el @Service, test del service con Mockito del
  repository, como los vecinos.
- No @SpringBootTest de contexto completo para un if, salvo que el módulo
  no tenga otro patrón.

Casos mínimos:
1. Camino permitido (el que debe seguir funcionando).
2. Camino prohibido (el invariante: debe fallar con la excepción o
   código que el equipo ya usa — no inventes un tipo nuevo si ya hay uno).

No reescribas tests verdes. No cambies el invariante "para que el test
sea más fácil". Corré solo las clases de test tocadas. Pegá comando y
salida. No commit / no push.
```

**Variante si el agente se desvía** (skip, test vacío, o contexto full)

```text
No. Un test que falla si saco el if. Nada de @Disabled, nada de assertTrue(true),
nada de levantar toda la app. Mismo estilo que [PedidoTest / el vecino].
Pegá ese archivo y la salida de surefire/gradle.
```

**Qué NO pedir.** Coverage del paquete entero, Testcontainers si el invariante es puro, “después lo testeamos en QA”.

**DoD.** El caso prohibido está escrito y corre. El comando se ejecutó. Si revertís la regla, el test se pone rojo.

---

### J5. Review de un PR Spring generado por agente

**Cuándo usarlo.** Diff de API o de monolito escrito por un modelo. Hay que ver capas, segundo Boot, entidades en el JSON, tests salteados.

**Modelo sugerido.** **Pensar**, chat nuevo, sin el hilo de implementación.

**Prompt listo para pegar**

```text
Review de PR Spring (agente). No implementes. No rediseñes el módulo.

Cauce (AGENTS.md): controller → service → repository; DTO en HTTP;
un deploy; JUnit del patrón del módulo.

Diff: [PR / rama / paths]. Ticket pedido: [una frase].

Tabla primero:
| Path | Capa según el mapa | ¿Pertenece al ticket? | Problema (SQL en controller, *Entity, 2º Boot, sin test) |

Después:
1. ¿Hay persistencia en un @RestController? paths.
2. ¿Hay segundo proceso, módulo de aplicación o broker que nadie pidió?
3. ¿El JSON expone *Entity?
4. ¿Hay JUnit del invariante o del GET? ¿Se corrió o solo se afirmó?
5. Veredicto: merge / recortar / rechazar. Recortes en lista de hunks.
   Rehacer en chat de implementación (J1–J4), no aquí.

No apruebes porque "es un GET chico". No propongas hexagonal ni Kafka
como "mejora del PR". No commit / merge / push.
```

**Variante si el agente se desvía**

```text
Sin edits. Completá la tabla. Si hay SQL en el controller, el veredicto
no es merge. Listá recortes. Yo aplico o abro otro chat.
```

**Qué NO pedir.** Que reescriba el PR “bien”, que genere el changelog, que pushee.

**DoD.** Veredicto con paths. Capas y tests nombrados. Cero cambios de código en ese chat.

---

## Angular

No uses R1–R14 “cambiando React por Angular”. Esas fichas hablan de `src/pages/`, `src/api/` y `fetch` en el JSX. Acá el disco es `src/app/`, NgModule o carpeta feature, servicio/fachada. Si el agente trae hooks o `src/features/` de tutorial React, paramos: [A3](#a3-angular-no-mezclar-patrones-react).

### A1. Angular: cambio en el módulo que ya existe

**Cuándo usarlo.** Front Angular en producción. Ticket: un campo más en la lista, un diálogo de confirmación, un método en el servicio que ya lista. El módulo `pedidos` (o la carpeta feature del disco) ya tiene componente, servicio y rutas. No es standalone en todo el árbol, ni signals “de paso”, ni un segundo SPA.

**Modelo sugerido.** **Rápido** (Composer, Grok, Haiku) si el vecino está nombrado. **Pensar** (T3) si propone `HttpClient` en el `.ts` de la plantilla o un NgModule nuevo.

**Contexto que debe existir.** `AGENTS.md` (o anidado de front): componente flaco; HTTP en servicio/fachada, no en el componente; “no módulo Angular nuevo si el disco no lo tiene”; no mezclar React. Workspace en la raíz. Chat nuevo. Ficha práctica: [L8](../casos-practicos-legacy-y-nuevos.html#l8).

**Prompt listo para pegar**

```text
Cambio Angular en el módulo que YA existe. No reescribas el front.

Módulo / carpeta: [src/app/pedidos/ o el path del disco].
Vecino a copiar: [pedidos-list.component.ts / pedidos.service.ts].
Ticket: [campo en la fila / diálogo al confirmar / el síntoma].

Reglas de este repo (ya están en AGENTS.md; no las reescribas):
- El componente no usa HttpClient ni pega URLs. Pasa por el servicio
  o la fachada que YA lista.
- Tocá solo ese módulo (componente, template, servicio, spec si existe).
- No NgModule nuevo, no tree features/ si el disco no lo tiene,
  no standalone “en todo el app”, no signals en el árbol, no React,
  no librería, no segundo SPA.
- Si existe spec del listado, extendé ese archivo. No armes una suite nueva.

DoD:
1. El campo o el diálogo se ve en el flujo que ya está.
2. Diff acotado: mismos archivos del módulo, mismo rol.
3. Grep del componente sin HttpClient.
4. No commit / no push.

Listá archivos (máximo los del módulo) y esperá OK de una línea
antes de editar. Si el estado vive en tres padres, parás y preguntás;
no inventés un store.
```

**Variante si el agente se desvía** (`HttpClient` en el componente, `PedidosV2`, React, signals globales)

```text
Pará. Estás agrandando el ticket.

Revertí o no sigas los archivos que no son [el módulo nombrado].
Sacá HttpClient del .ts de la plantilla. Borrá NgModule nuevo,
shared-ui/, componentes React y librerías de este diff.
El arreglo es: [campo / diálogo] copiando [pedidos.service.ts].
No propongas arquitectura. Listá los archivos del módulo y esperá
un OK de una línea antes de seguir editando.
```

**Qué NO pedir en ese prompt.** “Pasalo a standalone”, “signals en todo el árbol”, “aprovechá y extraé un shared-ui”, pegar R2 de React, rediseñar rutas, commit.

**DoD.** El diff vive en el módulo existente. Cero `HttpClient` en el componente. Cero módulo o librería nueva. El campo o el diálogo se demo en el flujo que ya está.

---

### A2. Angular: día 0 + tajada vertical

**Cuándo usarlo.** Greenfield. El equipo eligió **un** SPA Angular. Sin mapa, el agente mete React, `src/features/` de tutorial, o auth “para que quede redondo”. El día 0 **solo** escribe el MD. El chat **siguiente** hace una lista (o un alta) con HTTP en el servicio, no en el componente.

**Modelo sugerido.** Chat 1 (mapa): **pensar** (¿raíz vs. anidado?). Chat 2 (tajada): **rápido**, paths ya escritos. No un solo hilo que diseñe y codee.

**Contexto que debe existir.** Workspace en la raíz. Según la herramienta: `AGENTS.md` y/o `CLAUDE.md`. “SPA Angular. No React, no Next.” Carpetas del scaffold (`src/app/…`). Ficha práctica: [N8](../casos-practicos-legacy-y-nuevos.html#n8). Snippets de sistema: [S1–S4](#qué-va-en-agentsmd-y-qué-va-en-el-chat) (decí Angular, no el mapa React de S1).

**Prompt listo para pegar — Chat 1 (día 0, no producto)**

```text
Día 0. Solo AGENTS.md (y CLAUDE.md si el equipo usa Claude Code).
No implementes producto. No abras pantallas.

Este front es Angular. Uno solo. No React, no Next, no app/ de App Router.

Escribí el mapa del disco (adaptá al scaffold real; no inventes carpetas):
- src/app/ — módulos o carpetas feature que YA crea el CLI
- Componente flaco; HTTP en servicio/fachada, no en el .ts de la plantilla
- Tests: el runner que ya tenga el repo (ng test / el del package.json)

También: alcance (solo lo pedido), no inventar cifras, no commit/push
sin pedido. Corto. No 400 líneas.

Salida: paths del MD y pará. Cero LoginComponent. Cero features de producto.
```

**Prompt listo para pegar — Chat 2 (tajada, chat nuevo)**

```text
Una tajada. Chat NUEVO. El mapa de AGENTS.md ya está; no lo reescribas.

Pantalla: [OrderList / lista de pedidos].
GET: [ya existe / se mockea en el servicio del módulo].
Módulo: [src/app/pedidos/ o el path que escribió el Chat 1].

Reglas:
- El componente no usa HttpClient. El servicio/fachada del módulo
  hace el GET.
- Mismo módulo que el mapa. No crees src/pages/, src/api/, src/features/
  de tutorial React, ni un segundo framework.
- Sin login, JWT, OAuth, módulo auth, ni usuario demo.
- Si hace falta un spec, junto al componente, patrón del CLI/vecino.

DoD:
1. La lista se ve.
2. Grep sin LoginComponent ni HttpClient en el componente.
3. Sin archivos fuera del mapa.
4. No commit / no push.
```

**Variante si el agente se desvía** (React, auth, MD + dashboard en un solo chat)

```text
Pará. Un SPA Angular. Sacá React, Next, src/pages/ y src/api/.
Sacá LoginComponent, JWT y usuarios demo.
Si este hilo escribió el MD y además codeó pantallas: el producto
se rehace en chat NUEVO, solo la tajada (lista + servicio).
El componente no declara HttpClient.
```

**Qué NO pedir.** “Dejalo production-ready”, “y de paso el login”, mezclar R2, un solo chat Auto para mapa + producto, commit.

**DoD.** Hay MD corto con “Angular, no React”. Una pantalla usa el servicio del mapa. Cero `HttpClient` en el componente. Cero login inventado. Chat de reglas distinto al de la tajada.

---

### A3. Angular: no mezclar patrones React

**Cuándo usarlo.** El agente (o un PR) trajo `src/pages/`, `src/api/`, `useEffect`, React Query, `fetch` en el componente, o un `.tsx` “para comparar”. El repo es Angular. El ticket era un campo, un diálogo o la primera lista.

**Modelo sugerido.** **Pensar** en **chat nuevo** para el veredicto. El hilo que ya mezcló frameworks suele **seguir** el árbol React. El parche de vuelta al mapa: **rápido**, con la lista de archivos a sacar.

**Contexto que debe existir.** El MD dice “SPA Angular. No React.” Ficha práctica: [N3](../casos-practicos-legacy-y-nuevos.html#n3) / [L8](../casos-practicos-legacy-y-nuevos.html#l8).

**Prompt listo para pegar**

```text
Review de estructura Angular. No implementes un "mejor" front híbrido.

El mapa sagrado es el del disco (AGENTS.md):
- Un SPA Angular. No React, no Next, no app/ de App Router.
- src/app/ — módulos o carpetas feature del CLI
- HTTP en servicio/fachada, no en el .ts de la plantilla
- No src/pages/, src/api/, src/hooks/, useEffect, React Query

Ticket original: [campo / diálogo / primera lista].

Hacé solo esto:
1. Listá cada archivo React, .tsx, fetch/axios fuera del servicio,
   o carpeta src/pages|api|hooks|features de tutorial.
   Path actual vs. path Angular que debería tener.
2. Para cada uno: ¿hace falta para el ticket original? sí/no.
3. No "dejes el mix porque ya compila".
4. No migres a React "ya que está empezado".

Si el árbol actual es incómodo, una frase: "¿migrar el front?" y esperá.
No migres de paso.

Salida: lista con paths. Cero refactors no pedidos. No commit.
```

**Variante si el agente se desvía** (sigue defendiendo React o reescribe en el mismo hilo)

```text
Chat de review, no de migración. El mix React+Angular no está aprobado.
No sigas creando .tsx ni src/api/. Devolvé el código al mapa Angular
(src/app/, servicio/fachada). El ticket es [el síntoma original].
Si no podés deshacer el mix en este hilo, decilo en una frase:
abriré chat nuevo con git para restaurar y reaplicar solo el campo/lista.
```

**Qué NO pedir.** “Dejá los dos para comparar”, “pasalo a React porque el lead también lo conoce”, implementar la migración en el mismo prompt de review.

**DoD.** Veredicto con paths. El PR del ticket no incluye un segundo framework. `HttpClient` no quedó en el componente. Si hubo que revertir, el diff final es el síntoma original.

---

## Android

No uses T3 como único prompt de implementación. T3 es “¿rompe el patrón?”. Acá el disco es pantalla + ViewModel + repositorio (o el vecino real). Si el agente trae Compose Navigation, Activity gorda o XML→Compose “de paso”, paramos: [D2](#d2-android-no-reescribir-la-arquitectura).

### D1. Android: mismo patrón que el vecino

**Cuándo usarlo.** App Android nativa. Ticket chico: un campo más en la fila, un diálogo al confirmar, un método en el repositorio que ya lista. El paquete ya tiene pantalla + ViewModel + repositorio. Hay un vecino que hace exactamente eso.

**Modelo sugerido.** **Rápido** si el path del vecino está nombrado. **Pensar** (T3) si duda entre Activity gorda y ViewModel.

**Contexto que debe existir.** `AGENTS.md`: ViewModel sin Views; HTTP en repositorio/capa de datos; “no Compose Navigation / no librería si el disco no lo tiene”. Ficha práctica: [L9](../casos-practicos-legacy-y-nuevos.html#l9) / [L4](../casos-practicos-legacy-y-nuevos.html#l4).

**Prompt listo para pegar**

```text
Cambio Android en el paquete que YA existe. No reescribas la arquitectura.

Paquete: [ui.orders / data.orders o el path del disco].
Vecino a copiar: [OrderListViewModel / OrderListFragment / OrderRepository].
Ticket: [campo en la fila / diálogo al confirmar / el síntoma].

Reglas de este repo (ya están en AGENTS.md; no las reescribas):
- El ViewModel no importa Activity/Fragment/View. El diálogo lo muestra
  la vista (Fragment, Activity o Composable que YA existe).
- HTTP en el repositorio / capa de datos, no en la Activity ni en el VM
  si el vecino ya lo tiene en data.
- Tocá solo ese paquete (pantalla, VM, repo, test si existe).
- No Navigation Component nuevo, no NavHost, no migrar XML→Compose,
  no Hilt/Koin nuevo, no librería, no segundo módulo Gradle de app.

DoD:
1. El campo o el diálogo se demo en el flujo que ya está.
2. Diff acotado: mismos archivos del paquete, mismo rol.
3. El ViewModel no gana imports de android.view / Activity.
4. No commit / no push.

Listá archivos (máximo los del paquete) y esperá OK de una línea
antes de editar.
```

**Variante si el agente se desvía** (lógica en la Activity, NavHost, Compose de paso)

```text
Pará. Estás reescribiendo la app.

Revertí Navigation nuevo, NavHost, migración XML→Compose y librerías
de este diff. El arreglo es: [campo / diálogo] copiando
[OrderListViewModel]. El VM no importa Views. HTTP en el repositorio.
Listá los archivos del paquete y esperá un OK de una línea.
```

**Qué NO pedir.** “Modernizá a Compose”, “unificá la navegación”, “pasalo a Clean Architecture”, rediseñar Gradle, commit.

**DoD.** El diff se lee al lado del vecino. Cero librerías nuevas. Cero rewrite de UI toolkit. El diálogo o el campo se puede demo en el flujo existente.

---

### D2. Android: no reescribir la arquitectura

**Cuándo usarlo.** El agente (o un PR) migró a Compose Navigation, metió lógica en la Activity, reescribió XML a Compose, o inventó un módulo Gradle “data-clean”. El ticket original era un campo, un texto, un diálogo.

**Modelo sugerido.** **Pensar** en **chat nuevo** para el veredicto. El hilo que ya reescribió el toolkit suele **seguir** el árbol nuevo. El parche de vuelta: **rápido**, con la lista de archivos a restaurar.

**Contexto que debe existir.** El patrón del disco está escrito en el MD (MVVM u otro **de este repo**, no el del último codelab). Ficha práctica: [L9](../casos-practicos-legacy-y-nuevos.html#l9).

**Prompt listo para pegar**

```text
Review de estructura Android. No implementes una "mejora" de arquitectura.

El mapa sagrado es el del disco (AGENTS.md):
- [MVVM / el patrón que YA está]: pantalla → ViewModel → repositorio
- El ViewModel no importa Activity/Fragment/View
- HTTP en data / repositorio
- UI toolkit: [XML / Compose] el que YA usa esa pantalla. No migres.

Ticket original: [campo / diálogo / el síntoma real].

Hacé solo esto:
1. Listá cada archivo movido, Navigation nuevo, XML reescrito a Compose,
   Activity gorda, o módulo Gradle nuevo.
   Path actual vs. path/capa que debería tener.
2. Para cada uno: ¿hace falta para el ticket original? sí/no.
3. No migres a Compose Navigation, Hilt nuevo ni "clean" de tutorial.
4. No "dejes el árbol nuevo porque ya compila".

Si el toolkit actual es incómodo, una frase: "¿migrar a Compose?" y esperá.
No migres de paso.

Salida: lista con paths. Cero refactors no pedidos. No commit.
```

**Variante si el agente se desvía** (sigue defendiendo NavHost o reescribe en el mismo hilo)

```text
Chat de review, no de migración. El toolkit nuevo no está aprobado.
No sigas convirtiendo XML ni agregando NavHost. Devolvé el código
al paquete y al patrón de AGENTS.md. El ticket es [el síntoma],
no un rewrite. Si no podés deshacerlo en este hilo, decilo en una
frase: abriré chat nuevo con git para restaurar y reaplicar solo
el campo/diálogo.
```

**Qué NO pedir.** “Ordená el paquete como en el codelab”, “pasalo a multi-module”, implementar la migración en el mismo prompt de review.

**DoD.** Veredicto con paths. El PR del ticket no incluye un segundo toolkit ni Navigation nueva. Si hubo que revertir, el diff final es el síntoma original.

---

## Transversal

### T1. Primer chat del día

**Cuándo usarlo.** Arranque. Repo con MD en Git. Un ticket (o el primero de varios). No reusar el hilo de ayer ni el de otro producto.

**Modelo sugerido.** El del ticket (rápido si es bug/campo; pensar si es diseño). Auto solo para lo rutinario.

**Contexto que debe existir.** Workspace = **raíz**. `AGENTS.md` / `CLAUDE.md` commiteado. No pegar el MD. Claude Code: `/context` si hay duda. Cursor: Customize → Rules.

**Prompt listo para pegar**

```text
Chat nuevo de trabajo. El AGENTS.md del repo ya debe estar inyectado;
no lo voy a pegar.

Confirmá en una frase: mapa que ves (front/api o el de este repo) y
que no vas a commit/push sin pedido.

Ticket de hoy (uno): [síntoma o feature en una o dos frases].
Fuera de alcance: [login / microservicios / lo que NO es hoy].

No leas el repo entero. Abrí solo los paths del ticket cuando hagan
falta. No vuelques logs ni Jenkinsfile. Cuando termines: DoD del ticket
y archivos tocados. Sin commit.
```

**Variante si el agente se desvía** (pide el MD, escanea todo, o arranca un segundo ticket)

```text
No pegues ni reescribas AGENTS.md. No hagas tour del repo. Un solo
ticket: [el de arriba]. Lo demás ni lo lists como "después". Seguí
solo esos archivos.
```

**Qué NO pedir.** “Ponete al día con todo el proyecto”, “leé docs/”, pegar cinco tickets, “mejorá lo que veas”.

**DoD.** Una frase de mapa coherente con el disco. Trabajo = un ticket. Contexto no lleno de archivos irrelevantes.

---

### T2. Después de editar AGENTS.md (chat nuevo)

**Cuándo usarlo.** Acaba de entrar una regla (no NgRx, no SQL en el controller, no `features/`). El hilo viejo **no** relee el disco solo.

**Modelo sugerido.** El del trabajo siguiente. Lo importante es la **sesión nueva**, no el modelo.

**Contexto que debe existir.** MD mergeado o al menos guardado en disco. Aviso al equipo: pull + chat nuevo. Claude Code: `/compact` relee la **raíz**, no todos los anidados de una vez; si cambió un anidado, igual conviene chat nuevo.

**Prompt listo para pegar**

```text
Este chat es NUEVO a propósito. Recién cambió AGENTS.md (o CLAUDE.md).

Cambio de regla: [una línea: "controller no inyecta repository" /
"no crear src/features/" / "no inventar métricas"].

No uses instrucciones de un hilo anterior. Si tu contexto trae un
árbol o un store que esa regla prohíbe, ignorá eso: vale el archivo
del disco.

Siguiente trabajo: [el ticket, o "solo confirmá la regla y pará"].
Si es Claude Code y este hilo no es nuevo de verdad, decime que debo
abrir otro o usar /compact (sabiendo que se pierde lo que solo estaba
en el chat).

No reescribas el MD. No commit del código de producto salvo que el
ticket lo pida. El MD ya se commitea en su PR.
```

**Variante si el agente se desvía** (sigue proponiendo NgRx / el atajo viejo)

```text
Esa propuesta viola el AGENTS.md actual. Leé el archivo de la raíz
otra vez (path AGENTS.md) y rehacé la respuesta. El hilo viejo no vale.
Si seguís con la regla anterior, paramos y abro otro chat.
```

**Qué NO pedir.** Seguir en el chat de ayer “para no perder contexto”, `/compact` como sustituto de un ticket que cambió de tema, duplicar la regla en un `.mdc` always-on.

**DoD.** La primera respuesta ya aplica la regla nueva. El equipo no depende de un copy/paste en Slack.

---

### T3. Arquitectura: ¿esto rompe el patrón?

**Cuándo usarlo.** Duda antes de codear, o un PR que “huele” a segundo árbol. Querés un sí/no con paths, no un rediseño.

**Modelo sugerido.** **Pensar** (Opus / GPT). Chat nuevo. Sin implementar.

**Contexto que debe existir.** Mapa en el MD. El patrón es el del **disco**, no el del último artículo.

**Prompt listo para pegar**

```text
Pregunta de arquitectura. No edites código. No propongas un árbol mejor.

Patrón del repo = AGENTS.md + lo que ya está en disco.
Cambio que estamos evaluando: [descripción / paths / “el agente quiere
src/features/catalog” / “extraer invoice-service”].

Respondé:
1. ¿Rompe el patrón? sí / no / depende (y de qué).
2. Paths concretos (hoy vs. lo propuesto).
3. Si se hace igual, qué se rompe en el próximo ticket (una o dos
   frases, sin drama).
4. Alternativa MÍNIMA que respeta el mapa, en una frase. Sin plan de
   migración de 12 pasos.

Prohibido: hexagonal, microservicios, Next, NgRx, “clean architecture”
genérica, reescribir carpetas. Si la alternativa exige decisión de
equipo, preguntá; no asumas que sí.
```

**Variante si el agente se desvía**

```text
No implementes. No rediseñes. Tres bullets: rompe sí/no, paths, alternativa
mínima. El patrón es el AGENTS.md, no un libro.
```

**Qué NO pedir.** “Cómo lo harías vos”, diagrama de destinos, implementar la alternativa en el mismo chat.

**DoD.** Un humano puede decidir en un minuto. Cero diff. Si hay que tocar código, otro chat (R/J) con el recorte ya decidido.

---

### T4. Explicar a alguien no técnico

**Cuándo usarlo.** Mail a un stakeholder, nota de release interna, standup escrito. El público no va a leer el PR.

**Modelo sugerido.** **Pensar** de prosa (GPT / Sonnet). Composer/Grok están más orientados a editar código; no son la primera opción.

**Contexto que debe existir.** S3 en el MD (no inventar). Hechos que **vos** pegás: qué se hizo, qué no, fechas reales. Nada de “sonaba bien +40%”.

**Prompt listo para pegar**

```text
Texto para alguien no técnico. Español profesional, no jerga de capas.

Audiencia: [PM / cliente interno / operaciones]. Canal: [mail / párrafo
para Slack / nota de release]. Largo: [8–12 líneas / un párrafo].

Hechos permitidos (solo estos; el resto no existe):
- [qué se entregó]
- [qué queda fuera]
- [riesgo o fecha si hay, o "no hay fecha"]

Reglas:
- No inventes métricas, nombres de cliente, certificados, usuarios
  activos ni “éxito”.
- Si falta un número, omití o poné [FALTA DATO], no lo estimes.
- No expliques controller/repository. Podés decir "la pantalla" y
  "el servidor".
- No adjuntes diff. No prometas trabajo no pedido.

Cierre: una línea de “próximo paso” solo si está en los hechos.
```

**Variante si el agente se desvía** (aparece un % o un cliente)

```text
Sacá cifras, clientes y adjetivos de resultado que yo no di.
Reescribí con los hechos de la lista. Donde no hay dato, [FALTA DATO]
o silencio. No “aproximadamente”.
```

**Qué NO pedir.** “Hacelo más convincente”, “agregá impacto de negocio”, inventar un caso de éxito.

**DoD.** Se puede enviar sin fact-check de números. Un técnico no encuentra claims falsos. Tono usable en un mail de equipo.

---

### T5. UI desde una captura

**Cuándo usarlo.** Hay un screenshot (bug visual o un diseño a acercar). El design system / componentes **ya** existen. No es “inventá un producto”.

**Modelo sugerido.** **Visual** primero (Gemini Pro u otro con imagen). Si hay que respetar un DS estricto, **pensar** después. La implementación del parche: **rápido**, con los componentes nombrados. Adjuntá la captura recortada al síntoma, no un PDF de 20 páginas.

**Contexto que debe existir.** MD de front: componentes, “no CSS modules si es Tailwind”, no crear pantalla nueva. Tokens de diseño del repo, no los de otro producto.

**Prompt listo para pegar**

```text
Adjunto captura. Usala como evidencia visual, no como permiso para
inventar un design system.

Qué debe pasar: [el filtro no se ve / el botón Exportar debe parecerse
a los botones primarios de OrderList / el bug de layout].
Componentes existentes a reusar: [Button, FilterBar, ProductCard, …].
Stack CSS: [Tailwind / el del repo]. No instales styled-components ni
una lib de UI nueva.

Reglas:
- No crees páginas, rutas ni un “DesignSystem/” nuevo.
- No copies la captura píxel a píxel si el DS del repo dice otra cosa:
  ganá el DS, y listá la diferencia en una frase.
- Recorté la imagen al síntoma. Ignorá chrome del IDE, datos de clientes
  y PII si aparecen: no los transcribas.
- HTTP sigue en src/api/. Un pixel no autoriza un fetch en el JSX.

DoD: la pantalla usa componentes del mapa; el síntoma visual se puede
contrastar con una captura nueva (yo la tomo). No commit.
```

**Variante si el agente se desvía**

```text
No inventes kit de UI. Reusá [los componentes nombrados]. Sacá librerías
nuevas y páginas nuevas. El fetch no va en el componente. Ajustá clases
del DS existente y listo.
```

**Qué NO pedir.** “Fiel al mock aunque rompa Tailwind”, dump de 15 screenshots, rediseñar el catálogo.

**DoD.** Mismos componentes. Diff de estilos acotado. Sin PII copiada al repo. Verificación visual por una persona.

---

### T6. El agente inventó datos

**Cuándo usarlo.** Un párrafo, README, post o comentario de PR con “+40%”, un cliente que nadie nombró, un certificado, usuarios activos.

**Modelo sugerido.** El mismo de prosa o el rápido. Lo importante: **lista de claims** y reescritura, no “tonalo down”.

**Contexto que debe existir.** S3 en el MD. Hechos reales en tu mensaje.

**Prompt listo para pegar**

```text
El texto anterior inventa datos. No se publica así.

1. Listá cada cifra, cliente, certificado, resultado o nombre que no
   esté en ESTE mensaje ni en un archivo que yo te indique.
2. Reescribí el texto SIN esos claims. Hueco = se omite o [FALTA DATO].
3. No reemplaces un número inventado por otro “más conservador”.
4. No agregues testimonials ni logos.

Hechos permitidos ahora: [pegá solo lo verificable].
Audiencia: [interna / pública]. Si un claim no está acá, no existe.
```

**Variante si el agente se desvía** (sigue el %)

```text
Todavía hay un dato que yo no di: [citá la frase]. Eliminalo. No
parafrasees el impacto. Texto corto > texto impresionante.
```

**Qué NO pedir.** “Que suene a caso de éxito”, métricas de LinkedIn, usuarios, inventar el nombre del banco.

**DoD.** Un humano marca cada oración como trazable. Cero números huérfanos. Sirve para publicar o se ve el hueco.

---

### T7. El agente hizo commit o push

**Cuándo usarlo.** Pediste un arreglo y el modelo commiteó, pusheó, o saltó hooks (`--no-verify`). Esto es incidente de proceso, no un “undo mágico” del agente.

**Modelo sugerido.** **No** le pidas al mismo agente que reescriba la historia (`reset --hard`, `push --force`) salvo que una persona dueña de Git lo pida **explícito** y sepa el riesgo. Primero: `git status`, `git log`, remoto.

**Contexto que debe existir.** S4 en el MD (idealmente). Hooks/permisos si querés candado. Vos decidís el recover.

**Prompt listo para pegar**

```text
No toques Git. No commit, no push, no rebase, no --force, no --no-verify,
no amend, no reset.

Acaba de haber un commit/push que YO no pedí (o no estoy seguro).
Solo diagnóstico en texto:
1. Qué comandos git corriste en ESTE chat (lista).
2. Qué rama, si el push fue al remoto, si usaste --no-verify.
3. Archivos que iban en ese commit, si los sabés.

No inventes el log. Si no corristes git, decí "no corrí git".
El recover lo hace una persona. Tu trabajo ahora: parar.

Después (solo si yo pido): una línea nueva para AGENTS.md
"No commit/push sin pedido explícito" si aún no está — en el diff de
docs, no un commit tuyo.
```

**Variante si el agente se desvía** (quiere “arreglar” con force push)

```text
STOP. Nada de git write. Nada de force push. Esperá. El siguiente
mensaje git lo escribe un humano o no se escribe.
```

**Qué NO pedir.** `reset --hard`, `clean -fd`, force a `main`, “dejá el historial lindo”, saltar hooks.

**DoD.** El agente paró. Tenés un relato de lo que hizo. Una persona revisa `status`/`log` y decide. La regla queda en el MD **después**, en un PR humano. Chat **nuevo** para el código.

---

### T8. Pairing: plan con Opus, implementar con Composer

**Cuándo usarlo.** El cambio cruza capas o hay una decisión de mapa. Una persona (o un chat) piensa; otro chat ejecuta el plan **cerrado**. No un solo hilo “pensá y codeá”.

**Modelo sugerido.** Chat A: **pensar** (Opus / GPT). Chat B **nuevo**: **rápido** (Composer / Grok). El MD ya mergeado en ambos.

**Contexto que debe existir.** AGENTS.md estable. El plan se pega o se linkea; no se improvisa un segundo mapa en Composer.

**Prompt listo para pegar — Chat A (plan, no código)**

```text
Modo plan. No edites archivos. No abras PR.

Objetivo: [feature o arreglo, una frase].
Mapa: el de AGENTS.md (no un patrón externo).

Entregá:
1. Archivos a tocar (paths que existan; si hace falta uno nuevo, justificación
   de una línea alineada al mapa).
2. Qué NO se toca (lista).
3. Orden de pasos (máximo 6).
4. Tests a extender o crear (paths).
5. Riesgo de romper capas (una línea).

Prohibido: snippets largos, reescritura de carpetas, microservicios,
dependencias nuevas, commit. Si el objetivo rompe el mapa, pará y
preguntá; no armes un plan de migración disfrazado.
```

**Prompt listo para pegar — Chat B (implementar el plan)**

```text
Modo implementación. Chat nuevo. El plan de abajo es el alcance.
No lo “mejores”. No agregues archivos que el plan no nombra.

PLAN:
[pegá el plan del Chat A, sin omitir la lista de NO tocar]

Reglas:
- Seguí el AGENTS.md.
- Si el plan choca con el disco, pará y preguntá; no inventes un
  tercer diseño.
- Tests como dice el plan. Corré esos comandos.
- No commit / no push.

Cuando termines: lista de files tocados vs. lista del plan (deben
coincidir). Desvíos = tabla de una línea, no código extra.
```

**Variante si Composer se desvía**

```text
El plan no incluye eso. Revertí [paths de más]. Implementá solo los
pasos 1–N del plan pegado. Sin features/ ni segundo Boot. Sin “ya
que estaba”.
```

**Qué NO pedir.** Que Opus también parchee; que Composer “complete” el plan; un solo chat Auto para las dos fases; commit al cerrar el plan.

**DoD.** Plan con paths, sin código masivo. Diff del rápido ⊆ plan. Tests corridos. Review humano del diff (R6/J5 si lo escribió el agente).

---

## Relación con las fichas cortas

| Prompt | Ficha de MD |
| --- | --- |
| R1, R4, R5 | [react-bug-acotado.md](react-bug-acotado.md) |
| R2 | [react-feature-capas.md](react-feature-capas.md) |
| R3 | [react-arquitectura.md](react-arquitectura.md) |
| R7 | [casos-practicos LR1](../casos-practicos-legacy-y-nuevos.html#l-r-1) (HTML práctico; no hay ficha .md aparte) |
| R8 | [casos-practicos LR2](../casos-practicos-legacy-y-nuevos.html#l-r-2) |
| R9 | [casos-practicos LR3](../casos-practicos-legacy-y-nuevos.html#l-r-3) |
| R10 | [casos-practicos LR4](../casos-practicos-legacy-y-nuevos.html#l-r-4) |
| R11 | [casos-practicos LR5](../casos-practicos-legacy-y-nuevos.html#l-r-5) |
| R12 | [casos-practicos NR1](../casos-practicos-legacy-y-nuevos.html#n-r-1) |
| R13 | [casos-practicos NR2](../casos-practicos-legacy-y-nuevos.html#n-r-2) |
| R14 | [casos-practicos NR3](../casos-practicos-legacy-y-nuevos.html#n-r-3) |
| J1, J4 | [java-spring-endpoint.md](java-spring-endpoint.md) |
| J2 | [java-spring-legacy.md](java-spring-legacy.md) |
| J3 | [java-spring-capa.md](java-spring-capa.md) |
| A1, A3 | [casos-practicos L8 / N3](../casos-practicos-legacy-y-nuevos.html#l8) (HTML práctico; no hay ficha .md aparte) |
| A2 | [casos-practicos N8](../casos-practicos-legacy-y-nuevos.html#n8) |
| D1, D2 | [casos-practicos L9 / L4](../casos-practicos-legacy-y-nuevos.html#l9) |
| S1–S4, portable | [portable-agents.md](portable-agents.md), [instrucciones-por-herramienta.md](instrucciones-por-herramienta.md) |

Guía (inyección, modelos, tokens): [guia-agentes-reglas-y-modelos.html](../guia-agentes-reglas-y-modelos.html) · [Cómo usar](../guia-agentes-reglas-y-modelos.html#como-usar) · [Cuidar los tokens](../guia-agentes-reglas-y-modelos.html#cuidar-tokens).
