from django.urls import path
from .views import submit_application

urlpatterns = [
    path("", submit_application, name="submit_application"),
]
