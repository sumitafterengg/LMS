"""
Clean rebuild: wipe children list, create fresh structure using create_child,
then publish everything so content shows in LMS.
"""
from xmodule.modulestore.django import modulestore
from opaque_keys.edx.keys import CourseKey
from django.contrib.auth.models import User

user = User.objects.get(username='sumit')
store = modulestore()

course_data = {
    'course-v1:InstituteAI+AIE101+2026_T1': [
        {'title': 'Section 1: Introduction to AI & Machine Learning', 'subsections': [
            {'title': '1.1 What is AI?', 'num': '1.1', 'type': 'Text + Video'},
            {'title': '1.2 ML vs DL vs AI', 'num': '1.2', 'type': 'Text + Video'},
            {'title': '1.3 Real-World AI Applications', 'num': '1.3', 'type': 'Text'},
            {'title': '1.4 Quiz', 'num': '1.4', 'type': 'Problem'},
        ], 'videos': {'1.1': 'ad79nYk2keg', '1.2': '4RixMPF4xis'}},
        {'title': 'Section 2: Python for AI Engineering', 'subsections': [
            {'title': '2.1 Python Basics Refresher', 'num': '2.1', 'type': 'Text + Video'},
            {'title': '2.2 NumPy & Pandas', 'num': '2.2', 'type': 'Text + Video'},
            {'title': '2.3 Data Visualization', 'num': '2.3', 'type': 'Text'},
            {'title': '2.4 Hands-On Lab', 'num': '2.4', 'type': 'Text'},
            {'title': '2.5 Quiz', 'num': '2.5', 'type': 'Problem'},
        ], 'videos': {'2.1': 'kqtD5dpn9C8', '2.2': 'vmEHCJofslg'}},
        {'title': 'Section 3: Building ML Models', 'subsections': [
            {'title': '3.1 Supervised Learning', 'num': '3.1', 'type': 'Text + Video'},
            {'title': '3.2 Unsupervised Learning', 'num': '3.2', 'type': 'Text + Video'},
            {'title': '3.3 Model Evaluation Metrics', 'num': '3.3', 'type': 'Text'},
            {'title': '3.4 Scikit-Learn Workshop', 'num': '3.4', 'type': 'Text'},
            {'title': '3.5 Quiz', 'num': '3.5', 'type': 'Problem'},
        ], 'videos': {'3.1': '7eh4d6sabA0', '3.2': 'IUn8k5zSI6g'}},
        {'title': 'Section 4: Deep Learning & Neural Networks', 'subsections': [
            {'title': '4.1 Neural Network Architecture', 'num': '4.1', 'type': 'Text + Video'},
            {'title': '4.2 CNNs for Image Recognition', 'num': '4.2', 'type': 'Text + Video'},
            {'title': '4.3 NLP & Transformers Intro', 'num': '4.3', 'type': 'Text'},
            {'title': '4.4 TensorFlow / PyTorch Lab', 'num': '4.4', 'type': 'Text'},
            {'title': '4.5 Quiz', 'num': '4.5', 'type': 'Problem'},
        ], 'videos': {'4.1': 'aircAruvnKk', '4.2': 'YRhxdVk_sIs'}},
        {'title': 'Section 5: AI Ethics & Capstone Project', 'subsections': [
            {'title': '5.1 AI Ethics & Bias', 'num': '5.1', 'type': 'Text + Video'},
            {'title': '5.2 AI in Industry', 'num': '5.2', 'type': 'Text'},
            {'title': '5.3 Capstone Project Brief', 'num': '5.3', 'type': 'Text'},
            {'title': '5.4 Final Exam', 'num': '5.4', 'type': 'Problem'},
        ], 'videos': {'5.1': 'UG_X_7g63rY'}},
    ],
    'course-v1:InstituteAI+DS201+2026_T1': [
        {'title': 'Section 1: Data Science Overview', 'subsections': [
            {'title': '1.1 What is Data Science?', 'num': '1.1', 'type': 'Text + Video'},
            {'title': '1.2 Data Science Lifecycle', 'num': '1.2', 'type': 'Text + Video'},
            {'title': '1.3 Tools & Technologies', 'num': '1.3', 'type': 'Text'},
            {'title': '1.4 Quiz', 'num': '1.4', 'type': 'Problem'},
        ], 'videos': {'1.1': 'X3paOmcrTjQ', '1.2': 'RBSUwFGa6Fk'}},
        {'title': 'Section 2: Statistics & Probability', 'subsections': [
            {'title': '2.1 Descriptive Statistics', 'num': '2.1', 'type': 'Text + Video'},
            {'title': '2.2 Probability Distributions', 'num': '2.2', 'type': 'Text + Video'},
            {'title': '2.3 Hypothesis Testing', 'num': '2.3', 'type': 'Text'},
            {'title': '2.4 Quiz', 'num': '2.4', 'type': 'Problem'},
        ], 'videos': {'2.1': 'xxpc-HPKN28', '2.2': 'YXLVjCKVP7U'}},
        {'title': 'Section 3: Data Wrangling & EDA', 'subsections': [
            {'title': '3.1 Data Cleaning Techniques', 'num': '3.1', 'type': 'Text + Video'},
            {'title': '3.2 Exploratory Data Analysis', 'num': '3.2', 'type': 'Text + Video'},
            {'title': '3.3 Feature Engineering', 'num': '3.3', 'type': 'Text'},
            {'title': '3.4 Hands-On Lab', 'num': '3.4', 'type': 'Text'},
            {'title': '3.5 Quiz', 'num': '3.5', 'type': 'Problem'},
        ], 'videos': {'3.1': 'ZOX18HfLHGQ', '3.2': 'xi0vhXFPegw'}},
        {'title': 'Section 4: Machine Learning Algorithms', 'subsections': [
            {'title': '4.1 Linear & Logistic Regression', 'num': '4.1', 'type': 'Text + Video'},
            {'title': '4.2 Decision Trees & Random Forest', 'num': '4.2', 'type': 'Text + Video'},
            {'title': '4.3 SVM & KNN', 'num': '4.3', 'type': 'Text'},
            {'title': '4.4 Model Selection & Tuning', 'num': '4.4', 'type': 'Text'},
            {'title': '4.5 Quiz', 'num': '4.5', 'type': 'Problem'},
        ], 'videos': {'4.1': 'nk2CQITm_eo', '4.2': 'J4Wdy0Wc_xQ'}},
        {'title': 'Section 5: Capstone & Portfolio Project', 'subsections': [
            {'title': '5.1 End-to-End ML Pipeline', 'num': '5.1', 'type': 'Text'},
            {'title': '5.2 Project Brief', 'num': '5.2', 'type': 'Text'},
            {'title': '5.3 Presentation Guidelines', 'num': '5.3', 'type': 'Text'},
            {'title': '5.4 Final Exam', 'num': '5.4', 'type': 'Problem'},
        ], 'videos': {}},
    ],
    'course-v1:InstituteAI+CYB301+2026_T1': [
        {'title': 'Section 1: Cybersecurity Foundations', 'subsections': [
            {'title': '1.1 What is Cybersecurity?', 'num': '1.1', 'type': 'Text + Video'},
            {'title': '1.2 Types of Cyber Threats', 'num': '1.2', 'type': 'Text + Video'},
            {'title': '1.3 Security Frameworks', 'num': '1.3', 'type': 'Text'},
            {'title': '1.4 Quiz', 'num': '1.4', 'type': 'Problem'},
        ], 'videos': {'1.1': 'inWWhr5tnEA', '1.2': 'Dk-ZqQ-bU4A'}},
        {'title': 'Section 2: Network Security', 'subsections': [
            {'title': '2.1 Network Fundamentals', 'num': '2.1', 'type': 'Text + Video'},
            {'title': '2.2 Firewalls & IDS/IPS', 'num': '2.2', 'type': 'Text + Video'},
            {'title': '2.3 VPN & Encryption', 'num': '2.3', 'type': 'Text'},
            {'title': '2.4 Lab: Wireshark Basics', 'num': '2.4', 'type': 'Text'},
            {'title': '2.5 Quiz', 'num': '2.5', 'type': 'Problem'},
        ], 'videos': {'2.1': '3QhU9jd03a0', '2.2': '9GZlVOafYTg'}},
        {'title': 'Section 3: Application & Web Security', 'subsections': [
            {'title': '3.1 OWASP Top 10', 'num': '3.1', 'type': 'Text + Video'},
            {'title': '3.2 SQL Injection & XSS', 'num': '3.2', 'type': 'Text + Video'},
            {'title': '3.3 Secure Coding Practices', 'num': '3.3', 'type': 'Text'},
            {'title': '3.4 Quiz', 'num': '3.4', 'type': 'Problem'},
        ], 'videos': {'3.1': 'avFR_Af0KGk', '3.2': '2OPVViV-GQk'}},
        {'title': 'Section 4: Incident Response & Forensics', 'subsections': [
            {'title': '4.1 Incident Response Lifecycle', 'num': '4.1', 'type': 'Text + Video'},
            {'title': '4.2 Digital Forensics Intro', 'num': '4.2', 'type': 'Text + Video'},
            {'title': '4.3 Log Analysis', 'num': '4.3', 'type': 'Text'},
            {'title': '4.4 Quiz', 'num': '4.4', 'type': 'Problem'},
        ], 'videos': {'4.1': 'KGily1OQDBI', '4.2': 'FbemVRN2Iho'}},
        {'title': 'Section 5: Compliance, Careers & Final Assessment', 'subsections': [
            {'title': '5.1 GDPR & Data Privacy', 'num': '5.1', 'type': 'Text'},
            {'title': '5.2 Career Paths in Cybersecurity', 'num': '5.2', 'type': 'Text'},
            {'title': '5.3 Capstone Scenario', 'num': '5.3', 'type': 'Text'},
            {'title': '5.4 Final Exam', 'num': '5.4', 'type': 'Problem'},
        ], 'videos': {}},
    ],
    'course-v1:InstituteAI+PM401+2026_T1': [
        {'title': 'Section 1: Project Management Fundamentals', 'subsections': [
            {'title': '1.1 What is Project Management?', 'num': '1.1', 'type': 'Text + Video'},
            {'title': '1.2 Project Lifecycle', 'num': '1.2', 'type': 'Text + Video'},
            {'title': '1.3 PM Methodologies Overview', 'num': '1.3', 'type': 'Text'},
            {'title': '1.4 Quiz', 'num': '1.4', 'type': 'Problem'},
        ], 'videos': {'1.1': 'rBSCvljYQ3s', '1.2': 'GnK_n9Udhhs'}},
        {'title': 'Section 2: Agile & Scrum Framework', 'subsections': [
            {'title': '2.1 Agile Manifesto & Principles', 'num': '2.1', 'type': 'Text + Video'},
            {'title': '2.2 Scrum Roles & Events', 'num': '2.2', 'type': 'Text + Video'},
            {'title': '2.3 Kanban Basics', 'num': '2.3', 'type': 'Text'},
            {'title': '2.4 Quiz', 'num': '2.4', 'type': 'Problem'},
        ], 'videos': {'2.1': '502ILHjX9EE', '2.2': '9TycLR0TqFA'}},
        {'title': 'Section 3: Planning, Scheduling & Budgeting', 'subsections': [
            {'title': '3.1 Work Breakdown Structure', 'num': '3.1', 'type': 'Text + Video'},
            {'title': '3.2 Gantt Charts & Scheduling', 'num': '3.2', 'type': 'Text + Video'},
            {'title': '3.3 Cost Estimation & Budgeting', 'num': '3.3', 'type': 'Text'},
            {'title': '3.4 Lab: Create a Project Plan', 'num': '3.4', 'type': 'Text'},
            {'title': '3.5 Quiz', 'num': '3.5', 'type': 'Problem'},
        ], 'videos': {'3.1': 'vAHboaLMPeo', '3.2': 'fB0wsdmV3Sw'}},
        {'title': 'Section 4: Risk Management & Stakeholder Communication', 'subsections': [
            {'title': '4.1 Risk Identification & Analysis', 'num': '4.1', 'type': 'Text + Video'},
            {'title': '4.2 Stakeholder Management', 'num': '4.2', 'type': 'Text + Video'},
            {'title': '4.3 Conflict Resolution', 'num': '4.3', 'type': 'Text'},
            {'title': '4.4 Quiz', 'num': '4.4', 'type': 'Problem'},
        ], 'videos': {'4.1': 'K-sJf00GMMY', '4.2': 'mKFGj3GtHs4'}},
        {'title': 'Section 5: Leadership & Final Assessment', 'subsections': [
            {'title': '5.1 Leadership Styles', 'num': '5.1', 'type': 'Text'},
            {'title': '5.2 PMP/CAPM Certification Prep', 'num': '5.2', 'type': 'Text'},
            {'title': '5.3 Capstone: Full Project Plan', 'num': '5.3', 'type': 'Text'},
            {'title': '5.4 Final Exam', 'num': '5.4', 'type': 'Problem'},
        ], 'videos': {}},
    ],
}


