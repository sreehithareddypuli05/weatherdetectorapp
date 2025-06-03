from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('get-weather/', views.get_weather, name='get_weather'),
    path('get-weather-by-city/', views.get_weather_by_city, name='get_weather_by_city'),
]
