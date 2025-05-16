from django import forms
from .models import Lead

class LeadForm(forms.ModelForm):
    class Meta:
        model = Lead
        fields = ['nome', 'email', 'telefone', 'mensagem']
        widgets = {
            'mensagem': forms.Textarea(attrs={'rows':4, 'placeholder': 'Mensagem (Opcional)'}),
            'nome':     forms.TextInput(attrs={'placeholder': 'Nome Completo*'}),
            'email':    forms.EmailInput(attrs={'placeholder': 'Email*'}),
            'telefone': forms.TextInput(attrs={'placeholder': 'Telefone*'}),
        }