# Generated by Django 3.2 on 2021-06-21 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0051_auto_20210618_0620'),
    ]

    operations = [
        migrations.AddField(
            model_name='configlogistica',
            name='calle',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='configlogistica',
            name='ciudad',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='configlogistica',
            name='detalle',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='configlogistica',
            name='numCalle',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='configlogistica',
            name='pais',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
