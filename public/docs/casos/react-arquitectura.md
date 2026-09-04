# El agente reescribe carpetas o mete fetch en cualquier componente

**Para quién:** leads frontend y quien revisa PRs. Se comparte cuando un agente “ordenó” el `src/` sin que nadie lo pidiera.

## Contexto

Repo React + Vite estable: `src/pages/`, `src/components/`, `src/api/`, `src/hooks/`. El ticket era acotar un badge de stock en `ProductCard`. El agente, con un modelo rápido y sin mapa, movió archivos a `src/features/catalog/`, creó `src/services/http.ts` y dejó un `fetch` dentro de `ProductCard.tsx` “para no cruzar tantas carpetas”.

Eso no es un refactor pedido: es un cambio de arquitectura disfrazado de UI. El review no puede validar el badge sin validar el árbol entero. Los imports rotos aparecen en CI dos PRs más tarde.

## Qué falló sin MD / con modelo rápido

Composer y Grok priorizan un diff que “compile en caliente”. Sin regla, el árbol del disco no es sagrado: `features/` “se ve más limpio”, el fetch en el componente “es más directo”. Haiku/Flash ni siquiera argumentan: copian el patrón del archivo abierto (si ese archivo ya tenía un atajo, lo multiplican).

Opus o GPT, en el mismo chat que ya movió carpetas, suelen **seguir** el árbol nuevo: el hilo ya “decidió”. La corrección es chat nuevo + regla explícita, no discutir en el mismo hilo.

## Qué poner en AGENTS.md

```markdown
# Estructura de carpetas (no reescribir)

El mapa de este front es el del disco:

- `src/pages/` — pantallas
- `src/components/` — UI
- `src/api/` — HTTP
- `src/hooks/` — orquestación de UI

Prohibido en un ticket de UI o de bug:

- Crear `src/features/`, `src/modules/`, `src/screens/`, `src/services/`
  u otro árbol “más limpio”.
- Mover archivos de carpeta salvo que el ticket sea una migración nombrada.
- `fetch`, axios o el wrapper HTTP dentro de `src/components/` o `src/pages/`.
  HTTP solo en `src/api/`.
- Instalar Next, Remix, un store global o un router nuevo.

Si el árbol actual es incómodo: una frase en el chat (“¿migrar a features/?”)
y esperar. No migrar “de paso”.

Al revisar un PR: si aparecen carpetas nuevas o un `fetch(` fuera de `src/api/`,
el PR no entra. Volvé el árbol; después el badge.
```

Review (no mezclar con el chat de implementación):

```markdown
# Review de arquitectura (prompt + regla)

Antes de aprobar:

1. ¿El árbol `src/` es el mismo que en main, salvo archivos nuevos *dentro*
   de carpetas ya existentes?
2. ¿Hay `fetch` / axios en componentes o pages? Si sí: rechazar.
3. No proponé un rediseño en el mismo comentario. Si el mapa debe cambiar,
   es un ticket aparte y un cambio de AGENTS.md acordado.
```

## Modelo sugerido

| Rol | Modelo | Por qué |
| --- | --- | --- |
| Implementar el badge | Composer / Grok / Sonnet | Diff chico si el MD clava el árbol |
| “¿Este PR rompe el mapa?” | **Opus** o GPT-5.x | Leen el MD y listan violaciones; no reescriben si se lo prohibís |
| Captura del badge | Gemini Pro | Imagen; no para mover carpetas |
| Auto | No | Suele elegir rápido y “ordenar” src/ |
| Haiku / Flash | No, salvo un typo | Trivial; no ven el mapa |

No uses Opus para escribir el parche del badge. Usalo para el review, en **otro** chat, Ask o Agent con “no editar, solo listar”.

## Cómo verificar (DoD)

- `git diff --stat` no muestra un rename masivo ni carpetas nuevas bajo `src/`.
- `ProductCard` (o el componente del ticket) no contiene `fetch` ni URL.
- El badge se ve; el review dura minutos, no una migración.
- Si el agente ya reescribió: revert del árbol primero; el badge en un segundo chat.
