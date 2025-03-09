// database.ts
import mysql from 'mysql2/promise';

export class Database {
    public pool!: mysql.Pool;

    // Informations de connexion pour la base de données
    private host: string = 'hopper.proxy.rlwy.net';
    private port: number = 40394;
    private database: string = process.env.MYSQL_DATABASE || 'railway';
    private user: string = 'root';
    private password: string = 'ZRiheABFFTVHBlVDrqQNkYYAYXBclBAf';

    /**
     * Initialise le pool de connexions à la base MySQL.
     * @returns Un pool de connexions MySQL.
     * @throws Une erreur en cas d'échec de la connexion.
     */
    public async connect(): Promise<mysql.Pool> {
        try {
            this.pool = mysql.createPool({
                host: this.host,
                port: this.port,
                database: this.database,
                user: this.user,
                password: this.password,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0,
                // Activez SSL si nécessaire (souvent requis par les services managés)
                ssl: { rejectUnauthorized: true },
            });

            // Test de la connexion
            await this.pool.query('SELECT 1');
            console.log('Connexion à la base de données réussie.');
            return this.pool;
        } catch (error: any) {
            throw new Error(`Erreur de connexion BDD : ${error.message}`);
        }
    }
}
