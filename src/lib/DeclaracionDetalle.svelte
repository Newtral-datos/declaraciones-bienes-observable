<script>
  const { persona } = $props();
</script>

<p class="modal-name"><strong>{persona.nombre}</strong></p>
<p class="modal-subtitle">
  <strong>Diputado/a por {persona.ciudad} ({persona.partido})</strong>
</p>

<!-- Propiedades -->
<p class="modal-line">
  {#if Number(persona.propiedades) === 0}
    No ha declarado propiedades.
  {:else}
    Declara la propiedad total o parcial de locales, fincas, viviendas, trasteros y plazas de
    garaje de <span class="underline-thick"><strong>{persona.propiedades_letra}</strong></span>
    bienes inmuebles. {persona.propiedades_porcentaje}
  {/if}
</p>

<!-- Ingresos -->
<p class="modal-line">
  Sus ingresos totales (<strong><span class="underline-thick">{persona.totales} €</span></strong
  >) se componen de:
</p>
<p class="modal-line indent">
  • Sueldo del Congreso de los Diputados:
  <span class="underline-thick"><strong>{persona.sueldo} €</strong></span>.
</p>
<p class="modal-line indent">
  • Otros ingresos: <span class="underline-thick"><strong>{persona.ingresos} €</strong></span>.
</p>

<p class="modal-line">
  Depositado en el banco: <span class="underline-thick"><strong>{persona.deposito} €</strong></span
  >. {persona.deposito_porcentaje}
</p>

<!-- Depósitos otros -->
<p class="modal-line">
  {#if persona.depositos_otros === '0,00' || Number(persona.depositos_otros) === 0}
    No tiene otro tipo de depósitos.
  {:else}
    Declara <span class="underline-thick"><strong>{persona.depositos_otros} €</strong></span>
    en fondos de inversión, planes de pensiones u otro tipo de depósitos.
  {/if}
</p>

<!-- Préstamos -->
<p class="modal-line">
  {#if persona.prestamos_total === '0,00' || Number(persona.prestamos_total) === 0}
    No tiene deudas pendientes.
  {:else}
    Tiene {persona.prestamos_letra} préstamos con un valor de {persona.prestamos_total} € y una
    deuda pendiente de <span class="underline-thick"><strong>{persona.deudas} €</strong></span>.
    {persona.deudas_porcentaje}
  {/if}
</p>

<!-- Vehículos -->
<p class="modal-line">
  {#if Number(persona.coches) === 0 && Number(persona.otros_vehiculos) === 0}
    No ha declarado vehículos.
  {:else if Number(persona.coches) !== 0 && Number(persona.otros_vehiculos) === 0}
    Declara {persona.coches_letra} {Number(persona.coches) === 1 ? 'coche' : 'coches'} y ningún
    vehículo de otro tipo.
  {:else if Number(persona.coches) === 0 && Number(persona.otros_vehiculos) !== 0}
    Declara cero coches y {persona.otros_vehiculos_letra} {Number(persona.otros_vehiculos) === 1
      ? 'vehículo'
      : 'vehículos'} de otro tipo.
  {:else}
    Declara <span class="underline-thick"><strong>{persona.coches_letra}</strong></span>
    {Number(persona.coches) === 1 ? 'coche' : 'coches'} y {persona.otros_vehiculos_letra}
    {Number(persona.otros_vehiculos) === 1 ? 'vehículo' : 'vehículo/s'} de otro tipo.
  {/if}
</p>

<!-- Acciones -->
<p class="modal-line">
  {#if persona.acciones_importe === '0,00' || Number(persona.acciones_importe) === 0}
    No tiene acciones.
  {:else}
    Posee <span class="underline-thick"><strong>{persona.acciones_importe} €</strong></span>
    en acciones.
  {/if}
</p>

{#if persona.extra}
  <p class="modal-line">{persona.extra}</p>
{/if}
