# Cambio seguro en un monolito Spring (no “pasamos a microservicios”)

**Para quién:** equipos con un Spring Boot grande y tickets de mantenimiento. Se comparte cuando el agente propone un servicio nuevo sin que el backlog lo pida.

## Contexto

Aplicación de facturación: un JAR, un esquema, paquetes `invoice`, `customer`, `mail`. El ticket: agregar `notes` (texto corto) al DTO de factura y persistirlo en la tabla que ya existe. Cambio de un campo. El código legacy mezcla un poco las capas; el equipo lo sabe y no está en una migración a microservicios.

Sin regla, el agente lee “facturación” y diseña `invoice-service`, `customer-service`, Kafka y tres `application.yml`. El campo `notes` nunca llega.

## Qué falló sin MD / con modelo rápido

Composer/Grok: extraen un módulo Maven o un segundo `@SpringBootApplication` “para no ensuciar”. Haiku no diseña microservicios, pero tampoco respeta el paquete: pone el campo en un sitio y olvida el mapper.

Opus y GPT, **si el prompt dice “mejorá la arquitectura”**, proponen el split con diagramas convincentes. El fallo no es solo el modelo rápido: es el pedido vago + un MD que no dice “un deploy”.

El “no hacer” tiene que estar escrito. “Preferimos monolito” es débil; “no crear un segundo proceso Spring” es operable.

## Qué poner en AGENTS.md

```markdown
# Este repo es un monolito (un deploy)

- Un Spring Boot. Un artefacto. No extraer microservicio, sidecar ni
  “invoice-service” en este ticket ni en el siguiente salvo decisión
  explícita del equipo (otro PR, otro ADRs).
- Un campo nuevo va en el paquete que ya posee esa entidad (p. ej. invoice):
  entidad o columna, DTO, mapper si existe, API que ya expone la factura.
- No introducir Kafka, Rabbit, gRPC, ni un docker-compose de cuatro
  servicios para persistir un string.
- El código legacy se toca lo mínimo: mismo estilo que los vecinos del
  paquete. No “hexagonalizar” el módulo de paso.
- No crear `*-application` ni `modules/invoice-api` nuevos.

## No hacer (lista corta)

- No split de bounded contexts.
- No segundo `pom.xml` / `build.gradle` de aplicación.
- No cambiar el paquete base (`com.empresa.billing`) “para que quede DDD”.
- No reescribir `InvoiceService` en use cases de una clase por método
  si el módulo hoy es un @Service.
- No migrar JPA a JDBC o al revés por gusto.
- No commit/push; no toques prod.

Si creés que el monolito no aguanta el cambio: una frase y esperar.
No implementes el plan B.
```

## Modelo sugerido

**Implementar el campo:** Composer o Sonnet. Ticket literal: “campo `notes` en factura; mismos archivos que `dueDate`”.

**Si el agente ya armó el split:** no seguir en ese chat. Opus o GPT en chat nuevo, Ask: “revertí el alcance al campo; listá archivos de main que hay que tocar”. Auto: no (elige rápido y “aprovecha” para extraer).

Modelos abiertos/locales: un rename de DTO, no el diseño del sistema.

## Cómo verificar (DoD)

- Diff: entidad/columna (o campo ya mapeado), DTO, mapper si existía, test del DTO o del service. Sin nuevo módulo de aplicación.
- La factura se lee y se persiste con `notes`; el resto de endpoints no cambia de contrato salvo el campo extra (aditivo).
- No hay `docker-compose` nuevo ni `*Application.java` extra.
- JUnit del módulo verde en lo tocado.
