# Generated by Django 3.2 on 2021-07-22 00:14

from django.db import migrations, models
import pag.models


class Migration(migrations.Migration):

    dependencies = [
        ('pag', '0093_alter_codeverificationadmin_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='codeverificationadmin',
            name='code',
            field=models.IntegerField(default=pag.models.random_string),
        ),
    ]