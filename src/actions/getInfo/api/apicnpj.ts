"use server";

export default async function ApiCpnjJson(cnpj: string) {
  try {
    const response = await fetch(
      `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`
    );
    const data = await response.json();

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
