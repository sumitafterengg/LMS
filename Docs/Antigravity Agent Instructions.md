Institute Website + LMS Project

Project Goal

Build the project locally first because VPS, domain, logo, final content, payment details, and client email are not available yet.

Do not wait for client details. Use clear placeholders everywhere. The goal is to complete all code, layout, forms, local testing, translation structure, and documentation now, then replace placeholders later.

This project has these parts:

Next.js institute website with 12 pages.
English/Arabic language support.
RTL Arabic layout.
Django backend for feedback form and instructor application form.
File upload validation for instructor applications.
Placeholder integration points for Open edX LMS.
Certificate template placeholders.
Local development documentation.
QA checklist.

Follow the instructions exactly. Do not invent extra features.

Critical Rules for the Agent

Follow these rules from the coding guideline file:

Make only the requested changes.
Do not over-engineer.
Do not refactor unrelated code.
Use simple, clear code.
Every step must have a verification command or manual check.
If client data is missing, do not ask. Use placeholders like [INSTITUTE_NAME_EN], [LOGO_PENDING], [PAYMENT_DETAILS_PENDING].
Do not hardcode visible website text inside React components. All visible text must come from translation JSON files.
Do not implement real payment processing.
Do not configure real email credentials. Use placeholder settings only.
Do not require VPS, domain, or logo to continue.

These rules match the project’s original requirement that every visible website string should come from translation JSON files, not hardcoded component text , and they also match the agent behavior rules in CLAUDE.md about simple, surgical, goal-driven implementation .

Assumptions

Use these assumptions without asking:

Institute name EN: [INSTITUTE_NAME_EN]
Institute name AR: [INSTITUTE_NAME_AR]
Domain: [DOMAIN_PENDING]
LMS URL: https://lms.[DOMAIN_PENDING]
Studio URL: https://studio.[DOMAIN_PENDING]
Admin email: admin@example.com
Location: Buraimi, Oman
Brand primary green: #1A6B3C
Brand dark green: #0E4D2B
Brand gold: #C9A227
Logo: /images/logo-placeholder.png
Repository Structure

Create this structure:

institute-platform/
├── apps/
│   ├── website/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── data/
│   │   ├── locales/
│   │   │   ├── en.json
│   │   │   └── ar.json
│   │   ├── public/
│   │   │   └── images/
│   │   ├── styles/
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   └── package.json
│   │
│   └── forms-api/
│       ├── manage.py
│       ├── institute_forms/
│       ├── feedback/
│       ├── trainer_applications/
│       ├── media/
│       ├── requirements.txt
│       └── README.md
│
├── docs/
│   ├── CLIENT_PENDING_ITEMS.md
│   ├── LOCAL_SETUP.md
│   ├── OPENEDX_LOCAL_SETUP.md
│   ├── QA_CHECKLIST.md
│   ├── HANDOVER_CHECKLIST.md
│   └── CERTIFICATE_TEMPLATE_NOTES.md
│
└── README.md
Phase 1 — Create Root Project
Step 1.1 — Create root folder
mkdir institute-platform
cd institute-platform
mkdir apps docs

Create root README.md:

# Institute Platform

Local-first build for institute website, LMS integration, bilingual EN/AR support, feedback form, instructor application form, and Open edX deployment preparation.

## Current Build Mode

This project is being built locally first because VPS, domain, logo, final content, payment details, and admin email are pending from the client.

## Apps

- `apps/website` — Next.js public website
- `apps/forms-api` — Django backend for feedback and instructor application forms
- `docs` — setup, QA, handover, and pending client items

Verify:

ls

Expected:

apps
docs
README.md
Phase 2 — Build Next.js Website

The original project requires 12 pages: Home, About, Vision & Mission, Team, Programs, Program Detail, Registration & Payment, Online Courses, News, Partners, Join as Trainer, and Contact .

Use the Pages Router structure because the project plan already specifies a pages/ directory. Next.js Pages Router uses file-based routing and still supports i18n routing.

