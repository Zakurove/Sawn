# Generated by Django 3.0.7 on 2021-03-26 21:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0012_remove_episode_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='episode',
            name='datee',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
