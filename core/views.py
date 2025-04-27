from django.shortcuts import render

def homepage(request):
    return render(request, 'index.html')

def core(request):
    return render(request, 'core.html')