from django.shortcuts import render

def portal_frontend(request):
    return render(request, "frontend/index.html")