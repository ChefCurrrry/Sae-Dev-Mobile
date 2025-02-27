
import { SQLiteDatabase } from 'expo-sqlite';

/**
 * Initialise la base de données en créant les tables nécessaires :
 * - users : pour les utilisateurs
 * - associations : pour les associations
 * - donations : pour les dons effectués par les utilisateurs vers les associations
 */
export async function initializeDatabase(db: SQLiteDatabase): Promise<void> {
    // Création de la table des utilisateurs
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT NOT NULL
    );
  `);

    // Création de la table des associations
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS associations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      description TEXT
    );
  `);

    // Création de la table des dons
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS donations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      associationId INTEGER,
      amount REAL,
      date TEXT,
      FOREIGN KEY(userId) REFERENCES users(id),
      FOREIGN KEY(associationId) REFERENCES associations(id)
    );
  `);

}

/**
 * Enregistre un nouvel utilisateur.
 * @returns true si l'enregistrement a réussi, false sinon.
 */
export async function registerUser(db: SQLiteDatabase, email: string, password: string): Promise<boolean> {
    try {
        await db.runAsync(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, password]
        );
        return true;
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        return false;
    }
}

/**
 * Vérifie si un utilisateur existe et si le mot de passe est correct.
 * @returns true si la connexion est réussie, false sinon.
 */
export async function loginUser(db: SQLiteDatabase, email: string, password: string): Promise<boolean> {
    try {
        const user = await db.getFirstAsync<{ id: number }>(
            'SELECT id FROM users WHERE email = ? AND password = ?',
            [email, password]
        );
        return !!user;
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        return false;
    }
}

/**
 * Ajoute une association dans la base.
 */
export async function addAssociation(db: SQLiteDatabase, name: string, description: string): Promise<boolean> {
    try {
        await db.runAsync(
            'INSERT INTO associations (name, description) VALUES (?, ?)',
            [name, description]
        );
        return true;
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'association :", error);
        return false;
    }
}

/**
 * Enregistre un don effectué par un utilisateur à une association.
 */
export async function recordDonation(db: SQLiteDatabase, userId: number, associationId: number, amount: number): Promise<boolean> {
    try {
        const date = new Date().toISOString();
        await db.runAsync(
            'INSERT INTO donations (userId, associationId, amount, date) VALUES (?, ?, ?, ?)',
            [userId, associationId, amount, date]
        );
        return true;
    } catch (error) {
        console.error("Erreur lors de l'enregistrement du don :", error);
        return false;
    }
}

/**
 * Retourne le total des dons effectués pour une association donnée.
 */
export async function getTotalDonationsByAssociation(db: SQLiteDatabase, associationId: number): Promise<number> {
    try {
        const result = await db.getFirstAsync<{ total: number }>(
            'SELECT SUM(amount) as total FROM donations WHERE associationId = ?',
            [associationId]
        );
        return result?.total ?? 0;
    } catch (error) {
        console.error("Erreur lors de la récupération des dons :", error);
        return 0;
    }
}
