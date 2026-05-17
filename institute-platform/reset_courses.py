"""
Step 1: Delete all 4 courses and recreate them fresh.
Run this first, then run rebuild_courses.py
"""
from xmodule.modulestore.django import modulestore
from opaque_keys.edx.keys import CourseKey
from django.contrib.auth.models import User
from cms.djangoapps.contentstore.utils import add_instructor

user = User.objects.get(username='sumit')
store = modulestore()

courses = [
    {'org': 'InstituteAI', 'number': 'AIE101', 'run': '2026_T1', 'display_name': 'AI Engineering Professional Certificate'},
    {'org': 'InstituteAI', 'number': 'DS201',  'run': '2026_T1', 'display_name': 'Data Science & Machine Learning Fundamentals'},
    {'org': 'InstituteAI', 'number': 'CYB301', 'run': '2026_T1', 'display_name': 'Cybersecurity Essentials for Professionals'},
    {'org': 'InstituteAI', 'number': 'PM401',  'run': '2026_T1', 'display_name': 'Project Management & Agile Leadership'},
]

for c in courses:
    c_id = f"course-v1:{c['org']}+{c['number']}+{c['run']}"
    course_key = CourseKey.from_string(c_id)
    try:
        store.delete_course(course_key, user.id)
        print(f"Deleted: {c_id}")
    except Exception as e:
        print(f"Could not delete {c_id}: {e}")

    try:
        new_course = store.create_course(
            c['org'], c['number'], c['run'],
            user.id,
            fields={'display_name': c['display_name']}
        )
        add_instructor(new_course.id, user, user)
        print(f"Recreated: {c_id}")
    except Exception as e:
        print(f"Could not recreate {c_id}: {e}")

print("Done. Now run rebuild_courses.py")
