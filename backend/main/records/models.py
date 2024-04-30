from django.db import models
from django.utils import timezone
from users.models import User
from datetime import date

# Create your models here.


class Record(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    amount = models.IntegerField()
    date_added = models.DateTimeField(auto_now_add=True)
    date_payed = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        order_with_respect_to = 'user'

    def save(self, *args, **kwargs):
        if self.date_payed is None:
            self.date_payed = timezone.now()

        super().save(*args, **kwargs)
