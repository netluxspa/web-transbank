# Generated by Django 3.2 on 2021-07-06 14:44

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0063_auto_20210706_1037'),
    ]

    operations = [
        migrations.AddField(
            model_name='politicasenvio',
            name='c_volumen',
            field=models.FloatField(default=1, validators=[django.core.validators.MinValueValidator(0)]),
            preserve_default=False,
        ),
    ]
