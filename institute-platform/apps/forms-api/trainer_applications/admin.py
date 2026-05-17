from django.contrib import admin
from .models import InstructorApplication

@admin.register(InstructorApplication)
class InstructorAppAdmin(admin.ModelAdmin):
    list_display = ["full_name", "email", "expertise", "status", "created"]
    list_filter = ["status", "expertise", "created"]
    list_editable = ["status"]
    search_fields = ["full_name", "email", "expertise", "course_idea"]
