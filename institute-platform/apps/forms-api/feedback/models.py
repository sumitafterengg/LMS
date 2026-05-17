from django.db import models

class Feedback(models.Model):
    STATUS_CHOICES = [
        ("unread", "Unread"),
        ("read", "Read"),
        ("archived", "Archived"),
    ]

    name = models.CharField(max_length=200, blank=True)
    email = models.EmailField(blank=True)
    message = models.TextField(max_length=500)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="unread")
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name or self.email or f"Feedback #{self.pk}"
