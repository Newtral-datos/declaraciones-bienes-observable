// Posiciona un elemento `position: fixed` centrado en el punto de clic (x, y),
// recolocándolo si se saldría de la ventana — igual que el modal del notebook original.
export function positionNearClick(node, { x, y }) {
  function update(x, y) {
    const rect = node.getBoundingClientRect();
    let posX = x - rect.width / 2;
    let posY = y - rect.height / 2;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (posX + rect.width > viewportWidth) posX = viewportWidth - rect.width - 20;
    if (posX < 20) posX = 20;

    if (posY + rect.height > viewportHeight) posY = viewportHeight - rect.height - 20;
    if (posY < 20) posY = 20;

    node.style.left = `${posX}px`;
    node.style.top = `${posY}px`;
  }

  update(x, y);

  return {
    update({ x, y }) {
      update(x, y);
    },
  };
}
