# Generated by Django 5.0.4 on 2024-06-01 11:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0014_alter_useraccount_profile_picture'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='is_admin',
            field=models.BooleanField(default=False),
        ),
    ]
