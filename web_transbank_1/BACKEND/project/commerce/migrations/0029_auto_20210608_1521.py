# Generated by Django 3.2 on 2021-06-08 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0028_parrafo_texto'),
    ]

    operations = [
        migrations.AddField(
            model_name='tienda',
            name='starken_origen_code',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='tienda',
            name='starken_origin_name',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
