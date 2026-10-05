<script>
  import logo from '../assets/logo-newtral-favicon.png';

  const { persona, onOpen } = $props();

  let propertiesCount = $derived(Number(persona.propiedades) || 0);
  let imagesToShow = $derived(Math.min(propertiesCount, 5));
  let hasMoreProperties = $derived(propertiesCount > 5);
  let carsCount = $derived(Number(persona.coches) || 0);

  function handleOpen(event) {
    const x = event.clientX || window.innerWidth / 2;
    const y = event.clientY || window.innerHeight / 2;
    onOpen({ persona, x, y });
  }
</script>

<div class="card">
  <div class="author">
    <img src={persona.imagen} alt={persona.nombre} />
    <div>
      <span class="author-name">{persona.nombre}</span>
      <div class="author-details">
        <p>{persona.partido}</p>
        <p>
          <a href={persona.enlace} target="_blank" rel="noreferrer"
            >Declaración de bienes: {persona.fecha}</a
          >
        </p>
      </div>
    </div>
  </div>

  <div class="info-item">
    <p><span class="underline">Ingresos (total)</span></p>
    <div class="valor">
      <span class="stat-hero">{persona.totales ? persona.totales : '-'} €</span>
    </div>
  </div>

  <a class="card-brand" href="https://www.newtral.es" target="_blank" rel="noreferrer">
    <img class="card-logo" src={logo} alt="" />
    <span>Newtral.es</span>
  </a>

  <div class="info-item">
    <p><span class="underline">Propiedades (parcial o total)</span></p>
    <div class="image-container valor">
      {#if propertiesCount > 0}
        {#each { length: imagesToShow } as _}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Home_icon_black.png"
            alt="Icono Bienes"
          />
        {/each}
        {#if hasMoreProperties}
          <span class="extra">Total: {propertiesCount}</span>
        {/if}
      {:else}
        <span>-</span>
      {/if}
    </div>
  </div>

  <div class="info-item">
    <p><span class="underline">Vehículos</span></p>
    <div class="image-container valor">
      {#if carsCount > 0}
        {#each { length: carsCount } as _}
          <img
            src="https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Car_-_The_Noun_Project.svg/960px-Car_-_The_Noun_Project.svg.png"
            alt="Icono Vehículo"
          />
        {/each}
      {:else}
        <span>-</span>
      {/if}
    </div>
  </div>

  <div class="footer">
    <span
      class="tag open-modal"
      role="button"
      tabindex="0"
      onclick={handleOpen}
      onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpen(e)}
      >+</span
    >
  </div>
</div>
