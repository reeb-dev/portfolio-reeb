# Feature React que cruza UI y cliente HTTP

**Para quién:** squads full-stack o front que agregan una pantalla (o un bloque) que llama a un endpoint ya definido. Se comparte al arrancar el ticket, no como tratado de arquitectura.

## Contexto

El producto es un catálogo B2B. El ticket pide un botón “Exportar CSV” en la lista de pedidos: misma pantalla, mismos filtros, archivo generado por la API. El contrato HTTP ya existe (`GET /orders/export` con query de filtros). En el front hay `src/pages/OrderList.tsx`, `src/api/ordersApi.ts` y un hook `useOrders` que ya lista. No hay que inventar login, un panel de admin ni un micro-frontend.

El riesgo: un agente mezcla `fetch` en el botón, duplica la URL, o crea `src/features/export/` con router, store y tres componentes nuevos.

## Qué falló sin MD / con modelo rápido

Sin mapa de capas, un modelo rápido (Composer, Grok, Haiku) suele:

- Pegar `fetch('/api/orders/export')` en el `onClick` del botón.
- Crear `ExportService.ts` en `src/utils/` y otro cliente en `src/services/`.
- Añadir React Query “porque es el estándar” cuando el listado ya usa el hook del equipo.
- Pedir un endpoint distinto al acordado y “adaptar” el back en el mismo chat.

Un modelo más capaz sin reglas anidadas puede diseñar bien el flujo y igual dejar el `fetch` en el JSX: entiende el producto, no el cauce.

## Qué poner en AGENTS.md

Raíz del repo (quién habla con quién). El bloque largo de carpetas React está en [react-bug-acotado.md](react-bug-acotado.md); acá va lo de **capas**.

```markdown
# AGENTS.md (raíz) — capas del front

- UI (`src/pages/`, `src/components/`): render y eventos. No conoce URLs.
- Hooks / casos de uso de UI (`src/hooks/`): orquestan el flujo de la pantalla.
- Cliente HTTP (`src/api/`): único lugar con `fetch` / axios / el wrapper del equipo.
- El componente no llama al cliente HTTP si ya existe un hook para ese recurso.
- No crear `src/services/`, `src/store/` ni `src/features/` si no están en el disco.
```

Anidado, listo para `frontend/AGENTS.md` (o `web/AGENTS.md`). Cursor combina raíz + anidado al tocar archivos de esa carpeta ([Rules](https://cursor.com/docs/rules); Anthropic: anidados on-demand en [CLAUDE.md](https://code.claude.com/docs/en/claude-md)).

```markdown
# frontend/AGENTS.md

- SPA React + Vite. No Next, no `app/`, no `pages/` de Pages Router.
- Nueva UI de un recurso existente: extender la página y el `*Api.ts` de ese recurso.
- Export CSV: el botón dispara el hook/caso de uso; el blob lo pide `ordersApi`.
- Query params de export = los mismos que la lista. No un DTO paralelo “por las dudas”.
- No instales React Query / Zustand / un router nuevo para un botón.
- Test: si hay `OrderList.test.tsx`, cubrí el click (mock del api, no de `fetch` global).
```

## Modelo sugerido

1. **Plan (chat o Plan Mode):** Opus, GPT-5.x o Sonnet — “¿el export reutiliza `ordersApi` o hay que extender el cliente?”. Sin escribir archivos todavía.
2. **Implementar:** Composer o Grok, en un chat nuevo, con el plan pegado y el workspace en la raíz (para que cargue `frontend/AGENTS.md`).
3. **Review de capas:** Opus o GPT — “¿algún JSX llama HTTP?”. No Composer.

Gemini (Pro) si el ticket llega con captura del botón en Figma; no para decidir el cliente HTTP.

## Cómo verificar (DoD)

- El CSV baja con los filtros actuales; no hay URL hardcoded en el componente del botón.
- Diff: página + `ordersApi` (y hook si el equipo ya lista así). Sin carpeta `features/export`.
- Test existente de la lista cubre el click, o se agregó un caso al mismo spec.
- El backend no se tocó salvo que el contrato estuviera incompleto y el ticket lo dijera.
