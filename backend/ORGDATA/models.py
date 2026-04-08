from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE
# Create your models here.

class Divisions(models.Model):
    name = models.CharField(max_length=100)
    executive = models.ForeignKey(User,on_delete=models.DO_NOTHING,related_name='executives',null=True,blank=True)

    def __str__(self):
        return f'{self.name}'

class Offices(models.Model):
    name = models.CharField(max_length=100)


class Departments(models.Model):
    name = models.CharField(max_length=100)
    manager = models.ForeignKey(User,on_delete=models.DO_NOTHING,related_name='managers',null=True,blank=True)

    def __str__(self):
        return f'{self.name}'

class division_Depts(models.Model):
    division=models.ForeignKey(Divisions,on_delete=models.DO_NOTHING,related_name='divisions')
    Department=models.ForeignKey(Departments,on_delete=models.DO_NOTHING,related_name='department')

class Sections(models.Model):
    name = models.CharField(max_length=100)
    manager = models.ForeignKey(User,on_delete=models.DO_NOTHING,related_name='section_leads',null=True,blank=True)

    def __str__(self):
        return f'{self.name}'

class department_Secs(models.Model):
    department=models.ForeignKey(Departments,on_delete=models.DO_NOTHING,related_name='departments')
    section=models.ForeignKey(Sections,on_delete=models.DO_NOTHING,related_name='section')

class SubSections(models.Model):
    name = models.CharField(max_length=100)
    manager=models.ForeignKey(User,on_delete=models.DO_NOTHING, related_name='subsection_leads',null=True,blank=True)

    def __str__(self):
        return f'{self.name}'

class section_subs(models.Model):
    section=models.ForeignKey(Sections,on_delete=models.DO_NOTHING,related_name='sections')
    subsection=models.ForeignKey(SubSections,on_delete=models.DO_NOTHING,related_name='subsections')

class title_Level(models.Model):
    name=models.CharField(max_length=100)
    rank=models.IntegerField(null=True,blank=True)

    def __str__(self):
        return f'{self.name}'

class job_Title(models.Model):
    name=models.CharField(max_length=100)
    level=models.ForeignKey(title_Level,on_delete=models.DO_NOTHING,related_name='titles')

    def __str__(self):
        return f'{self.name}'

class salary_Band(models.Model):
    band_name=models.CharField(max_length=5)
    band_minimum=models.DecimalField(max_digits = 8,decimal_places = 2)
    band_maximum=models.DecimalField(max_digits = 8,decimal_places = 2)

class level_SalaryBand(models.Model):
    title=models.ForeignKey(title_Level,on_delete=models.DO_NOTHING,related_name='level')
    title_band=models.ForeignKey(salary_Band,on_delete=models.DO_NOTHING,related_name='band')

class job_Profiles(models.Model):
    position_name=models.ForeignKey(job_Title,on_delete=models.DO_NOTHING,null=True,related_name='position')
    Supervising_Position=models.ForeignKey(job_Title,on_delete=models.DO_NOTHING,null=True,related_name='supervisor_position')
    required_experience=models.TextField(null=True,blank=True)
    knowledge=models.CharField(max_length=250,null=True,blank=True)
    purpose=models.CharField(max_length=250,null=True,blank=True)
    position_status=models.CharField(max_length=20,null=True,blank=True)
    approved_compliment=models.IntegerField(null=True,blank=True)
    current_Complement_Level=models.IntegerField(null=True,blank=True)
    department=models.ForeignKey(Departments, on_delete=models.DO_NOTHING, related_name='profile_department',null=True,blank=True)
    section=models.ForeignKey(Sections,on_delete=models.DO_NOTHING,null=True,blank=True)
    subsection=models.ForeignKey(SubSections,on_delete=models.DO_NOTHING,null=True,blank=True)

    def __str__(self):
        return f'{self.position_name}'

class job_profile_Requirements(models.Model):
    profile=models.ForeignKey(job_Profiles,on_delete=models.CASCADE)
    ppe=models.BooleanField(default=False)
    licence=models.BooleanField(default=False)

class employee_Contracts(models.Model):
    employee=models.ForeignKey(User,on_delete=models.DO_NOTHING, related_name='employee')
    start_Date=models.DateField(null=True,blank=True)
    end_Date=models.DateField(null=True,blank=True)
    
    def __str__(self):
        return f'{self.employee}     {self.end_Date}'

class date_of_joining(models.Model):
    employee=models.ForeignKey(User,on_delete=models.DO_NOTHING,related_name="date_of_joining")
    joining_date=models.DateField()

    def __str__(self):
        return f'{self.joining_date}'
    
class employee_salaries(models.Model):
    employee=models.ForeignKey(User,on_delete=CASCADE,related_name="salary")
    basic_salary=models.DecimalField(max_digits = 8,decimal_places = 2)

    class Meta:
        ordering = ["-basic_salary", "employee__username"]  # highest first

    def get_rank(self):
        return employee_salaries.objects.filter(basic_salary__gt=self.basic_salary).count() + 1

    def __str__(self):
        name = self.employee.get_full_name() or self.employee.username
        return f"Rank {self.get_rank()} - {name} - {self.basic_salary}"
    
class employee_bankdetails(models.Model):
    employee=models.ForeignKey(User,on_delete=CASCADE,related_name='banking_details')
    bank_name=models.CharField(max_length=100)
    branch_name=models.CharField(max_length=100,null=True,blank=True)
    account_number=models.CharField(max_length=20)

class GovBodies(models.Model):
    name=models.CharField(max_length=100)
    leader=models.CharField(max_length=100)
    leader_fullname=models.CharField(max_length=100)
