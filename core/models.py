from django.db import models
from django.utils import timezone

class Base(models.Model):
    criado = models.DateTimeField(verbose_name='Criação', default=timezone.now)
    modificado = models.DateTimeField(verbose_name='Atualização', auto_now=True)
    status = models.BooleanField(verbose_name='Ativo', default=True)

    class Meta:
        abstract = True

class Artista(Base):
    nome = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nome

class Musica(Base):
    titulo = models.CharField(max_length=255)
    autor = models.ForeignKey(Artista, on_delete=models.CASCADE)
    arquivo_audio = models.FileField(upload_to='core/audio/')
    
    def __str__(self):
        return f"{self.titulo} - {self.autor}"

class Cliente(Base):
    nome_casal = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)  # ex: 'daviejulia'
    hero_title = models.CharField(max_length=100, default="Feliz 5 Meses Meu Amor")
    hero_subtitle = models.CharField(max_length=100, default="Cada dia ao seu lado é uma nova razão para sorrir")
    carta_amor = models.TextField()
    data_inicio = models.DateField()
    footer_title = models.CharField(max_length=100, default="Feliz 5 Meses Meu Amor")
    footer_subtitle = models.CharField(max_length=100, default="Que venham muitos mais meses, anos e décadas de amor, companheirismo e felicidade.")
    musicas = models.ManyToManyField(Musica, related_name='clientes')

    def __str__(self):
        return self.slug
    
class Imagem(Base):
    imagem = models.ImageField(upload_to='core/img/')
    
    def __str__(self):
        return f"Imagem {self.id}"

class ClienteImagem(Base):
    cliente = models.ForeignKey('Cliente', on_delete=models.CASCADE, related_name='imagens')
    imagem = models.ForeignKey(Imagem, on_delete=models.CASCADE)
    TIPO_CHOICES = [
        ('history', 'Nossa História em Fotos'),
        ('hero', 'Hero'),
        ('moment', 'Momentos'),
        ('music', 'Musica'),
    ]
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES, default='history')
    ordem = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['ordem']
    
    def __str__(self):
        return f"{self.cliente.slug} - {self.tipo} - {self.imagem}"
    
class Lead(Base):
    nome     = models.CharField("Nome", max_length=100)
    email    = models.EmailField("Email")
    telefone = models.CharField("Telefone", max_length=20)
    mensagem = models.TextField("Mensagem", blank=True)
    foi_atendido = models.BooleanField("Já atendido?", default=False)

    def __str__(self):
        return f"{self.nome} — {self.telefone} - {self.foi_atendido}"