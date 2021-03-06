# Generated by Django 3.2 on 2021-04-26 23:06

import commerce.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Imagen',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imagen', models.ImageField(upload_to=commerce.models.scramble_uploaded_filename)),
                ('descripcion', models.CharField(blank=True, max_length=50, null=True)),
                ('prioridad', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'ordering': ('prioridad',),
            },
        ),
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=50)),
                ('categoria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='commerce.categoria')),
                ('imagenes', models.ManyToManyField(blank=True, to='commerce.Imagen')),
            ],
        ),
    ]
