# Generated by Django 5.0.4 on 2024-06-25 20:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0025_alter_stressquestion_question_reportgeneration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reportgeneration',
            name='downloaded_on',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='reportgeneration',
            name='role',
            field=models.CharField(max_length=10),
        ),
    ]
