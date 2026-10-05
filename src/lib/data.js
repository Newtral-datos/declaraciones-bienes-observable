import { csvParse } from 'd3-dsv';

const CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTEj9D0sZtG7dtLHtcqxaEQAZjqwGL3TnUQLhxRBlAMzZYv6JGwxANwN9aAP6h7VayloP5EsG3Wi9er/pub?output=csv';

export async function fetchDeclaraciones() {
  const res = await fetch(CSV_URL);
  if (!res.ok) throw new Error(`No se pudo cargar el CSV (${res.status})`);
  const text = await res.text();

  return csvParse(text).map((d) => ({
    nombre: d.Nombre,
    lugar: d.Lugar,
    partido: d.Partido,
    fecha: d.Fecha,
    sueldo: d.Sueldo,
    ingresos: d.Ingresos,
    totales: d.Total,
    propiedades: d.Propiedades,
    propiedades_porcentaje: d.Propiedades_porcentaje,
    coches: d.Coches,
    coches_porcentaje: d.Coches_porcentaje,
    otros_vehiculos: d.Otros_vehiculos,
    ciudad: d.Lugar,
    imagen: d.Imagen,
    deposito: d.Depositos,
    deposito_porcentaje: d.Deposito_porcentaje,
    depositos_otros: d.Depositos_otros,
    prestamos_total: d.Prestamos_total,
    deudas: d.Prestamos_deudas,
    deudas_porcentaje: d.Deudas_porcentaje,
    prestamos_numero: d.Prestamos_numero,
    acciones_empresas: d.Acciones_empresas,
    acciones_importe: d.Acciones_importe,
    enlace: d.Enlace,
    propiedades_letra: d.Propiedades_letra,
    prestamos_letra: d.Prestamos_letra,
    coches_letra: d.Coches_letra,
    otros_vehiculos_letra: d.Otros_vehiculos_letra,
    extra: d.Extra,
  }));
}

export function parseEuro(value) {
  if (!value) return 0;
  return parseFloat(String(value).replace(/\./g, '').replace(',', '.')) || 0;
}
