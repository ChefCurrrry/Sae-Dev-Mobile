import random
import mysql.connector

# Connexion à ta base de données
connection = mysql.connector.connect(
    host="hopper.proxy.rlwy.net",
    port=40394,
    user="root",
    password="ZRiheABFFTVHBlVDrqQNkYYAYXBclBAf",
    database="railway"
)

cursor = connection.cursor()

# Données
id_users = [3, 4, 5, 6]
max_asso_id = 75

for id_user in id_users:
    used_assos = set()
    for _ in range(3):  # 3 dons par utilisateur
        id_asso = random.randint(1, max_asso_id)
        while id_asso in used_assos:
            id_asso = random.randint(1, max_asso_id)
        used_assos.add(id_asso)
        montant = random.randint(5, 100)

        cursor.execute("""
            INSERT INTO DONS_RECURRENTS (IdUser, IdAsso, MontantDon)
            VALUES (%s, %s, %s)
        """, (id_user, id_asso, montant))

connection.commit()
cursor.close()
connection.close()

print("✅ Données insérées dans DONS_RECURRENTS.")
