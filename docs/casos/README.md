# Casos cortos para el equipo

Fichas independientes para pegar en Slack, Notion o el repo de un cliente. No son un manual: cada archivo se lee solo. No describen un portfolio ni un producto interno de un cliente.

Si vas a **enviar el kit**: leé primero [LEEME-PARA-ENVIAR.md](../LEEME-PARA-ENVIAR.md) (abrir los HTML en el navegador, no el blob de GitHub).

| Archivo | Una línea |
| --- | --- |
| [prompts-base.md](prompts-base.md) | **Prompts para pegar:** 24 situaciones (React, Java, Angular, Android, transversal) + variantes + snippets de AGENTS.md vs. chat. |
| → [A1](prompts-base.md#a1-angular-cambio-en-el-módulo-que-ya-existe) | Angular: cambio en un módulo que ya está (no reescribir el front). |
| → [A2](prompts-base.md#a2-angular-día-0--tajada-vertical) | Angular: día 0 (mapa) + una tajada vertical. No mezclar React. |
| → [A3](prompts-base.md#a3-angular-no-mezclar-patrones-react) | Angular: el agente trajo pages/api/hooks de React. |
| → [D1](prompts-base.md#d1-android-mismo-patrón-que-el-vecino) | Android: ticket chico, mismo paquete y mismo patrón. |
| → [D2](prompts-base.md#d2-android-no-reescribir-la-arquitectura) | Android: no Navigation nueva ni XML→Compose de paso. |
| [react-bug-acotado.md](react-bug-acotado.md) | Bug chico en componentes que ya existen; el agente no inventa login ni admin. |
| [react-feature-capas.md](react-feature-capas.md) | Feature nueva que cruza UI y cliente HTTP; quién habla con quién. |
| [react-arquitectura.md](react-arquitectura.md) | El agente reescribe carpetas o mete `fetch` en cualquier componente. |
| [java-spring-endpoint.md](java-spring-endpoint.md) | Endpoint nuevo: controller → service → repository + JUnit. |
| [java-spring-legacy.md](java-spring-legacy.md) | Cambio seguro en un monolito; no “microservicios” si nadie lo pidió. |
| [java-spring-capa.md](java-spring-capa.md) | El controller no habla con la base; el MD que corta ese atajo. |
| [portable-agents.md](portable-agents.md) | `AGENTS.md` portable: una copia React y otra Java, no un archivo único. |
| [instrucciones-por-herramienta.md](instrucciones-por-herramienta.md) | Bloques para pegar: Cursor, Claude Code, OpenCode, Copilot y otras. |
