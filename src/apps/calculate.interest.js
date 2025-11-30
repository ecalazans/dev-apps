function formatDataBR(data) {
  return data.toLocaleDateString("pt-BR");
}

function calcularJuros(valor, vencimento) {
  let dataHoje = new Date();
  let dataVencimento = new Date(vencimento);

  const diasAtrasoMiliseg = dataHoje - dataVencimento;
  const diasAtraso = Math.floor(diasAtrasoMiliseg / (1000 * 60 * 60 * 24));

  if (diasAtraso > 0) {
    const juros = valor * 0.025 * diasAtraso;
    const valorFinal = juros + valor;

    return {
      dataHoje: formatDataBR(dataHoje),
      valorOriginal: valor,
      diasAtraso: diasAtraso,
      juros,
      valorFinal,
    };
  }
}

console.log(calcularJuros(100, "2025-11-15"));
