# Generated by Django 3.2 on 2021-07-12 18:48

from django.db import migrations, models
import pag.models


class Migration(migrations.Migration):

    dependencies = [
        ('pag', '0074_alter_codeverificationadmin_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='codeverificationadmin',
            name='code',
            field=models.IntegerField(default=pag.models.random_string),
        ),
    ]
