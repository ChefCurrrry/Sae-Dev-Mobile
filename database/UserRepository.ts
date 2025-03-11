import {Database} from "@/database/BddConnect";
import mysql from "mysql2/promise";
import {User} from "@/database/User";
import bcrypt from "bcrypt";
import {Alert} from "react-native";
import {router} from "expo-router";


export class UserRepository {
    private pool!: mysql.Pool;

    public constructor(database: Database) {
        this.init(database);
    }

    private async init(database: Database) {
        this.pool = await database.connect();
    }

    public async getConnection() {
        return this.pool.getConnection();
    }

    public async registerUser(user: User): Promise<boolean> {
        try {
            // Récupère une connexion depuis le pool
            const connection = await this.pool.getConnection();

            const [existingUsers]: any = await connection.execute(
                'SELECT id FROM users WHERE email = ?',
                [user.getEmail()]
            );

            if (existingUsers.length > 0) {
                console.log("L'email existe déjà !");
                Alert.alert("L'email est déjà utilisé !");
                connection.release();
                return false;
            }

            // Hachage du mot de passe pour la sécurité
            const hashedPassword = await bcrypt.hash(await user.getMdp(), 10);

            // Exécute la requête SQL
            await connection.execute(
                'INSERT INTO users (nom, prenom, email, password, role) VALUES (?, ?, ?, ?,?)',
                [user.getNom(), user.getPrenom(), user.getEmail(), hashedPassword, user.getRole()]
            );

            // Libère la connexion après usage
            connection.release();

            router.push('/connexion');
            return true;
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            return false;
        }
    }

    public async loginUser(email: string, password: string): Promise<boolean> {
        try {
            // Récupère une connexion depuis le pool
            const connection = await this.pool.getConnection();

            // Récupérer l'utilisateur depuis la base de données
            const [rows]: any = await connection.execute(
                'SELECT password FROM users WHERE email = ?',
                [email]
            );

            connection.release();

            // Vérifier si l'utilisateur existe
            if (rows.length === 0) {
                Alert.alert("Email ou Mot de Passe Incorrect");
                return false;
            }

            const hashedPassword = rows[0].password;

            // Comparer le mot de passe fourni avec le haché en BDD
            const isMatch = await bcrypt.compare(password, hashedPassword);

            if (isMatch) {
                Alert.alert("Connexion réussie !");
                router.push("/associations")
                return true;
            } else {
                Alert.alert("Email ou Mot de Passe Incorrect");
                return false;
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            return false;
        }
    }



}
