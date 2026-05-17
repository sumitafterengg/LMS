from xmodule.modulestore.django import modulestore
from opaque_keys.edx.keys import CourseKey
from django.contrib.auth.models import User

user = User.objects.get(username='sumit')
store = modulestore()

course_ids = [
    'course-v1:InstituteAI+AIE101+2026_T1',
    'course-v1:InstituteAI+DS201+2026_T1',
    'course-v1:InstituteAI+CYB301+2026_T1',
    'course-v1:InstituteAI+PM401+2026_T1',
]

for c_id in course_ids:
    course_key = CourseKey.from_string(c_id)
    course = store.get_course(course_key)
    if not course:
        print(f"NOT FOUND: {c_id}")
        continue

    children = course.children
    print(f"\n{c_id} => {len(children)} chapters")
    for ch_loc in children:
        chapter = store.get_item(ch_loc)
        print(f"  Chapter: {chapter.display_name} => {len(chapter.children)} sequentials")
        for seq_loc in chapter.children:
            seq = store.get_item(seq_loc)
            print(f"    Sequential: {seq.display_name} => {len(seq.children)} verticals")