Step 2.1 — Create website app

From root:

cd apps
npx create-next-app@latest website
cd website
npm install next-i18next react-i18next i18next @headlessui/react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

When create-next-app asks questions, use:

TypeScript: No
ESLint: Yes
Tailwind CSS: No, because we install manually
src directory: No
App Router: No
Import alias: Yes

If App Router was created accidentally, convert to Pages Router by creating pages/ and ignoring/removing app/.

Step 2.2 — Configure Tailwind

Edit tailwind.config.js:

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        instituteGreen: "#1A6B3C",
        instituteDarkGreen: "#0E4D2B",
        instituteGold: "#C9A227",
      },
    },
  },
  plugins: [],
};

Edit styles/globals.css:

@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-white text-gray-900;
}

[dir="rtl"] body {
  text-align: right;
}

Verify:

npm run dev

Open:

http://localhost:3000
Step 2.3 — Create i18n config

Create next-i18next.config.js:

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ar"],
  },
};

Edit next.config.js:

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
};

module.exports = nextConfig;
Step 2.4 — Create translation files

Create:

locales/en.json
locales/ar.json

locales/en.json:

{
  "site": {
    "name": "[INSTITUTE_NAME_EN]",
    "tagline": "Professional training and online learning"
  },
  "nav": {
    "home": "Home",
    "about": "About Us",
    "vision": "Vision & Mission",
    "team": "Our Team",
    "programs": "Training Programs",
    "courses": "Online Courses",
    "news": "Institute News",
    "partners": "Partners",
    "joinTrainer": "Join as Trainer",
    "contact": "Contact Us",
    "register": "Register"
  },
  "common": {
    "learnMore": "Learn More",
    "enrollNow": "Enroll Now",
    "readMore": "Read More",
    "submit": "Submit",
    "placeholder": "[CONTENT_PENDING]"
  },
  "home": {
    "heroTitle": "[INSTITUTE_NAME_EN]",
    "heroSubtitle": "Build your skills with professional training programs and online courses.",
    "ctaPrimary": "Explore Courses",
    "ctaSecondary": "Register Now",
    "statsStudents": "Students",
    "statsCourses": "Courses",
    "statsTrainers": "Trainers",
    "featuredCourses": "Featured Courses",
    "latestNews": "Latest News",
    "partners": "Our Partners"
  },
  "about": {
    "title": "About Us",
    "body": "[ABOUT_TEXT_PENDING]"
  },
  "vision": {
    "title": "Vision & Mission",
    "visionTitle": "Our Vision",
    "visionBody": "[VISION_TEXT_PENDING]",
    "missionTitle": "Our Mission",
    "missionBody": "[MISSION_TEXT_PENDING]",
    "valuesTitle": "Core Values"
  },
  "team": {
    "title": "Our Team",
    "adminTitle": "Administrative Staff",
    "facultyTitle": "Faculty"
  },
  "programs": {
    "title": "Training Programs",
    "duration": "Duration",
    "fees": "Fees"
  },
  "programDetail": {
    "title": "Program Details",
    "objectives": "Objectives",
    "syllabus": "Syllabus Overview",
    "schedule": "Duration and Schedule",
    "fees": "Fees Information"
  },
  "register": {
    "title": "Registration & Payment",
    "stepsTitle": "Enrollment Steps",
    "paymentTitle": "Payment Methods",
    "paymentBody": "[PAYMENT_DETAILS_PENDING]",
    "downloadForm": "Download Registration Form"
  },
  "courses": {
    "title": "Online Courses",
    "body": "Courses will link to the LMS after Open edX is connected."
  },
  "news": {
    "title": "Institute News"
  },
  "partners": {
    "title": "Partners"
  },
  "joinTrainer": {
    "title": "Join as Trainer",
    "intro": "Apply to become an instructor with our institute.",
    "requirements": "Requirements",
    "formTitle": "Instructor Application Form"
  },
  "contact": {
    "title": "Contact Us",
    "address": "Buraimi, Oman",
    "phone": "[PHONE_PENDING]",
    "email": "admin@example.com",
    "formTitle": "Contact Enquiry"
  },
  "forms": {
    "name": "Name",
    "fullName": "Full Name",
    "email": "Email Address",
    "phone": "Phone Number",
    "message": "Message",
    "expertise": "Area of Expertise",
    "bio": "Short Bio",
    "courseIdea": "Proposed Course / Topic",
    "cv": "CV Upload",
    "certificates": "Certificates Upload",
    "required": "This field is required",
    "max500": "Maximum 500 characters"
  }
}

