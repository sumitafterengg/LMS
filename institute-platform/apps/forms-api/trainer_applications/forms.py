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
