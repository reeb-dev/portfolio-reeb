# Endpoint Spring: controller → service → repository

**Para quién:** backends Java en consultora o producto. Se comparte al pedir un recurso REST nuevo, no como curso de Spring.

## Contexto

Servicio Spring Boot ya en marcha (un deploy, un `pom.xml` o Gradle). El ticket: `GET /api/shipments/{id}/events` — historial de eventos de un envío. Ya existen `Shipment`, `ShipmentRepository` y un `ShipmentController` con el GET del envío. Hay que agregar lectura, no un bounded context nuevo.

El equipo deja el controller delgado: request → service → repository → DTO. Tests: JUnit 5; slice web o test del service con Mockito, según lo que el módulo ya use.

## Qué falló sin MD / con modelo rápido

Sin mapa, Composer o Grok suelen:

- Meter `@Query` o `JdbcTemplate` en el controller “para ir más rápido”.
- Devolver `ShipmentEventEntity` en el JSON.
- Crear `ShipmentEventsApplication` (segundo Boot) o un módulo Maven nuevo.
- Skippear JUnit: “es un GET, se prueba a mano”.

Un modelo capaz sin reglas puede proponer hexagonal completo (puertos, adapters, mapstruct) en un servicio que hoy es controller + `@Service` + JPA. Eso no es el ticket.

## Qué poner en AGENTS.md

Bloque para la raíz de un servicio Spring Boot. Adaptá paquetes al disco.

```markdown
# AGENTS.md — API Spring Boot

## Mapa (este repo)

- `...web` / `...controller` — HTTP, validación de forma, mapeo DTO.
- `...service` — orquestación y reglas que el equipo ya pone aquí.
- `...repository` — Spring Data / JPA. Nadie más habla con la base.
- `...dto` — request/response. No se expone `*Entity` en REST.
- Tests: `src/test/java` (JUnit 5). Comando: `./mvnw test` (o `./gradlew test`).

No hay segundo `*-service` ni `docker-compose` de microservicios en este ticket.

## Endpoint nuevo

1. Controller: recibe path/query, llama al service, devuelve DTO o 404 acordado.
2. Service: carga el agregado/entidad vía repository; arma el DTO.
3. Repository: método nuevo solo si no alcanza el existente.
4. No EntityManager ni SQL en el controller.

## Tests

- Al menos un test del service (Mockito del repository) o un `@WebMvcTest`
  del controller, según el patrón que ya esté en el módulo.
- No `@SpringBootTest` de contexto completo para un GET de lectura si el
  equipo no lo usa en endpoints equivalentes.

## Prohibido en este ticket

- Extraer microservicio, Kafka, o un módulo Maven nuevo.
- Cambiar seguridad/auth salvo que el ticket lo nombre.
- Commit / push sin pedido explícito.
```

## Modelo sugerido

**Implementar el endpoint:** Composer, Grok o Sonnet, chat nuevo, ticket de un recurso.

**Si el agente propone un módulo nuevo o hexagonal:** parar. Review con **Opus o GPT-5.x**: “según AGENTS.md, ¿el GET entra en el controller existente?”.

Haiku/Flash: solo si el método del repository ya existe y falta una línea en el controller — raro en un endpoint nuevo.

## Cómo verificar (DoD)

- `GET /api/shipments/{id}/events` responde DTO, no entidad JPA.
- Tres tipos: controller, service, repository (o query en el repo existente). El controller no tiene SQL.
- Hay JUnit del camino feliz y del “envío no existe” si ese 404 ya es convención.
- `./mvnw test` (o Gradle) en el módulo; sin segundo Spring Boot.