locales/ar.json:

{
  "site": {
    "name": "[INSTITUTE_NAME_AR]",
    "tagline": "التدريب المهني والتعليم الإلكتروني"
  },
  "nav": {
    "home": "الرئيسية",
    "about": "من نحن",
    "vision": "الرؤية والرسالة",
    "team": "فريق العمل",
    "programs": "البرامج التدريبية",
    "courses": "الدورات الإلكترونية",
    "news": "أخبار المعهد",
    "partners": "الشركاء",
    "joinTrainer": "انضم كمدرب",
    "contact": "اتصل بنا",
    "register": "التسجيل"
  },
  "common": {
    "learnMore": "اعرف المزيد",
    "enrollNow": "سجل الآن",
    "readMore": "اقرأ المزيد",
    "submit": "إرسال",
    "placeholder": "[المحتوى قيد الانتظار]"
  },
  "home": {
    "heroTitle": "[INSTITUTE_NAME_AR]",
    "heroSubtitle": "طوّر مهاراتك من خلال البرامج التدريبية والدورات الإلكترونية.",
    "ctaPrimary": "استكشف الدورات",
    "ctaSecondary": "سجل الآن",
    "statsStudents": "الطلاب",
    "statsCourses": "الدورات",
    "statsTrainers": "المدربون",
    "featuredCourses": "الدورات المميزة",
    "latestNews": "آخر الأخبار",
    "partners": "شركاؤنا"
  },
  "about": {
    "title": "من نحن",
    "body": "[نص من نحن قيد الانتظار]"
  },
  "vision": {
    "title": "الرؤية والرسالة",
    "visionTitle": "رؤيتنا",
    "visionBody": "[نص الرؤية قيد الانتظار]",
    "missionTitle": "رسالتنا",
    "missionBody": "[نص الرسالة قيد الانتظار]",
    "valuesTitle": "القيم الأساسية"
  },
  "team": {
    "title": "فريق العمل",
    "adminTitle": "الإدارة",
    "facultyTitle": "الهيئة التدريبية"
  },
  "programs": {
    "title": "البرامج التدريبية",
    "duration": "المدة",
    "fees": "الرسوم"
  },
  "programDetail": {
    "title": "تفاصيل البرنامج",
    "objectives": "الأهداف",
    "syllabus": "نظرة عامة على المنهج",
    "schedule": "المدة والجدول",
    "fees": "معلومات الرسوم"
  },
  "register": {
    "title": "التسجيل والدفع",
    "stepsTitle": "خطوات التسجيل",
    "paymentTitle": "طرق الدفع",
    "paymentBody": "[تفاصيل الدفع قيد الانتظار]",
    "downloadForm": "تحميل نموذج التسجيل"
  },
  "courses": {
    "title": "الدورات الإلكترونية",
    "body": "سيتم ربط الدورات بمنصة التعليم الإلكتروني بعد تجهيز Open edX."
  },
  "news": {
    "title": "أخبار المعهد"
  },
  "partners": {
    "title": "الشركاء"
  },
  "joinTrainer": {
    "title": "انضم كمدرب",
    "intro": "قدّم طلبك لتصبح مدرباً في المعهد.",
    "requirements": "المتطلبات",
    "formTitle": "نموذج طلب المدرب"
  },
  "contact": {
    "title": "اتصل بنا",
    "address": "البريمي، سلطنة عمان",
    "phone": "[رقم الهاتف قيد الانتظار]",
    "email": "admin@example.com",
    "formTitle": "نموذج الاستفسار"
  },
  "forms": {
    "name": "الاسم",
    "fullName": "الاسم الكامل",
    "email": "البريد الإلكتروني",
    "phone": "رقم الهاتف",
    "message": "الرسالة",
    "expertise": "مجال الخبرة",
    "bio": "نبذة مختصرة",
    "courseIdea": "الدورة أو الموضوع المقترح",
    "cv": "رفع السيرة الذاتية",
    "certificates": "رفع الشهادات",
    "required": "هذا الحقل مطلوب",
    "max500": "الحد الأقصى 500 حرف"
  }
}
Step 2.5 — Create translation helper

