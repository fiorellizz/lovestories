from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.http import HttpResponse
from django.urls import reverse

from datetime import date
from .models import Cliente, Lead
from io import BytesIO

import qrcode

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
    if request.method == 'POST':
        nome     = request.POST.get('name', '').strip()
        email    = request.POST.get('email', '').strip()
        telefone = request.POST.get('phone', '').strip()
        mensagem = request.POST.get('message', '').strip()

        if nome and telefone:
            Lead.objects.create(
                nome=nome,
                email=email,
                telefone=telefone,
                mensagem=mensagem
            )
            # enfileira a mensagem de sucesso
            messages.success(request, '👍 Obrigado! Recebemos seu pedido e logo entraremos em contato pelo WhatsApp.')
            # redireciona para a mesma URL, pulando para a seção do form
            url = reverse('core') + '#section_5'
            return redirect(url)

    # GET (ou pós-redirect) cai aqui
    return render(request, 'home.html')

def qr_page(request, slug):
    cliente = get_object_or_404(Cliente, slug=slug)
    return render(request, 'qrcode.html', { 'cliente': cliente })

def qr_code(request, slug):
    # garante que o cliente existe
    get_object_or_404(Cliente, slug=slug)

    # monta a URL absoluta da página do cliente
    url = request.build_absolute_uri(reverse('cliente_page', args=[slug]))

    # gera o QR Code
    img = qrcode.make(url)

    # escreve no buffer em memória
    buffer = BytesIO()
    img.save(buffer, format='PNG')
    buffer.seek(0)

    # retorna como imagem PNG
    return HttpResponse(buffer, content_type='image/png')