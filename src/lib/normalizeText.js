export function normalizeText(text) {
  return (text ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '');
}