Create lib/i18n.js:

import en from "../locales/en.json";
import ar from "../locales/ar.json";

const dictionaries = { en, ar };

export function getDictionary(locale) {
  return dictionaries[locale] || dictionaries.en;
}

export function t(dict, path) {
  return path.split(".").reduce((obj, key) => obj?.[key], dict) || path;
}
Step 2.6 — Create layout components

Create components/Layout.js:

import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children, dict }) {
  const router = useRouter();
  const dir = router.locale === "ar" ? "rtl" : "ltr";

  return (
    <div dir={dir} lang={router.locale} className="min-h-screen flex flex-col">
      <Navbar dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer dict={dict} />
    </div>
  );
}

Create components/Navbar.js:

import Link from "next/link";
import { useRouter } from "next/router";
import { t } from "../lib/i18n";

export default function Navbar({ dict }) {
  const router = useRouter();
  const nextLocale = router.locale === "ar" ? "en" : "ar";

  const navItems = [
    ["/", "nav.home"],
    ["/about", "nav.about"],
    ["/vision", "nav.vision"],
    ["/team", "nav.team"],
    ["/programs", "nav.programs"],
    ["/courses", "nav.courses"],
    ["/news", "nav.news"],
    ["/partners", "nav.partners"],
    ["/join-trainer", "nav.joinTrainer"],
    ["/contact", "nav.contact"]
  ];

  return (
    <header className="bg-instituteDarkGreen text-white">
      <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="font-bold text-xl">
          {t(dict, "site.name")}
        </Link>

        <nav className="flex flex-wrap gap-4 text-sm">
          {navItems.map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-instituteGold">
              {t(dict, label)}
            </Link>
          ))}
        </nav>

        <Link
          href={router.asPath}
          locale={nextLocale}
          className="rounded border border-instituteGold px-3 py-1 text-sm"
        >
          {nextLocale.toUpperCase()}
        </Link>
      </div>
    </header>
  );
}

Create components/Footer.js:

import { t } from "../lib/i18n";

export default function Footer({ dict }) {
  return (
    <footer className="bg-instituteDarkGreen text-white mt-12">
      <div className="mx-auto max-w-7xl px-4 py-8 grid gap-4 md:grid-cols-3">
        <div>
          <h2 className="font-bold text-lg">{t(dict, "site.name")}</h2>
          <p className="text-sm mt-2">{t(dict, "site.tagline")}</p>
        </div>
        <div>
          <h3 className="font-semibold">{t(dict, "contact.title")}</h3>
          <p className="text-sm mt-2">{t(dict, "contact.address")}</p>
          <p className="text-sm">{t(dict, "contact.email")}</p>
        </div>
        <div>
          <p className="text-sm">© {new Date().getFullYear()} {t(dict, "site.name")}</p>
        </div>
      </div>
    </footer>
  );
}
Step 2.7 — Create reusable page components

Create components/PageHeader.js:

export default function PageHeader({ title, subtitle }) {
  return (
    <section className="bg-gray-50 border-b">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-instituteDarkGreen">
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-3xl text-gray-700">{subtitle}</p>}
      </div>
    </section>
  );
}

Create components/Card.js:

