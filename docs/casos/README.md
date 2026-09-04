# Casos cortos para el equipo

Fichas independientes para pegar en Slack, Notion o el repo de un cliente. No son un manual: cada archivo se lee solo. No describen un portfolio ni un producto interno de un cliente.

Si vas a **enviar el kit**: leé primero [LEEME-PARA-ENVIAR.md](../LEEME-PARA-ENVIAR.md) (abrir los HTML en el navegador, no el blob de GitHub).

| Archivo | Una línea |
| --- | --- |
| [prompts-base.md](prompts-base.md) | **Prompts para pegar:** 32 situaciones (React, Java, Angular, Android, transversal) + variantes + snippets de AGENTS.md vs. chat. |
| → [A1](prompts-base.md#a1-angular-cambio-en-el-módulo-que-ya-existe) | Angular: cambio en un módulo que ya está (no reescribir el front). |
| → [A2](prompts-base.md#a2-angular-día-0--tajada-vertical) | Angular: día 0 (mapa) + una tajada vertical. No mezclar React. |
| → [A3](prompts-base.md#a3-angular-no-mezclar-patrones-react) | Angular: el agente trajo pages/api/hooks de React. |
| → [D1](prompts-base.md#d1-android-mismo-patrón-que-el-vecino) | Android: ticket chico, mismo paquete y mismo patrón. |
| → [D2](prompts-base.md#d2-android-no-reescribir-la-arquitectura) | Android: no Navigation nueva ni XML→Compose de paso. |
| → [R7](prompts-base.md#r7-useeffect-en-loop--closure-vieja) | React: useEffect en loop / closure vieja (no React Query). Ficha [LR1](../casos-practicos-legacy-y-nuevos.html#l-r-1). |
| → [R8](prompts-base.md#r8-campo-extra-en-un-formulario-existente) | React: un campo más en un form que ya está. Ficha [LR2](../casos-practicos-legacy-y-nuevos.html#l-r-2). |
| → [R9](prompts-base.md#r9-no-migrar-class-components-a-hooks) | React: no migrar class a hooks. Ficha [LR3](../casos-practicos-legacy-y-nuevos.html#l-r-3). |
| → [R10](prompts-base.md#r10-no-introducir-reduxzustand) | React: no meter Redux/Zustand si ya hay Context. Ficha [LR4](../casos-practicos-legacy-y-nuevos.html#l-r-4). |
| → [R11](prompts-base.md#r11-ruta-nueva-mismo-patrón-de-react-router) | React: ruta nueva, mismo patrón de Router. Ficha [LR5](../casos-practicos-legacy-y-nuevos.html#l-r-5). |
| → [R12](prompts-base.md#r12-vite--react-día-0--una-página--fetch) | React: Vite día 0 + una página + fetch a API existente. Ficha [NR1](../casos-practicos-legacy-y-nuevos.html#n-r-1). |
| → [R13](prompts-base.md#r13-no-mezclar-next-app-router-con-vite) | React: no mezclar App Router de Next con Vite SPA. Ficha [NR2](../casos-practicos-legacy-y-nuevos.html#n-r-2). |
| → [R14](prompts-base.md#r14-un-test-de-componente-sin-cypress) | React: un test de componente; no Cypress. Ficha [NR3](../casos-practicos-legacy-y-nuevos.html#n-r-3). |
| [react-bug-acotado.md](react-bug-acotado.md) | Bug chico en componentes que ya existen; el agente no inventa login ni admin. |
| [react-feature-capas.md](react-feature-capas.md) | Feature nueva que cruza UI y cliente HTTP; quién habla con quién. |
| [react-arquitectura.md](react-arquitectura.md) | El agente reescribe carpetas o mete `fetch` en cualquier componente. |
| [java-spring-endpoint.md](java-spring-endpoint.md) | Endpoint nuevo: controller → service → repository + JUnit. |
| [java-spring-legacy.md](java-spring-legacy.md) | Cambio seguro en un monolito; no “microservicios” si nadie lo pidió. |
| [java-spring-capa.md](java-spring-capa.md) | El controller no habla con la base; el MD que corta ese atajo. |
| [portable-agents.md](portable-agents.md) | `AGENTS.md` portable: una copia React y otra Java, no un archivo único. |
| [instrucciones-por-herramienta.md](instrucciones-por-herramienta.md) | Bloques para pegar: Cursor, Claude Code, OpenCode, Copilot y otras. |
