// Estadísticas de Balancio
// -------------------------------------------------------------
// Cada vez que publiques un artículo nuevo, añade un objeto más
// a esta lista con lo que cubre ese artículo. Los 4 números del
// bloque "Este mes en el balance" (en index.html) se calculan
// solos sumando estos datos — no hace falta tocar el HTML.
// -------------------------------------------------------------

window.BALANCIO_STATS = [
  {
    articulo: "5 apps gratuitas para controlar tus gastos como autónomo",
    apps: 5,                 // Fintonic, Holded, Google Sheets, Declarando, Money Manager
    neobancos: 0,
    comisionesOcultas: 3,
    recomendacionesPago: 2
  },
  {
    articulo: "Neobancos en 2026: comparativa honesta",
    apps: 1,                 // MyInvestor
    neobancos: 3,             // N26, Revolut, Qonto
    comisionesOcultas: 4,
    recomendacionesPago: 3
  },
  {
    articulo: "Invertir sin saber de bolsa: 4 apps para empezar",
    apps: 4,                 // MyInvestor, Indexa Capital, Trade Republic, bróker
    neobancos: 0,
    comisionesOcultas: 2,
    recomendacionesPago: 2
  }

  // 👇 Copia este bloque y pégalo aquí arriba cuando publiques un artículo nuevo:
  // ,{
  //   articulo: "Título del nuevo artículo",
  //   apps: 0,
  //   neobancos: 0,
  //   comisionesOcultas: 0,
  //   recomendacionesPago: 0
  // }
];
