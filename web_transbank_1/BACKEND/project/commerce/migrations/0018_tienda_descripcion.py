# Generated by Django 3.2 on 2021-05-19 16:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0017_auto_20210517_1740'),
    ]

    operations = [
        migrations.AddField(
            model_name='tienda',
            name='descripcion',
            field=models.TextField(blank=True, null=True),
        ),
    ]