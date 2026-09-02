from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    description = models.TextField()
    price = models.CharField(max_length=100, default="Contact for Price")
    image_url = models.TextField()
    specifications = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Dormitory(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    price = models.CharField(max_length=100)
    amenities = models.TextField() # comma-separated values
    image_url = models.TextField()
    available_rooms = models.IntegerField(default=1)

    def __str__(self):
        return self.name

class Inquiry(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Resolved', 'Resolved'),
    ]
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.subject} from {self.name}"

class Partnership(models.Model):
    company_name = models.CharField(max_length=255)
    contact_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    interest_area = models.CharField(max_length=100)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Partnership request from {self.company_name}"

class CaseStudy(models.Model):
    title = models.CharField(max_length=255)
    client = models.CharField(max_length=255, blank=True, null=True) # retaining old field if any data exists
    description = models.TextField(blank=True, null=True) # retaining old field
    results = models.TextField(blank=True, null=True) # retaining old field
    image_url = models.TextField(blank=True, null=True) # retaining old field
    
    badge = models.CharField(max_length=255, default="")
    caseNum = models.CharField(max_length=100, default="")
    subtitle = models.CharField(max_length=255, default="")
    result = models.TextField(default="")
    metricsTitle = models.CharField(max_length=255, default="")
    quote = models.TextField(default="")
    author = models.CharField(max_length=255, default="")
    zones_json = models.TextField(default="[]")
    metrics_json = models.TextField(default="[]")
    outcomes_json = models.TextField(default="[]")

    def __str__(self):
        return self.title

class Notification(models.Model):
    message = models.CharField(max_length=255)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message

class AccommodationSearch(models.Model):
    location = models.CharField(max_length=255, blank=True, null=True)
    move_in_date = models.DateField()
    workers = models.IntegerField()
    accommodation_type = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Search for {self.location or 'any'} on {self.move_in_date}"

class AboutPageSettings(models.Model):
    # Who We Are
    who_we_are_title = models.CharField(max_length=255, default="Welcome to Uniqix Pte Ltd")
    who_we_are_text = models.TextField(default="Uniqix Pte Ltd is a Singapore-based company specializing in aggregating the procurement of products and services for more than 23 industries, fostering a merit savings and technology transformation for our clients.")
    stat_industries = models.CharField(max_length=100, default="23+")
    stat_partners = models.CharField(max_length=100, default="100+")
    stat_headquarters = models.CharField(max_length=100, default="Singapore")
    
    # Dark blue stats bar
    stat_global_network = models.CharField(max_length=100, default="50+ Countries")
    stat_trusted_partners = models.CharField(max_length=100, default="500+")
    stat_solutions_delivered = models.CharField(max_length=100, default="10K+")
    stat_years_excellence = models.CharField(max_length=100, default="7+")
    
    # Vision & Mission
    vision_text = models.TextField(default="To become the biggest B2B Procurement Aggregation Platform in Asia Pacific.")
    mission_text = models.TextField(default="To continuously identify our clients’ procurement needs and source for the best quality and most value-for-money products and services to match those needs.")
    
    # Corporate History
    incorporation_date = models.CharField(max_length=255, default="26 July 2016 in Singapore")
    uen_number = models.CharField(max_length=100, default="201620244N")
    registration_type = models.CharField(max_length=255, default="Exempt Private Company Limited by Shares")
    principal_activity = models.TextField(default="Retail sale of other household utensils and equipment n.e.c.")

    def __str__(self):
        return "About Us Page Configuration"

class HomePageSettings(models.Model):
    # Introduction
    intro_title = models.CharField(max_length=255, default="What Defines Uniqix ?")
    intro_text_1 = models.TextField(default="Uniqix Pte Ltd is a Singapore-based company specializing in aggregating the procurement of products and services for more than 23 industries, focusing on cost savings and technology transformation for our clients.")
    intro_text_2 = models.TextField(default="By integrating physical shipping operations, rigid compliance, and direct-from-manufacturer pricing structures, we eliminate high-margin intermediaries and supply chain vulnerabilities.")
    
    # Stats Section (4 Stats)
    stat1_target = models.CharField(max_length=100, default="$580M+")
    stat1_label = models.CharField(max_length=255, default="Commodities Traded")
    stat2_target = models.CharField(max_length=100, default="40+")
    stat2_label = models.CharField(max_length=255, default="Dormitory Hubs")
    stat3_target = models.CharField(max_length=100, default="100%")
    stat3_label = models.CharField(max_length=255, default="Assay Traceability")
    stat4_target = models.CharField(max_length=100, default="80k+")
    stat4_label = models.CharField(max_length=255, default="Workers Housed")

    def __str__(self):
        return "Home Page Global Settings"

class Testimonial(models.Model):
    quote = models.TextField()
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    initials = models.CharField(max_length=10, default="CS")
    color = models.CharField(max_length=100, default="var(--primary)")

    def __str__(self):
        return f"Testimonial from {self.name} ({self.role})"

class CoreDivision(models.Model):
    tag = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    desc = models.TextField()
    action = models.CharField(max_length=255, default="Explore Services")
    target = models.CharField(max_length=100, default="services")
    color = models.CharField(max_length=100, default="#2563eb")
    img = models.TextField(default="")
    features_json = models.TextField(default="[]")

    def __str__(self):
        return self.title

class DeploymentTelemetry(models.Model):
    image_url = models.TextField()
    caption = models.CharField(max_length=255)

    def __str__(self):
        return self.caption

class Service(models.Model):
    num = models.CharField(max_length=50)
    title = models.CharField(max_length=255)
    desc = models.TextField()
    bullets_json = models.TextField(default="[]")
    action = models.CharField(max_length=100, default="dormitories")
    actionText = models.CharField(max_length=255, default="Search Accommodation Hub")
    themeColor = models.CharField(max_length=100, default="#D4A72C")
    badgeBg = models.CharField(max_length=100, default="rgba(197, 160, 89, 0.1)")

    def __str__(self):
        return f"{self.num} - {self.title}"


