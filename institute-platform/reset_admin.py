import sys
import os

from django.contrib.auth import get_user_model
User = get_user_model()
try:
    u = User.objects.get(username='admin')
    u.set_password('admin123')
    u.is_active = True
    u.save()
    print("User password reset successfully")
except Exception as e:
    print(f"User update failed: {e}")

try:
    from axes.models import AccessAttempt
    count, _ = AccessAttempt.objects.all().delete()
    print(f"Deleted {count} access attempts")
except Exception as e:
    print(f"Axes reset failed: {e}")
