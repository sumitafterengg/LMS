from django.core.exceptions import ValidationError
from django.db import models
import os

def validate_file_size(file):
    max_size = 5 * 1024 * 1024
    if file.size > max_size:
        raise ValidationError("File size must be 5MB or less.")

def validate_cv_extension(file):
    valid_extensions = [".pdf", ".doc", ".docx"]
    ext = os.path.splitext(file.name)[1].lower()
    if ext not in valid_extensions:
        raise ValidationError("CV must be PDF or Word format.")

def validate_certificate_extension(file):
    valid_extensions = [".pdf", ".jpg", ".jpeg", ".png"]
    ext = os.path.splitext(file.name)[1].lower()
    if ext not in valid_extensions:
        raise ValidationError("Certificate must be PDF or image format.")

class InstructorApplication(models.Model):
    STATUS = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]

    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    expertise = models.CharField(max_length=200)
    bio = models.TextField(max_length=500)
    course_idea = models.TextField()
    cv_file = models.FileField(
        upload_to="applications/cv/",
        validators=[validate_file_size, validate_cv_extension],
    )
    cert_1 = models.FileField(
        upload_to="applications/certs/",
        blank=True,
        validators=[validate_file_size, validate_certificate_extension],
    )
    cert_2 = models.FileField(
        upload_to="applications/certs/",
        blank=True,
        validators=[validate_file_size, validate_certificate_extension],
    )
    cert_3 = models.FileField(
        upload_to="applications/certs/",
        blank=True,
        validators=[validate_file_size, validate_certificate_extension],
    )
    status = models.CharField(max_length=20, choices=STATUS, default="pending")
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name
