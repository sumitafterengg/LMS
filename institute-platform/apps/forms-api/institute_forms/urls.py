from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/feedback/", include("feedback.urls")),
    path("api/trainer-applications/", include("trainer_applications.urls")),
]

import os

if settings.DEBUG or os.getenv("SERVE_MEDIA_IN_PRODUCTION", "True") == "True":
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
