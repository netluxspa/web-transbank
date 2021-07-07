# Generated by Django 3.2 on 2021-06-12 18:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0043_remove_caja_tienda'),
    ]

    operations = [
        migrations.AddField(
            model_name='caja',
            name='tienda',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='commerce.tienda'),
            preserve_default=False,
        ),
    ]
