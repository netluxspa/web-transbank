# Generated by Django 3.2 on 2021-07-16 22:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0079_auto_20210713_1830'),
    ]

    operations = [
        migrations.AddField(
            model_name='enviopedido',
            name='status',
            field=models.BooleanField(default=None),
        ),
    ]
