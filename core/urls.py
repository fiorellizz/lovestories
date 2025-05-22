from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.core, name="core"),
    path('<slug:slug>/', views.cliente_page, name='cliente_page'),
    path('qr/<slug:slug>/', views.qr_code, name='qr_code'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)