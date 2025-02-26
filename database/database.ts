import * as SQLite from 'expo-sqlite';

// Ouvre ou crée la base de données
const db = SQLite.openDatabase("mydatabase.db");

export function createTable() {
    db.transaction(tx => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER);",
            [],
            () => console.log("Table créée avec succès"),
            (_, error) => console.log("Erreur de création de table", error)
        );
    });
}

export function insertUser(name: string, age: number) {
    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO users (name, age) VALUES (?, ?);",
            [name, age],
            (_, result) => console.log("Utilisateur ajouté", result),
            (_, error) => console.log("Erreur d'insertion", error)
        );
    });
}

export function getUsers(callback: (users: any[]) => void) {
    db.transaction(tx => {
        tx.executeSql(
            "SELECT * FROM users;",
            [],
            (_, { rows }) => callback(rows._array),
            (_, error) => console.log("Erreur de récupération", error)
        );
    });
}

export default db;
