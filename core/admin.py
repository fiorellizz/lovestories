from django.contrib import admin

from core.models import Artista, Cliente, Musica, Imagem, ClienteImagem

admin.site.register(Musica)
admin.site.register(Artista)

class ClienteImagemInline(admin.TabularInline):
    model = ClienteImagem
    extra = 1

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    inlines = [ClienteImagemInline]

admin.site.register(Imagem)