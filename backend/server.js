import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import os from "os";
import { resolve } from "path";
import userRoutes from "./routes/userRoutes.js";
import associationRoutes from "./routes/associationRoutes.js";

dotenv.config({ path: resolve(".env") });

const app = express();
app.use(express.json());
app.use(cors());

// Routes API
app.use("/api/users", userRoutes);
app.use("/api/associations", associationRoutes);

// 📌 Fonction pour récupérer l'adresse IPv4 de la machine
const getLocalIP = () => {
    const interfaces = os.networkInterfaces();
    for (const iface of Object.values(interfaces)) {
        if (iface) {
            for (const config of iface) {
                if (config.family === "IPv4" && !config.internal) {
                    return config.address; // Retourne la première IPv4 trouvée
                }
            }
        }
    }
    return "127.0.0.1"; // Fallback sur localhost si aucune IP trouvée
};

// Récupération dynamique de l'IP
const LOCAL_IP = getLocalIP();
const PORT = process.env.PORT || 3000;

// 📌 Route pour récupérer l'IP depuis React Native
app.get("/api/ip", (req, res) => {
    res.json({ ip: LOCAL_IP });
});

// Démarrage du serveur avec l'IP locale
app.listen(PORT, LOCAL_IP, () => {
    console.log(`🚀 Serveur backend démarré sur http://${LOCAL_IP}:${PORT}`);
});
