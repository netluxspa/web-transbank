# Generated by Django 3.2 on 2021-06-12 18:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0039_alter_formatoenvio_producto'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imagen',
            name='producto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='imagenes', to='commerce.producto'),
        ),
    ]
