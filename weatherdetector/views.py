from django.shortcuts import render
from django.http import JsonResponse
import requests
import os

# You'll store this in a safe env variable ideally
API_KEY = "c06a81ad974b3e86c9239d70cdb9e0b5"

def home(request):
    return render(request, 'weather.html')

def get_weather(request):
    lat = request.GET.get('lat')
    lon = request.GET.get('lon')

    if lat and lon:
        url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric'
        response = requests.get(url)
        data = response.json()
        return JsonResponse(data)
    else:
        return JsonResponse({'error': 'Missing coordinates'}, status=400)

def get_weather_by_city(request):
    city = request.GET.get('city')
    if city:
        url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric'
        response = requests.get(url)
        data = response.json()
        return JsonResponse(data)
    else:
        return JsonResponse({'error': 'Missing city name'}, status=400)