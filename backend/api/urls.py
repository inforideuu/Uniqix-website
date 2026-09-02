from django.urls import path
from . import views

urlpatterns = [
    # Auth
    path('auth/login/', views.api_login, name='api_login'),
    
    # Public endpoints
    path('products/', views.api_products, name='api_products'),
    path('dormitories/', views.api_dormitories, name='api_dormitories'),
    path('case-studies/', views.api_case_studies, name='api_case_studies'),
    path('inquiries/submit/', views.api_submit_inquiry, name='api_submit_inquiry'),
    path('partnerships/submit/', views.api_submit_partnership, name='api_submit_partnership'),
    path('dormitories/search/', views.api_submit_dormitory_search, name='api_submit_dormitory_search'),
    
    # Admin Inquiries
    path('admin/inquiries/', views.admin_inquiries, name='admin_inquiries_list'),
    path('admin/inquiries/<int:inquiry_id>/', views.admin_inquiries, name='admin_inquiries_detail'),
    
    # Admin Partnerships
    path('admin/partnerships/', views.admin_partnerships, name='admin_partnerships_list'),
    path('admin/partnerships/<int:partnership_id>/', views.admin_partnerships, name='admin_partnerships_detail'),
    
    # Admin Products
    path('admin/products/', views.admin_products, name='admin_products_create'),
    path('admin/products/<int:product_id>/', views.admin_products, name='admin_products_detail'),
    
    # Admin Dormitories
    path('admin/dormitories/', views.admin_dormitories, name='admin_dormitories_create'),
    path('admin/dormitories/<int:dormitory_id>/', views.admin_dormitories, name='admin_dormitories_detail'),
    
    # Admin Case Studies
    path('admin/case-studies/', views.admin_case_studies, name='admin_case_studies_create'),
    path('admin/case-studies/<int:case_study_id>/', views.admin_case_studies, name='admin_case_studies_detail'),

    # Admin Notifications
    path('admin/notifications/', views.admin_notifications, name='admin_notifications_list'),
    path('admin/notifications/<int:notification_id>/', views.admin_notifications, name='admin_notifications_detail'),

    # Admin Accommodation Searches
    path('admin/accommodation-searches/', views.admin_accommodation_searches, name='admin_accommodation_searches_list'),
    path('admin/accommodation-searches/<int:search_id>/', views.admin_accommodation_searches, name='admin_accommodation_searches_detail'),

    # About Page Settings
    path('about-settings/', views.api_about_settings, name='api_about_settings'),
    path('admin/about-settings/', views.admin_about_settings, name='admin_about_settings_update'),

    # Home Page Settings
    path('home-settings/', views.api_home_settings, name='api_home_settings'),
    path('admin/home-settings/', views.admin_home_settings, name='admin_home_settings_update'),

    # Admin Testimonials
    path('admin/testimonials/', views.admin_testimonials, name='admin_testimonials_create'),
    path('admin/testimonials/<int:testimonial_id>/', views.admin_testimonials, name='admin_testimonials_detail'),

    # Admin Core Operating Divisions (Products & Services Aggregation)
    path('admin/core-divisions/', views.admin_core_divisions, name='admin_core_divisions_create'),
    path('admin/core-divisions/<int:division_id>/', views.admin_core_divisions, name='admin_core_divisions_detail'),

    # Deployments & Telemetry
    path('telemetry/', views.api_telemetry, name='api_telemetry'),
    path('admin/telemetry/', views.admin_telemetry, name='admin_telemetry_create'),
    path('admin/telemetry/<int:telemetry_id>/', views.admin_telemetry, name='admin_telemetry_detail'),

    # Services Page
    path('services/', views.api_services, name='api_services'),
    path('admin/services/', views.admin_services, name='admin_services_create'),
    path('admin/services/<int:service_id>/', views.admin_services, name='admin_services_detail'),
]
