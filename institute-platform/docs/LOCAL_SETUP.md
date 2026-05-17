# Local Development Setup Guide

Follow these instructions to run the entire Institute Platform locally.

## 🚀 Running All Services

For the full experience, you need to run three separate components:

### 1. Next.js Website (Frontend)
The public-facing website for students and trainers.
```bash
cd apps/website
npm install
npm run dev
```
**Access:** [http://localhost:3000](http://localhost:3000)

---

### 2. Django Forms API (Backend)
Handles contact forms and trainer applications.
```bash
cd apps/forms-api
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```
**Access:** [http://localhost:8000/admin/](http://localhost:8000/admin/)

---

### 3. Open edX Platform (LMS/Tutor)
The learning management system for hosting courses.
```bash
source tutor-venv/bin/activate
tutor local launch
```
**Access:**
- **LMS:** [http://local.openedx.io](http://local.openedx.io)
- **Studio:** [http://studio.local.openedx.io](http://studio.local.openedx.io)

---

## 🎨 Branding & White-labeling

The Open edX platform is pre-configured with the **Indigo** theme and institute branding:
- **Platform Name:** Institute LMS
- **Brand Color:** `#1A6B3C` (Primary Green)

To update branding, use these commands:
```bash
tutor config save --set PLATFORM_NAME="[YOUR_NAME]" --set INDIGO_PRIMARY_COLOR="#[YOUR_COLOR]"
tutor local launch --non-interactive
```

---

## 🔑 Login Credentials (Open edX)

If you are facing "Too many failed login attempts" with `admin`, try the new **root** account:

- **Username:** `root`
- **Password:** `root123`

### Troubleshooting Login Issues
If you are locked out, run this command to clear the cache and reset the admin account:
```bash
# 1. Reset Admin password
source /Users/sumitambre/LMS/institute-platform/tutor-venv/bin/activate
tutor local run lms ./manage.py lms shell < /Users/sumitambre/LMS/institute-platform/reset_admin.py

# 2. Clear rate limit cache
tutor local run lms ./manage.py lms shell -c "from django.core.cache import cache; cache.clear()"
```

> [!TIP]
> Use a **Private/Incognito window** if you see "Too many failed login attempts" as your browser might be holding onto a blocked session.

---

## 🆕 Activating New User Accounts (No Email Server Locally)

When a new user registers on the LMS locally, they will see "We need to verify your email address" and **won't receive any email** because there is no real SMTP server. To manually activate a user and grant them Studio access, run:

```bash
source /Users/sumitambre/LMS/institute-platform/tutor-venv/bin/activate

# Step 1: Activate email verification
tutor local run lms ./manage.py lms shell -c "
from django.contrib.auth.models import User
from common.djangoapps.student.models import Registration
u = User.objects.get(email='USER_EMAIL_HERE')
u.is_active = True
u.save()
reg = Registration.objects.get(user=u)
reg.activate()
print('Activated:', u.username)
"

# Step 2: Grant Staff + Superuser (required for Studio access)
tutor local run lms ./manage.py lms shell -c "
from django.contrib.auth.models import User
u = User.objects.get(email='USER_EMAIL_HERE')
u.is_staff = True
u.is_superuser = True
u.save()
print('Staff access granted to:', u.username)
"
```

> **Note:** Replace `USER_EMAIL_HERE` with the actual email the user registered with. After running these commands, the user can log in and access Studio at [http://studio.local.openedx.io](http://studio.local.openedx.io)
