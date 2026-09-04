# AGENTS.md portable: una copia React y otra Java

**Para quién:** equipos mixtos (front React + API Spring) que no quieren un tratado único de 400 líneas. Una página para decidir *dónde* vive cada regla.

## Contexto

`AGENTS.md` es el formato portable ([agents.md](https://agents.md/)). Cursor, OpenCode, Codex, Cline y otras lo leen; Claude Code no, salvo `@AGENTS.md` o symlink ([CLAUDE.md](https://code.claude.com/docs/en/claude-md)). El mapa del equipo debe viajar. Lo que no debe viajar es un archivo que mezcla “no `fetch` en el JSX” con “no `EntityManager` en el controller”: cada modelo atiende peor cuando la mitad de las reglas no aplica al archivo abierto.

React y Java no son un solo producto en el MD: son **dos copias cortas**, más una raíz de 15–25 líneas que dice quién habla con quién entre front y API.

## Qué falló sin MD / con modelo rápido

Un solo `AGENTS.md` “completo” (front + back + Android + Nest “por si acaso”) produce:

- El agente de un bug de CSS cita reglas de JPA.
- El de un GET Spring propone Zustand.
- Anthropic: archivos largos (~200 líneas) cumplen peor. Un mega-MD es el anti-patrón.

Composer lee el bloque que tiene delante y se pierde. Opus resume el tratado y a veces aplica la regla del stack equivocado.

## Qué poner en AGENTS.md

Raíz corta. Sin pegar aquí el mapa interno de React ni el de Spring.

```markdown
# AGENTS.md (raíz del monorepo o del repo mixto)

- Front: `frontend/` (React + Vite). API: `api/` (Spring Boot, un deploy).
- El front no inventa URLs: usa el cliente en `frontend/src/api/`.
- La API no devuelve entidades JPA. DTO en el controller.
- No extraer microservicios ni pasar el SPA a Next sin pedido.
- Tests: front `npm test` / API `./mvnw test`. Sin commit/push si no se pide.
- Detalle de carpetas: `frontend/AGENTS.md` y `api/AGENTS.md`. No dupliques
  esos bullets aquí.
```

No fusionar [react-bug-acotado.md](react-bug-acotado.md) y [java-spring-endpoint.md](java-spring-endpoint.md) en un archivo. Copiá cada bloque al anidado que corresponde.

Claude Code: `CLAUDE.md` en la raíz con `@AGENTS.md` y, si hace falta, `@frontend/AGENTS.md` cuando el trabajo es de UI. Cursor: raíz + anidado al tocar archivos de esa carpeta ([Rules](https://cursor.com/docs/rules)).

## Modelo sugerido

Escribir o revisar el **mapa** (¿esta regla va a la raíz o al anidado?): Opus o GPT. Copiar los bloques a disco: Composer. No uses Auto para “unificar los MD en uno”.

## Cómo verificar (DoD)

- Hay tres archivos (o dos, si el repo es un solo stack): raíz corta + anidado del stack que existe.
- Un chat abierto en `frontend/` no recibe un tratado de JPA; uno en `api/` no recibe reglas de Vite.
- Nadie commitea un `AGENTS.md` de 400 líneas “para todas las tools”.
