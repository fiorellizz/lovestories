from django.urls import path
from . import views

urlpatterns = [
    path('daviejulia/', views.homepage, name="homepage"),
]