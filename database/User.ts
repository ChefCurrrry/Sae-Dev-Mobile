
export class User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    role: string;

    constructor(id: number, nom: string, prenom: string, email: string, password: string, role: string) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public getEmail(): string {
        return this.email;
    }
    public getId(): number {
        return this.id;
    }
    public getMdp(): string {
        return this.password;
    }
    public getNom(): string {
        return this.nom;
    }
    public getPrenom(): string {
        return this.prenom;
    }
    public getRole(): string {
        return this.role;
    }
}

