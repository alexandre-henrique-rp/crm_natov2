import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const File = await request.formData();

    if (!File)
      throw {
        message:
          "Arquivo não informado, por favor entre em contato com o Suporte",
      };
    const url = `${process.env.FILE_DNS_PUBLIC_STRAPI_API_URL}/upload`;
    console.log("🚀 ~ POST ~ url:", url);
    const Envio = await fetch(url, {
      method: "POST",
      body: File,
      cache: "no-store",
    });

    if (!Envio.ok) {
      const data = await Envio.text();
      console.log("🚀 ~ POST ~ data:", data);
      throw {
        message:
          "Erro ao enviar o arquivo, por favor entre em contato com o Suporte",
      };
    }
    const retornoArquivo = await Envio.json();

    return NextResponse.json(
      { data: retornoArquivo, message: "Arquivo enviado com sucesso" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(error.message, { status: error.status || 500 });
  }
}
