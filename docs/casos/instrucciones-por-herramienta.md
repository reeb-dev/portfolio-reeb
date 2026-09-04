# Instrucciones por herramienta (casos reales)

**Para quién:** squads que usan más de un agente sobre el mismo repo. Un `AGENTS.md` portable + un adaptador corto por herramienta. No es un tratado: cada bloque se pega y se adapta a *vuestras* carpetas.

Los casos detallados (con DoD) están en las otras fichas de [esta carpeta](README.md). Acá solo van instrucciones **listas para pegar**.

Documentación de nombres de archivo: contrastá siempre la [tabla no-Cursor](../guia-agentes-reglas-y-modelos.html#otras-herramientas) y las [referencias](../guia-agentes-reglas-y-modelos.html#referencias). Si el filename de tu versión difiere, **adaptá**; no inventes un lector universal.

## Casos que cubren estos bloques

| Caso | Qué pedirle al agente | Qué no |
| --- | --- | --- |
| Bug acotado | Un síntoma en componentes/clases que ya existen | Login, admin, store nuevo, segundo Spring Boot |
| Feature con capas | UI + cliente HTTP **o** controller → service → repository | `fetch` en el JSX; SQL en el controller |
| Review de arquitectura | ¿Rompe el mapa? Listá sí/no con paths | Reescribir carpetas “más clean” |
| No agrandar / no inventar | Solo el ticket; sin cifras ni clientes inventados | Microservicios, paneles, métricas |

React de ejemplo: catálogo con `FilterBar` / `ProductList` / `src/api/`. Java de ejemplo: Spring Boot, un deploy, `ShipmentController` + service + repository.

---

## 1. Bloque portable — `AGENTS.md` (raíz)

Pegalo en la raíz. Quien ya lee `AGENTS.md` (Cursor, OpenCode, Cline, Roo, Codex, Goose por defecto, VS Code si el setting está, Aider si lo configurás) usa **este** archivo. El resto de secciones de este MD solo agrega el archivo extra de esa herramienta.

```markdown
# AGENTS.md

## Mapa (este repo; no inventar carpetas)

- Front: `frontend/` — React + Vite. Páginas en `src/pages/`, UI en `src/components/`,
  HTTP solo en `src/api/`.
- API: `api/` — Spring Boot, un deploy. Controller → service → repository → DTO.
- Tests: front `npm test` (Vitest). API `./mvnw test` (JUnit 5).
- No hay `src/admin/`, `src/features/` paralelo, ni un segundo `*-service`.

## Casos

### Bug acotado
- Tocá solo los archivos del síntoma. Al cambiar un filtro, `page` vuelve a 1.
- No login, no panel, no store global, no librerías nuevas.

### Feature con capas
- UI: el componente no conoce URLs. El cliente HTTP vive en `*Api.ts`.
- API: controller delgado; sin EntityManager/SQL en el controller; no exponer `*Entity`.

### Review de arquitectura
- Si el cambio exige un árbol nuevo o un microservicio: parar y preguntar.
- El árbol del disco es sagrado.

### Alcance y datos
- Solo lo pedido. Prohibido inventar cifras, clientes, certificaciones o resultados.
- No commit / push / `--no-verify` sin pedido explícito.

## Después de editar este archivo
Chat nuevo (o lectura explícita). El hilo viejo no relee el disco solo.
```

Si el repo es **solo React** o **solo Java**, borrá el otro párrafo del mapa. Detalle largo: [react-bug-acotado.md](react-bug-acotado.md), [java-spring-endpoint.md](java-spring-endpoint.md), [portable-agents.md](portable-agents.md).

---

## 2. Cursor — `AGENTS.md` + `.cursor/rules`

**Qué dice la doc:** `AGENTS.md` en raíz y subcarpetas; Project Rules en `.cursor/rules/*.mdc` (always / glob / inteligente / `@`). User Rules = cuenta, no Git. Team Rules = dashboard Team/Enterprise; precedencia Team → Project → User. [Rules](https://cursor.com/docs/rules).

**Qué pegar:** el bloque portable **más** reglas con glob (no copies el tratado al `.mdc` always-on: duplica tokens).

```markdown
---
description: Front React — HTTP fuera del JSX
globs: frontend/**/*.{ts,tsx}
alwaysApply: false
---

- Prohibido fetch/axios en componentes. Usar `src/api/`.
- Bug de lista/filtro: no crear páginas ni store.
- Feature: extender `*Api.ts` existente; mismos query params que la lista.
```

```markdown
---
description: API Spring — controller sin persistencia
globs: api/**/*.{java,kt}
alwaysApply: false
---

- Controller → service → repository. Nunca Repository/EntityManager en el controller.
- DTO en REST. Un deploy; no extraer microservicio sin pedido.
- Cambio de invariante: JUnit en el service (o el slice que el módulo ya use).
```

Review de arquitectura: chat **Ask/Opus**, no Composer. El glob no sustituye ese modelo.

---

## 3. Claude Code — `CLAUDE.md` + `@AGENTS.md`

**Qué dice la doc:** Claude Code **no** lee `AGENTS.md` salvo import o symlink. Carga `CLAUDE.md` / `CLAUDE.local.md` al inicio; anidados on-demand. [CLAUDE.md](https://code.claude.com/docs/en/claude-md).

**Qué pegar:** no dupliques el mapa. Importá.

```markdown
# CLAUDE.md

@AGENTS.md

- Claude Code: /context para ver Memory files; /compact relee la raíz, no todos los anidados.
- CLAUDE.local.md es personal (gitignore). No lo commitees.
```

Si el ticket es solo front y hace falta el anidado ya:

```markdown
@frontend/AGENTS.md
```

(eso entra on-demand al tocar esa carpeta; el import en raíz gasta tokens en tickets de API — preferí on-demand.)

---

## 4. OpenCode — `AGENTS.md`

**Qué dice la doc:** `AGENTS.md` de proyecto + `~/.config/opencode/AGENTS.md` personal. Fallback `CLAUDE.md` si no hay AGENTS (doc estable; V2 puede diferir). [Rules](https://opencode.ai/docs/rules/).

**Qué pegar:** el bloque portable. Personal (no Git):

```markdown
# ~/.config/opencode/AGENTS.md  (no se comparte)

- Tono breve. No copies acá el mapa del repo.
```

`/init` puede borrar o “mejorar” el AGENTS: revisá el diff antes de commitear.

---

## 5. GitHub Copilot / VS Code

**Qué dice la doc:**

- Repo GitHub / Copilot: `.github/copilot-instructions.md`; también `*.instructions.md` con `applyTo`. [Custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-repository-instructions).
- VS Code Copilot Chat: lo mismo **y** `AGENTS.md` si `chat.useAgentsMdFile`; `CLAUDE.md` si `chat.useClaudeMdFile`. [VS Code](https://code.visualstudio.com/docs/agent-customization/custom-instructions).
- Cloud agent: best practices también listan `AGENTS.md` / `CLAUDE.md` / `GEMINI.md`.

**Qué pegar:** si el equipo ya tiene `AGENTS.md`, en VS Code activá el setting y **no** copies el tratado a copilot-instructions. Si el flujo de GitHub.com no toma AGENTS, adaptador corto:

```markdown
<!-- .github/copilot-instructions.md -->

Seguí AGENTS.md en la raíz (mapa de carpetas, capas, no agrandar, no inventar datos).
Bug: solo el síntoma. Feature: HTTP en src/api/ o controller→service→repository.
No microservicios ni login extra. No commit sin que el humano lo pida.
```

Con `applyTo` (Copilot):

```markdown
---
applyTo: "frontend/**/*.tsx"
---

Sin fetch en el componente. Cliente en src/api/. No crear src/features/ sin pedido.
```

---

## 6. Continue — `.continue/rules`

**Qué dice la doc:** `.continue/rules/` ; **no** presenta AGENTS.md como nativo; no aplica a autocomplete. [Rules](https://docs.continue.dev/customize/deep-dives/rules).

**Qué pegar:** adaptá el portable (no asumas que lee AGENTS.md).

```markdown
<!-- .continue/rules/proyecto.md -->
---
alwaysApply: true
---

Mapa: frontend React (HTTP en src/api/) + api Spring (controller sin SQL).
Bug acotado; feature por capas; review no reescribe carpetas.
No inventar métricas ni agrandar el ticket.
```

```markdown
<!-- .continue/rules/frontend.md -->
---
globs: frontend/**
---

Prohibido URL hardcoded en JSX. Extender *Api.ts.
```

---

## 7. Cline y Roo

**Cline:** primario `.clinerules/`; también `AGENTS.md` y `~/.agents/AGENTS.md`. [Cline Rules](https://docs.cline.bot/customization/cline-rules).

**Roo:** preferido `.roo/rules/`; también `AGENTS.md` / `AGENT.md` (se puede desactivar con `roo-cline.useAgentRules`). [Custom Instructions](https://docs.roocode.com/features/custom-instructions).

**Qué pegar:** el portable en `AGENTS.md`. Extra Cline solo si hace falta glob:

```markdown
<!-- .clinerules/api.md -->
---
paths:
  - api/**
---

Controller → service → repository. DTO, no Entity. Un deploy.
```

Roo: el mismo texto en `.roo/rules/` si el equipo no quiere depender de AGENTS.md.

---

## 8. Aider

**Qué dice la doc (FAQ agents.md):** en `.aider.conf.yml`, `read: AGENTS.md`. Histórico: `CONVENTIONS.md`. [agents.md](https://agents.md/).

```yaml
# .aider.conf.yml
read: AGENTS.md
```

El mapa vive en el portable. No mantengas un `CONVENTIONS.md` paralelo con el mismo texto.

---

## 9. Gemini CLI — `GEMINI.md`

**Qué dice la doc:** default `GEMINI.md` (global `~/.gemini/`, proyecto, JIT). `context.fileName` puede ser `AGENTS.md`. [GEMINI.md](https://geminicli.com/docs/cli/gemini-md/).

**Opción A (adaptar):** `context.fileName` = `AGENTS.md` y no dupliques.

**Opción B:** archivo propio corto:

```markdown
# GEMINI.md

Leé y aplicá AGENTS.md de la raíz (mapa, capas, alcance).
Capturas: no crees src/pages-new/ ni un Vite paralelo.
No inventes cifras. HTTP solo en src/api/; Java: controller sin persistencia.
```

---

## 10. Amazon Q — `.amazonq/rules`

**Qué dice la doc:** Markdown en `.amazonq/rules/`. **No** pone AGENTS.md como primario. [Project rules](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/context-project-rules.html).

```markdown
<!-- .amazonq/rules/equipo.md -->

Seguí el mapa de AGENTS.md si está en la raíz.
React: sin fetch en componentes. Spring: controller → service → repository; un JAR.
Bug acotado. No microservicios. No inventar clientes ni métricas.
```

---

## 11. JetBrains, Zed, Goose (corto)

**JetBrains / Junie:** agentes leen `AGENTS.md`; Claude Agent `CLAUDE.md`. Junie: `.junie/AGENTS.md` o raíz + `.junie/playbook.md`. [Agent instructions](https://www.jetbrains.com/help/ai-assistant/configure-agent-behavior.html) · [Junie](https://junie.jetbrains.com/docs/guidelines-and-memory.html). Pegá el portable; no copies un segundo tratado en Project rules del IDE (no viajan igual en Git).

**Zed:** en el proyecto gana el **primer** match de una lista (`.rules`, `.cursorrules`, … `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`). [Instructions](https://zed.dev/docs/ai/instructions). Dejá `AGENTS.md` y **no** un `.cursorrules` viejo que lo tape.

**Goose:** default `CONTEXT_FILE_NAMES` = `.goosehints` y `AGENTS.md`. [Goosehints](https://goose-docs.ai/docs/guides/context-engineering/using-goosehints/). Con el portable alcanza; `.goosehints` solo para hints que no deban estar en Git de equipo, o una línea “seguí AGENTS.md”.

---

## Cómo no usarlo

- Un mega archivo “para todas las tools” de 400 líneas: cada modelo atiende peor.
- El mismo párrafo en AGENTS.md **y** un `.mdc` always-on (Cursor puede inyectar dos veces).
- Pegar estas instrucciones en el chat en vez de commitearlas: el compañero no las ve.
- Git y PRs: [capítulo equipo / Git en la guía](../guia-agentes-reglas-y-modelos.html#equipo).
