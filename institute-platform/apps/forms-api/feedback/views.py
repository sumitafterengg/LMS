import json
from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import FeedbackForm

@csrf_exempt
def submit_feedback(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    try:
        data = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    form = FeedbackForm(data)
    if not form.is_valid():
        return JsonResponse({"errors": form.errors}, status=400)

    feedback = form.save()

    send_mail(
        subject="New Feedback Submitted",
        message=f"From: {feedback.name or 'Anonymous'}\nEmail: {feedback.email or 'Not provided'}\n\n{feedback.message}",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.ADMIN_NOTIFICATION_EMAIL],
        fail_silently=True,
    )

    return JsonResponse({"success": True, "id": feedback.id}, status=201)
