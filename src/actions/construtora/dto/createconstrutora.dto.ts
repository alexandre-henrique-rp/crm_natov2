export class CreateConstrutoraDto {
    cnpj: string;
    razaoSocial: string;
    tel: string | null;
    email: string | null;
    fantasia: string;

    /**
     * Constructs a new instance of the CreateConstrutoraDto class.
     * 
     * @param id - The unique identifier for the construtora.
     * @param cnpj - The CNPJ (Cadastro Nacional da Pessoa Jurídica) of the construtora.
     * @param razaoSocial - The legal name of the construtora.
     * @param tel - The telephone number of the construtora, which can be null.
     * @param email - The email address of the construtora, which can be null.
     * @param fantasia - The trade name (fantasia) of the construtora.
     */
    constructor(cnpj: string, razaoSocial: string, tel: string | null, email: string | null, fantasia: string) {
        this.cnpj = cnpj;
        this.razaoSocial = razaoSocial;
        this.tel = tel;
        this.email = email;
        this.fantasia = fantasia;
    }

    validar(): string | null {


        if (!this.cnpj || this.cnpj.length < 14) {
            return "CNPJ é obrigatório";
        }  
        if (!this.razaoSocial) {
            return "Razão Social é obrigatória";
        }  
        if (!this.fantasia) {
            return "Nome Fantasia é obrigatório";
        } 
        if (!this.tel){
            return "Telefone é obrigatório";
        }
        if (!this.email || !this.email.includes("@")){
            return "Email é obrigatório";
        }
        if(this.fantasia.length < 3){
            return "Nome Fantasia deve ter no mínimo 3 caracteres";
        }


            return null;
        
    }


}