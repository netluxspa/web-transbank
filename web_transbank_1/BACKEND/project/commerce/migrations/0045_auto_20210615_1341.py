# Generated by Django 3.2 on 2021-06-15 17:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0044_caja_tienda'),
    ]

    operations = [
        migrations.AddField(
            model_name='caja',
            name='titulo',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tienda',
            name='color',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
