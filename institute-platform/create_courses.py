from django.contrib.auth.models import User
from opaque_keys.edx.keys import CourseKey
from openedx.core.djangoapps.content.course_overviews.models import CourseOverview
from cms.djangoapps.contentstore.utils import add_instructor
from xmodule.modulestore.django import modulestore
from xmodule.modulestore import ModuleStoreEnum

# Get the admin user to be the course author
try:
    user = User.objects.get(username='sumit')
except User.DoesNotExist:
    user = User.objects.filter(is_superuser=True).first()

print(f"Creating courses as user: {user.username}")

store = modulestore()

courses = [
    {
        'org': 'InstituteAI',
        'number': 'AIE101',
        'run': '2026_T1',
        'display_name': 'AI Engineering Professional Certificate',
    },
    {
        'org': 'InstituteAI',
        'number': 'DS201',
        'run': '2026_T1',
        'display_name': 'Data Science & Machine Learning Fundamentals',
    },
    {
        'org': 'InstituteAI',
        'number': 'CYB301',
        'run': '2026_T1',
        'display_name': 'Cybersecurity Essentials for Professionals',
    },
    {
        'org': 'InstituteAI',
        'number': 'PM401',
        'run': '2026_T1',
        'display_name': 'Project Management & Agile Leadership',
    },
]

for c in courses:
    try:
        course = store.create_course(
            c['org'],
            c['number'],
            c['run'],
            user.id,
            fields={'display_name': c['display_name']},
        )
        add_instructor(course.id, user, user)
        print(f"✅ Created: {c['display_name']} ({c['org']}/{c['number']}/{c['run']})")
    except Exception as e:
        print(f"❌ Failed to create {c['number']}: {e}")

print("\nDone! Visit http://studio.local.openedx.io to see your courses.")
