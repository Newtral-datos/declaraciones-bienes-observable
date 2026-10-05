<script>
  import { fetchDeclaraciones, parseEuro } from './lib/data.js';
  import { normalizeText } from './lib/normalizeText.js';
  import { positionNearClick } from './lib/positionNearClick.js';
  import Card from './lib/Card.svelte';
  import DeclaracionDetalle from './lib/DeclaracionDetalle.svelte';

  let data = $state([]);
  let loading = $state(true);
  let error = $state(null);

  let searchTerm = $state('');
  let sortKey = $state(null); // 'incomeDesc' | 'incomeAsc' | 'propsDesc' | 'propsAsc'
  let modal = $state(null); // { persona, x, y }

  fetchDeclaraciones()
    .then((rows) => (data = rows))
    .catch((e) => (error = e))
    .finally(() => (loading = false));

  let filteredData = $derived(
    data.filter((p) =>
      normalizeText((p.nombre ?? '').toUpperCase()).includes(
        normalizeText(searchTerm.toUpperCase())
      )
    )
  );

  let sortedData = $derived.by(() => {
    const arr = [...filteredData];
    if (sortKey === 'incomeDesc') arr.sort((a, b) => parseEuro(b.totales) - parseEuro(a.totales));
    else if (sortKey === 'incomeAsc')
      arr.sort((a, b) => parseEuro(a.totales) - parseEuro(b.totales));
    else if (sortKey === 'propsDesc')
      arr.sort((a, b) => (Number(b.propiedades) || 0) - (Number(a.propiedades) || 0));
    else if (sortKey === 'propsAsc')
      arr.sort((a, b) => (Number(a.propiedades) || 0) - (Number(b.propiedades) || 0));
    return arr;
  });

  function openModal(detail) {
    modal = detail;
  }

  function closeModal() {
    modal = null;
  }

  function handleWindowClick(event) {
    if (!modal) return;
    if (!event.target.closest('.modal-content') && !event.target.closest('.open-modal')) {
      modal = null;
    }
  }
</script>

<svelte:window onclick={handleWindowClick} />

<div class="container">
  <header class="brand">
    <img src="/logo-newtral-favicon.png" alt="" width="30" height="30" />
    <span class="brand-name">NewtralData</span>
  </header>

  <div class="search-bar">
    <input type="text" placeholder="Buscar por nombre..." bind:value={searchTerm} />
  </div>

  <div class="filter-bar">
    <button onclick={() => (sortKey = 'incomeDesc')}>Ingresos ⬇</button>
    <button onclick={() => (sortKey = 'incomeAsc')}>Ingresos ⬆</button>
    <button onclick={() => (sortKey = 'propsDesc')}>Propiedades ⬇</button>
    <button onclick={() => (sortKey = 'propsAsc')}>Propiedades ⬆</button>
  </div>

  {#if loading}
    <p class="status">Cargando declaraciones…</p>
  {:else if error}
    <p class="status">No se han podido cargar los datos.</p>
  {:else}
    <div class="card-container">
      {#each sortedData as persona (persona.nombre)}
        <Card {persona} onOpen={openModal} />
      {/each}
    </div>
  {/if}
</div>

{#if modal}
  <div class="modal">
    <div class="modal-content" use:positionNearClick={{ x: modal.x, y: modal.y }}>
      <span
        class="close-modal"
        role="button"
        tabindex="0"
        onclick={closeModal}
        onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && closeModal()}
        >&times;</span
      >
      <DeclaracionDetalle persona={modal.persona} />
    </div>
  </div>
{/if}
