import { GetConstrutoraById } from "@/actions/construtora/service/getConstrutoraById";
import ApiCpnjJson from "@/actions/getInfo/api/apicnpj";
import { PostRelatorio } from "@/actions/relatorio_financeiro/service/postRelatorio";
import { createForm } from "@/lib/pdf";
import { NextRequest, NextResponse } from "next/server";

type DataBody = {
  solicitacao: any[];
  nota_fiscal: string;
  situacao_pg: number;
  construtora: number;
  protocolo: string;
  Inicio: string;
  Fim: string;
};

type DataConstrutora = {
  error: boolean;
  message: string;
  data: {
    cnpj: string;
    tel: string;
    email: string;
    fantasia: string;
    razaosocial: string;
    id: number;
    valor_cert: number;
  };
};

export async function POST(req: NextRequest) {
  const data: DataBody = await req.json();
  const {
    solicitacao,
    situacao_pg,
    construtora,
    protocolo,
    nota_fiscal,
    Inicio,
    Fim
  } = data;

  let GetProtocolo = "";
  if (!protocolo) {
   
    const solicitacaoIds = solicitacao.map((s) => s.id);
    const postData = await PostRelatorio({
      situacao_pg,
      nota_fiscal,
      solicitacaoIds,
      construtora,
      Inicio,
      Fim
    });
    GetProtocolo = postData.data.protocolo;
  }
  const NumberProtocolo = protocolo ? protocolo : GetProtocolo;

  const construtoraInfo: DataConstrutora = await GetConstrutoraById(
    construtora
  );

  const ConsultaDadosCnpj = await ApiCpnjJson(construtoraInfo.data.cnpj);

  let DadosCnpj;
  if (ConsultaDadosCnpj.error) {
    // return NextResponse.json(DadosCnpj, { status: 200 });
  } else {
    DadosCnpj = ConsultaDadosCnpj;
  }

  //dados da construtora para pdf
  const DadosConst = {
    nome: DadosCnpj?.data.razao_social,
    telefone: construtoraInfo?.data.tel
      ?.replace(/[^0-9]/g, "")
      .replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4"),
    email: construtoraInfo?.data.email,
    cnpj: construtoraInfo?.data.cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    ),
    end: `${DadosCnpj?.data.descricao_tipo_de_logradouro} ${
      DadosCnpj?.data.logradouro
    }, ${DadosCnpj?.data.numero}, ${DadosCnpj?.data.complemento}, ${
      DadosCnpj?.data.bairro
    }, ${DadosCnpj?.data.municipio} - ${
      DadosCnpj?.data.uf
    }, ${DadosCnpj?.data.cep?.replace(/(\d{5})(\d{3})/, "$1-$2")}`
  };

  const ValorCert = construtoraInfo?.data.valor_cert
    ? construtoraInfo?.data.valor_cert
    : 0;
  const ValorTotal = ValorCert ? solicitacao.length * ValorCert : 0;
  const ValorCertFormatado = ValorCert.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  const ValorTotalFormatado = ValorTotal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  const msg = `Certificados emitidos pelo "AR Interface certificador" no período de ${Inicio.split(
    "-"
  )
    .reverse()
    .join("/")} a ${Fim.split("-")
    .reverse()
    .join(
      "/"
    )}, com o valor total de ${ValorCertFormatado} cada certificado, com validade de 1 ano.`;

  const pdf = await createForm(
    DadosConst,
    ValorTotalFormatado,
    solicitacao.length,
    msg,
    NumberProtocolo
  );

  const pdfName = `relatorio_cobranca_${construtoraInfo?.data.fantasia}_${Inicio.split(
    "-"
  )
    .reverse()
    .join("_")}_${Fim.split("-").reverse().join("_")}.pdf`;

  //csv

  // Função para separar os objetos por id do empreendimento
  const separarPorEmpreendimentoId = () => {
    return solicitacao.reduce(
      (acc: Record<number, { nome: string; itens: any[] }>, total: any) => {
        const empreendimentoId = total.empreendimento.id;
        if (!acc[empreendimentoId]) {
          acc[empreendimentoId] = {
            nome: total.empreendimento.nome,
            itens: []
          };
        }
        acc[empreendimentoId].itens.push(total);
        return acc;
      },
      {}
    );
  };
  
  const formataCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };
  
  const formataData = (data: string) => {
    return data.split('T')[0].split('-').reverse().join('/');
  };
    const dadosSeparados = separarPorEmpreendimentoId();
    let csvContent = '\uFEFF';
    csvContent += `${construtoraInfo?.data.fantasia}; ${Inicio.split('-').reverse().join('-')} - ${Fim.split('-').reverse().join('-')};;\n;;;\n`;
  
    for (const [empreendimento, dados] of Object.entries(dadosSeparados) as any) {
      csvContent += `${empreendimento.nome};;;\n;;;\n`;
      csvContent += `x;Id;Nome;CPF;DtAprovacao;CCA;Cidade;Solicitante;Certificado;Validação;Valor\n`;
  
      dados.itens.forEach((item: any, index: number) => {
        const linha = [
          index + 1,
          item.id,
          item.nome,
          formataCPF(item.cpf),
          formataData(item.dt_aprovacao),
          item.financeiro?.fantasia,
          item.empreendimento?.cidade,
          item.corretor?.nome,
          'A3PF - Nuvem',
          item.type_validacao === 'VIDEO CONF' ? 'VIDEO' : 'INTERNA',
          ValorCertFormatado
        ].join(';');
        csvContent += linha + '\n';
      });
  
      csvContent += `;;;;;\n;;;;;;\n`;
    }
  const csvName = `relatorio_cobranca_${construtoraInfo?.data.fantasia}_${Inicio.split(
    "-"
  )
    .reverse()
    .join("_")}_${Fim.split("-").reverse().join("_")}.csv`;

  return NextResponse.json({ pdf, pdfName, csvContent, csvName }, { status: 200 });
}
