from django.shortcuts import render, get_object_or_404
from .models import Cliente
from datetime import date

def cliente_page(request, slug):
    
    cliente = get_object_or_404(Cliente, slug=slug)
    data_de_hoje = date.today()
    paragrafos = cliente.carta_amor.split('|')
    musicas = cliente.musicas.all()
    imagens_history = cliente.imagens.filter(tipo='history')
    imagem_music = cliente.imagens.filter(tipo='music')
    imagens_moment = cliente.imagens.filter(tipo='moment')

    return render(request, 'index.html', {
        'cliente': cliente, 
        'data_de_hoje': data_de_hoje,
        'paragrafos': paragrafos,
        'musicas': musicas,
        'imagens_history': imagens_history,
        'imagem_music': imagem_music,
        'imagens_moment': imagens_moment,
    })

def core(request):
    return render(request, 'core.html')