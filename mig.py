import os
import django
import subprocess

# Configurações do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lovestories.settings')
django.setup()

def make_migrations_and_migrate():
    print("Executando makemigrations...")
    subprocess.run(['python', 'manage.py', 'makemigrations'], check=True)

    print("Executando migrate...")
    subprocess.run(['python', 'manage.py', 'migrate'], check=True)

def main():
    make_migrations_and_migrate()
    
if __name__ == '__main__':
    main()