export default function Card({ title, children, action }) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-instituteDarkGreen">{title}</h3>
      <div className="mt-3 text-gray-700">{children}</div>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
Step 2.8 — Create all 12 pages

Every page must use:

import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { getDictionary, t } from "../lib/i18n";

Each page must export getStaticProps.

Example page pattern:

export async function getStaticProps({ locale }) {
  return {
    props: {
      dict: getDictionary(locale),
    },
  };
}

Create these files:

pages/index.js
pages/about.js
pages/vision.js
pages/team.js
pages/programs.js
pages/program-detail.js
pages/register.js
pages/courses.js
pages/news.js
pages/partners.js
pages/join-trainer.js
pages/contact.js
pages/index.js
import Link from "next/link";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { getDictionary, t } from "../lib/i18n";

export default function Home({ dict }) {
  const cards = [
    "Business Skills",
    "Marketing",
    "Technology",
  ];

  return (
    <Layout dict={dict}>
      <section className="bg-gradient-to-br from-instituteDarkGreen to-instituteGreen text-white">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <h1 className="text-4xl md:text-6xl font-bold">{t(dict, "home.heroTitle")}</h1>
          <p className="mt-6 max-w-2xl text-lg">{t(dict, "home.heroSubtitle")}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/courses" className="rounded bg-instituteGold px-6 py-3 font-semibold text-gray-900">
              {t(dict, "home.ctaPrimary")}
            </Link>
            <Link href="/register" className="rounded border border-white px-6 py-3 font-semibold">
              {t(dict, "home.ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 grid gap-6 md:grid-cols-3">
        <Card title={`500+ ${t(dict, "home.statsStudents")}`}>[STAT_PENDING]</Card>
        <Card title={`20+ ${t(dict, "home.statsCourses")}`}>[STAT_PENDING]</Card>
        <Card title={`15+ ${t(dict, "home.statsTrainers")}`}>[STAT_PENDING]</Card>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold text-instituteDarkGreen">{t(dict, "home.featuredCourses")}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {cards.map((item) => (
            <Card key={item} title={item}>
              <p>{t(dict, "common.placeholder")}</p>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { dict: getDictionary(locale) } };
}

For the other pages, create proper layout sections using PageHeader and Card. Use placeholder data arrays inside the page for now, but all labels/headings/buttons must come from translation JSON.

Step 2.9 — Website verification

Run:

npm run dev

Check these URLs manually:

http://localhost:3000/
http://localhost:3000/about
http://localhost:3000/vision
http://localhost:3000/team
http://localhost:3000/programs
http://localhost:3000/program-detail
http://localhost:3000/register
http://localhost:3000/courses
http://localhost:3000/news
http://localhost:3000/partners
http://localhost:3000/join-trainer
http://localhost:3000/contact
http://localhost:3000/ar
http://localhost:3000/ar/about

Then run:

npm run build

Success criteria:

- Build passes.
- All 12 pages exist.
- EN/AR language switch works.
- Arabic pages use RTL direction.
- No major layout break on mobile width.
- No visible English hardcoded text on Arabic pages except placeholders.
Phase 3 — Build Django Forms API

The project needs two forms: feedback and instructor application. Feedback stores name, email, message, status, and created date. Instructor application stores applicant details, CV, certificates, status, and created date .

Django FileField can save uploaded files to the path defined by upload_to, and Django file uploads are handled through uploaded file objects in request.FILES.

Step 3.1 — Create Django app

From root:

cd apps
mkdir forms-api
cd forms-api
python -m venv .venv

Activate environment.

Mac/Linux:

source .venv/bin/activate

Windows:

.venv\Scripts\activate

Install:

pip install django django-cors-headers pillow python-dotenv
pip freeze > requirements.txt
django-admin startproject institute_forms .
python manage.py startapp feedback
python manage.py startapp trainer_applications
Step 3.2 — Configure settings

Edit institute_forms/settings.py.

Add apps:

INSTALLED_APPS = [
    # default Django apps...
    "corsheaders",
    "feedback",
    "trainer_applications",
]

Add middleware near top:

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    # existing middleware...
]

Add:

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
DEFAULT_FROM_EMAIL = "noreply@example.com"
ADMIN_NOTIFICATION_EMAIL = "admin@example.com"

Edit root urls.py:

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/feedback/", include("feedback.urls")),
    path("api/trainer-applications/", include("trainer_applications.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
Step 3.3 — Feedback model

Edit feedback/models.py:

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

Create feedback/forms.py:

from django import forms
from .models import Feedback

class FeedbackForm(forms.ModelForm):
    class Meta:
        model = Feedback
        fields = ["name", "email", "message"]

    def clean_message(self):
        message = self.cleaned_data["message"].strip()
        if not message:
            raise forms.ValidationError("Message is required.")
        if len(message) > 500:
            raise forms.ValidationError("Message must be 500 characters or less.")
        return message

Create feedback/views.py:

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

Create feedback/urls.py:

from django.urls import path
from .views import submit_feedback

urlpatterns = [
    path("", submit_feedback, name="submit_feedback"),
]

Edit feedback/admin.py:

from django.contrib import admin
from .models import Feedback

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "status", "created"]
    list_filter = ["status", "created"]
    list_editable = ["status"]
    search_fields = ["name", "email", "message"]
Step 3.4 — Instructor application model

Edit trainer_applications/models.py:

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

Create trainer_applications/forms.py:

from django import forms
from .models import InstructorApplication

class InstructorApplicationForm(forms.ModelForm):
    class Meta:
        model = InstructorApplication
        fields = [
            "full_name",
            "email",
            "phone",
            "expertise",
            "bio",
            "course_idea",
            "cv_file",
            "cert_1",
            "cert_2",
            "cert_3",
        ]

    def clean_bio(self):
        bio = self.cleaned_data["bio"].strip()
        if len(bio) > 500:
            raise forms.ValidationError("Bio must be 500 characters or less.")
        return bio

Create trainer_applications/views.py:

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

Create trainer_applications/urls.py:

from django.urls import path
from .views import submit_application

urlpatterns = [
    path("", submit_application, name="submit_application"),
]

Edit trainer_applications/admin.py:

from django.contrib import admin
from .models import InstructorApplication

@admin.register(InstructorApplication)
class InstructorAppAdmin(admin.ModelAdmin):
    list_display = ["full_name", "email", "expertise", "status", "created"]
    list_filter = ["status", "expertise", "created"]
    list_editable = ["status"]
    search_fields = ["full_name", "email", "expertise", "course_idea"]
Step 3.5 — Run migrations
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 8000

Verify:

http://localhost:8000/admin/

Success criteria:

- Admin login works.
- Feedback appears in admin.
- Instructor applications appear in admin.
- Status can be changed from Pending to Approved/Rejected.
- Uploaded files are saved under media/applications/.
Phase 4 — Connect Website Forms to Django API
Step 4.1 — Add feedback form page or contact form

In website, create components/FeedbackForm.js.

Requirements:

- Name optional
- Email optional
- Message required
- Message max 500 characters
- Live character counter
- POST to http://localhost:8000/api/feedback/
Step 4.2 — Add instructor application form

Create components/InstructorApplicationForm.js.

Requirements:

- Full Name required
- Email required
- Phone required
- Area of Expertise required
- Short Bio required, max 500 characters
- Proposed Course / Topic required
- CV required, PDF/DOC/DOCX only
- Certificates optional, max 3 files, PDF/JPG/JPEG/PNG
- POST multipart/form-data to http://localhost:8000/api/trainer-applications/
Step 4.3 — Add forms to pages

Add feedback/contact form to:

pages/contact.js

Add instructor form to:

pages/join-trainer.js

Verify:

cd apps/website
npm run dev

Also run Django:

cd apps/forms-api
python manage.py runserver 8000

Test:

- Submit feedback.
- Check Django admin.
- Submit instructor application with test file.
- Check Django admin and media folder.
Phase 5 — Documentation Files

Create docs/CLIENT_PENDING_ITEMS.md:

# Client Pending Items

The following items are required before final production deployment:

## Branding
- Institute full name in English
- Institute full name in Arabic
- Logo file, PNG preferred, transparent background preferred
- Brand confirmation for green/gold colors

## Domain and Hosting
- Final domain name
- VPS access details
- DNS access or permission to update records

## Contact and Email
- Admin email address
- Phone numbers
- Public contact email
- SMTP/email sending credentials if required

## Website Content
- About Us text in English and Arabic
- Vision text in English and Arabic
- Mission text in English and Arabic
- Team member names, titles, bios, photos
- Program list with descriptions, duration, fees
- News articles
- Partner logos and descriptions

## Payment
- Bank transfer details
- Online payment link, if any
- Registration form file, if any

## Certificate
- Authorized signatory name
- Authorized signatory title
- Signature image, if available

Create docs/LOCAL_SETUP.md:

# Local Setup

## Website

```bash
cd apps/website
npm install
npm run dev

Open:

http://localhost:3000
Django Forms API
cd apps/forms-api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000

Open:

http://localhost:8000/admin/

Create `docs/OPENEDX_LOCAL_SETUP.md`:

```md
# Open edX Local Setup with Tutor

Use this when Docker is available locally.

```bash
pip install "tutor[full]"
tutor config save --set LMS_HOST=local.openedx.io --set CMS_HOST=studio.local.openedx.io
tutor local launch
tutor local run lms ./manage.py lms createsuperuser

Temporary URLs:

http://local.openedx.io
http://studio.local.openedx.io

Later, when real domain is available:

tutor config save --set LMS_HOST=lms.REAL_DOMAIN.com
tutor config save --set CMS_HOST=studio.REAL_DOMAIN.com
tutor config save --set ENABLE_HTTPS=true
tutor local launch

Create `docs/QA_CHECKLIST.md` using the project’s original QA categories:

```md
# QA Checklist

## Website
- [x] All 12 pages load.
- [x] Navbar links work.
- [x] Footer links work.
- [x] English language works.
- [x] Arabic language works.
- [x] RTL layout works.
- [x] Mobile layout works at 375px.
- [x] Tablet layout works at 768px.
- [x] Desktop layout works at 1440px.
- [x] No hardcoded English text appears in Arabic mode.
- [x] No broken images.

## Feedback Form
- [ ] Name optional.
- [ ] Email optional.
- [ ] Message required.
- [ ] Message max 500 characters.
- [ ] Character counter works.
- [ ] Submission appears in Django admin.
- [ ] Status editable in Django admin.

## Instructor Application Form
- [ ] Required fields validated.
- [ ] Bio max 500 characters.
- [ ] CV required.
- [ ] CV accepts PDF/DOC/DOCX.
- [ ] Certificates optional.
- [ ] Certificates accept PDF/JPG/JPEG/PNG.
- [ ] Files max 5MB.
- [ ] Submission appears in Django admin.
- [ ] Status editable: Pending, Approved, Rejected.

## Open edX
- [ ] LMS launches locally or on VPS.
- [ ] Studio launches.
- [ ] Admin user created.
- [ ] LMS URL updated after real domain is available.
- [ ] Studio URL updated after real domain is available.

## Production Later
- [ ] DNS records configured.
- [ ] HTTPS enabled.
- [ ] Real logo added.
- [ ] Real content added.
- [ ] Real admin email configured.
- [ ] Payment details added.

Create docs/HANDOVER_CHECKLIST.md:

# Handover Checklist

- [ ] VPS credentials handed over securely.
- [ ] LMS admin URL provided.
- [ ] LMS admin username/password provided.
- [ ] Studio URL provided.
- [ ] Website source code delivered.
- [ ] Database backup delivered.
- [ ] Certificate templates delivered.
- [ ] Admin guide delivered.
- [ ] Training session completed.
- [ ] 30-day bug-fix support start date confirmed.

Create docs/CERTIFICATE_TEMPLATE_NOTES.md:

# Certificate Template Notes

Create two Word certificate templates later:

1. Certificate_Template_EN.docx
2. Certificate_Template_AR.docx

Both should include:

- Institute logo placeholder
- Green and gold border
- Certificate title
- Student name placeholder: [STUDENT NAME]
- Course name placeholder: [COURSE NAME]
- Date placeholder: [DATE]
- Authorized signatory placeholder: [AUTHORIZED PERSON NAME]
- Signatory title placeholder: [TITLE]
- Institute name and address placeholder

Final logo and institute name are pending from client.
Phase 6 — Optional Local Open edX Setup

Only do this if Docker is installed and local machine has enough resources.

Run:

pip install "tutor[full]"
tutor config save --set LMS_HOST=local.openedx.io --set CMS_HOST=studio.local.openedx.io
tutor local launch
tutor local run lms ./manage.py lms createsuperuser

Success criteria:

- LMS opens locally.
- Studio opens locally.
- Superuser created.

If Docker or hardware is not ready, do not block. Just complete docs/OPENEDX_LOCAL_SETUP.md.

Phase 7 — Final Verification Commands

From website:

cd apps/website
npm run build

From Django:

cd apps/forms-api
python manage.py check
python manage.py makemigrations --check
python manage.py test

Manual checks:

- Website loads.
- Arabic route loads.
- RTL works.
- Feedback submits.
- Instructor application submits.
- Django admin displays both models.
- Files upload correctly.
- Docs are complete.
Final Output Required From Agent

At the end, report only this:

## Completed

- [x] Root project structure created
- [x] Next.js website created
- [x] 12 pages created
- [x] EN/AR translations created
- [x] RTL layout added
- [x] Navbar/Footer added
- [x] Feedback form backend created
- [x] Instructor application backend created
- [x] Django admin configured
- [x] File upload validation added
- [x] Website forms connected to Django API
- [x] Documentation created
- [x] Local verification passed

## Commands Run

- `mkdir -p institute-platform/apps institute-platform/docs`
- `npx -y create-next-app@latest website --js --eslint --no-tailwind --no-src-dir --no-app --import-alias "@/*" --use-npm`
- `npm install next-i18next react-i18next i18next @headlessui/react`
- `npm install -D tailwindcss@3 postcss autoprefixer`
- `npx tailwindcss init -p`
- `python3 -m venv .venv`
- `source .venv/bin/activate`
- `pip install django django-cors-headers pillow python-dotenv`
- `python manage.py makemigrations`
- `python manage.py migrate`
- `echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'admin@example.com', 'admin123') if not User.objects.filter(username='admin').exists() else None" | python manage.py shell`
- `npm run build`

## Pending Client Items

- **Branding**: Institute full names (EN/AR), Logo file, Brand color confirmation.
- **Content**: About Us, Vision, Mission, Team details (names, titles, bios, photos), Program list (descriptions, duration, fees), News articles, Partner logos.
- **Contact**: Admin email, Phone numbers, Public contact email.
- **Payment**: Bank transfer details, Online payment link, Registration form file.
- **Infrastructure**: Final domain name, VPS access details, SMTP/email credentials.
- **Certification**: Authorized signatory details and signature image.

## Issues

- **Tutor/Open edX**: Skipped actual installation of Tutor/Open edX (Phase 6) to avoid environment/resource issues in the local sandbox, but fully documented the setup in `docs/OPENEDX_LOCAL_SETUP.md`.
- **Tailwind Version**: Forced Tailwind CSS v3 installation to ensure compatibility with the provided `tailwind.config.js` structure, as Tailwind v4 handles configuration differently.
- **Next Config**: Renamed `next.config.mjs` to `next.config.js` and adapted it to use CommonJS `require` to match the `next-i18next` integration instructions.

Use this as the first task for Antigravity:

Create the full local-first institute-platform project exactly according to the Antigravity Agent I