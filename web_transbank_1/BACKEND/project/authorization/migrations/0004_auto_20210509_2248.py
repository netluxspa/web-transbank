# Generated by Django 3.2 on 2021-05-09 22:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0003_ownerpagina_tokenownerpagina'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='userpagina',
            unique_together=None,
        ),
        migrations.AlterIndexTogether(
            name='userpagina',
            index_together=None,
        ),
        migrations.RemoveField(
            model_name='userpagina',
            name='pagina',
        ),
        migrations.DeleteModel(
            name='TokenUser',
        ),
        migrations.DeleteModel(
            name='UserPagina',
        ),
    ]
