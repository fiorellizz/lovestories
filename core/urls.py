from django.urls import path
from . import views

urlpatterns = [
    path('', views.core, name="core"),
    path('daviejulia/', views.homepage, name="homepage"),
]