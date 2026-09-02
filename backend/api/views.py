import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.core import signing
from django.shortcuts import get_object_or_404
from .models import Product, Dormitory, Inquiry, Partnership, CaseStudy, Notification, AccommodationSearch, AboutPageSettings, HomePageSettings, Testimonial, CoreDivision, DeploymentTelemetry, Service

# Helper to verify token
def get_user_from_token(request):
    auth_header = request.headers.get('Authorization', '')
    if auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
        try:
            # Token expires after 24 hours (86400 seconds)
            data = signing.loads(token, max_age=86400)
            return data.get('username')
        except (signing.SignatureExpired, signing.BadSignature):
            return None
    return None

# Decorator to require admin token
def require_admin(view_func):
    def _wrapped_view(request, *args, **kwargs):
        username = get_user_from_token(request)
        if not username:
            return JsonResponse({'error': 'Unauthorized admin access'}, status=401)
        return view_func(request, *args, **kwargs)
    return _wrapped_view

@csrf_exempt
def api_login(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST method required'}, status=405)
    
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
    except Exception:
        return JsonResponse({'error': 'Invalid JSON body'}, status=400)
        
    user = authenticate(username=username, password=password)
    if user is not None and user.is_staff:
        token = signing.dumps({'username': user.username})
        return JsonResponse({'token': token, 'username': user.username})
    else:
        return JsonResponse({'error': 'Invalid credentials or not staff admin'}, status=400)

# Public Products API
@csrf_exempt
def api_products(request):
    if request.method == 'GET':
        if not Product.objects.filter(category__in=['Industrial Supply Catalog', 'Eco Food Service Packaging']).exists():
            Product.objects.filter(category='Sustainable Packaging').delete()
            initial_products = [
                { 'name': 'Heavy-Duty OPP Packaging Tape', 'category': 'Industrial Supply Catalog', 'price': '$45 / Carton', 'description': 'High-tack OPP acrylic adhesive tape engineered for industrial carton sealing and heavy logistic packing.', 'image_url': 'opp_tape', 'specifications': '48mm x 100m' },
                { 'name': 'Industrial Stretch Film (Hand/Machine)', 'category': 'Industrial Supply Catalog', 'price': '$62 / Roll', 'description': 'High tensile stretch film engineered for pallet wrapping, moisture barrier protection, and load stability.', 'image_url': 'stretch_film', 'specifications': '500mm x 300m' },
                { 'name': 'Anti-Static Bubble Wrap Rolls', 'category': 'Industrial Supply Catalog', 'price': '$38 / Roll', 'description': 'Heavy cushioning bubble wrap engineered to absorb shock during industrial shipping and logistics transit.', 'image_url': 'bubble_wrap', 'specifications': '1m x 100m' },
                { 'name': 'Heavy-Duty Eco Pallets', 'category': 'Industrial Supply Catalog', 'price': '$85 / Unit', 'description': 'Reinforced heavy-duty eco pallets with 2,000kg load capacity engineered with double compression strength.', 'image_url': 'eco_pallets', 'specifications': '1200mm x 1000mm' },
                { 'name': 'Recyclable Egg Cartons', 'category': 'Eco Food Service Packaging', 'price': '$18 / Pack', 'description': 'Molded pulp eco egg cartons with high crush resistance for safe agricultural transport.', 'image_url': 'egg_carton', 'specifications': '12-count' },
                { 'name': 'Round Reheating Tubs & Lids', 'category': 'Eco Food Service Packaging', 'price': '$28 / Carton', 'description': 'Microwaveable heat-resistant food tubs engineered for commercial catering and dormitory meal provisions.', 'image_url': 'round_reheating_tubs', 'specifications': '750ml' },
                { 'name': 'Divided Meal Containers', 'category': 'Eco Food Service Packaging', 'price': '$32 / Carton', 'description': 'Multi-compartment biodegradable food service trays designed for balanced institutional meal distribution.', 'image_url': 'divided_container', 'specifications': '3-compartment' },
                { 'name': 'Rectangular Reheating Tubs', 'category': 'Eco Food Service Packaging', 'price': '$30 / Carton', 'description': 'Durable food-grade reheating containers for institutional food services.', 'image_url': 'rectangular_reheating_tubs', 'specifications': '1000ml' }
            ]
            for ip in initial_products:
                Product.objects.create(**ip)
        else:
            # Clean up generic Unsplash fallback URLs on existing products if present
            Product.objects.filter(image_url__contains='unsplash.com').update(image_url='')

        category = request.GET.get('category', '')
        if category:
            products = Product.objects.filter(category__icontains=category)
        else:
            products = Product.objects.all()
            
        data = []
        for p in products:
            data.append({
                'id': p.id,
                'name': p.name,
                'category': p.category,
                'description': p.description,
                'price': p.price,
                'image_url': p.image_url,
                'specifications': p.specifications,
            })
        return JsonResponse(data, safe=False)
    return JsonResponse({'error': 'GET method required'}, status=405)

# Public Dormitories API
@csrf_exempt
def api_dormitories(request):
    if request.method == 'GET':
        dorms = Dormitory.objects.all()
        data = []
        for d in dorms:
            data.append({
                'id': d.id,
                'name': d.name,
                'location': d.location,
                'price': d.price,
                'amenities': d.amenities,
                'image_url': d.image_url,
                'available_rooms': d.available_rooms,
            })
        return JsonResponse(data, safe=False)
    return JsonResponse({'error': 'GET method required'}, status=405)

# Public Case Studies API
@csrf_exempt
def api_case_studies(request):
    if request.method == 'GET':
        if CaseStudy.objects.count() == 0 or CaseStudy.objects.filter(zones_json="[]").exists():
            CaseStudy.objects.all().delete()
            CaseStudy.objects.create(
                title='District-Wide Deployment',
                client='PDD District',
                badge='Pest Control | Urban Health',
                caseNum='CASE STUDY • 01',
                subtitle='Autonomous Mosquito Control for Healthier Communities',
                result='Choosing Dragonfly was the right approach as it could operate safely in and around the diverse set of areas, without needing to evacuate, and with data trends for better decision making.',
                metricsTitle='JUST 14 DAYS – A MEASURABLE SHIFT',
                quote='“I would deploy in every place to reduce dengue using this robot.”',
                author='— Technocrat, PCEO',
                zones_json=json.dumps([
                    {
                        'title': 'Zone 1 – Central City, Terrasex',
                        'desc': 'Deployed autonomous mosquito control units across 12 km² of urban area, targeting high-breeding zones and public health hotspots.',
                        'color': '#10b981'
                    },
                    {
                        'title': 'Zone 2 – Riverside Healthcare Centre & Peri-Urban',
                        'desc': 'Implemented smart, data-driven control in and around the healthcare centre, reducing mosquito density and improving patient safety.',
                        'color': '#3b82f6'
                    },
                    {
                        'title': 'Community Impact – Why Conventional Methods Failed',
                        'desc': "Traditional chemical spraying was ineffective in the region's diverse environment. Our autonomous, targeted approach delivered longer-lasting, data-backed results with minimal environmental impact.",
                        'color': '#f59e0b'
                    }
                ]),
                metrics_json=json.dumps([
                    { 'val': '68%', 'label': 'Reduction in mosquito nuisance' },
                    { 'val': '100%', 'label': 'Operational safety record' },
                    { 'val': '14 Hours', 'label': 'Daily operation' }
                ]),
                outcomes_json=json.dumps([
                    'Healthier communities',
                    'Lower environmental impact',
                    'More efficient resource use',
                    'Scalable & sustainable model'
                ])
            )
            CaseStudy.objects.create(
                title='Aqua Adventure Deployment',
                client='HomeTeamNS',
                badge='Recreational Parks | Public Space',
                caseNum='CASE STUDY • 02',
                subtitle='Safety-First Vector Control in High-Traffic Water Parks',
                result='Dragonfly provided zero-downtime mosquito control, maintaining visitor comfort and eliminating chemical runoff into pool systems.',
                metricsTitle='3 MONTHS OF DEPLOYMENT: TO ZERO',
                quote='“Lesser mosquitoes in the facility and around the facility.”',
                author='— Team Lead, Aqua Adventure',
                zones_json=json.dumps([
                    {
                        'title': 'Zone 1 – Active Pool & Splash Areas',
                        'desc': 'Treatment scheduled dynamically during off-peak and night hours to avoid interrupting park visitors.',
                        'color': '#10b981'
                    },
                    {
                        'title': 'Zone 2 – Surrounding Foliage & Buffer Woodlands',
                        'desc': 'Creating a protective outer perimeter by targeting dense vegetation borders where mosquitoes nest.',
                        'color': '#3b82f6'
                    },
                    {
                        'title': 'Operational Edge – Why Conventional Methods Failed',
                        'desc': 'Standard fogging requires closing areas and leaves chemical drift near pools. Dragonfly is precise and chemical-efficient.',
                        'color': '#f59e0b'
                    }
                ]),
                metrics_json=json.dumps([
                    { 'val': '100%', 'label': 'Reduction in trap captures' },
                    { 'val': '100%', 'label': 'Autonomous flight safety' },
                    { 'val': '14 Hours', 'label': 'Daily operation' }
                ]),
                outcomes_json=json.dumps([
                    'Safe recreational spaces',
                    'Zero chemical drift into water',
                    'Continuous business operations',
                    'Data-vetted breeding maps'
                ])
            )
            CaseStudy.objects.create(
                title='EGH Construction Project',
                client='EGH Project',
                badge='Infrastructure | Heavy Industry',
                caseNum='CASE STUDY • 03',
                subtitle='Preventive Larval Mitigation for Heavy Infrastructure Sites',
                result='Dragonfly operated seamlessly alongside cranes and heavy vehicles, safeguarding workers and keeping the project on schedule.',
                metricsTitle='1 MONTH: PREVENTIVE CONTROL',
                quote='“Autonomous mosquito control operates daily without halting crane movements.”',
                author='— HSE Director, EGH Project',
                zones_json=json.dumps([
                    {
                        'title': 'Zone 1 – Workers Rest & Congregation Areas',
                        'desc': 'Non-PPE designated spaces treated daily to secure workforce welfare and prevent site-borne dengue outbreaks.',
                        'color': '#10b981'
                    },
                    {
                        'title': 'Zone 2 – Active Sump Pits & Excavations',
                        'desc': 'Treating temporary water accumulation zones that change layout weekly as construction excavations progress.',
                        'color': '#3b82f6'
                    },
                    {
                        'title': 'Tactical Edge – Why Conventional Methods Failed',
                        'desc': 'Fogging schedules cannot adapt to dynamic construction layouts, leaving pockets of pooled water untreated. Dragonfly adapts via real-time mapping.',
                        'color': '#f59e0b'
                    }
                ]),
                metrics_json=json.dumps([
                    { 'val': '85%', 'label': 'Larvae reduction in sumps' },
                    { 'val': '100%', 'label': 'Workspace protection' },
                    { 'val': '24/7', 'label': 'Active protection monitoring' }
                ]),
                outcomes_json=json.dumps([
                    'Zero project downtime',
                    'Vetted safety audits',
                    'Dynamic site mapping',
                    'Workforce health assurance'
                ])
            )

        cases = CaseStudy.objects.all()
        data = []
        for c in cases:
            try:
                zones = json.loads(c.zones_json)
            except Exception:
                zones = []
            try:
                metrics = json.loads(c.metrics_json)
            except Exception:
                metrics = []
            try:
                outcomes = json.loads(c.outcomes_json)
            except Exception:
                outcomes = []
                
            data.append({
                'id': c.id,
                'title': c.title,
                'client': c.client or "",
                'description': c.description or "",
                'results': c.results or "",
                'image_url': c.image_url or "",
                
                'badge': c.badge,
                'caseNum': c.caseNum,
                'subtitle': c.subtitle,
                'result': c.result,
                'metricsTitle': c.metricsTitle,
                'quote': c.quote,
                'author': c.author,
                'zones': zones,
                'metrics': metrics,
                'outcomes': outcomes,
            })
        return JsonResponse(data, safe=False)
    return JsonResponse({'error': 'GET method required'}, status=405)

# Public Inquiry submission API
@csrf_exempt
def api_submit_inquiry(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST method required'}, status=405)
    
    try:
        data = json.loads(request.body)
        inquiry = Inquiry.objects.create(
            name=data.get('name'),
            email=data.get('email'),
            subject=data.get('subject'),
            message=data.get('message'),
        )
        # Create notification for admin
        Notification.objects.create(
            message=f"New Contact Inquiry: '{inquiry.subject}' from {inquiry.name}"
        )
        return JsonResponse({'success': True, 'id': inquiry.id})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

# Public Partnership submission API
@csrf_exempt
def api_submit_partnership(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST method required'}, status=405)
    
    try:
        data = json.loads(request.body)
        partnership = Partnership.objects.create(
            company_name=data.get('company_name'),
            contact_name=data.get('contact_name'),
            email=data.get('email'),
            phone=data.get('phone'),
            interest_area=data.get('interest_area'),
            message=data.get('message'),
        )
        # Create notification for admin
        Notification.objects.create(
            message=f"New Partnership Request from {partnership.company_name} ({partnership.interest_area})"
        )
        return JsonResponse({'success': True, 'id': partnership.id})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

# Public Dormitory Search Query submission API
@csrf_exempt
def api_submit_dormitory_search(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST method required'}, status=405)
    
    try:
        data = json.loads(request.body)
        search_query = AccommodationSearch.objects.create(
            location=data.get('location', ''),
            move_in_date=data.get('moveInDate'),
            workers=int(data.get('workers', 0)),
            accommodation_type=data.get('type', 'Standard Shared Space'),
        )
        # Create notification for admin
        Notification.objects.create(
            message=f"New Accommodation Search: {search_query.workers} workers for {search_query.location or 'Any Location'}"
        )
        return JsonResponse({'success': True, 'id': search_query.id})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


# --- ADMIN CRUD ENDPOINTS ---

# Inquiries management
@csrf_exempt
@require_admin
def admin_inquiries(request, inquiry_id=None):
    if request.method == 'GET':
        inquiries = Inquiry.objects.all().order_by('-created_at')
        data = [{
            'id': i.id,
            'name': i.name,
            'email': i.email,
            'subject': i.subject,
            'message': i.message,
            'status': i.status,
            'created_at': i.created_at.isoformat()
        } for i in inquiries]
        return JsonResponse(data, safe=False)
        
    elif request.method == 'PATCH':
        try:
            data = json.loads(request.body)
            inquiry = get_object_or_404(Inquiry, id=inquiry_id)
            if 'status' in data:
                inquiry.status = data['status']
                inquiry.save()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    elif request.method == 'DELETE':
        inquiry = get_object_or_404(Inquiry, id=inquiry_id)
        inquiry.delete()
        return JsonResponse({'success': True})
        
    return JsonResponse({'error': 'Method not allowed'}, status=405)

# Partnerships management
@csrf_exempt
@require_admin
def admin_partnerships(request, partnership_id=None):
    if request.method == 'GET':
        partnerships = Partnership.objects.all().order_by('-created_at')
        data = [{
            'id': p.id,
            'company_name': p.company_name,
            'contact_name': p.contact_name,
            'email': p.email,
            'phone': p.phone,
            'interest_area': p.interest_area,
            'message': p.message,
            'created_at': p.created_at.isoformat()
        } for p in partnerships]
        return JsonResponse(data, safe=False)
        
    elif request.method == 'DELETE':
        partnership = get_object_or_404(Partnership, id=partnership_id)
        partnership.delete()
        return JsonResponse({'success': True})
        
    return JsonResponse({'error': 'Method not allowed'}, status=405)

# Products CRUD management
@csrf_exempt
@require_admin
def admin_products(request, product_id=None):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            product = Product.objects.create(
                name=data.get('name'),
                category=data.get('category'),
                description=data.get('description'),
                price=data.get('price', 'Contact for Price'),
                image_url=data.get('image_url', ''),
                specifications=data.get('specifications', '')
            )
            return JsonResponse({'success': True, 'id': product.id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    elif request.method == 'PUT':
        try:
            data = json.loads(request.body)
            product = get_object_or_404(Product, id=product_id)
            product.name = data.get('name', product.name)
            product.category = data.get('category', product.category)
            product.description = data.get('description', product.description)
            product.price = data.get('price', product.price)
            product.image_url = data.get('image_url', product.image_url)
            product.specifications = data.get('specifications', product.specifications)
            product.save()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    elif request.method == 'DELETE':
        product = get_object_or_404(Product, id=product_id)
        product.delete()
        return JsonResponse({'success': True})
        
    return JsonResponse({'error': 'Method not allowed'}, status=405)

# Dormitories CRUD management
@csrf_exempt
@require_admin
def admin_dormitories(request, dormitory_id=None):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            raw_rooms = data.get('available_rooms')
            try:
                rooms = int(raw_rooms) if raw_rooms is not None else 1
            except (TypeError, ValueError):
                rooms = 1

            dorm = Dormitory.objects.create(
                name=data.get('name') or 'New Dormitory',
                location=data.get('location') or 'Singapore',
                price=data.get('price') or '$220/month',
                amenities=data.get('amenities') or '',
                image_url=data.get('image_url') or '',
                available_rooms=rooms
            )
            return JsonResponse({'success': True, 'id': dorm.id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    elif request.method == 'PUT':
        try:
            data = json.loads(request.body)
            dorm = get_object_or_404(Dormitory, id=dormitory_id)
            if 'name' in data and data['name']: dorm.name = data['name']
            if 'location' in data and data['location']: dorm.location = data['location']
            if 'price' in data and data['price']: dorm.price = data['price']
            if 'amenities' in data: dorm.amenities = data['amenities'] or ''
            if 'image_url' in data: dorm.image_url = data['image_url'] or ''
            if 'available_rooms' in data:
                try:
                    dorm.available_rooms = int(data['available_rooms']) if data['available_rooms'] is not None else dorm.available_rooms
                except (TypeError, ValueError):
                    pass
            dorm.save()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    elif request.method == 'DELETE':
        dorm = get_object_or_404(Dormitory, id=dormitory_id)
        dorm.delete()
        return JsonResponse({'success': True})
        
    return JsonResponse({'error': 'Method not allowed'}, status=405)

# Case Studies CRUD management
@csrf_exempt
@require_admin
def admin_case_studies(request, case_study_id=None):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            cs = CaseStudy.objects.create(
                title=data.get('title'),
                client=data.get('client', ''),
                description=data.get('description', ''),
                results=data.get('results', ''),
                image_url=data.get('image_url', ''),
                
                badge=data.get('badge', ''),
                caseNum=data.get('caseNum', ''),
                subtitle=data.get('subtitle', ''),
                result=data.get('result', ''),
                metricsTitle=data.get('metricsTitle', ''),
                quote=data.get('quote', ''),
                author=data.get('author', ''),
                zones_json=json.dumps(data.get('zones', [])),
                metrics_json=json.dumps(data.get('metrics', [])),
                outcomes_json=json.dumps(data.get('outcomes', [])),
            )
            return JsonResponse({'success': True, 'id': cs.id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    elif request.method == 'PUT':
        try:
            data = json.loads(request.body)
            cs = get_object_or_404(CaseStudy, id=case_study_id)
            cs.title = data.get('title', cs.title)
            cs.client = data.get('client', cs.client)
            cs.description = data.get('description', cs.description)
            cs.results = data.get('results', cs.results)
            cs.image_url = data.get('image_url', cs.image_url)
            
            cs.badge = data.get('badge', cs.badge)
            cs.caseNum = data.get('caseNum', cs.caseNum)
            cs.subtitle = data.get('subtitle', cs.subtitle)
            cs.result = data.get('result', cs.result)
            cs.metricsTitle = data.get('metricsTitle', cs.metricsTitle)
            cs.quote = data.get('quote', cs.quote)
            cs.author = data.get('author', cs.author)
            
            if 'zones' in data:
                cs.zones_json = json.dumps(data.get('zones', []))
            if 'metrics' in data:
                cs.metrics_json = json.dumps(data.get('metrics', []))
            if 'outcomes' in data:
                cs.outcomes_json = json.dumps(data.get('outcomes', []))
                
            cs.save()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    elif request.method == 'DELETE':
        cs = get_object_or_404(CaseStudy, id=case_study_id)
        cs.delete()
        return JsonResponse({'success': True})
        
    return JsonResponse({'error': 'Method not allowed'}, status=405)

# Notifications management
@csrf_exempt
@require_admin
def admin_notifications(request, notification_id=None):
    if request.method == 'GET':
        notifications = Notification.objects.all().order_by('-created_at')
        data = [{
            'id': n.id,
            'message': n.message,
            'is_read': n.is_read,
            'created_at': n.created_at.isoformat()
        } for n in notifications]
        return JsonResponse(data, safe=False)
        
    elif request.method == 'PATCH':
        if notification_id:
            n = get_object_or_404(Notification, id=notification_id)
            n.is_read = True
            n.save()
        else:
            Notification.objects.all().update(is_read=True)
        return JsonResponse({'success': True})
        
    elif request.method == 'DELETE':
        if notification_id:
            n = get_object_or_404(Notification, id=notification_id)
            n.delete()
        else:
            Notification.objects.all().delete()
        return JsonResponse({'success': True})
        
    return JsonResponse({'error': 'Method not allowed'}, status=405)

# Accommodation Searches management
@csrf_exempt
@require_admin
def admin_accommodation_searches(request, search_id=None):
    if request.method == 'GET':
        queries = AccommodationSearch.objects.all().order_by('-created_at')
        data = [{
            'id': q.id,
            'location': q.location,
            'move_in_date': q.move_in_date.isoformat() if q.move_in_date else None,
            'workers': q.workers,
            'accommodation_type': q.accommodation_type,
            'created_at': q.created_at.isoformat()
        } for q in queries]
        return JsonResponse(data, safe=False)
        
    elif request.method == 'DELETE':
        if search_id:
            q = get_object_or_404(AccommodationSearch, id=search_id)
            q.delete()
        else:
            AccommodationSearch.objects.all().delete()
        return JsonResponse({'success': True})
        
    return JsonResponse({'error': 'Method not allowed'}, status=405)

# Public About Settings API
@csrf_exempt
def api_about_settings(request):
    if request.method == 'GET':
        settings, created = AboutPageSettings.objects.get_or_create(id=1)
        data = {
            'who_we_are_title': settings.who_we_are_title,
            'who_we_are_text': settings.who_we_are_text,
            'stat_industries': settings.stat_industries,
            'stat_partners': settings.stat_partners,
            'stat_headquarters': settings.stat_headquarters,
            'stat_global_network': settings.stat_global_network,
            'stat_trusted_partners': settings.stat_trusted_partners,
            'stat_solutions_delivered': settings.stat_solutions_delivered,
            'stat_years_excellence': settings.stat_years_excellence,
            'vision_text': settings.vision_text,
            'mission_text': settings.mission_text,
            'incorporation_date': settings.incorporation_date,
            'uen_number': settings.uen_number,
            'registration_type': settings.registration_type,
            'principal_activity': settings.principal_activity,
        }
        return JsonResponse(data)
    return JsonResponse({'error': 'GET method required'}, status=405)

# Admin About Settings Update API
@csrf_exempt
@require_admin
def admin_about_settings(request):
    if request.method == 'POST' or request.method == 'PUT':
        try:
            data = json.loads(request.body)
            settings, created = AboutPageSettings.objects.get_or_create(id=1)
            
            settings.who_we_are_title = data.get('who_we_are_title', settings.who_we_are_title)
            settings.who_we_are_text = data.get('who_we_are_text', settings.who_we_are_text)
            settings.stat_industries = data.get('stat_industries', settings.stat_industries)
            settings.stat_partners = data.get('stat_partners', settings.stat_partners)
            settings.stat_headquarters = data.get('stat_headquarters', settings.stat_headquarters)
            
            settings.stat_global_network = data.get('stat_global_network', settings.stat_global_network)
            settings.stat_trusted_partners = data.get('stat_trusted_partners', settings.stat_trusted_partners)
            settings.stat_solutions_delivered = data.get('stat_solutions_delivered', settings.stat_solutions_delivered)
            settings.stat_years_excellence = data.get('stat_years_excellence', settings.stat_years_excellence)
            
            settings.vision_text = data.get('vision_text', settings.vision_text)
            settings.mission_text = data.get('mission_text', settings.mission_text)
            
            settings.incorporation_date = data.get('incorporation_date', settings.incorporation_date)
            settings.uen_number = data.get('uen_number', settings.uen_number)
            settings.registration_type = data.get('registration_type', settings.registration_type)
            settings.principal_activity = data.get('principal_activity', settings.principal_activity)
            
            settings.save()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    return JsonResponse({'error': 'POST or PUT method required'}, status=405)


# Public Home Page CMS Settings API (with auto-seeding)
@csrf_exempt
def api_home_settings(request):
    if request.method == 'GET':
        # 1. Seed HomePageSettings
        home_settings, created = HomePageSettings.objects.get_or_create(id=1)
        
        # 2. Seed Testimonials
        if Testimonial.objects.count() == 0:
            Testimonial.objects.create(
                quote="Deploying the Uniqix mosquito control robots in our construction staging grounds significantly decreased our vector counts and ensured local environmental safety compliance.",
                name="Director of Operations",
                role="Hyundai Engineering & Construction",
                initials="HC",
                color="#06b6d4"
            )
            Testimonial.objects.create(
                quote="Uniqix managed our corporate worker lodging transitions flawlessly. All 800 staff were successfully housed in fully compliant, high-quality, safe dormitories in Tuas.",
                name="VP of HR & Logistics",
                role="Mitsui Logistics Singapore",
                initials="ML",
                color="var(--primary)"
            )
            Testimonial.objects.create(
                quote="Their precious metals desk is top-tier. Sourcing physical gold bullion through their audited refinery logistics eliminated our supply chain security concerns completely.",
                name="Managing Director",
                role="Kiewit Metals Corp",
                initials="KM",
                color="#f59e0b"
            )
            Testimonial.objects.create(
                quote="The Smart Lighting retrofits reduced our warehouse energy consumption by 55% within the first month. Excellent ROI and execution.",
                name="Sustainability Manager",
                role="Bouygues Building Asia",
                initials="BA",
                color="#ec4899"
            )

        # 3. Seed Core Operating Divisions (Products & Services Aggregation)
        if CoreDivision.objects.count() == 0:
            CoreDivision.objects.create(
                tag='WORKFORCE INFRASTRUCTURE',
                title='Dormitory Housing',
                desc='Secure, compliant, and comfortable dormitory accommodation services for foreign workers in key industrial sectors, fully compliant with FEDA.',
                action='Explore Housing Services',
                target='services',
                color='#2563eb',
                img='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
                features_json=json.dumps([
                    { 'text': 'FEDA Compliant Facilities' },
                    { 'text': 'Safe, Secure & Comfortable Living' },
                    { 'text': 'End-to-End Accommodation Management' }
                ])
            )
            CoreDivision.objects.create(
                tag='SPECIALIZED PRODUCTS',
                title='Industrial Products',
                desc='Autonomous mosquito vector control robots, bulk packaging materials, and smart IoT lighting solutions tailored for corporate facility energy saving.',
                action='View Product Suite',
                target='products',
                color='#0d9488',
                img='https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
                features_json=json.dumps([
                    { 'text': 'Advanced Robotics Solutions' },
                    { 'text': 'High-Quality Industrial Products' },
                    { 'text': 'Smart Energy & IoT Innovations' }
                ])
            )
            CoreDivision.objects.create(
                tag='PHYSICAL COMMODITIES',
                title='International Trade',
                desc='Physical Gold Trade, Physical Oil & Gas Trade, and Physical Metals trade conducted through verified, LBMA/LME-grade global trade channels.',
                action='Access Trade Desk',
                target='trade',
                color='#f59e0b',
                img='https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
                features_json=json.dumps([
                    { 'text': 'Gold, Oil & Gas, Metals Trading' },
                    { 'text': 'Verified & Compliant Trade Channels' },
                    { 'text': 'Global Network, Local Expertise' }
                ])
            )

        # Build Response Data
        testimonials = []
        for t in Testimonial.objects.all():
            testimonials.append({
                'id': t.id,
                'quote': t.quote,
                'name': t.name,
                'role': t.role,
                'initials': t.initials,
                'color': t.color
            })

        divisions = []
        for d in CoreDivision.objects.all():
            try:
                features = json.loads(d.features_json)
            except Exception:
                features = []
            divisions.append({
                'id': d.id,
                'tag': d.tag,
                'title': d.title,
                'desc': d.desc,
                'action': d.action,
                'target': d.target,
                'color': d.color,
                'img': d.img,
                'features': features
            })

        settings_data = {
            'intro_title': home_settings.intro_title,
            'intro_text_1': home_settings.intro_text_1,
            'intro_text_2': home_settings.intro_text_2,
            'stat1_target': home_settings.stat1_target,
            'stat1_label': home_settings.stat1_label,
            'stat2_target': home_settings.stat2_target,
            'stat2_label': home_settings.stat2_label,
            'stat3_target': home_settings.stat3_target,
            'stat3_label': home_settings.stat3_label,
            'stat4_target': home_settings.stat4_target,
            'stat4_label': home_settings.stat4_label,
        }

        return JsonResponse({
            'settings': settings_data,
            'testimonials': testimonials,
            'divisions': divisions
        })
    return JsonResponse({'error': 'GET method required'}, status=405)


# Admin Home Settings Update API
@csrf_exempt
@require_admin
def admin_home_settings(request):
    if request.method == 'POST' or request.method == 'PUT':
        try:
            data = json.loads(request.body)
            settings, created = HomePageSettings.objects.get_or_create(id=1)
            settings.intro_title = data.get('intro_title', settings.intro_title)
            settings.intro_text_1 = data.get('intro_text_1', settings.intro_text_1)
            settings.intro_text_2 = data.get('intro_text_2', settings.intro_text_2)
            
            settings.stat1_target = data.get('stat1_target', settings.stat1_target)
            settings.stat1_label = data.get('stat1_label', settings.stat1_label)
            settings.stat2_target = data.get('stat2_target', settings.stat2_target)
            settings.stat2_label = data.get('stat2_label', settings.stat2_label)
            settings.stat3_target = data.get('stat3_target', settings.stat3_target)
            settings.stat3_label = data.get('stat3_label', settings.stat3_label)
            settings.stat4_target = data.get('stat4_target', settings.stat4_target)
            settings.stat4_label = data.get('stat4_label', settings.stat4_label)
            
            settings.save()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'POST or PUT method required'}, status=405)


# Admin Testimonials CRUD API
@csrf_exempt
@require_admin
def admin_testimonials(request, testimonial_id=None):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            t = Testimonial.objects.create(
                quote=data.get('quote'),
                name=data.get('name'),
                role=data.get('role'),
                initials=data.get('initials', 'CS'),
                color=data.get('color', 'var(--primary)')
            )
            return JsonResponse({'success': True, 'id': t.id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    elif request.method == 'PUT':
        try:
            data = json.loads(request.body)
            t = get_object_or_404(Testimonial, id=testimonial_id)
            t.quote = data.get('quote', t.quote)
            t.name = data.get('name', t.name)
            t.role = data.get('role', t.role)
            t.initials = data.get('initials', t.initials)
            t.color = data.get('color', t.color)
            t.save()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    elif request.method == 'DELETE':
        t = get_object_or_404(Testimonial, id=testimonial_id)
        t.delete()
        return JsonResponse({'success': True})
        
    return JsonResponse({'error': 'Method not allowed'}, status=405)


# Admin Core Divisions CRUD API
@csrf_exempt
@require_admin
def admin_core_divisions(request, division_id=None):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            d = CoreDivision.objects.create(
                tag=data.get('tag'),
                title=data.get('title'),
                desc=data.get('desc'),
                action=data.get('action', 'Explore Services'),
                target=data.get('target', 'services'),
                color=data.get('color', '#2563eb'),
                img=data.get('img', ''),
                features_json=json.dumps(data.get('features', []))
            )
            return JsonResponse({'success': True, 'id': d.id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    elif request.method == 'PUT':
        try:
            data = json.loads(request.body)
            d = get_object_or_404(CoreDivision, id=division_id)
            d.tag = data.get('tag', d.tag)
            d.title = data.get('title', d.title)
            d.desc = data.get('desc', d.desc)
            d.action = data.get('action', d.action)
            d.target = data.get('target', d.target)
            d.color = data.get('color', d.color)
            d.img = data.get('img', d.img)
            if 'features' in data:
                d.features_json = json.dumps(data.get('features', []))
            d.save()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    elif request.method == 'DELETE':
        d = get_object_or_404(CoreDivision, id=division_id)
        d.delete()
        return JsonResponse({'success': True})
        
    return JsonResponse({'error': 'Method not allowed'}, status=405)


# Public Deployments & Telemetry API
@csrf_exempt
def api_telemetry(request):
    if request.method == 'GET':
        if DeploymentTelemetry.objects.count() == 0:
            # Seed default values
            DeploymentTelemetry.objects.create(image_url='fu', caption='Dragonfly Autonomous Field Unit')
            DeploymentTelemetry.objects.create(image_url='school', caption='Safe Chemical-Free Public Operations')
            DeploymentTelemetry.objects.create(image_url='dash', caption='L3 SUTD ROS Telemetry & Active Sensor Dashboard')

        data = []
        for dt in DeploymentTelemetry.objects.all():
            data.append({
                'id': dt.id,
                'image_url': dt.image_url,
                'caption': dt.caption
            })
        return JsonResponse(data, safe=False)
    return JsonResponse({'error': 'GET method required'}, status=405)


# Admin Deployments & Telemetry CRUD API
@csrf_exempt
@require_admin
def admin_telemetry(request, telemetry_id=None):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            dt = DeploymentTelemetry.objects.create(
                image_url=data.get('image_url'),
                caption=data.get('caption')
            )
            return JsonResponse({'success': True, 'id': dt.id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    elif request.method == 'PUT':
        try:
            data = json.loads(request.body)
            dt = get_object_or_404(DeploymentTelemetry, id=telemetry_id)
            dt.image_url = data.get('image_url', dt.image_url)
            dt.caption = data.get('caption', dt.caption)
            dt.save()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    elif request.method == 'DELETE':
        dt = get_object_or_404(DeploymentTelemetry, id=telemetry_id)
        dt.delete()
        return JsonResponse({'success': True})
        
    return JsonResponse({'error': 'Method not allowed'}, status=405)


# Public Services List API (with auto-seeding)
@csrf_exempt
def api_services(request):
    if request.method == 'GET':
        if Service.objects.count() == 0:
            # Seed default values
            Service.objects.create(
                num='01',
                title='Supply of Dormitory Accommodation',
                desc='Providing dormitory accommodation for clients to house their workers.',
                bullets_json=json.dumps([
                    'Access to 40+ dormitories islandwide in Singapore.',
                    'Fully compliant with FEDA (Foreign Employee Dormitories Act).',
                    'End-to-end boarding logistics and check-in management.'
                ]),
                action='dormitories',
                actionText='Search Accommodation Hub',
                themeColor='#D4A72C',
                badgeBg='rgba(197, 160, 89, 0.1)'
            )
            Service.objects.create(
                num='02',
                title='Supply of Latest Green Packaging Materials',
                desc='Supplying environmentally friendly / green packaging materials.',
                bullets_json=json.dumps([
                    'Biodegradable, recyclable, and carbon-neutral solutions.',
                    'Custom specifications for corporate logistics and cargo needs.'
                ]),
                action='products',
                actionText='View Packaging Suite',
                themeColor='#10b981',
                badgeBg='rgba(16, 185, 129, 0.1)'
            )
            Service.objects.create(
                num='03',
                title='Supply of Latest Building Materials',
                desc='Supplying the latest building materials.',
                bullets_json=json.dumps([
                    'Premium grade structural concrete, cement, and reinforcement steel.',
                    'Direct procurement and container delivery for large development projects.'
                ]),
                action='products',
                actionText='View Building Materials',
                themeColor='#2563eb',
                badgeBg='rgba(37, 99, 235, 0.1)'
            )
            Service.objects.create(
                num='04',
                title='Leasing of Uniqix Dragonfly for Mosquito Control',
                desc='Uniqix Dragonfly is an autonomous robot designed to tackle Aedes mosquitoes.',
                bullets_json=json.dumps([
                    'AI-powered mosquito monitoring & reporting.',
                    'Fully autonomous patrol – no manpower required.',
                    'Chemical-free and safe for occupied environments.',
                    'Operation 24/7 (day and night).'
                ]),
                action='products',
                actionText='Explore Dragonfly Robot',
                themeColor='#7c3aed',
                badgeBg='rgba(124, 58, 237, 0.1)'
            )

        data = []
        for s in Service.objects.all():
            try:
                bullets = json.loads(s.bullets_json)
            except Exception:
                bullets = []
            data.append({
                'id': s.id,
                'num': s.num,
                'title': s.title,
                'desc': s.desc,
                'bullets': bullets,
                'action': s.action,
                'actionText': s.actionText,
                'themeColor': s.themeColor,
                'badgeBg': s.badgeBg
            })
        return JsonResponse(data, safe=False)
    return JsonResponse({'error': 'GET method required'}, status=405)


# Admin Services CRUD API
@csrf_exempt
@require_admin
def admin_services(request, service_id=None):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            s = Service.objects.create(
                num=data.get('num', '01'),
                title=data.get('title'),
                desc=data.get('desc'),
                bullets_json=json.dumps(data.get('bullets', [])),
                action=data.get('action', 'dormitories'),
                actionText=data.get('actionText', 'Search Accommodation Hub'),
                themeColor=data.get('themeColor', '#D4A72C'),
                badgeBg=data.get('badgeBg', 'rgba(197, 160, 89, 0.1)')
            )
            return JsonResponse({'success': True, 'id': s.id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    elif request.method == 'PUT':
        try:
            data = json.loads(request.body)
            s = get_object_or_404(Service, id=service_id)
            s.num = data.get('num', s.num)
            s.title = data.get('title', s.title)
            s.desc = data.get('desc', s.desc)
            if 'bullets' in data:
                s.bullets_json = json.dumps(data.get('bullets', []))
            s.action = data.get('action', s.action)
            s.actionText = data.get('actionText', s.actionText)
            s.themeColor = data.get('themeColor', s.themeColor)
            s.badgeBg = data.get('badgeBg', s.badgeBg)
            s.save()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    elif request.method == 'DELETE':
        s = get_object_or_404(Service, id=service_id)
        s.delete()
        return JsonResponse({'success': True})
        
    return JsonResponse({'error': 'Method not allowed'}, status=405)


