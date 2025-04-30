import os
import django
from django.contrib.auth import get_user_model
import subprocess

# Configurações do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lovestories.settings')
django.setup()

def delete_sqlite_db():
    db_path = os.path.join(os.path.dirname(__file__), 'db.sqlite3')
    if os.path.exists(db_path):
        print("Deletando db.sqlite3...")
        os.remove(db_path)
    else:
        print("db.sqlite3 não encontrado, continuando...")

def make_migrations_and_migrate():
    print("Executando makemigrations...")
    subprocess.run(['python', 'manage.py', 'makemigrations'], check=True)

    print("Executando migrate...")
    subprocess.run(['python', 'manage.py', 'migrate'], check=True)

# Função para criar um superusuário com senha especificada
def create_superuser(username, email, password):
    user = get_user_model()
    if not user.objects.filter(username=username).exists():
        user.objects.create_superuser(username=username, email=email, password=password)
        print(f"Superusuario '{username}' criado com sucesso.")
    else:
        print(f"Superusuario '{username}' ja existe.")

# Dados do superusuário
username = 'admin'
email = 'admin@example.com'
password = '1234'

def main():
    delete_sqlite_db()
    make_migrations_and_migrate()
    create_superuser(username, email, password)

if __name__ == '__main__':
    main()