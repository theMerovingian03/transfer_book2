# Generated by Django 5.0.4 on 2024-05-15 14:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='record',
            name='transaction_type',
            field=models.CharField(choices=[('credit', 'Credit'), ('debit', 'Debit')], default='debit', max_length=6),
        ),
    ]
