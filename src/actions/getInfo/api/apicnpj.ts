"use server";

export default async function ApiCpnjJson(cnpj: string) {
  // console.log("🚀 ~ ApiCpnjJson ~ cnpj:", cnpj)
  try {
    if (!cnpj) {
      return { error: true, message: "CNPJ obrigatório", data: null };
    }
    const response = await fetch(
      // `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`
      `https://brasilapi.com.br/api/cnpj/v1/34193637000163`
    );
    const data = await response.json();
    console.log("🚀 ~ ApiCpnjJson ~ data:", data)

    if (data && !data.error) {
      return {
        error: false,
        message: "CNPJ encontrado",
        data: data
      };
    }

    return { error: true, message: "CNPJ não encontrado", data: null };
  } catch (error) {
    return {
      error: true,
      message: "Erro ao buscar dados do CNPJ",
      data: error
    };
  }
}