def problem_xml(title):
    return (
        '<problem display_name="{title}">'
        '<p>Sample assessment question for {title}. Replace with real questions.</p>'
        '<multiplechoiceresponse>'
        '<choicegroup type="MultipleChoice" label="{title}">'
        '<choice correct="false">Option A</choice>'
        '<choice correct="true">Option B (Correct)</choice>'
        '<choice correct="false">Option C</choice>'
        '<choice correct="false">Option D</choice>'
        '</choicegroup>'
        '</multiplechoiceresponse>'
        '</problem>'
    ).format(title=title)


def rebuild_and_publish():
    for c_id, sections in course_data.items():
        print(f"\n=== {c_id} ===")
        course_key = CourseKey.from_string(c_id)
        course = store.get_course(course_key)
        if not course:
            print("  NOT FOUND")
            continue

        # Wipe existing children refs without trying to delete mongo docs
        course.children = []
        store.update_item(course, user.id)

        with store.bulk_operations(course_key):
            for sec in sections:
                # --- Chapter (Section) ---
                chapter = store.create_child(
                    user.id,
                    course.location,
                    'chapter',
                    fields={'display_name': sec['title']}
                )

                for sub in sec['subsections']:
                    # --- Sequential (Lecture/Subsection) ---
                    seq = store.create_child(
                        user.id,
                        chapter.location,
                        'sequential',
                        fields={'display_name': sub['title']}
                    )

                    # --- Vertical (Unit) ---
                    vert = store.create_child(
                        user.id,
                        seq.location,
                        'vertical',
                        fields={'display_name': sub['title']}
                    )

                    # HTML intro text
                    html_body = (
                        '<h2>{t}</h2>'
                        '<p>Welcome to <strong>{t}</strong>. '
                        'In this lesson you will cover key concepts and apply them through video and exercises.</p>'
                        '<ul><li>Watch the video lecture</li>'
                        '<li>Review the reading notes</li>'
                        '<li>Complete the quiz</li></ul>'
                    ).format(t=sub['title'])
                    store.create_child(
                        user.id, vert.location, 'html',
                        fields={'display_name': 'Overview', 'data': html_body}
                    )

                    # Video (if available)
                    if sub['num'] in sec['videos']:
                        store.create_child(
                            user.id, vert.location, 'video',
                            fields={
                                'display_name': sub['title'] + ' — Video',
                                'youtube_id_1_0': sec['videos'][sub['num']],
                            }
                        )

                    # Problem/Quiz
                    if 'Problem' in sub['type']:
                        store.create_child(
                            user.id, vert.location, 'problem',
                            fields={
                                'display_name': sub['title'],
                                'data': problem_xml(sub['title']),
                            }
                        )

                # Publish the chapter and all its children
                store.publish(chapter.location, user.id)
                print(f"  ✅ Published: {sec['title']}")

        # Publish top-level course
        store.publish(course.location, user.id)
        print(f"  ✅ Course published.")

    print("\n\nAll done! Visit http://local.openedx.io to verify.")


rebuild_and_publish()
