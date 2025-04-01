import mysql.connector
import random
from datetime import datetime, timedelta

# Connexion à ta base MySQL (modifie si besoin)
conn = mysql.connector.connect(
    host="hopper.proxy.rlwy.net",
    port=40394,
    user="root",
    password="ZRiheABFFTVHBlVDrqQNkYYAYXBclBAf",
    database="railway"
)

cursor = conn.cursor()

nb_inserts = 320
id_assos = list(range(1, 76))  # IDAsso de 1 à 75
id_users = [3, 4, 5, 6]        # utilisateurs connus

# Date aléatoire dans les 2 dernières années
def random_date():
    start = datetime.now() - timedelta(days=730)
    return start + timedelta(days=random.randint(0, 730))

for i in range(nb_inserts):
    id_asso = random.choice(id_assos)
    montant = random.randint(5, 200)  # ✅ montant entier
    date_don = random_date().strftime('%Y-%m-%d %H:%M:%S')

    if i < 10:
        id_user = random.choice(id_users)
    else:
        id_user = None

    query = """
        INSERT INTO DONS (IdUser, IdAsso, MontantDon, DateDon)
        VALUES (%s, %s, %s, %s)
    """
    cursor.execute(query, (id_user, id_asso, montant, date_don))

conn.commit()
print(f"✅ {nb_inserts} dons insérés avec succès.")
cursor.close()
conn.close()
