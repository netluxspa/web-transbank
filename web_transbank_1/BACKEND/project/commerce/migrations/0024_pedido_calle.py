# Generated by Django 3.2 on 2021-05-23 20:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0023_auto_20210523_1902'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='calle',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]
