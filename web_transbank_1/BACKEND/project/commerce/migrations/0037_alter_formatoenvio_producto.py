# Generated by Django 3.2 on 2021-06-12 17:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0036_alter_formatoenvio_producto'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formatoenvio',
            name='producto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='commerce.producto'),
        ),
    ]
