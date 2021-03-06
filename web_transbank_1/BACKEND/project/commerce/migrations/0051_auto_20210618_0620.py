# Generated by Django 3.2 on 2021-06-18 10:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0050_auto_20210616_1531'),
    ]

    operations = [
        migrations.CreateModel(
            name='ConfigLogistica',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lng', models.CharField(max_length=200, null=True)),
                ('lat', models.CharField(max_length=200, null=True)),
                ('address', models.CharField(max_length=200, null=True)),
                ('ready', models.BooleanField(default=False)),
                ('starken_origen_code', models.IntegerField(blank=True, null=True)),
                ('starken_origin_name', models.CharField(blank=True, max_length=50, null=True)),
                ('rango_zonal', models.FloatField(blank=True, null=True)),
                ('politica_envio', models.CharField(blank=True, max_length=100, null=True)),
                ('tienda', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='config_logistica', to='commerce.tienda')),
            ],
        ),
        migrations.DeleteModel(
            name='ConfigTienda',
        ),
    ]
