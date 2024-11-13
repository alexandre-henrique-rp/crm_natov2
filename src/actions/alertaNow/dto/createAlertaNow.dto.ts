export class CreateAlertaNowDto {
  docRG: any;
  docCNH: any;

  constructor(data: any) {
    this.docRG = data.docRG;
    this.docCNH = data.docCNH;
  }

  validar(): string | null {
    if (this.docRG === '' && this.docCNH === '') {
      return 'Os documentos RG ou CNH são obrigatórios';
    }
    return null;
  }
}
