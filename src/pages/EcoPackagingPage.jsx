import React, { useState, useEffect } from 'react';
import { 
  Cpu, ShieldCheck, ChevronDown, ChevronLeft, ChevronRight, Droplet, Shield, 
  ThermometerSnowflake, Flame, Trash2, Sparkles, Plus, Edit, X, CheckCircle, 
  RefreshCw, Lock, Unlock, Settings, Image as ImageIcon, Save, Check 
} from 'lucide-react';
import ecoShowcaseImg from '../assets/eco_box_showcase.png';

// Helper to compress uploaded image files to lightweight JPEG data URLs to prevent localStorage quota errors
const compressImageFile = (file, maxWidth = 800, maxHeight = 800, quality = 0.75) => {
  return new Promise((resolve) => {
    if (!file || !file.type.startsWith('image/')) {
      resolve('');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
};

// Default initial dataset for all sections
const DEFAULT_ECO_DATA = {
  hero: {
    category: 'SUSTAINABLE PACKAGING SOLUTIONS',
    title: 'Eco Packaging Series',
    description: 'Next-generation eco-friendly Stone Box & corrugated packaging solutions engineered for high compression performance, superior cold chain thermal insulation, precision industrial asset protection, and zero-waste circular logistics.'
  },
  turnoverProducts: [
    {
      id: 'velcro',
      title: 'Velcro Turnover Box',
      specs: '680X560X360mm',
      advantages: 'Easy folding for loading/unloading, slip-resistant, pressure-resistant and durable, high recyclability.',
      applications: 'Fresh produce cold chain logistics, production line parts distribution, retail circular logistics.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'knife-card',
      title: 'Knife Card',
      specs: '600X300X50mm',
      advantages: 'Lightweight and durable, precision die-cutting, foldable portability, ultrasonic edge sealing.',
      applications: 'Glass industry bottle filling, precision instrument protection.',
      image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'pallet-box',
      title: 'Pallet box',
      specs: '1000X1200mm',
      advantages: 'Sturdy load-bearing, stackable for visibility, customizable in multiple specifications.',
      applications: 'Fruit and vegetable distribution centers, inter-factory transportation for auto parts, express parcel consolidation and circulation.',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80'
    }
  ],
  coloredBoxesProducts: [
    {
      id: 'fruit-packaging',
      title: 'Fruit Packaging Box',
      specs: '303x170x190mm',
      advantages: 'Waterproof & Antistatic, Multi-functional Composite, Diverse Customizable Designs.',
      applications: 'Passion fruit, peaches, navel oranges, pears, etc.',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'agricultural-packaging',
      title: 'Agricultural Product Packaging Box',
      specs: '560X376X292mm',
      advantages: 'Food-grade antibacterial protection, thermal insulation and freshness preservation, waterproof and eco-friendly.',
      applications: 'Passion fruit, peaches, navel oranges, pears, radishes, rice, vegetables, etc.',
      image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'craft-beer',
      title: 'Craft Beer Box',
      specs: '255X172X267mm',
      advantages: 'Moisture-resistant, lightweight, shockproof, recyclable.',
      applications: 'Beer, bayberry juice beverages, mineral water, etc.',
      image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80'
    }
  ],
  insulatedBoxesProducts: [
    {
      id: 'foldable-insulated',
      title: 'Foldable Insulated Box',
      specs: '400X307X180mm',
      advantages: 'Thermal insulation, antibacterial freshness preservation, foldable portability, high-definition printing capability.',
      applications: 'Fruits and vegetables, hot pot ingredients, baked goods, chilled dough, prepared meals, raw meats, mushrooms.',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'cold-chain-insulated',
      title: 'Cold Chain Insulated Box',
      specs: '380X275X220mm',
      advantages: 'Superior freeze resistance, eco-friendly and recyclable, thermal insulation.',
      applications: 'Fish and shrimp, cake and tart crusts, offal, hot pot bases, etc.',
      image: 'https://images.unsplash.com/photo-1516594915697-87c37e724bd0?auto=format&fit=crop&w=800&q=80'
    }
  ],
  coreAdvantagesPillars: [
    {
      id: 'p1',
      num: '1',
      title: 'Excellent Water & Moisture Resistance',
      desc: 'Soaking test for one week – the box remains intact without damage.',
      iconKey: 'Droplet',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p2',
      num: '2',
      title: 'Superior Compression Resistance',
      desc: 'Tested on a customer’s sample box.',
      iconKey: 'Shield',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p3',
      num: '3',
      title: 'Outstanding Freezing Resistance',
      desc: 'Frozen in a cold storage facility for 3–4 months – the Eco-Box becomes tougher and more resilient at low temperatures, with no softening or collapse.',
      iconKey: 'ThermometerSnowflake',
      image: 'https://images.unsplash.com/photo-1516594915697-87c37e724bd0?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p4',
      num: '4',
      title: 'Excellent Environmental Performance',
      desc: 'Comparative combustion test between plastic and the Eco-Box, the Eco-box burns instantly into powder, achieving complete degradation with superior environmental performance.',
      iconKey: 'Flame',
      image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p5',
      num: '5',
      title: 'Controllable Degradation Advantage',
      desc: 'Degradation can be controlled according to customer requirements, allowing adjustable service life of the box.',
      iconKey: 'Trash2',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p6',
      num: '6',
      title: 'Strong Stain & Oil Resistance',
      desc: 'Edible oil, chili sauce, soy sauce, and coffee spilled on the box can be wiped clean easily, leaving the surface as good as new.',
      iconKey: 'Sparkles',
      image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80'
    }
  ],
  coldChainData: {
    images: [
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=600&q=80'
    ],
    stats: {
      damageRate: '< 1%',
      insulation: 'twice',
      carbonReduction: '25%~50%'
    },
    matrix: [
      {
        category: 'Cost structure',
        boardBox: ['For single use only', 'Cannot be reused'],
        stoneBox: ['Costs are significantly reduced with repeated reuse']
      },
      {
        category: 'Performance',
        boardBox: [
          'Insulation Duration: 12–24 hours (subject to ambient conditions)',
          'High brittleness and easy to crack/rupture',
          'Temperature control relies on ice packs with large fluctuations (±3–5°C)'
        ],
        stoneBox: [
          'Insulation Duration: Increased by 20%–30%',
          'Excellent toughness, with compressive strength increased by 15%–30%',
          'Precision temperature control with minimal fluctuations (±1–2°C)'
        ]
      },
      {
        category: 'Operational Efficiency',
        boardBox: [
          'Low standardization and disordered specifications',
          'Not stackable in warehousing, prone to space waste',
          'Manual assembly with long time consumption'
        ],
        stoneBox: [
          'High standardization, modular, customized design',
          'Stackable and stable in warehousing with strong compression resistance',
          'Integrated design with short time consumption'
        ]
      },
      {
        category: 'Environmental Compliance',
        boardBox: [
          'High carbon emissions',
          'Non-degradable materials with a recycling rate of less than 10%',
          'Facing pressures from plastic bans and environmental taxes'
        ],
        stoneBox: [
          'The materials are degradable, with a recycling rate of over 90%',
          'Carbon emissions are reduced by 25%–50%',
          'Aligns with national development trends and is eligible for potential subsidies'
        ]
      }
    ]
  },
  industrialData: {
    images: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    ],
    matrix: [
      {
        category: 'Cost structure',
        boardBox: [
          'For single use, with recycling costs not applicable',
          'High waste disposal fees and warehousing occupancy costs',
          'High total cost of ownership (TCO), with single-use costs including compliance and disposal fees'
        ],
        stoneBox: [
          'Supports circular management with low per-use costs',
          'For long-term, high-frequency recycling scenarios, delivers the lowest comprehensive cost and is exempt from disposal costs'
        ]
      },
      {
        category: 'Performance',
        boardBox: [
          'Susceptible to moisture intrusion',
          'No ESD protection function',
          'Wooden crates are heavy',
          'Cardboard Box have low strength'
        ],
        stoneBox: [
          'Professional cushioning and impact resistance protection',
          'Withstands instantaneous impact of up to 50G',
          'Excellent moisture-proof, dust-proof, mildew-proof design',
          'Water vapor transmission rate < 20g/(m²·30d)',
          'Built-in electrostatic discharge (ESD) protection',
          'Surface resistance can be as low as ≤10⁹ Ω'
        ]
      },
      {
        category: 'Operational Efficiency',
        boardBox: [
          'Low space utilization rate and large volume',
          'Wooden crates have low warehousing adaptability and are susceptible to moisture, mildew and moth infestation',
          'Cardboard Box are vulnerable to moisture and water damage'
        ],
        stoneBox: [
          'Ultra-high space utilization rate',
          'Excellent warehousing adaptability, with outstanding moisture-proof, water-proof and corrosion-resistant performance'
        ]
      },
      {
        category: 'Environmental Compliance',
        boardBox: [
          'Facing environmental pressure',
          'Wooden crates carry high compliance risks',
          'Cardboard box feature moderately low carbon emissions'
        ],
        stoneBox: [
          'The stone box boasts excellent compliance',
          'Complies with environmental regulations and trends, deeply integrated with carbon constraint policies and green subsidy incentives'
        ]
      }
    ]
  },
  foodBeverageData: {
    images: [
      'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
    ],
    matrix: [
      {
        category: 'Cost structure',
        boardBox: [
          'Single-use and non-recyclable',
          'Requires additional costs such as ice packs',
          'Disposal/recycling costs include environmental taxes and disposal fees'
        ],
        stoneBox: [
          'Supports multiple cycles of reuse with low comprehensive per-use cost',
          'Long-term savings on logistics costs',
          'Exempt from disposal costs'
        ]
      },
      {
        category: 'Performance',
        boardBox: [
          'Insulation Duration: 12–24 hours (highly affected by ambient humidity)',
          'Compressive Strength: 15–25 kPa (prone to rupture)',
          'Water absorption performance degrades rapidly',
          'Prone to deformation: Maximum stacking load ≤ 3 layers'
        ],
        stoneBox: [
          'Insulation Duration: Extended by 20%–30%',
          'Compressive Strength: Increased by 2–4 times',
          'Complete moisture resistance',
          'High stacking stability: Maximum stacking load ≥ 8 layers, improving warehouse utilization rate'
        ]
      },
      {
        category: 'Operational Efficiency',
        boardBox: [
          'Fixed volume and large space occupation',
          'No traceability system',
          'Requires special sorting, causes white pollution and is difficult to dispose of'
        ],
        stoneBox: [
          'Nestable design, saving 85% of space',
          'Information-based management: Traceable',
          'Easy to recycle'
        ]
      },
      {
        category: 'Environmental Compliance',
        boardBox: [
          'Recycling costs are continuously rising',
          'Foam boxes are subject to bans and restrictions',
          'Environmental Tax'
        ],
        stoneBox: [
          'Carbon Emissions: Reduction of over 85%',
          'Eligible for incentives under international regulations',
          'Included in the national green product catalog'
        ]
      }
    ]
  },
  gallerySlides: [
    {
      id: 'cold-chain',
      category: 'COLD CHAIN & FRESH PRODUCE',
      title: 'Perishable Food & Temperature Controlled Cases',
      images: [
        { url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80', title: 'Lychee & Fresh Berry Box', tag: 'Fresh Produce' },
        { url: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=800&q=80', title: 'Protected Poultry & Egg Crate', tag: 'Zero Rupture' },
        { url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80', title: 'Foldable Insulated Pallet Container', tag: 'Thermal Sealed' },
        { url: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80', title: 'Cold Storage Grocery Turnover Box', tag: '24hr Insulation' }
      ]
    },
    {
      id: 'industrial-esd',
      category: 'HIGH-PRECISION & INDUSTRIAL',
      title: 'Semiconductor, ESD & Heavy Equipment Packaging',
      images: [
        { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', title: 'ESD Antistatic Circuit Board Box', tag: 'ESD ≤10⁹ Ω' },
        { url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80', title: 'Precision Medical Device Container', tag: '50G Impact Rated' },
        { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80', title: 'Heavy Duty Industrial Pallet Crate', tag: 'High Load' },
        { url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', title: 'Automotive Precision Knife Card Box', tag: 'Custom Die-Cut' }
      ]
    },
    {
      id: 'food-beverage',
      category: 'CONSUMER BEVERAGE & LOGISTICS',
      title: 'Craft Beer, Mineral Water & Agricultural Cases',
      images: [
        { url: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80', title: 'RedBull & Energy Drink Multi-Pack', tag: '8-Layer Stacking' },
        { url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80', title: 'Craft Brewery Eco Corrugated Case', tag: 'Moisture Barrier' },
        { url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80', title: 'Agricultural Fruit Export Box', tag: '100% Degradable' },
        { url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80', title: 'Warehouse Palletized Distribution', tag: '85% Space Saved' }
      ]
    }
  ]
};

const EcoPackagingPage = ({ setCurrentPage }) => {
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [activeGallerySlide, setActiveGallerySlide] = useState(0);

  // Admin Mode State
  const [isAdminMode, setIsAdminMode] = useState(() => {
    return localStorage.getItem('uniqix_eco_admin') === 'true';
  });

  // Dynamic Eco Data State
  const [ecoData, setEcoData] = useState(() => {
    const saved = localStorage.getItem('uniqix_eco_packaging_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const merged = { ...DEFAULT_ECO_DATA, ...parsed };
        if (merged.gallerySlides) {
          const nonEmpty = merged.gallerySlides.filter(s => s && s.images && s.images.length > 0);
          if (nonEmpty.length > 0) {
            merged.gallerySlides = nonEmpty;
          }
        }
        return merged;
      } catch (e) {
        console.error('Error parsing eco packaging data:', e);
      }
    }
    return DEFAULT_ECO_DATA;
  });

  useEffect(() => {
    const slideCount = ecoData.gallerySlides?.length || 0;
    if (activeGallerySlide >= slideCount && slideCount > 0) {
      setActiveGallerySlide(slideCount - 1);
    }
  }, [ecoData.gallerySlides, activeGallerySlide]);

  // Modal State for CRUD operations
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    sectionKey: '',
    itemIndex: null,
    modalType: 'standard', // 'standard', 'matrixRow', 'gallerySlide'
    formData: {}
  });

  // Drag / Swipe State for Gallery
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Helper to persist data updates
  const updateEcoData = (newData) => {
    if (newData.gallerySlides) {
      const nonEmpty = newData.gallerySlides.filter(s => s && s.images && s.images.length > 0);
      if (nonEmpty.length > 0) {
        newData.gallerySlides = nonEmpty;
      }
    }
    setEcoData(newData);
    try {
      localStorage.setItem('uniqix_eco_packaging_data', JSON.stringify(newData));
    } catch (e) {
      console.error('Error saving eco data to localStorage:', e);
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        alert('Storage quota exceeded! The image has been auto-compressed, but please try using an Image URL or smaller file.');
      }
    }
  };

  // Exit & Save Admin Mode
  const exitAdminMode = () => {
    setIsAdminMode(false);
    localStorage.removeItem('uniqix_eco_admin');
  };

  // Reset to Defaults
  const handleResetDefaults = () => {
    if (window.confirm('Reset all Eco Packaging sections to factory defaults?')) {
      const freshDefaultData = JSON.parse(JSON.stringify(DEFAULT_ECO_DATA));
      setActiveGallerySlide(0);
      setEcoData(freshDefaultData);
      localStorage.removeItem('uniqix_eco_packaging_data');
    }
  };

  // Open Modal for Create or Edit
  const openModal = (sectionKey, itemIndex = null, initialValues = {}, modalType = 'standard') => {
    setModalConfig({
      sectionKey,
      itemIndex,
      modalType,
      formData: JSON.parse(JSON.stringify(initialValues))
    });
    setShowModal(true);
  };

  // Delete Item Handler
  const handleDeleteItem = (sectionKey, index) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    const currentList = [...ecoData[sectionKey]];
    currentList.splice(index, 1);
    updateEcoData({ ...ecoData, [sectionKey]: currentList });
  };

  // Save Form Handler
  const handleSaveForm = (e) => {
    e.preventDefault();
    try {
      const { sectionKey, itemIndex, modalType, formData } = modalConfig;

      if (sectionKey === 'hero') {
        updateEcoData({ ...ecoData, hero: formData });
      } else if (modalType === 'matrixRow') {
        const parentKey = sectionKey === 'coldChainMatrix' ? 'coldChainData' : sectionKey === 'industrialMatrix' ? 'industrialData' : 'foodBeverageData';
        const newMatrix = [...(ecoData[parentKey]?.matrix || [])];
        newMatrix[itemIndex] = formData;
        updateEcoData({ ...ecoData, [parentKey]: { ...ecoData[parentKey], matrix: newMatrix } });
      } else if (modalType === 'singleImage') {
        let parentKey = 'coldChainData';
        let imgIdx = itemIndex;
        if (sectionKey.startsWith('industrial')) parentKey = 'industrialData';
        if (sectionKey.startsWith('fb')) parentKey = 'foodBeverageData';
        
        const newImages = [...(ecoData[parentKey]?.images || [])];
        newImages[imgIdx] = formData.url || formData.image;
        updateEcoData({ ...ecoData, [parentKey]: { ...ecoData[parentKey], images: newImages } });
      } else if (modalType === 'gallerySingleImage') {
        const newSlides = JSON.parse(JSON.stringify(ecoData.gallerySlides || []));
        
        if (sectionKey === 'galleryImageAdd') {
          const newImgObj = { 
            title: formData.title || 'New Item', 
            tag: formData.tag || 'New Tag', 
            url: formData.url || formData.image || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80' 
          };

          const lastSlideIdx = newSlides.length - 1;
          const lastSlide = newSlides[lastSlideIdx];

          if (lastSlide && lastSlide.images.length < 4) {
            lastSlide.images.push(newImgObj);
            setActiveGallerySlide(lastSlideIdx);
          } else {
            const newSlideObj = {
              id: `slide_${Date.now()}`,
              category: lastSlide?.category || 'APPLICATION GALLERY',
              title: lastSlide?.title ? `${lastSlide.title} (Cont.)` : 'Showcase Grid',
              images: [newImgObj]
            };
            newSlides.push(newSlideObj);
            setActiveGallerySlide(newSlides.length - 1);
          }
        } else {
          const currentSlide = newSlides[activeGallerySlide];
          if (currentSlide && currentSlide.images[itemIndex]) {
            currentSlide.images[itemIndex] = {
              ...currentSlide.images[itemIndex],
              title: formData.title,
              tag: formData.tag,
              url: formData.url || formData.image || currentSlide.images[itemIndex].url
            };
          }
        }
        updateEcoData({ ...ecoData, gallerySlides: newSlides });
      } else if (modalType === 'gallerySlideConfig') {
        const newSlides = [...(ecoData.gallerySlides || [])];
        if (newSlides[itemIndex]) {
          newSlides[itemIndex] = {
            ...newSlides[itemIndex],
            category: formData.category || newSlides[itemIndex].category,
            title: formData.title || newSlides[itemIndex].title
          };
          updateEcoData({ ...ecoData, gallerySlides: newSlides });
        }
      } else if (sectionKey === 'coldChainData' || sectionKey === 'industrialData' || sectionKey === 'foodBeverageData') {
        updateEcoData({ ...ecoData, [sectionKey]: formData });
      } else {
        const currentList = [...(ecoData[sectionKey] || [])];
        if (itemIndex !== null && itemIndex !== undefined) {
          currentList[itemIndex] = formData;
        } else {
          const newItem = { id: `item_${Date.now()}`, ...formData };
          currentList.push(newItem);
        }
        updateEcoData({ ...ecoData, [sectionKey]: currentList });
      }
    } catch (err) {
      console.error('Error saving form:', err);
    } finally {
      setShowModal(false);
    }
  };

  // Swipe Handlers
  const handleStart = (clientX) => {
    setDragStart(clientX);
    setDragEnd(clientX);
    setIsDragging(true);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    setDragEnd(clientX);
  };

  const handleEnd = () => {
    if (!isDragging || dragStart === null || dragEnd === null) {
      setIsDragging(false);
      return;
    }
    const distance = dragStart - dragEnd;
    if (Math.abs(distance) > 30) {
      if (distance > 30 && activeGallerySlide < (ecoData.gallerySlides?.length || 1) - 1) {
        setActiveGallerySlide(prev => prev + 1);
      } else if (distance < -30 && activeGallerySlide > 0) {
        setActiveGallerySlide(prev => prev - 1);
      }
    }
    setIsDragging(false);
    setDragStart(null);
    setDragEnd(null);
  };

  // Icon Resolver for Pillars
  const renderIcon = (iconKey) => {
    switch (iconKey) {
      case 'Droplet': return <Droplet style={{ width: '24px', height: '24px', color: '#38bdf8' }} />;
      case 'Shield': return <Shield style={{ width: '24px', height: '24px', color: '#D4A72C' }} />;
      case 'ThermometerSnowflake': return <ThermometerSnowflake style={{ width: '24px', height: '24px', color: '#06b6d4' }} />;
      case 'Flame': return <Flame style={{ width: '24px', height: '24px', color: '#ef4444' }} />;
      case 'Trash2': return <Trash2 style={{ width: '24px', height: '24px', color: '#10b981' }} />;
      case 'Sparkles': return <Sparkles style={{ width: '24px', height: '24px', color: '#a855f7' }} />;
      default: return <ShieldCheck style={{ width: '24px', height: '24px', color: '#D4A72C' }} />;
    }
  };

  // Generic Product Card Grid Renderer with CRUD support
  const renderProductCardsSection = (sectionKey, productsList) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
      {productsList.map((item, idx) => {
        const isHovered = hoveredCardId === item.id || hoveredCardId === `${sectionKey}_${idx}`;
        return (
          <div
            key={item.id || idx}
            onMouseEnter={() => setHoveredCardId(item.id || `${sectionKey}_${idx}`)}
            onMouseLeave={() => setHoveredCardId(null)}
            style={{
              padding: '1.5rem',
              borderRadius: '1.25rem',
              border: isHovered ? '1px solid #D4A72C' : '1px solid var(--border-glass)',
              background: isHovered ? 'rgba(212, 167, 44, 0.04)' : 'var(--bg-glass)',
              boxShadow: isHovered ? '0 15px 35px rgba(212, 167, 44, 0.15)' : 'var(--shadow-glass)',
              cursor: 'pointer',
              transition: 'all 0.85s cubic-bezier(0.25, 1, 0.5, 1)',
              transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
              position: 'relative'
            }}
          >
            {isAdminMode && (
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                zIndex: 20,
                display: 'flex',
                gap: '6px',
                background: 'rgba(0,0,0,0.85)',
                padding: '4px 8px',
                borderRadius: '8px',
                backdropFilter: 'blur(4px)'
              }}>
                <button
                  onClick={(e) => { e.stopPropagation(); openModal(sectionKey, idx, item); }}
                  style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Edit style={{ width: '12px', height: '12px' }} /> Edit
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteItem(sectionKey, idx); }}
                  style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Trash2 style={{ width: '12px', height: '12px' }} /> Delete
                </button>
              </div>
            )}

            <div style={{
              borderRadius: '0.85rem',
              overflow: 'hidden',
              border: '1px solid var(--border-glass)',
              marginBottom: '1rem',
              height: '210px',
              background: 'var(--bg-glass)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  transition: 'transform 0.85s cubic-bezier(0.25, 1, 0.5, 1)',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                fontFamily: "'Playfair Display', Georgia, serif",
                margin: 0
              }}>
                {item.title} <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#D4A72C', fontFamily: 'monospace' }}>({item.specs})</span>
              </h3>
              <ChevronDown style={{
                width: '18px',
                height: '18px',
                color: '#D4A72C',
                flexShrink: 0,
                transition: 'transform 0.8s ease-in-out',
                transform: isHovered ? 'rotate(180deg)' : 'rotate(0deg)'
              }} />
            </div>

            <div style={{
              maxHeight: isHovered ? '350px' : '0px',
              opacity: isHovered ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.85s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.75s ease-in-out, margin-top 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
              marginTop: isHovered ? '1rem' : '0'
            }}>
              <div style={{
                marginBottom: '0.75rem',
                padding: '0.75rem 0.85rem',
                borderRadius: '10px',
                background: 'rgba(212, 167, 44, 0.06)',
                border: '1px solid rgba(212, 167, 44, 0.2)'
              }}>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  <strong style={{ color: '#D4A72C' }}>Core Advantages:</strong> {item.advantages}
                </p>
              </div>

              <div style={{
                padding: '0.75rem 0.85rem',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-glass)'
              }}>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Wide Applications:</strong> {item.applications}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="eco-packaging-page" style={{ color: 'var(--text-primary)', background: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '3rem' }}>
      
      {/* FLOATING ADMIN TOOLBAR WHEN ADMIN MODE ACTIVE */}
      {isAdminMode && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          background: 'linear-gradient(135deg, #0f172a, #1e293b)',
          color: '#ffffff',
          padding: '0.85rem 1.4rem',
          borderRadius: '16px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.4), 0 0 20px rgba(212, 167, 44, 0.3)',
          border: '1px solid #D4A72C',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          backdropFilter: 'blur(12px)'
        }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#D4A72C', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Settings size={15} /> VISUAL CMS EDITOR MODE
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>Click any Edit button on the page to modify content</div>
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleResetDefaults}
              style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '0.45rem 0.85rem', borderRadius: '8px', fontSize: '0.75rem', cursor: 'pointer' }}
            >
              Reset Defaults
            </button>

            <button
              onClick={exitAdminMode}
              style={{ background: '#10b981', color: '#ffffff', border: 'none', padding: '0.45rem 1rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}
            >
              <Check size={14} /> Done Editing (Save & Close)
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section style={{ padding: '4rem 0 3rem 0', position: 'relative' }}>
        <div className="container">
          <button
            onClick={() => setCurrentPage('products')}
            className="btn btn-secondary"
            style={{
              marginBottom: '2.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.6rem 1.2rem',
              fontSize: '0.85rem'
            }}
          >
            ← Back to B2B Catalog
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }} className="bridge-layout">
            <div style={{ textAlign: 'left', position: 'relative' }}>
              {isAdminMode && (
                <button
                  onClick={() => openModal('hero', null, ecoData.hero)}
                  style={{
                    marginBottom: '1rem',
                    background: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Edit style={{ width: '14px', height: '14px' }} /> Edit Hero Header
                </button>
              )}
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                {ecoData.hero?.category}
              </span>
              <h1 style={{ fontSize: '3.8rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em', fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--text-primary)', lineHeight: '1.15' }}>
                {ecoData.hero?.title}
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: '1.75', margin: 0, maxWidth: '650px' }}>
                {ecoData.hero?.description}
              </p>
            </div>

            {/* Premium Featured Image */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: '2rem',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-glass)',
                border: '1px solid var(--border-glass)',
                height: '320px',
                background: `url(${ecoShowcaseImg}) center/cover no-repeat`
              }} />

              <div style={{
                position: 'absolute',
                top: '15%',
                left: '-30px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#ffffff',
                boxShadow: '0 10px 30px rgba(197, 160, 89, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #D4A72C'
              }}>
                <Cpu style={{ color: '#D4A72C', width: '26px', height: '26px' }} />
              </div>

              <div style={{
                position: 'absolute',
                bottom: '20%',
                left: '-15px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#ffffff',
                boxShadow: '0 10px 30px rgba(197, 160, 89, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #D4A72C'
              }}>
                <ShieldCheck style={{ color: '#D4A72C', width: '26px', height: '26px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: A. TURNOVER BOX */}
      <section style={{ padding: '2rem 0 3rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                TURNOVER BOX CATALOG
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 850, marginTop: '0.5rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                A. Turnover Box
              </h2>
            </div>
            {isAdminMode && (
              <button
                onClick={() => openModal('turnoverProducts')}
                style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Plus style={{ width: '16px', height: '16px' }} /> Add Turnover Product
              </button>
            )}
          </div>
          
          {renderProductCardsSection('turnoverProducts', ecoData.turnoverProducts || [])}
        </div>
      </section>

      {/* SECTION 2: C. COLORED CORRUGATED BOXES */}
      <section style={{ padding: '3rem 0', background: 'rgba(255, 255, 255, 0.015)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                COLORED CORRUGATED CATALOG
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 850, marginTop: '0.5rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                C. Colored Corrugated Boxes
              </h2>
            </div>
            {isAdminMode && (
              <button
                onClick={() => openModal('coloredBoxesProducts')}
                style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Plus style={{ width: '16px', height: '16px' }} /> Add Corrugated Product
              </button>
            )}
          </div>

          {renderProductCardsSection('coloredBoxesProducts', ecoData.coloredBoxesProducts || [])}
        </div>
      </section>

      {/* SECTION 3: D. INSULATED BOX */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                THERMAL & COLD CHAIN CATALOG
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 850, marginTop: '0.5rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                D. Insulated Box
              </h2>
            </div>
            {isAdminMode && (
              <button
                onClick={() => openModal('insulatedBoxesProducts')}
                style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Plus style={{ width: '16px', height: '16px' }} /> Add Insulated Product
              </button>
            )}
          </div>

          {renderProductCardsSection('insulatedBoxesProducts', ecoData.insulatedBoxesProducts || [])}
        </div>
      </section>

      {/* SECTION 4: CORE TECHNICAL ADVANTAGES (6 PILLARS) */}
      <section style={{ padding: '4rem 0 5rem 0', background: 'rgba(255, 255, 255, 0.015)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                PERFORMANCE TESTING & VALIDATION
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 850, marginTop: '0.5rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                Core Technical Advantages
              </h2>
            </div>
            {isAdminMode && (
              <button
                onClick={() => openModal('coreAdvantagesPillars')}
                style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Plus style={{ width: '16px', height: '16px' }} /> Add Technical Pillar
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            {(ecoData.coreAdvantagesPillars || []).map((pillar, idx) => (
              <div
                key={pillar.id || idx}
                style={{
                  borderRadius: '1.25rem',
                  overflow: 'hidden',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-glass)',
                  boxShadow: 'var(--shadow-glass)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                {isAdminMode && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 20,
                    display: 'flex',
                    gap: '6px',
                    background: 'rgba(0,0,0,0.85)',
                    padding: '4px 8px',
                    borderRadius: '8px'
                  }}>
                    <button
                      onClick={() => openModal('coreAdvantagesPillars', idx, pillar)}
                      style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteItem('coreAdvantagesPillars', idx)}
                      style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                    >
                      Delete
                    </button>
                  </div>
                )}

                <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                  <img src={pillar.image} alt={pillar.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}>
                    {renderIcon(pillar.iconKey)}
                  </div>
                </div>

                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {pillar.num}. {pillar.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: 3.1 COLD CHAIN INDUSTRY PACKAGING SOLUTIONS */}
      <section style={{ padding: '4rem 0 5rem 0', background: 'rgba(255, 255, 255, 0.015)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                VALUE CENTER TRANSFORMATION
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 850, marginTop: '0.5rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                3.1 Cold Chain Industry Packaging Solutions
              </h2>
            </div>
            {isAdminMode && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => openModal('coldChainData', null, ecoData.coldChainData, 'coldChainConfig')}
                  style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Edit size={16} /> Edit Cold Chain Config
                </button>
                <button
                  onClick={() => {
                    const newMatrix = [...(ecoData.coldChainData?.matrix || [])];
                    newMatrix.push({ category: 'New Row', boardBox: ['Sample entry'], stoneBox: ['Sample feature'] });
                    updateEcoData({ ...ecoData, coldChainData: { ...ecoData.coldChainData, matrix: newMatrix } });
                  }}
                  style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Plus size={16} /> Add Matrix Row
                </button>
              </div>
            )}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.8fr',
            gap: '2.5rem',
            alignItems: 'stretch'
          }} className="bridge-layout">
            
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid #2b6cb0',
              boxShadow: '0 15px 35px rgba(27, 85, 155, 0.25)',
              background: '#ffffff',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ overflowX: 'auto', flex: 1 }}>
                <table style={{ width: '100%', height: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ background: '#ffffff', borderBottom: '1px solid #cbd5e1' }}>
                      <th style={{ padding: '1rem 1.25rem', width: '22%' }}></th>
                      <th style={{ padding: '0.9rem 1.25rem', background: '#2563eb', color: '#ffffff', fontWeight: 800, textAlign: 'center', width: '39%', fontSize: '0.9rem' }}>Board box</th>
                      <th style={{ padding: '0.9rem 1.25rem', background: '#1d4ed8', color: '#ffffff', fontWeight: 800, textAlign: 'center', width: '39%', fontSize: '0.9rem' }}>Eco-friendly Stone Box</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(ecoData.coldChainData?.matrix || []).map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc', position: 'relative' }}>
                        <td style={{ padding: '1rem 1.25rem', background: '#2563eb', color: '#ffffff', fontWeight: 800, fontSize: '0.85rem', position: 'relative' }}>
                          {row.category}
                          {isAdminMode && (
                            <div style={{ marginTop: '8px', display: 'flex', gap: '4px' }}>
                              <button
                                onClick={() => openModal('coldChainMatrix', idx, row, 'matrixRow')}
                                style={{ background: '#ffffff', color: '#2563eb', border: 'none', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700 }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (!window.confirm('Delete this row?')) return;
                                  const newMat = [...ecoData.coldChainData.matrix];
                                  newMat.splice(idx, 1);
                                  updateEcoData({ ...ecoData, coldChainData: { ...ecoData.coldChainData, matrix: newMat } });
                                }}
                                style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700 }}
                              >
                                Del
                              </button>
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'top', borderLeft: '1px solid #e2e8f0' }}>
                          <ul style={{ paddingLeft: '1.1rem', margin: 0, fontSize: '0.82rem', color: '#334155', lineHeight: 1.6 }}>
                            {row.boardBox.map((item, i) => (
                              <li key={i} style={{ marginBottom: '0.35rem' }}>{item}</li>
                            ))}
                          </ul>
                        </td>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'top', borderLeft: '1px solid #e2e8f0', background: '#eff6ff' }}>
                          <ul style={{ paddingLeft: '1.1rem', margin: 0, fontSize: '0.82rem', color: '#1e293b', lineHeight: 1.6, fontWeight: 500 }}>
                            {row.stoneBox.map((item, i) => (
                              <li key={i} style={{ marginBottom: '0.35rem' }}>{item}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                <div style={{ flex: 1, borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border-glass)', minHeight: '140px', position: 'relative', background: 'var(--bg-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isAdminMode && (
                    <div style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 10, display: 'flex', gap: '4px' }}>
                      <button
                        onClick={() => openModal('coldChainImg0', 0, { url: (ecoData.coldChainData?.images || [])[0] || '' }, 'singleImage')}
                        style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700 }}
                      >
                        Edit Image
                      </button>
                    </div>
                  )}
                  <img
                    src={(ecoData.coldChainData?.images || [])[0] || 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80'}
                    alt="Cold Chain Showcase 1"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1, borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border-glass)', minHeight: '140px', position: 'relative', background: 'var(--bg-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isAdminMode && (
                    <div style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 10, display: 'flex', gap: '4px' }}>
                      <button
                        onClick={() => openModal('coldChainImg1', 1, { url: (ecoData.coldChainData?.images || [])[1] || '' }, 'singleImage')}
                        style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700 }}
                      >
                        Edit Image
                      </button>
                    </div>
                  )}
                  <img
                    src={(ecoData.coldChainData?.images || [])[1] || 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=600&q=80'}
                    alt="Cold Chain Showcase 2"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>

              <div style={{ borderRadius: '16px', background: '#1d4ed8', padding: '1.5rem', color: '#ffffff', boxShadow: '0 15px 30px rgba(29, 78, 216, 0.3)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: '0.75rem', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', textAlign: 'left' }}>
                    Core<br />advantages
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.65rem 0.5rem', borderRadius: '10px' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>{ecoData.coldChainData?.stats?.damageRate || '< 1%'}</div>
                    <div style={{ fontSize: '0.68rem', color: '#e0f2fe' }}>Cargo Damage Rate</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.65rem 0.5rem', borderRadius: '10px' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>{ecoData.coldChainData?.stats?.insulation || 'twice'}</div>
                    <div style={{ fontSize: '0.68rem', color: '#e0f2fe' }}>Thermal Insulation</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.65rem 0.5rem', borderRadius: '10px' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>{ecoData.coldChainData?.stats?.carbonReduction || '25%~50%'}</div>
                    <div style={{ fontSize: '0.68rem', color: '#e0f2fe' }}>Carbon Reduction</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: 3.2 INDUSTRIAL EQUIPMENT PACKAGING SOLUTIONS */}
      <section style={{ padding: '4rem 0 5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                HIGH-PRECISION ASSET PROTECTION
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 850, marginTop: '0.5rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                3.2 Industrial Equipment Packaging Solutions
              </h2>
            </div>
            {isAdminMode && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => openModal('industrialData', null, ecoData.industrialData, 'industrialConfig')}
                  style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Edit size={16} /> Edit Industrial Config
                </button>
                <button
                  onClick={() => {
                    const newMatrix = [...(ecoData.industrialData?.matrix || [])];
                    newMatrix.push({ category: 'New Row', boardBox: ['Sample entry'], stoneBox: ['Sample feature'] });
                    updateEcoData({ ...ecoData, industrialData: { ...ecoData.industrialData, matrix: newMatrix } });
                  }}
                  style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Plus size={16} /> Add Matrix Row
                </button>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr', gap: '2.5rem', alignItems: 'stretch' }} className="bridge-layout">
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #2b6cb0', boxShadow: '0 15px 35px rgba(27, 85, 155, 0.25)', background: '#ffffff', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ overflowX: 'auto', flex: 1 }}>
                <table style={{ width: '100%', height: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ background: '#ffffff', borderBottom: '1px solid #cbd5e1' }}>
                      <th style={{ padding: '1rem 1.25rem', width: '22%' }}></th>
                      <th style={{ padding: '0.9rem 1.25rem', background: '#2563eb', color: '#ffffff', fontWeight: 800, textAlign: 'center', width: '39%' }}>Board/Wool box</th>
                      <th style={{ padding: '0.9rem 1.25rem', background: '#1d4ed8', color: '#ffffff', fontWeight: 800, textAlign: 'center', width: '39%' }}>Eco-friendly Stone Box</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(ecoData.industrialData?.matrix || []).map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td style={{ padding: '1rem 1.25rem', background: '#2563eb', color: '#ffffff', fontWeight: 800, fontSize: '0.85rem' }}>
                          {row.category}
                          {isAdminMode && (
                            <div style={{ marginTop: '8px', display: 'flex', gap: '4px' }}>
                              <button
                                onClick={() => openModal('industrialMatrix', idx, row, 'matrixRow')}
                                style={{ background: '#ffffff', color: '#2563eb', border: 'none', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700 }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (!window.confirm('Delete this row?')) return;
                                  const newMat = [...ecoData.industrialData.matrix];
                                  newMat.splice(idx, 1);
                                  updateEcoData({ ...ecoData, industrialData: { ...ecoData.industrialData, matrix: newMat } });
                                }}
                                style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700 }}
                              >
                                Del
                              </button>
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'top', borderLeft: '1px solid #e2e8f0' }}>
                          <ul style={{ paddingLeft: '1.1rem', margin: 0, fontSize: '0.82rem', color: '#334155', lineHeight: 1.6 }}>
                            {row.boardBox.map((item, i) => (
                              <li key={i} style={{ marginBottom: '0.35rem' }}>{item}</li>
                            ))}
                          </ul>
                        </td>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'top', borderLeft: '1px solid #e2e8f0', background: '#eff6ff' }}>
                          <ul style={{ paddingLeft: '1.1rem', margin: 0, fontSize: '0.82rem', color: '#1e293b', lineHeight: 1.6, fontWeight: 500 }}>
                            {row.stoneBox.map((item, i) => (
                              <li key={i} style={{ marginBottom: '0.35rem' }}>{item}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, minHeight: '260px' }}>
                <div style={{ flex: 1, borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border-glass)', position: 'relative', background: 'var(--bg-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isAdminMode && (
                    <div style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 10, display: 'flex', gap: '4px' }}>
                      <button
                        onClick={() => openModal('industrialImg0', 0, { url: (ecoData.industrialData?.images || [])[0] || '' }, 'singleImage')}
                        style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700 }}
                      >
                        Edit Image
                      </button>
                    </div>
                  )}
                  <img src={(ecoData.industrialData?.images || [])[0] || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'} alt="Precision Medical Equipment" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border-glass)', position: 'relative', background: 'var(--bg-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isAdminMode && (
                    <div style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 10, display: 'flex', gap: '4px' }}>
                      <button
                        onClick={() => openModal('industrialImg1', 1, { url: (ecoData.industrialData?.images || [])[1] || '' }, 'singleImage')}
                        style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700 }}
                      >
                        Edit Image
                      </button>
                    </div>
                  )}
                  <img src={(ecoData.industrialData?.images || [])[1] || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'} alt="ESD Semiconductor Component Box" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

              <div style={{ borderRadius: '16px', background: '#1d4ed8', padding: '1.5rem', color: '#ffffff', boxShadow: '0 15px 30px rgba(29, 78, 216, 0.3)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.2fr 1fr', gap: '0.65rem', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', textAlign: 'left' }}>Core<br />advantages</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.4rem', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700 }}>Cargo Damage Risk</div>
                    <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.4rem', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700 }}>Compression Resistance</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.4rem', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700 }}>Operational Efficiency</div>
                    <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.4rem', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700 }}>Life Cycle Performance</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.4rem', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700 }}>Green Asset</div>
                    <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.4rem', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700 }}>Circular Strategy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: 3.3 FOOD & BEVERAGE PACKAGING SOLUTIONS */}
      <section style={{ padding: '4rem 0 6rem 0', background: 'rgba(255, 255, 255, 0.015)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                CONSUMER FOOD & BEVERAGE SECTOR
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 850, marginTop: '0.5rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                3.3 Food & Beverage Packaging Solutions
              </h2>
            </div>
            {isAdminMode && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => openModal('foodBeverageData', null, ecoData.foodBeverageData, 'foodBeverageConfig')}
                  style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Edit size={16} /> Edit F&B Config
                </button>
                <button
                  onClick={() => {
                    const newMatrix = [...(ecoData.foodBeverageData?.matrix || [])];
                    newMatrix.push({ category: 'New Row', boardBox: ['Sample entry'], stoneBox: ['Sample feature'] });
                    updateEcoData({ ...ecoData, foodBeverageData: { ...ecoData.foodBeverageData, matrix: newMatrix } });
                  }}
                  style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Plus size={16} /> Add Matrix Row
                </button>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr', gap: '2.5rem', alignItems: 'stretch' }} className="bridge-layout">
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #2b6cb0', boxShadow: '0 15px 35px rgba(27, 85, 155, 0.25)', background: '#ffffff', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ overflowX: 'auto', flex: 1 }}>
                <table style={{ width: '100%', height: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ background: '#ffffff', borderBottom: '1px solid #cbd5e1' }}>
                      <th style={{ padding: '1rem 1.25rem', width: '22%' }}></th>
                      <th style={{ padding: '0.9rem 1.25rem', background: '#2563eb', color: '#ffffff', fontWeight: 800, textAlign: 'center', width: '39%' }}>Traditional Foam Box</th>
                      <th style={{ padding: '0.9rem 1.25rem', background: '#1d4ed8', color: '#ffffff', fontWeight: 800, textAlign: 'center', width: '39%' }}>Eco-friendly Stone Box</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(ecoData.foodBeverageData?.matrix || []).map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td style={{ padding: '1rem 1.25rem', background: '#2563eb', color: '#ffffff', fontWeight: 800, fontSize: '0.85rem' }}>
                          {row.category}
                          {isAdminMode && (
                            <div style={{ marginTop: '8px', display: 'flex', gap: '4px' }}>
                              <button
                                onClick={() => openModal('foodBeverageMatrix', idx, row, 'matrixRow')}
                                style={{ background: '#ffffff', color: '#2563eb', border: 'none', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700 }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (!window.confirm('Delete this row?')) return;
                                  const newMat = [...ecoData.foodBeverageData.matrix];
                                  newMat.splice(idx, 1);
                                  updateEcoData({ ...ecoData, foodBeverageData: { ...ecoData.foodBeverageData, matrix: newMat } });
                                }}
                                style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700 }}
                              >
                                Del
                              </button>
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'top', borderLeft: '1px solid #e2e8f0' }}>
                          <ul style={{ paddingLeft: '1.1rem', margin: 0, fontSize: '0.82rem', color: '#334155', lineHeight: 1.6 }}>
                            {row.boardBox.map((item, i) => (
                              <li key={i} style={{ marginBottom: '0.35rem' }}>{item}</li>
                            ))}
                          </ul>
                        </td>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'top', borderLeft: '1px solid #e2e8f0', background: '#eff6ff' }}>
                          <ul style={{ paddingLeft: '1.1rem', margin: 0, fontSize: '0.82rem', color: '#1e293b', lineHeight: 1.6, fontWeight: 500 }}>
                            {row.stoneBox.map((item, i) => (
                              <li key={i} style={{ marginBottom: '0.35rem' }}>{item}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5.25rem', height: '100%' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '1rem', rowGap: '1.75rem' }}>
                {[0, 1, 2, 3].map((imgIdx) => (
                  <div key={imgIdx} style={{ aspectRatio: '1 / 1', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-glass)', position: 'relative', background: 'var(--bg-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isAdminMode && (
                      <div style={{ position: 'absolute', top: '6px', right: '6px', zIndex: 10 }}>
                        <button
                          onClick={() => openModal(`fbImg${imgIdx}`, imgIdx, { url: (ecoData.foodBeverageData?.images || [])[imgIdx] || '' }, 'singleImage')}
                          style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '4px 6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700 }}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                    <img src={(ecoData.foodBeverageData?.images || [])[imgIdx] || 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80'} alt={`F&B Image ${imgIdx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>

              <div style={{ borderRadius: '16px', background: '#1d4ed8', padding: '1.5rem', color: '#ffffff', boxShadow: '0 15px 30px rgba(29, 78, 216, 0.3)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.2fr 1fr', gap: '0.4rem', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', textAlign: 'left' }}>Core<br />advantages</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.4rem', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700 }}>Cargo Damage Risk</div>
                    <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.4rem', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700 }}>Stability</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.4rem', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700 }}>Recyclable Management</div>
                    <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.4rem', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700 }}>Environmental Friendliness</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.4rem', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700 }}>Brand Value Enhancement</div>
                    <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.4rem', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700 }}>Strategic Value</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: INTERACTIVE 2X2 SWIPEABLE IMAGE GALLERY */}
      <section style={{ padding: '5rem 0 6rem 0', background: 'var(--bg-glass)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                APPLICATION GALLERY
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 850, marginTop: '0.5rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                Eco Packaging Solutions Showcase
              </h2>
            </div>
            {isAdminMode && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => openModal('gallerySlides', activeGallerySlide, ecoData.gallerySlides[activeGallerySlide], 'gallerySlideConfig')}
                  style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Edit size={16} /> Edit Current Slide Header
                </button>
                <button
                  onClick={() => openModal('galleryImageAdd', activeGallerySlide, { title: '', tag: 'New Tag', url: '' }, 'gallerySingleImage')}
                  style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Plus size={16} /> Add Image to Grid
                </button>
              </div>
            )}
          </div>

          <div 
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            onTouchEnd={handleEnd}
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseMove={(e) => handleMove(e.clientX)}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            style={{
              borderRadius: '24px',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-glass)',
              boxShadow: '0 20px 45px rgba(0,0,0,0.06)',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none'
            }}
          >
            <div style={{
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              marginBottom: '1.75rem',
              flexWrap: 'wrap',
              gap: '1rem',
              borderBottom: '1px solid var(--border-glass)',
              paddingBottom: '1.25rem'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {(ecoData.gallerySlides || [])[activeGallerySlide]?.category}
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0.2rem 0 0 0', color: 'var(--text-primary)' }}>
                  {(ecoData.gallerySlides || [])[activeGallerySlide]?.title}
                </h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {(ecoData.gallerySlides || []).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setActiveGallerySlide(idx); }}
                      style={{
                        width: idx === activeGallerySlide ? '24px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        background: idx === activeGallerySlide ? '#D4A72C' : 'var(--border-glass-hover)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveGallerySlide(prev => Math.max(0, prev - 1)); }}
                    disabled={activeGallerySlide === 0}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      border: 'none',
                      background: activeGallerySlide === 0 ? '#cbd5e1' : '#D4A72C',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: activeGallerySlide === 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    -
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveGallerySlide(prev => Math.min((ecoData.gallerySlides?.length || 1) - 1, prev + 1)); }}
                    disabled={activeGallerySlide === (ecoData.gallerySlides?.length || 1) - 1}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      border: 'none',
                      background: activeGallerySlide === (ecoData.gallerySlides?.length || 1) - 1 ? '#cbd5e1' : '#D4A72C',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: activeGallerySlide === (ecoData.gallerySlides?.length || 1) - 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              {(((ecoData.gallerySlides || [])[activeGallerySlide]?.images || []).slice(0, 4)).map((imgItem, imgIdx) => (
                <div
                  key={imgIdx}
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    position: 'relative',
                    height: '240px',
                    border: '1px solid var(--border-glass)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.04)'
                  }}
                >
                  {isAdminMode && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 20, display: 'flex', gap: '6px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal('galleryImageEdit', imgIdx, imgItem, 'gallerySingleImage');
                        }}
                        style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Edit size={12} /> Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!window.confirm('Delete this image from showcase grid?')) return;
                          const newSlides = JSON.parse(JSON.stringify(ecoData.gallerySlides || []));
                          if (newSlides[activeGallerySlide] && newSlides[activeGallerySlide].images) {
                            newSlides[activeGallerySlide].images.splice(imgIdx, 1);
                            const nonEmpty = newSlides.filter(s => s && s.images && s.images.length > 0);
                            const finalSlides = nonEmpty.length > 0 ? nonEmpty : newSlides;
                            if (activeGallerySlide >= finalSlides.length) {
                              setActiveGallerySlide(Math.max(0, finalSlides.length - 1));
                            }
                            updateEcoData({ ...ecoData, gallerySlides: finalSlides });
                          }
                        }}
                        style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  )}
                  <div style={{ width: '100%', height: '100%', background: 'var(--bg-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={imgItem.url} alt={imgItem.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1.25rem',
                    color: '#ffffff'
                  }}>
                    <span style={{
                      alignSelf: 'flex-start',
                      background: 'rgba(212, 167, 44, 0.9)',
                      color: '#06122c',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.72rem',
                      fontWeight: 800
                    }}>
                      {imgItem.tag}
                    </span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                      {imgItem.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* UNIVERSAL ADMIN EDIT / CREATE MODAL WITH HIGH Z-INDEX & NAVBAR CLEARANCE */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999, // High Z-Index to prevent floating Navbar clash
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '2rem 1.5rem 3rem 1.5rem',
          paddingTop: '110px', // Top padding prevents header overlapping floating navbar
          overflowY: 'auto'
        }}>
          <div style={{
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '680px',
            padding: '2rem',
            boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
            border: '2px solid #D4A72C',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                <Edit style={{ color: '#D4A72C', width: '22px', height: '22px' }} />
                {modalConfig.itemIndex !== null ? 'Edit Section Item' : 'Add New Section Item'}
              </h3>
              <button 
                type="button"
                onClick={() => setShowModal(false)} 
                style={{ background: 'rgba(0,0,0,0.05)', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            <form onSubmit={handleSaveForm} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {modalConfig.sectionKey === 'hero' ? (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Category Badge</label>
                    <input
                      type="text"
                      value={modalConfig.formData.category || ''}
                      onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, category: e.target.value } })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Main Title (H1)</label>
                    <input
                      type="text"
                      value={modalConfig.formData.title || ''}
                      onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, title: e.target.value } })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Description Subtitle</label>
                    <textarea
                      rows={4}
                      value={modalConfig.formData.description || ''}
                      onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, description: e.target.value } })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      required
                    />
                  </div>
                </>
              ) : modalConfig.modalType === 'coldChainConfig' ? (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Cargo Damage Rate Stat</label>
                    <input
                      type="text"
                      value={modalConfig.formData.stats?.damageRate || ''}
                      onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, stats: { ...modalConfig.formData.stats, damageRate: e.target.value } } })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Thermal Insulation Stat</label>
                    <input
                      type="text"
                      value={modalConfig.formData.stats?.insulation || ''}
                      onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, stats: { ...modalConfig.formData.stats, insulation: e.target.value } } })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Carbon Reduction Stat</label>
                    <input
                      type="text"
                      value={modalConfig.formData.stats?.carbonReduction || ''}
                      onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, stats: { ...modalConfig.formData.stats, carbonReduction: e.target.value } } })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </>
              ) : modalConfig.modalType === 'gallerySlideConfig' ? (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Category Badge</label>
                    <input
                      type="text"
                      value={modalConfig.formData.category || ''}
                      onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, category: e.target.value } })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Slide Title</label>
                    <input
                      type="text"
                      value={modalConfig.formData.title || ''}
                      onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, title: e.target.value } })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      required
                    />
                  </div>
                </>
              ) : modalConfig.modalType === 'matrixRow' ? (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Category Name</label>
                    <input
                      type="text"
                      value={modalConfig.formData.category || ''}
                      onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, category: e.target.value } })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Traditional / Board Box Bullet Points (one per line)</label>
                    <textarea
                      rows={4}
                      value={(modalConfig.formData.boardBox || []).join('\n')}
                      onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, boardBox: e.target.value.split('\n') } })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Eco-friendly Stone Box Bullet Points (one per line)</label>
                    <textarea
                      rows={4}
                      value={(modalConfig.formData.stoneBox || []).join('\n')}
                      onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, stoneBox: e.target.value.split('\n') } })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      required
                    />
                  </div>
                </>
              ) : modalConfig.modalType === 'gallerySingleImage' ? (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Image Title</label>
                    <input
                      type="text"
                      value={modalConfig.formData.title || ''}
                      onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, title: e.target.value } })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Badge Tag (e.g. Fresh Produce, ESD Protection)</label>
                    <input
                      type="text"
                      value={modalConfig.formData.tag || ''}
                      onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, tag: e.target.value } })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Upload Image File or Paste Image URL</label>
                    <input
                      type="text"
                      placeholder="Paste image URL (https://...)"
                      value={modalConfig.formData.url || modalConfig.formData.image || ''}
                      onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, url: e.target.value, image: e.target.value } })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}
                    />
                    {(modalConfig.formData.url || modalConfig.formData.image) && (
                      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0.75rem' }}>
                        <img
                          src={modalConfig.formData.url || modalConfig.formData.image}
                          alt="Preview"
                          style={{ maxWidth: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--border-glass)', display: 'block' }}
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const compressed = await compressImageFile(file);
                          if (compressed) {
                            setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, url: compressed, image: compressed } });
                          }
                        }
                      }}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)', cursor: 'pointer' }}
                    />
                  </div>
                </>
              ) : modalConfig.modalType === 'singleImage' ? (
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Upload Replacement Image or Paste Image URL</label>
                  <input
                    type="text"
                    placeholder="Paste image URL (https://...)"
                    value={modalConfig.formData.url || modalConfig.formData.image || ''}
                    onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, url: e.target.value, image: e.target.value } })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}
                  />
                  {(modalConfig.formData.url || modalConfig.formData.image) && (
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0.75rem' }}>
                      <img
                        src={modalConfig.formData.url || modalConfig.formData.image}
                        alt="Preview"
                        style={{ maxWidth: '100%', height: '160px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--border-glass)', display: 'block' }}
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const compressed = await compressImageFile(file);
                        if (compressed) {
                          setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, url: compressed, image: compressed } });
                        }
                      }
                    }}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)', cursor: 'pointer' }}
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Title</label>
                    <input
                      type="text"
                      value={modalConfig.formData.title || ''}
                      onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, title: e.target.value } })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      required
                    />
                  </div>

                  {(modalConfig.formData.specs !== undefined || ['turnoverProducts', 'coloredBoxesProducts', 'insulatedBoxesProducts'].includes(modalConfig.sectionKey)) && (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Dimensions / Specs</label>
                      <input
                        type="text"
                        value={modalConfig.formData.specs || ''}
                        onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, specs: e.target.value } })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      />
                    </div>
                  )}

                  {modalConfig.sectionKey === 'coreAdvantagesPillars' && (
                    <>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Pillar Number (e.g. 1)</label>
                        <input
                          type="text"
                          value={modalConfig.formData.num || ''}
                          onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, num: e.target.value } })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Icon (Droplet, Shield, ThermometerSnowflake, Flame, Trash2, Sparkles)</label>
                        <input
                          type="text"
                          value={modalConfig.formData.iconKey || ''}
                          onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, iconKey: e.target.value } })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Upload Image File or Paste Image URL</label>
                    <input
                      type="text"
                      placeholder="Paste image URL (https://...)"
                      value={modalConfig.formData.image || modalConfig.formData.url || ''}
                      onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, image: e.target.value, url: e.target.value } })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}
                    />
                    
                    {(modalConfig.formData.image || modalConfig.formData.url) && (
                      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0.75rem' }}>
                        <img
                          src={modalConfig.formData.image || modalConfig.formData.url}
                          alt="Selected Preview"
                          style={{ maxWidth: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--border-glass)', display: 'block' }}
                        />
                        <button
                          type="button"
                          onClick={() => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, image: '', url: '' } })}
                          style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: '#ef4444',
                            color: '#ffffff',
                            border: '2px solid #ffffff',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                            zIndex: 10
                          }}
                          title="Remove Image"
                        >
                          <X style={{ width: '14px', height: '14px' }} />
                        </button>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const compressed = await compressImageFile(file);
                          if (compressed) {
                            setModalConfig({
                              ...modalConfig,
                              formData: {
                                ...modalConfig.formData,
                                image: compressed,
                                url: compressed
                              }
                            });
                          }
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: '0.6rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-glass)',
                        background: 'var(--bg-glass)',
                        color: 'var(--text-primary)',
                        cursor: 'pointer'
                      }}
                    />
                  </div>

                  {(modalConfig.formData.advantages !== undefined || ['turnoverProducts', 'coloredBoxesProducts', 'insulatedBoxesProducts'].includes(modalConfig.sectionKey)) && (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Core Advantages</label>
                      <textarea
                        rows={3}
                        value={modalConfig.formData.advantages || ''}
                        onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, advantages: e.target.value } })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      />
                    </div>
                  )}

                  {(modalConfig.formData.applications !== undefined || ['turnoverProducts', 'coloredBoxesProducts', 'insulatedBoxesProducts'].includes(modalConfig.sectionKey)) && (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Wide Applications</label>
                      <textarea
                        rows={3}
                        value={modalConfig.formData.applications || ''}
                        onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, applications: e.target.value } })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      />
                    </div>
                  )}

                  {(modalConfig.formData.desc !== undefined || modalConfig.sectionKey === 'coreAdvantagesPillars') && (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Description</label>
                      <textarea
                        rows={3}
                        value={modalConfig.formData.desc || ''}
                        onChange={(e) => setModalConfig({ ...modalConfig, formData: { ...modalConfig.formData, desc: e.target.value } })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      />
                    </div>
                  )}
                </>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: '0.75rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '0.75rem 1.75rem', borderRadius: '8px', border: 'none', background: '#D4A72C', color: '#ffffff', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 14px rgba(212, 167, 44, 0.4)' }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default EcoPackagingPage;
