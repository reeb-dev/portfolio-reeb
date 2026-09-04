# El controller Spring no habla con la base

**Para quién:** quien revisa PRs de API y quien escribe el `AGENTS.md` del servicio. Caso de arquitectura, no de “aprender REST”.

## Contexto

Monolito o modular monolith Spring. Los controllers del módulo de facturación llaman a `InvoiceService`; el service usa `InvoiceRepository`. Un ticket pide filtrar facturas por estado. El camino correcto es un método en el service (y si hace falta, en el repository). El camino corto —el que el agente toma cuando tiene prisa— es inyectar el repository en el controller.

Eso rompe el cauce: Presentation habla con Infrastructure. El siguiente ticket copia el atajo. En seis meses nadie sabe dónde vive la regla “una factura pagada no se anula”.

## Qué falló sin MD / con modelo rápido

Síntoma típico en review:

```java
@RestController
@RequestMapping("/api/invoices")
class InvoiceController {
  private final InvoiceRepository invoices; // atajo

  @GetMapping
  List<Invoice> list(@RequestParam String status) {
    return invoices.findByStatus(status); // entidad + persistencia en HTTP
  }
}
```

Composer y Grok lo hacen porque el diff es de un archivo. Haiku/Flash, igual. Opus y GPT, sin regla explícita, a veces lo marcan y a veces lo dejan “porque es un GET”. El MD tiene que decir **controller no habla con repository**, no “preferí capas”.

## Qué poner en AGENTS.md

```markdown
# Capas HTTP ↔ persistencia (este servicio)

Quién habla con quién:

- Controller → Service (o use case). Nunca → Repository, EntityManager, JdbcTemplate.
- Service → Repository (interfaces Spring Data). Nunca → HttpServletRequest.
- Repository → base. Sin reglas de negocio de anulación/pagos.

Si un ticket “solo lista”, igual pasa por el service existente (o uno nuevo
en el mismo paquete). Un GET no es permiso para saltar la capa.

Al detectar repository (o EntityManager) en un @RestController:

1. No “dejarlo porque es más simple”.
2. Mover la consulta al service; el controller solo mapea HTTP ↔ DTO.
3. No devolver *Entity. DTO o proyección que el módulo ya use.

Si el cambio exige romper esta regla: parar y preguntar. No silenciarlo.
```

Regla anidada opcional (`api/AGENTS.md` o glob `**/*Controller.java` en Cursor): una línea — “grep mental: no `Repository` ni `JpaRepository` como campo del controller”.

## Modelo sugerido

**Detectar la violación (review):** Opus o GPT-5.x. Prompt: “según AGENTS.md, ¿algún controller toca persistencia? Listá archivos sí/no”. Composer no es el revisor: genera el atajo y no lo ve.

**Corregir el atajo (implementar):** Composer o Sonnet, con el MD ya actualizado, chat **nuevo** (el hilo que metió el repository no se “convence” bien; ver [CLAUDE.md](https://code.claude.com/docs/en/claude-md): las reglas no se releen solas cada turno).

Auto: no. Suele elegir el modelo rápido y repetir el atajo.

## Cómo verificar (DoD)

- Ningún `@RestController` del módulo tiene un campo `*Repository`, `EntityManager` o `JdbcTemplate`.
- El GET de facturas por estado pasa por service; la respuesta es DTO.
- Test del service (o WebMvcTest del controller mockeando el service), no un test que levante JPA “porque el controller ahora es el repo”.
- Si el agente lo había metido: el revert del atajo está en el mismo PR, no “después”.
