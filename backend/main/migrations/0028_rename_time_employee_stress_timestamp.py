# Generated by Django 5.0.4 on 2024-06-28 09:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0027_alter_employee_stress_stress_data'),
    ]

    operations = [
        migrations.RenameField(
            model_name='employee_stress',
            old_name='time',
            new_name='timestamp',
        ),
    ]
