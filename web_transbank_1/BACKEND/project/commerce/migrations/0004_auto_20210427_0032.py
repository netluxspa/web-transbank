# Generated by Django 3.2 on 2021-04-27 00:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0003_producto_precio'),
    ]

    operations = [
        migrations.AddField(
            model_name='categoria',
            name='tienda',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='commerce.tienda'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='producto',
            name='categoria',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='commerce.categoria'),
        ),
    ]
