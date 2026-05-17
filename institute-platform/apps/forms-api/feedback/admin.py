from django.contrib import admin
from .models import Feedback

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "status", "created"]
    list_filter = ["status", "created"]
    list_editable = ["status"]
    search_fields = ["name", "email", "message"]
