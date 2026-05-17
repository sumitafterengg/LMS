# Open edX Local Setup with Tutor

Use this when Docker is available locally.

```bash
pip install "tutor[full]"
tutor config save --set LMS_HOST=local.openedx.io --set CMS_HOST=studio.local.openedx.io
tutor local launch
tutor local run lms ./manage.py lms createsuperuser
```

Temporary URLs:
- [http://local.openedx.io](http://local.openedx.io)
- [http://studio.local.openedx.io](http://studio.local.openedx.io)

Later, when real domain is available:
```bash
tutor config save --set LMS_HOST=lms.REAL_DOMAIN.com
tutor config save --set CMS_HOST=studio.REAL_DOMAIN.com
tutor config save --set ENABLE_HTTPS=true
tutor local launch
```

## White-labeling (Branding)

To remove the default Open edX branding, the platform has been configured to use the **Indigo** theme. 
The following customizations have already been applied to your local environment:
```bash
tutor config save --set PLATFORM_NAME="Institute LMS"
tutor config save --set INDIGO_PRIMARY_COLOR="#1A6B3C"
tutor local launch --non-interactive
```

### Remaining Steps (Action Required)

**1. Replace Logos:**
To fully remove the Open edX logo, you must replace the following files with your own transparent PNGs (ensure the file names remain the same):
- **LMS Logo**: `tutor-venv/lib/python3.13/site-packages/tutorindigo/templates/indigo/lms/static/images/logo.png`
- **Studio Logo**: `tutor-venv/lib/python3.13/site-packages/tutorindigo/templates/indigo/cms/static/images/studio-logo.png`
- **Favicon**: `tutor-venv/lib/python3.13/site-packages/tutorindigo/templates/indigo/lms/static/images/favicon.ico`

**2. Update Welcome Message:**
```bash
tutor config save --set INDIGO_WELCOME_MESSAGE="Welcome to [INSTITUTE_NAME_EN] Learning Portal"
```

**3. Update Footer Links:**
```bash
tutor config save --set INDIGO_FOOTER_NAV_LINKS="[{'title': 'Our Website', 'url': 'https://[DOMAIN_PENDING]'}]"
```

**4. Apply Changes:**
After making any logo replacements or configuration changes, always run:
```bash
tutor local launch --non-interactive
```
