import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import {resolve} from "path";

dotenv.config({ path: resolve(".env") });

const app = express();
app.use(express.json()); // Permet d'interpréter les requêtes JSON
app.use(cors()); // Autorise les requêtes depuis React Native

// Routes API pour la gestion des utilisateurs
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`));
