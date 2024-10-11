export class UpdateConstrutoraDto {
    razaosocial: string;
    tel: string;
    email: string;
    fantasia: string;

    constructor(razaosocial: string, tel: string, email: string, fantasia: string) {
        this.razaosocial = razaosocial;
        this.tel = tel;
        this.email = email;
        this.fantasia = fantasia;
    }

    validate() {
        if(!this.razaosocial || this.razaosocial.length < 3){
            return "Razão social inválida";
        }
        if(!this.tel || this.tel.length < 10){
            return "Telefone inválido";
        }
        if(!this.email || !this.email.includes("@")){
            return "Email inválido";
        }
        if(!this.fantasia || this.fantasia.length < 3){
            return "Nome fantasia inválido";
        }
        return null;
    }
}