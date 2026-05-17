from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import InstructorApplicationForm

@csrf_exempt
def submit_application(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    form = InstructorApplicationForm(request.POST, request.FILES)

    if not form.is_valid():
        return JsonResponse({"errors": form.errors}, status=400)

    application = form.save()

    send_mail(
        subject="New Instructor Application",
        message=(
            f"Name: {application.full_name}\n"
            f"Email: {application.email}\n"
            f"Phone: {application.phone}\n"
            f"Expertise: {application.expertise}\n"
            f"Course Idea: {application.course_idea}"
        ),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.ADMIN_NOTIFICATION_EMAIL],
        fail_silently=True,
    )

    return JsonResponse({"success": True, "id": application.id}, status=201)
