# Generated by Django 3.0.3 on 2020-07-04 01:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0012_auto_20200704_0431'),
    ]

    operations = [
        migrations.AlterField(
            model_name='respmicroimage',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]
