# Generated by Django 3.2 on 2021-05-09 17:34

from django.db import migrations, models
import django.db.models.deletion
import fernet_fields.fields
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('pag', '0005_auto_20210509_1734'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserPagina',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('nombre', models.CharField(max_length=50)),
                ('password', fernet_fields.fields.EncryptedTextField()),
                ('telefono', models.IntegerField(blank=True, null=True)),
                ('pagina', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pag.pagina')),
            ],
            options={
                'unique_together': {('pagina', 'email')},
                'index_together': {('pagina', 'email')},
            },
        ),
        migrations.CreateModel(
            name='TokenUserPagina',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(default=uuid.uuid4, max_length=254, unique=True)),
                ('userPagina', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='authorization.userpagina')),
            ],
        ),
    ]