/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DigitalMosaicScene, GlobalConnectionScene } from './components/QuantumScene';
import { ExpenseScanner, VoiceAgentVisualizer, SEOMetrics, BridgingVisual, TypingEffect, CorporateTrainingVisualizer, IndividualEducationVisualizer } from './components/Diagrams';
import { SEOContext } from './components/SEOContext';
import { ArrowRight, Menu, X, Check, Mail, MapPin, Globe, ChevronDown, Plus, Minus, Music, HelpCircle, PenTool, Calendar, ChevronLeft, ChevronRight, User, Building, ArrowLeft, CheckCircle, MessageCircle, Cpu } from 'lucide-react';

type Language = 'en' | 'fr' | 'ar';

// Brand Logo Component
const BrandLogo = ({ size = 40, className = "" }: { size?: number, className?: string }) => (
  <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size * 0.8 }}>
    {/* The Box frame */}
    <svg width="100%" height="100%" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
      <rect x="2" y="6" width="46" height="32" rx="2" stroke="currentColor" strokeWidth="2" className="text-majorelle" />
      {/* Control points */}
      <circle cx="2" cy="6" r="2" fill="#F4F1DE" stroke="currentColor" strokeWidth="1.5" className="text-majorelle"/>
      <circle cx="48" cy="6" r="2" fill="#F4F1DE" stroke="currentColor" strokeWidth="1.5" className="text-majorelle"/>
      <rect x="23" y="4" width="4" height="4" fill="#F4F1DE" stroke="currentColor" strokeWidth="1.5" className="text-majorelle"/>
      {/* Connecting lines */}
      <line x1="4" y1="6" x2="23" y2="6" stroke="currentColor" strokeWidth="1" className="text-majorelle"/>
      <line x1="27" y1="6" x2="46" y2="6" stroke="currentColor" strokeWidth="1" className="text-majorelle"/>
    </svg>
    {/* The Pen */}
    <div className="absolute inset-0 flex items-center justify-center pt-2">
         <PenTool size={size * 0.45} className="text-terracotta" fill="currentColor" fillOpacity={0.2} />
    </div>
  </div>
);

const translations = {
  en: {
    nav: {
      mission: "Mission",
      solutions: "Solutions",
      founder: "Founder",
      blog: "Blog",
      faq: "FAQ",
      cta: "Get Consultation",
      contact: "Contact Us",
      slogan: "Building a Smarter Morocco Together"
    },
    hero: {
      badge: "Morocco's Leading AI Consultancy",
      titlePre: "Rooted in Culture,",
      titlePost: "Powered by Global Innovation.",
      desc: "We deliver advanced, multilingual AI solutions—helping Moroccan enterprises boost productivity and reach international clients.",
      btnExplore: "Explore Solutions",
      btnBook: "Book Consultation",
      scroll: "Scroll"
    },
    mission: {
      title: "Bridging Tradition & Technology",
      text: "Arabic AI Agents is the #1 choice for Moroccan businesses seeking transformative AI integration. We combine deep respect for Moroccan business culture with world-class automation expertise to help you stay ahead in the digital age."
    },
    solutions: {
      subtitle: "Example of some of our solutions",
      title: "Proven AI Solutions",
      categories: {
        business: "Business Solutions",
        corp_edu: "Education and Training for Businesses",
        ind_edu: "Education and Training for Individuals"
      },
      expense: {
        title: "Automated Expense Management",
        desc: "Eliminate manual entry errors. Our AI system scans invoices sent via WhatsApp and syncs them to your CRM with 99% accuracy.",
        points: [
            "Works in Arabic, French, and English",
            "Saves finance teams hundreds of hours",
            "Instant syncing to Business CRM"
        ],
        cta: "Automate Your Expenses"
      },
      voice: {
        title: "AI Voice Agents",
        desc: "Transform how you serve global clients. Our voice agents speak fluent Arabic, Darija, French, and English—handling bookings 24/7 without missing a beat.",
        quote: "The clinic's international client base doubled in months... leading to faster ROI and happier, loyal customers.",
        cta: "Request Voice Demo"
      },
      seo: {
        title: "AI SEO & Content Creation",
        desc: "Rank at the top of Google in days, not months. Our system adapts to Moroccan cultural context and fast-moving trends to drive local sales while cutting agency costs.",
        p1Title: "Hyper-Local Content",
        p1Desc: "AI influencer creations and UGC style content relevant to business identity.",
        p2Title: "Rapid Ranking",
        p2Desc: "Smart keyword targeting for the Moroccan market.",
        cta: "Start Ranking Today"
      },
      training: {
          title: "Corporate Training & Education",
          desc: "Boost your entire team’s efficiency and future-readiness with tailored AI upskilling. Workshops for staff and managers, designed to automate tasks, improve customer service, and drive business outcomes.",
          points: [
              "Industry-focused sessions: finance, retail, hospitality, healthcare",
              "Real-world AI tools and effective workflow automations",
              "Delivered in Arabic, French, and English for full team participation"
          ],
          cta: "Enable your team for tomorrow—Book Corporate AI Training Now"
      },
      education: {
          title: "Individual Learner Education",
          desc: "World-class AI education for founders, business owners, and solo entrepreneurs. Accelerator-style programs to master the most in-demand AI skills, fast.",
          points: [
              "No-code, non-technical approach—learn actionable strategies",
              "Focused tracks for founders, executives, consultants, and freelancers",
              "Community support, mentorship, and exclusive MENA business resources"
          ],
          cta: "Invest in yourself—Join the Next AI Education Program"
      }
    },
    founder: {
      name: "Zara Hunter",
      role: "Founder",
      title: "A Unique Perspective",
      card1Title: "Moroccan Cultural Insight",
      card1Desc: "Born and raised in Morocco, Zara understands the local language, business practices, and unique challenges facing Moroccan entrepreneurs.",
      card2Title: "London-Trained Innovation",
      card2Desc: "With experience in London's dynamic tech and finance sectors, she brings cutting-edge automation strategies and productivity hacks from the world's top tech hubs.",
      quote: "Fusing the warmth and creativity of Morocco with results-driven London methodologies.",
      cta: "Work With Zara's Team"
    },
    blog: {
      title: "Latest Insights",
      subtitle: "Expert analysis on the future of work in Morocco.",
      readMore: "Read Article",
      articles: [
        {
          title: "Why Moroccan Businesses Are Switching to AI",
          date: "Oct 24, 2023",
          category: "Business",
          excerpt: "From automation to customer service, discover how local SMEs are cutting costs by 40% with intelligent agents."
        },
        {
          title: "The Rise of Darija-Speaking Bots",
          date: "Nov 02, 2023",
          category: "Technology",
          excerpt: "How natural language processing is finally cracking the code on Moroccan dialect for seamless interactions."
        },
        {
          title: "Casablanca: The Next Tech Hub?",
          date: "Nov 15, 2023",
          category: "Economy",
          excerpt: "Investment in digital infrastructure is paving the way for a new era of innovation across North Africa."
        }
      ]
    },
    faq: {
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know about AI adoption in Morocco.",
        items: [
            {
                q: "What makes Arabic AI Agents different from other consultancies?",
                a: "We are the only consultancy specifically optimizing AI for the Moroccan linguist landscape. Our models are fine-tuned to understand code-switching between Darija, French, and Arabic, ensuring your automation feels natural and culturally respectful, unlike generic global tools."
            },
            {
                q: "Do I need a technical team to use your solutions?",
                a: "Not at all. We specialize in 'No-Code' and 'Low-Code' implementation. We build the infrastructure, integrate it into your existing tools (like WhatsApp, HubSpot, or Salesforce), and train your staff on how to use it. You focus on business; we handle the tech."
            },
            {
                q: "How does your AI handle Moroccan Darija?",
                a: "We utilize advanced Natural Language Processing (NLP) layers custom-trained on Moroccan dialects. This allows our Voice Agents and Chatbots to understand local idioms, slang, and the unique mix of French and Arabic used in daily Moroccan business communication."
            },
            {
                q: "Is AI automation suitable for traditional sectors like Real Estate or Agriculture?",
                a: "Absolutely. These are often the sectors that benefit most. For Real Estate, we automate lead qualification and scheduling. For Agriculture, we can automate supply chain tracking and vendor communication. Our goal is to modernize operations without losing the personal touch."
            },
            {
                q: "What is the typical ROI for a Moroccan SME?",
                a: "Most of our clients see a return on investment within 3 months. By automating repetitive tasks like data entry, appointment booking, and basic customer support, businesses typically reduce operational costs by 30% while increasing lead conversion rates by over 40%."
            }
        ],
        ctaTitle: "Still have questions?",
        ctaBtn: "Speak to an Expert"
    },
    footer: {
      desc: "Helping Moroccan businesses compete and win on the global stage through intelligent automation.",
      contact: "Contact",
      social: "Social",
      rights: "© 2024 Arabic AI Agents. All rights reserved."
    },
    booking: {
      title: "Contact Us",
      desc: "Fill out the form below to get in touch with our team. We'll review your enquiry and respond shortly.",
      duration: "Typical Response: 24h",
      type: "Email Enquiry",
      calendarTitle: "Your Details",
      confirm: "Send Enquiry",
      month: "",
      formName: "Full Name",
      formEmail: "Work Email",
      formWebsite: "Website (Optional)",
      formRequest: "Your Enquiry",
      back: "Back",
      successTitle: "Message Sent!",
      successMsg: "We will get back to you asap."
    },
    diagrams: {
        expense: {
            botName: "Expenses Bot",
            online: "Online",
            welcome: "Marhba! Send me a photo of your receipt. 📸",
            supermarket: "SUPERMARKET CASABLANCA",
            total: "TOTAL",
            saved: "Saved to CRM",
            heading: "WhatsApp to CRM",
            subheading: "Simply snap a photo. Our AI extracts key fields with 99% accuracy.",
            extracted: "Extracted Data",
            fields: { date: "Date", vendor: "Vendor", category: "Category", amount: "Amount" }
        },
        voice: {
            title: "Polyglot Voice Agent",
            subtitle: "Fluent in Arabic, Darija, French, and English.",
            noBarrier: "NO LANGUAGE BARRIERS",
            nlp: "NATURAL NLP PROCESSING"
        },
        seo: {
            title: "AI-Powered SEO Growth",
            subtitle: "Comparison of traffic growth: Traditional Agency vs Arabic AI Agents.",
            yAxis: "WEB TRAFFIC",
            traditional: "Traditional (Months)",
            ai: "Top Rank in Days",
            cost: "Cost Savings",
            sales: "Local Sales"
        },
        training: {
            title: "Team Capability Growth",
            subtitle: "Visualize the impact of AI training on your workforce.",
            before: "Before Training",
            after: "After Training",
            metrics: { efficiency: "Workflow Efficiency", automation: "Task Automation", skills: "Digital Readiness" },
            icons: { team: "Engaged Team", speed: "Faster Output", growth: "Business Growth" }
        },
        education: {
            title: "The AI Certified Founder",
            subtitle: "Your roadmap to AI mastery.",
            steps: { basics: "AI Basics", strategy: "No-Code Strategy", mastery: "AI Leadership" },
            resultLabel: "Outcome",
            resultValue: "Launch Automation Projects with Confidence"
        }
    }
  },
  fr: {
    nav: {
      mission: "Mission",
      solutions: "Solutions",
      founder: "Fondatrice",
      blog: "Blog",
      faq: "FAQ",
      cta: "Obtenir une Consultation",
      contact: "Contactez-nous",
      slogan: "Construire Ensemble un Maroc Plus Intelligent"
    },
    hero: {
      badge: "Leader du Conseil en IA au Maroc",
      titlePre: "Ancré dans la Culture,",
      titlePost: "Propulsé par l'Innovation Mondiale.",
      desc: "Nous fournissons des solutions IA avancées et multilingues pour aider les entreprises marocaines à augmenter leur productivité et atteindre des clients internationaux.",
      btnExplore: "Explorer les Solutions",
      btnBook: "Réserver une Consultation",
      scroll: "Défiler"
    },
    mission: {
      title: "Allier Tradition & Technologie",
      text: "Arabic AI Agents est le choix n°1 pour les entreprises marocaines cherchant une intégration IA transformatrice. Nous combinons un profond respect pour la culture d'affaires marocaine avec une expertise mondiale en automatisation."
    },
    solutions: {
      subtitle: "Exemples de certaines de nos solutions",
      title: "Solutions IA Éprouvées",
      categories: {
        business: "Solutions d'Affaires",
        corp_edu: "Éducation et Formation pour Entreprises",
        ind_edu: "Éducation et Formation pour Particuliers"
      },
      expense: {
        title: "Gestion Automatisée des Dépenses",
        desc: "Éliminez les erreurs de saisie manuelle. Notre système IA scanne les factures envoyées via WhatsApp et les synchronise avec votre CRM avec 99% de précision.",
        points: [
            "Fonctionne en Arabe, Français et Anglais",
            "Économise des centaines d'heures aux équipes financières",
            "Synchronisation instantanée avec le CRM"
        ],
        cta: "Automatisez Vos Dépenses"
      },
      voice: {
        title: "Agents Vocaux IA",
        desc: "Transformez votre service client mondial. Nos agents vocaux parlent couramment Arabe, Darija, Français et Anglais—gérant les réservations 24/7.",
        quote: "La base de clients internationaux de la clinique a doublé en quelques mois... menant à un ROI plus rapide et des clients fidèles.",
        cta: "Demander une Démo Vocale"
      },
      seo: {
        title: "SEO IA & Création de Contenu",
        desc: "Classez-vous en tête de Google en quelques jours. Notre système s'adapte au contexte culturel marocain et aux tendances rapides pour stimuler les ventes locales.",
        p1Title: "Contenu Hyper-Local",
        p1Desc: "Créations d'influenceurs IA et contenu style UGC pertinent pour l'identité de l'entreprise.",
        p2Title: "Classement Rapide",
        p2Desc: "Ciblage intelligent de mots-clés pour le marché marocain.",
        cta: "Boostez Votre Trafic"
      },
      training: {
          title: "Formation et Éducation d'Entreprise",
          desc: "Boostez l'efficacité de toute votre équipe avec une montée en compétences IA sur mesure. Ateliers pour le personnel et les managers.",
          points: [
              "Sessions axées sur l'industrie : finance, commerce, hôtellerie, santé",
              "Outils IA concrets et automatisations de flux de travail efficaces",
              "Dispensé en Arabe, Français et Anglais pour une participation totale"
          ],
          cta: "Préparez votre équipe pour demain—Réservez la Formation IA"
      },
      education: {
          title: "Éducation pour Apprenants Individuels",
          desc: "Éducation IA de classe mondiale pour fondateurs et entrepreneurs. Programmes accélérateurs pour maîtriser rapidement les compétences IA.",
          points: [
              "Approche sans code et non technique—apprenez des stratégies applicables",
              "Parcours ciblés pour fondateurs, cadres, consultants et freelances",
              "Soutien communautaire, mentorat et ressources commerciales exclusives MENA"
          ],
          cta: "Investissez en vous—Rejoignez le Programme d'Éducation IA"
      }
    },
    founder: {
      name: "Zara Hunter",
      role: "Fondatrice",
      title: "Une Perspective Unique",
      card1Title: "Vision Culturelle Marocaine",
      card1Desc: "Née et élevée au Maroc, Zara comprend la langue locale, les pratiques commerciales et les défis uniques des entrepreneurs marocains.",
      card2Title: "Innovation Formée à Londres",
      card2Desc: "Avec une expérience dans les secteurs tech et finance de Londres, elle apporte des stratégies d'automatisation de pointe des meilleurs hubs technologiques mondiaux.",
      quote: "Fusionner la chaleur et la créativité du Maroc avec les méthodologies londoniennes axées sur les résultats.",
      cta: "Travailler avec l'Équipe de Zara"
    },
    blog: {
      title: "Dernières Actualités",
      subtitle: "Analyses expertes sur l'avenir du travail au Maroc.",
      readMore: "Lire l'article",
      articles: [
        {
          title: "Pourquoi les entreprises marocaines passent à l'IA",
          date: "24 Oct 2023",
          category: "Affaires",
          excerpt: "De l'automatisation au service client, découvrez comment les PME locales réduisent leurs coûts grâce aux agents intelligents."
        },
        {
          title: "L'essor des bots parlant Darija",
          date: "02 Nov 2023",
          category: "Technologie",
          excerpt: "Comment le traitement du langage naturel décrypte enfin le dialecte marocain pour des interactions fluides."
        },
        {
          title: "Casablanca : Le prochain Hub Tech ?",
          date: "15 Nov 2023",
          category: "Économie",
          excerpt: "L'investissement dans l'infrastructure numérique ouvre la voie à une nouvelle ère d'innovation en Afrique du Nord."
        }
      ]
    },
    faq: {
        title: "Questions Fréquemment Posées",
        subtitle: "Tout ce que vous devez savoir sur l'adoption de l'IA au Maroc.",
        items: [
            {
                q: "Qu'est-ce qui différencie Arabic AI Agents des autres cabinets ?",
                a: "Nous sommes le seul cabinet optimisant spécifiquement l'IA pour le paysage linguistique marocain. Nos modèles comprennent l'alternance de code entre la Darija, le français et l'arabe, garantissant une automatisation naturelle et respectueuse de la culture."
            },
            {
                q: "Ai-je besoin d'une équipe technique pour utiliser vos solutions ?",
                a: "Pas du tout. Nous nous spécialisons dans la mise en œuvre 'No-Code' et 'Low-Code'. Nous construisons l'infrastructure, l'intégrons à vos outils existants (WhatsApp, HubSpot, Salesforce) et formons votre personnel. Vous gérez l'entreprise, nous gérons la technologie."
            },
            {
                q: "Comment votre IA gère-t-elle la Darija marocaine ?",
                a: "Nous utilisons des couches de Traitement du Langage Naturel (NLP) entraînées sur mesure sur les dialectes marocains. Cela permet à nos agents de comprendre les expressions locales, l'argot et le mélange unique de langues utilisé dans les affaires au Maroc."
            },
            {
                q: "L'automatisation IA convient-elle aux secteurs traditionnels ?",
                a: "Absolument. Pour l'immobilier, nous automatisons la qualification des leads. Pour l'agriculture, nous suivons la chaîne d'approvisionnement. Notre objectif est de moderniser les opérations sans perdre la touche personnelle."
            },
            {
                q: "Quel est le ROI typique pour une PME marocaine ?",
                a: "La plupart de nos clients voient un retour sur investissement en 3 mois. En automatisant les tâches répétitives, les entreprises réduisent généralement les coûts opérationnels de 30% tout en augmentant les taux de conversion de plus de 40%."
            }
        ],
        ctaTitle: "Encore des questions ?",
        ctaBtn: "Parler à un Expert"
    },
    footer: {
      desc: "Aider les entreprises marocaines à rivaliser et gagner sur la scène mondiale grâce à l'automatisation intelligente.",
      contact: "Contact",
      social: "Social",
      rights: "© 2024 Arabic AI Agents. Tous droits réservés."
    },
    booking: {
      title: "Contactez-nous",
      desc: "Remplissez le formulaire ci-dessous pour entrer en contact avec notre équipe. Nous examinerons votre demande et vous répondrons sous peu.",
      duration: "Réponse : 24h",
      type: "Demande par Email",
      calendarTitle: "Vos Coordonnées",
      confirm: "Envoyer la Demande",
      month: "",
      formName: "Nom Complet",
      formEmail: "Email Professionnel",
      formWebsite: "Site Web (Optionnel)",
      formRequest: "Votre Demande",
      back: "Retour",
      successTitle: "Message Envoyé !",
      successMsg: "Nous vous répondrons dès que possible."
    },
    diagrams: {
        expense: {
            botName: "Bot Dépenses",
            online: "En ligne",
            welcome: "Marhba! Envoyez une photo du reçu. 📸",
            supermarket: "SUPERMARCHÉ CASABLANCA",
            total: "TOTAL",
            saved: "Enregistré dans le CRM",
            heading: "WhatsApp vers CRM",
            subheading: "Prenez simplement une photo. Notre IA extrait les champs clés avec 99% de précision.",
            extracted: "Données Extraites",
            fields: { date: "Date", vendor: "Vendeur", category: "Catégorie", amount: "Montant" }
        },
        voice: {
            title: "Agent Vocal Polyglotte",
            subtitle: "Parle couramment Arabe, Darija, Français et Anglais.",
            noBarrier: "SANS BARRIÈRES LINGUISTIQUES",
            nlp: "TRAITEMENT NLP NATUREL"
        },
        seo: {
            title: "Croissance SEO par IA",
            subtitle: "Comparaison du trafic : Agence Traditionnelle vs Arabic AI Agents.",
            yAxis: "TRAFIC WEB",
            traditional: "Traditionnel (Mois)",
            ai: "Premier Rang (Jours)",
            cost: "Économies",
            sales: "Ventes Locales"
        },
        training: {
            title: "Croissance des Capacités d'Équipe",
            subtitle: "Visualisez l'impact de la formation IA sur vos effectifs.",
            before: "Avant Formation",
            after: "Après Formation",
            metrics: { efficiency: "Efficacité du Flux", automation: "Automatisation", skills: "Préparation Numérique" },
            icons: { team: "Équipe Engagée", speed: "Production Rapide", growth: "Croissance" }
        },
        education: {
            title: "Le Fondateur Certifié IA",
            subtitle: "Votre feuille de route vers la maîtrise de l'IA.",
            steps: { basics: "Bases IA", strategy: "Stratégie No-Code", mastery: "Leadership IA" },
            resultLabel: "Résultat",
            resultValue: "Lancez des projets d'automatisation en toute confiance"
        }
    }
  },
  ar: {
    nav: {
      mission: "المهمة",
      solutions: "الحلول",
      founder: "المؤسس",
      blog: "المدونة",
      faq: "الأسئلة الشائعة",
      cta: "احصل على استشارة",
      contact: "اتصل بنا",
      slogan: "نبني معاً مغرباً أكثر ذكاءً"
    },
    hero: {
      badge: "الرائد في استشارات الذكاء الاصطناعي بالمغرب",
      titlePre: "متجذرون في الثقافة،",
      titlePost: "مدعومون بالابتكار العالمي.",
      desc: "نقدم حلول ذكاء اصطناعي متطورة ومتعددة اللغات لمساعدة الشركات المغربية على زيادة الإنتاجية والوصول إلى عملاء دوليين.",
      btnExplore: "اكتشف الحلول",
      btnBook: "احجز استشارة",
      scroll: "تمرير"
    },
    mission: {
      title: "جسور بين التقاليد والتكنولوجيا",
      text: "Arabic AI Agents هو الخيار الأول للشركات المغربية التي تسعى لدمج الذكاء الاصطناعي. نجمع بين الاحترام العميق لثقافة الأعمال المغربية والخبرة العالمية في الأتمتة لمساعدتك على البقاء في الصدارة."
    },
    solutions: {
      subtitle: "أمثلة على بعض حلولنا",
      title: "حلول ذكاء اصطناعي مثبتة",
      categories: {
        business: "حلول الأعمال",
        corp_edu: "التعليم والتدريب للشركات",
        ind_edu: "التعليم والتدريب للأفراد"
      },
      expense: {
        title: "إدارة المصاريف الآلية",
        desc: "تخلص من أخطاء الإدخال اليدوي. يقوم نظامنا بمسح الفواتير المرسلة عبر واتساب ومزامنتها مع نظام إدارة علاقات العملاء بدقة 99%.",
        points: [
            "يعمل بالعربية والفرنسية والإنجليزية",
            "يوفر مئات الساعات لفرق المالية",
            "مزامنة فورية مع أنظمة الشركة"
        ],
        cta: "أتمتة نفقاتك"
      },
      voice: {
        title: "وكلاء الذكاء الاصطناعي الصوتيين",
        desc: "غير طريقة خدمتك للعملاء العالميين. يتحدث وكلاؤنا بطلاقة العربية، الدارجة، الفرنسية والإنجليزية—ويديرون الحجوزات على مدار الساعة.",
        quote: "تضاعفت قاعدة العملاء الدوليين للعيادة في أشهر... مما أدى إلى عائد استثمار أسرع وعملاء أوفياء.",
        cta: "اطلب عرضاً توضيحياً"
      },
      seo: {
        title: "تحسين محركات البحث وإنشاء المحتوى",
        desc: "تصدر نتائج جوجل في أيام وليس شهور. نظامنا يتكيف مع السياق الثقافي المغربي والاتجاهات السريعة لزيادة المبيعات المحلية.",
        p1Title: "محتوى محلي فائق",
        p1Desc: "إنشاءات مؤثرين بالذكاء الاصطناعي ومحتوى بأسلوب المستخدم ملائم لهوية العمل.",
        p2Title: "تصنيف سريع",
        p2Desc: "استهداف ذكي للكلمات الرئيسية للسوق المغربي.",
        cta: "ابدأ في التصدر اليوم"
      },
      training: {
          title: "التدريب والتعليم المؤسسي",
          desc: "عزز كفاءة فريقك بالكامل وجاهزيتهم للمستقبل من خلال تدريب ذكاء اصطناعي مخصص. ورش عمل للموظفين والمديرين.",
          points: [
              "جلسات تركز على الصناعة: المالية، التجزئة، الضيافة، الرعاية الصحية",
              "أدوات ذكاء اصطناعي عملية وأتمتة سير عمل فعالة",
              "مقدمة بالعربية والفرنسية والإنجليزية لمشاركة الفريق بالكامل"
          ],
          cta: "مكن فريقك للغد—احجز تدريب الذكاء الاصطناعي الآن"
      },
      education: {
          title: "تعليم الأفراد والمتعلمين",
          desc: "تعليم ذكاء اصطناعي عالمي للمؤسسين وأصحاب الأعمال. برامج مسرعة لإتقان مهارات الذكاء الاصطناعي الأكثر طلباً.",
          points: [
              "نهج بدون برمجة وغير تقني—تعلم استراتيجيات قابلة للتنفيذ",
              "مسارات مخصصة للمؤسسين، المديرين التنفيذيين، والمستشارين",
              "دعم مجتمعي، توجيه، وموارد أعمال حصرية في الشرق الأوسط وشمال أفريقيا"
          ],
          cta: "استثمر في نفسك—انضم إلى برنامج تعليم الذكاء الاصطناعي"
      }
    },
    founder: {
      name: "زارا هنتر",
      role: "المؤسسة",
      title: "منظور فريد",
      card1Title: "رؤية ثقافية مغربية",
      card1Desc: "ولدت زارا وترعرعت في المغرب، وهي تفهم اللغة المحلية والممارسات التجارية والتحديات الفريدة التي تواجه رواد الأعمال المغاربة.",
      card2Title: "ابتكار بتدريب لندني",
      card2Desc: "بفضل خبرتها في قطاعات التكنولوجيا والمال في لندن، تجلب استراتيجيات أتمتة متطورة من أفضل المراكز التكنولوجية في العالم.",
      quote: "دمج دفء وإبداع المغرب مع منهجيات لندن القائمة على النتائج.",
      cta: "العمل مع فريق زارا"
    },
    blog: {
      title: "آخر المستجدات",
      subtitle: "تحليلات الخبراء حول مستقبل العمل في المغرب.",
      readMore: "اقرأ المقال",
      articles: [
        {
          title: "لماذا تتحول الشركات المغربية إلى الذكاء الاصطناعي",
          date: "24 أكتوبر 2023",
          category: "أعمال",
          excerpt: "من الأتمتة إلى خدمة العملاء، اكتشف كيف تخفض الشركات الصغيرة والمتوسطة تكاليفها بنسبة 40% باستخدام الوكلاء الأذكياء."
        },
        {
          title: "صعود الروبوتات الناطقة بالدارجة",
          date: "02 نوفمبر 2023",
          category: "تكنولوجيا",
          excerpt: "كيف تمكنت معالجة اللغة الطبيعية أخيراً من فهم اللهجة المغربية بطلاقة لتفاعلات سلسة."
        },
        {
          title: "الدار البيضاء: مركز التكنولوجيا القادم؟",
          date: "15 نوفمبر 2023",
          category: "اقتصاد",
          excerpt: "الاستثمار في البنية التحتية الرقمية يمهد الطريق لعصر جديد من الابتكار في جميع أنحاء شمال إفريقيا."
        }
      ]
    },
    faq: {
        title: "أسئلة مكررة",
        subtitle: "كل ما تحتاج لمعرفته حول تبني الذكاء الاصطناعي في المغرب.",
        items: [
            {
                q: "ما الذي يميز Arabic AI Agents عن الشركات الأخرى؟",
                a: "نحن الشركة الوحيدة التي تعمل على تحسين الذكاء الاصطناعي خصيصًا للمشهد اللغوي المغربي. نماذجنا تفهم التبديل بين الدارجة والفرنسية والعربية، مما يضمن أن تكون الأتمتة طبيعية ومحترمة ثقافيًا."
            },
            {
                q: "هل أحتاج إلى فريق تقني لاستخدام حلولكم؟",
                a: "على الاطلاق. نحن متخصصون في التنفيذ 'بدون كود'. نقوم ببناء البنية التحتية، ودمجها في أدواتك الحالية (مثل WhatsApp أو Salesforce)، وتدريب موظفيك. أنت تركز على العمل؛ ونحن نتولى التكنولوجيا."
            },
            {
                q: "كيف يتعامل ذكاؤكم الاصطناعي مع الدارجة المغربية؟",
                a: "نستخدم طبقات معالجة اللغة الطبيعية (NLP) المدربة خصيصًا على اللهجات المغربية. وهذا يسمح لوكلائنا بفهم المصطلحات المحلية، والعامية، والمزيج الفريد من اللغات المستخدم في الأعمال التجارية المغربية."
            },
            {
                q: "هل الأتمتة مناسبة لقطاعات تقليدية مثل العقارات؟",
                a: "بالتأكيد. للعقارات، نقوم بأتمتة تأهيل العملاء المحتملين والجدولة. بالنسبة للزراعة، يمكننا أتمتة تتبع سلسلة التوريد. هدفنا هو تحديث العمليات دون فقدان اللمسة الشخصية."
            },
            {
                q: "ما هو العائد على الاستثمار المتوقع؟",
                a: "يرى معظم عملائنا عائداً على الاستثمار في غضون 3 أشهر. من خلال أتمتة المهام المتكررة، تخفض الشركات عادة تكاليف التشغيل بنسبة 30٪ مع زيادة معدلات التحويل بأكثر من 40٪."
            }
        ],
        ctaTitle: "لا تزال لديك أسئلة؟",
        ctaBtn: "تحدث إلى خبير"
    },
    footer: {
      desc: "مساعدة الشركات المغربية على المنافسة والفوز على الساحة العالمية من خلال الأتمتة الذكية.",
      contact: "اتصل",
      social: "تواصل",
      rights: "© 2024 Arabic AI Agents. جميع الحقوق محفوظة."
    },
    booking: {
      title: "تواصل معنا",
      desc: "املأ النموذج أدناه للتواصل مع فريقنا. سنقوم بمراجعة طلبك والرد في وقت قصير.",
      duration: "الرد المعتاد: 24 ساعة",
      type: "استفسار عبر البريد الإلكتروني",
      calendarTitle: "بياناتك",
      confirm: "إرسال الاستفسار",
      month: "",
      formName: "الاسم الكامل",
      formEmail: "بريد العمل",
      formWebsite: "الموقع الإلكتروني (اختياري)",
      formRequest: "استفسارك",
      back: "عودة",
      successTitle: "تم إرسال الرسالة!",
      successMsg: "سنرد عليك في أقرب وقت ممكن."
    },
    diagrams: {
        expense: {
            botName: "بوت المصاريف",
            online: "متصل",
            welcome: "مرحباً! أرسل لي صورة الإيصال. 📸",
            supermarket: "سوبر ماركت الدار البيضاء",
            total: "المجموع",
            saved: "تم الحفظ في CRM",
            heading: "من واتساب إلى CRM",
            subheading: "التقط صورة ببساطة. يستخرج نظامنا الحقول الرئيسية بدقة 99%.",
            extracted: "البيانات المستخرجة",
            fields: { date: "التاريخ", vendor: "البائع", category: "الفئة", amount: "المبلغ" }
        },
        voice: {
            title: "وكيل صوتي متعدد اللغات",
            subtitle: "يتقن العربية، الدارجة، الفرنسية والإنجليزية.",
            noBarrier: "بدون حواجز لغوية",
            nlp: "معالجة لغوية طبيعية"
        },
        seo: {
            title: "نمو SEO بالذكاء الاصطناعي",
            subtitle: "مقارنة نمو الزيارات: وكالة تقليدية مقابل Arabic AI Agents.",
            yAxis: "زيارات الموقع",
            traditional: "تقليدي (شهور)",
            ai: "تدرج في أيام",
            cost: "توفير",
            sales: "مبيعات محلية"
        },
        training: {
            title: "نمو قدرات الفريق",
            subtitle: "تصور تأثير تدريب الذكاء الاصطناعي على القوى العاملة لديك.",
            before: "قبل التدريب",
            after: "بعد التدريب",
            metrics: { efficiency: "كفاءة العمل", automation: "أتمتة المهام", skills: "الجاهزية الرقمية" },
            icons: { team: "فريق متفاعل", speed: "إنتاج أسرع", growth: "نمو الأعمال" }
        },
        education: {
            title: "المؤسس المعتمد في الذكاء الاصطناعي",
            subtitle: "خارطة طريقك لإتقان الذكاء الاصطناعي.",
            steps: { basics: "أساسيات", strategy: "استراتيجية", mastery: "قيادة" },
            resultLabel: "النتيجة",
            resultValue: "إطلاق مشاريع الأتمتة بثقة"
        }
    }
  }
};

// --- Booking Modal Component (GHL Embed) ---
const BookingModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative z-10 overflow-hidden max-h-[95vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white rounded-full transition-colors text-stone-500 hover:text-stone-900 shadow-lg"
        >
          <X size={24} />
        </button>

        <div className="w-full h-[1100px] overflow-y-auto">
          <iframe
            src="https://app.arabicaiagents.com/widget/form/QrxnoU1QITVL2S7ZtI3u"
            style={{ width: '100%', height: '1100px', border: 'none', borderRadius: '3px' }}
            id="inline-QrxnoU1QITVL2S7ZtI3u"
            data-layout='{"id":"INLINE"}'
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Consultation"
            data-height="1100"
            data-layout-iframe-id="inline-QrxnoU1QITVL2S7ZtI3u"
            data-form-id="QrxnoU1QITVL2S7ZtI3u"
            title="Consultation"
          />
        </div>
      </motion.div>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [activeSolution, setActiveSolution] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  const t = translations[lang];
  const isRTL = lang === 'ar';
  const fontHeader = isRTL ? 'font-arabic' : 'font-serif';
  const fontBody = isRTL ? 'font-arabic' : 'font-sans';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const toggleSolution = (id: string) => {
      setActiveSolution(activeSolution === id ? null : id);
  };

  const openBooking = () => {
    setShowBooking(true);
    setMenuOpen(false);
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen bg-sand text-charcoal selection:bg-majorelle selection:text-white overflow-x-hidden ${fontBody}`}>

      {/* Header with Navigation */}
      <header role="banner">
        <nav role="navigation" aria-label="Main navigation" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-sand/90 backdrop-blur-md shadow-sm py-3 border-b border-stone-200' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <BrandLogo size={48} />
            <div className="flex flex-col leading-none">
                <span className={`${fontHeader} font-bold text-lg tracking-wide text-stone-900 uppercase`}>ARABIC AI AGENTS</span>
                <span className={`text-[8px] md:text-[9px] tracking-[0.15em] uppercase text-terracotta font-bold mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>
                    {t.nav.slogan}
                </span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium tracking-wide text-stone-600">
            {/* Language Toggle */}
            <div className="flex items-center bg-stone-200/50 rounded-full p-1 mr-4">
                {(['en', 'fr', 'ar'] as const).map((l) => (
                    <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all uppercase ${lang === l ? 'bg-majorelle text-white shadow-md' : 'text-stone-500 hover:text-stone-900'}`}
                    >
                        {l}
                    </button>
                ))}
            </div>

            <a href="#mission" onClick={scrollToSection('mission')} className="hover:text-majorelle transition-colors cursor-pointer uppercase">{t.nav.mission}</a>
            <a href="#solutions" onClick={scrollToSection('solutions')} className="hover:text-majorelle transition-colors cursor-pointer uppercase">{t.nav.solutions}</a>
            <a href="#founder" onClick={scrollToSection('founder')} className="hover:text-majorelle transition-colors cursor-pointer uppercase">{t.nav.founder}</a>
            <a href="#blog" onClick={scrollToSection('blog')} className="hover:text-majorelle transition-colors cursor-pointer uppercase">{t.nav.blog}</a>
            <a href="#faq" onClick={scrollToSection('faq')} className="hover:text-majorelle transition-colors cursor-pointer uppercase">{t.nav.faq}</a>
            <button 
              onClick={openBooking}
              className={`px-6 py-2 bg-stone-900 text-white rounded-full hover:bg-majorelle transition-colors shadow-lg cursor-pointer font-bold text-xs tracking-widest uppercase ${isRTL ? 'font-arabic' : ''}`}
            >
              {t.nav.cta}
            </button>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
             <div className="flex items-center bg-stone-200/50 rounded-full p-1">
                {(['en', 'fr', 'ar'] as const).map((l) => (
                    <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`w-8 h-8 rounded-full text-xs font-bold transition-all uppercase flex items-center justify-center ${lang === l ? 'bg-majorelle text-white shadow-md' : 'text-stone-500 hover:text-stone-900'}`}
                    >
                        {l}
                    </button>
                ))}
            </div>
            <button className="text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`fixed inset-0 z-40 bg-sand flex flex-col items-center justify-center gap-8 text-2xl ${fontHeader} animate-fade-in`}>
            <a href="#mission" onClick={scrollToSection('mission')}>{t.nav.mission}</a>
            <a href="#solutions" onClick={scrollToSection('solutions')}>{t.nav.solutions}</a>
            <a href="#founder" onClick={scrollToSection('founder')}>{t.nav.founder}</a>
            <a href="#blog" onClick={scrollToSection('blog')}>{t.nav.blog}</a>
            <a href="#faq" onClick={scrollToSection('faq')}>{t.nav.faq}</a>
            <button 
              onClick={openBooking}
              className="px-8 py-3 bg-majorelle text-white rounded-full shadow-lg uppercase text-sm font-sans tracking-widest font-bold"
            >
              {t.nav.contact}
            </button>
        </div>
      )}

      {/* Main Content */}
      <main role="main" id="main-content">

        {/* Hero Section */}
        <section id="hero" aria-labelledby="hero-heading" className="relative h-screen flex items-center overflow-hidden">
        <DigitalMosaicScene />
        
        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className={`inline-block mb-6 px-4 py-1 border border-terracotta text-terracotta text-xs tracking-[0.2em] uppercase font-bold rounded-full bg-white/50 backdrop-blur-sm ${isRTL ? 'tracking-normal' : ''}`}>
               {t.hero.badge}
            </div>
            <h1 id="hero-heading" className={`${fontHeader} text-5xl md:text-7xl font-medium leading-tight mb-6 text-stone-900`}>
              {<TypingEffect text={t.hero.titlePre} speed={40} className="block" hideCursorOnComplete={true} />}
              <span className="text-majorelle italic block">{<TypingEffect text={t.hero.titlePost} delay={1.5} speed={40} hideCursorOnComplete={true} />}</span>
            </h1>
            <p itemProp="description" className="text-lg md:text-xl text-stone-600 leading-relaxed mb-10 max-w-lg">
              {t.hero.desc}
            </p>
            
            <div className="flex flex-wrap gap-4">
               <button onClick={openBooking} className="px-8 py-4 bg-stone-900 text-white rounded-full hover:bg-majorelle transition-colors shadow-lg font-bold tracking-wide flex items-center gap-2 group">
                  {t.hero.btnBook} <Calendar size={18} />
               </button>
               <button onClick={scrollToSection('solutions')} className="px-8 py-4 bg-white text-stone-800 border border-stone-200 rounded-full hover:border-stone-400 transition-colors shadow-sm font-bold tracking-wide flex items-center gap-2 group">
                  {t.hero.btnExplore} <ArrowRight size={18} className={`transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}/>
               </button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-stone-400">
             <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-stone-400 to-transparent mx-auto mb-2"></div>
             <span className="text-[10px] uppercase tracking-widest">{t.hero.scroll}</span>
        </div>
        </section>

        {/* Mission Statement */}
        <section id="mission" aria-labelledby="mission-heading" className="py-24 bg-white pattern-grid">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                         <h2 id="mission-heading" className={`${fontHeader} text-3xl md:text-5xl mb-8 text-stone-900`}>{t.mission.title}</h2>
                          <div className={`w-24 h-1 bg-terracotta mb-10 ${isRTL ? 'ml-auto lg:mr-0' : 'mx-auto lg:mx-0'}`}></div>
                          <p className="text-xl md:text-2xl text-stone-600 leading-relaxed font-light">
                            "{t.mission.text}"
                          </p>
                    </div>
                    <div>
                        <BridgingVisual lang={lang} />
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-24 bg-sand-dark relative overflow-hidden">
            {/* Decorative background blob */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-terracotta/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-majorelle font-bold tracking-widest uppercase text-xs mb-2 block">{t.solutions.subtitle}</span>
                    <h2 className={`${fontHeader} text-4xl md:text-5xl text-stone-900`}>{t.solutions.title}</h2>
                </div>

                <div className="max-w-5xl mx-auto flex flex-col gap-12">
                    
                    {/* Category 1: Business Solutions */}
                    <div className="flex flex-col gap-6">
                        <h3 className={`text-2xl font-bold text-majorelle border-b border-majorelle/20 pb-2 ${fontHeader}`}>{t.solutions.categories.business}</h3>
                        
                        {/* Voice Agents Accordion */}
                        <div className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 transition-all duration-500 ${activeSolution === 'voice' ? 'ring-2 ring-majorelle shadow-lg scale-[1.02]' : 'hover:shadow-md hover:scale-[1.01]'}`}>
                             <button 
                                onClick={() => toggleSolution('voice')}
                                className="w-full p-6 md:p-8 flex items-center justify-between text-left focus:outline-none"
                             >
                                <div className="flex items-center gap-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeSolution === 'voice' ? 'bg-majorelle/10 text-majorelle' : 'bg-stone-100 text-stone-500'}`}>
                                        <Check size={24} />
                                    </div>
                                    <div>
                                        <h3 className={`${fontHeader} text-2xl text-stone-900`}>{t.solutions.voice.title}</h3>
                                    </div>
                                </div>
                                <div className={`transition-transform duration-300 ${activeSolution === 'voice' ? 'rotate-45 text-majorelle' : 'text-stone-400'}`}>
                                    <Plus size={28} />
                                </div>
                             </button>
                             
                             <AnimatePresence>
                                {activeSolution === 'voice' && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                    >
                                        <div className="p-6 md:p-8 pt-0 border-t border-stone-100">
                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-8">
                                                <div className="lg:col-span-7 order-2 lg:order-1">
                                                    <VoiceAgentVisualizer lang={lang} text={t.diagrams.voice} />
                                                </div>
                                                <div className="lg:col-span-5 order-1 lg:order-2">
                                                    <p className="text-stone-600 leading-relaxed mb-6">
                                                        {t.solutions.voice.desc}
                                                    </p>
                                                    <div className="p-4 bg-sand/50 rounded-lg border border-stone-200 shadow-sm mb-8">
                                                        <p className="italic text-stone-500 text-sm mb-2">"{t.solutions.voice.quote}"</p>
                                                    </div>
                                                    <button onClick={openBooking} className="px-6 py-3 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-majorelle transition-colors">
                                                        {t.solutions.voice.cta}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                             </AnimatePresence>
                        </div>

                        {/* Expense Management Accordion */}
                        <div className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 transition-all duration-500 ${activeSolution === 'expense' ? 'ring-2 ring-majorelle shadow-lg scale-[1.02]' : 'hover:shadow-md hover:scale-[1.01]'}`}>
                             <button 
                                onClick={() => toggleSolution('expense')}
                                className="w-full p-6 md:p-8 flex items-center justify-between text-left focus:outline-none"
                             >
                                <div className="flex items-center gap-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeSolution === 'expense' ? 'bg-green-100 text-green-600' : 'bg-stone-100 text-stone-500'}`}>
                                        <Check size={24} />
                                    </div>
                                    <div>
                                        <h3 className={`${fontHeader} text-2xl text-stone-900`}>{t.solutions.expense.title}</h3>
                                    </div>
                                </div>
                                <div className={`transition-transform duration-300 ${activeSolution === 'expense' ? 'rotate-45 text-majorelle' : 'text-stone-400'}`}>
                                    <Plus size={28} />
                                </div>
                             </button>
                             
                             <AnimatePresence>
                                {activeSolution === 'expense' && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                    >
                                        <div className="p-6 md:p-8 pt-0 border-t border-stone-100">
                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-8">
                                                <div className="lg:col-span-5">
                                                    <p className="text-stone-600 leading-relaxed mb-6">
                                                        {t.solutions.expense.desc}
                                                    </p>
                                                    <ul className="space-y-3 text-sm text-stone-600 mb-8">
                                                        {t.solutions.expense.points.map((point, i) => (
                                                            <li key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-terracotta rounded-full"></div> {point}</li>
                                                        ))}
                                                    </ul>
                                                    <button onClick={openBooking} className="px-6 py-3 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-majorelle transition-colors">
                                                        {t.solutions.expense.cta}
                                                    </button>
                                                </div>
                                                <div className="lg:col-span-7">
                                                    <ExpenseScanner lang={lang} text={t.diagrams.expense} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                             </AnimatePresence>
                        </div>

                        {/* SEO Accordion */}
                        <div className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 transition-all duration-500 ${activeSolution === 'seo' ? 'ring-2 ring-majorelle shadow-lg scale-[1.02]' : 'hover:shadow-md hover:scale-[1.01]'}`}>
                             <button 
                                onClick={() => toggleSolution('seo')}
                                className="w-full p-6 md:p-8 flex items-center justify-between text-left focus:outline-none"
                             >
                                <div className="flex items-center gap-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeSolution === 'seo' ? 'bg-purple-100 text-purple-600' : 'bg-stone-100 text-stone-500'}`}>
                                        <Check size={24} />
                                    </div>
                                    <div>
                                        <h3 className={`${fontHeader} text-2xl text-stone-900`}>{t.solutions.seo.title}</h3>
                                    </div>
                                </div>
                                <div className={`transition-transform duration-300 ${activeSolution === 'seo' ? 'rotate-45 text-majorelle' : 'text-stone-400'}`}>
                                    <Plus size={28} />
                                </div>
                             </button>
                             
                             <AnimatePresence>
                                {activeSolution === 'seo' && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                    >
                                        <div className="p-6 md:p-8 pt-0 border-t border-stone-100">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
                                                <div className="flex flex-col justify-center">
                                                    <p className="text-stone-600 leading-relaxed mb-6">
                                                        {t.solutions.seo.desc}
                                                    </p>
                                                    <div className="space-y-4 mb-8">
                                                        <div className="flex items-start gap-4">
                                                            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center flex-shrink-0 text-stone-600 font-bold text-xs">01</div>
                                                            <div>
                                                                <h4 className="font-bold text-stone-900 text-sm">{t.solutions.seo.p1Title}</h4>
                                                                <p className="text-xs text-stone-500">{t.solutions.seo.p1Desc}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start gap-4">
                                                            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center flex-shrink-0 text-stone-600 font-bold text-xs">02</div>
                                                            <div>
                                                                <h4 className="font-bold text-stone-900 text-sm">{t.solutions.seo.p2Title}</h4>
                                                                <p className="text-xs text-stone-500">{t.solutions.seo.p2Desc}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button onClick={openBooking} className="self-start px-6 py-3 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-majorelle transition-colors">
                                                        {t.solutions.seo.cta}
                                                    </button>
                                                </div>
                                                <div>
                                                    <SEOMetrics lang={lang} text={t.diagrams.seo} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                             </AnimatePresence>
                        </div>
                    </div>

                    {/* Category 2: Education and Training for Businesses */}
                    <div className="flex flex-col gap-6">
                        <h3 className={`text-2xl font-bold text-majorelle border-b border-majorelle/20 pb-2 ${fontHeader}`}>{t.solutions.categories.corp_edu}</h3>

                        {/* Corporate Training Accordion */}
                        <div className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 transition-all duration-500 ${activeSolution === 'training' ? 'ring-2 ring-majorelle shadow-lg scale-[1.02]' : 'hover:shadow-md hover:scale-[1.01]'}`}>
                             <button 
                                onClick={() => toggleSolution('training')}
                                className="w-full p-6 md:p-8 flex items-center justify-between text-left focus:outline-none"
                             >
                                <div className="flex items-center gap-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeSolution === 'training' ? 'bg-orange-100 text-orange-600' : 'bg-stone-100 text-stone-500'}`}>
                                        <Check size={24} />
                                    </div>
                                    <div>
                                        <h3 className={`${fontHeader} text-2xl text-stone-900`}>{t.solutions.training.title}</h3>
                                    </div>
                                </div>
                                <div className={`transition-transform duration-300 ${activeSolution === 'training' ? 'rotate-45 text-majorelle' : 'text-stone-400'}`}>
                                    <Plus size={28} />
                                </div>
                             </button>
                             
                             <AnimatePresence>
                                {activeSolution === 'training' && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                    >
                                        <div className="p-6 md:p-8 pt-0 border-t border-stone-100">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8 items-center">
                                                <div className="order-2 lg:order-1">
                                                    <CorporateTrainingVisualizer lang={lang} text={t.diagrams.training} />
                                                </div>
                                                <div className="flex flex-col justify-center order-1 lg:order-2">
                                                    <p className="text-stone-600 leading-relaxed mb-6">
                                                        {t.solutions.training.desc}
                                                    </p>
                                                    <ul className="space-y-3 text-sm text-stone-600 mb-8">
                                                        {t.solutions.training.points.map((point, i) => (
                                                            <li key={i} className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-terracotta rounded-full mt-2 flex-shrink-0"></div> {point}</li>
                                                        ))}
                                                    </ul>
                                                    <button onClick={openBooking} className="self-start px-6 py-3 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-majorelle transition-colors">
                                                        {t.solutions.training.cta}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                             </AnimatePresence>
                        </div>
                    </div>

                    {/* Category 3: Education and Training for Individuals */}
                    <div className="flex flex-col gap-6">
                        <h3 className={`text-2xl font-bold text-majorelle border-b border-majorelle/20 pb-2 ${fontHeader}`}>{t.solutions.categories.ind_edu}</h3>

                        {/* Individual Education Accordion */}
                        <div className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 transition-all duration-500 ${activeSolution === 'education' ? 'ring-2 ring-majorelle/10 text-majorelle' : 'hover:shadow-md hover:scale-[1.01]'}`}>
                             <button 
                                onClick={() => toggleSolution('education')}
                                className="w-full p-6 md:p-8 flex items-center justify-between text-left focus:outline-none"
                             >
                                <div className="flex items-center gap-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeSolution === 'education' ? 'bg-majorelle/10 text-majorelle' : 'bg-stone-100 text-stone-500'}`}>
                                        <Check size={24} />
                                    </div>
                                    <div>
                                        <h3 className={`${fontHeader} text-2xl text-stone-900`}>{t.solutions.education.title}</h3>
                                    </div>
                                </div>
                                <div className={`transition-transform duration-300 ${activeSolution === 'education' ? 'rotate-45 text-majorelle' : 'text-stone-400'}`}>
                                    <Plus size={28} />
                                </div>
                             </button>
                             
                             <AnimatePresence>
                                {activeSolution === 'education' && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                    >
                                        <div className="p-6 md:p-8 pt-0 border-t border-stone-100">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8 items-center">
                                                <div className="flex flex-col justify-center">
                                                    <p className="text-stone-600 leading-relaxed mb-6">
                                                        {t.solutions.education.desc}
                                                    </p>
                                                     <ul className="space-y-3 text-sm text-stone-600 mb-8">
                                                        {t.solutions.education.points.map((point, i) => (
                                                            <li key={i} className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-terracotta rounded-full mt-2 flex-shrink-0"></div> {point}</li>
                                                        ))}
                                                    </ul>
                                                    <button onClick={openBooking} className="self-start px-6 py-3 bg-majorelle text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-majorelle-dark transition-colors shadow-lg">
                                                        {t.solutions.education.cta}
                                                    </button>
                                                </div>
                                                <div>
                                                    <IndividualEducationVisualizer lang={lang} text={t.diagrams.education} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                             </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* Founder Section */}
        <section id="founder" className="py-24 bg-stone-900 text-white overflow-hidden relative">
             <div className="absolute inset-0 opacity-20">
                 <GlobalConnectionScene />
             </div>
             
             <div className="container mx-auto px-6 relative z-10">
                 <div className="flex flex-col md:flex-row gap-16 items-center">
                     <div className="md:w-1/3">
                         <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-stone-800 border border-stone-700 relative shadow-2xl flex items-center justify-center group">
                             <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent z-10"></div>
                             <img 
                                src="./founder.png"
                                alt={t.founder.name}
                                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                             />
                             <div className="absolute bottom-6 left-6 z-20">
                                 <h3 className={`${fontHeader} text-3xl text-white`}>{t.founder.name}</h3>
                                 <p className="text-majorelle font-medium tracking-widest text-xs uppercase mt-2">{t.founder.role}</p>
                             </div>
                         </div>
                     </div>
                     
                     <div className="md:w-2/3">
                         <h2 className={`${fontHeader} text-4xl md:text-5xl mb-8`}>{t.founder.title}</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="bg-stone-800/50 p-8 rounded-xl backdrop-blur-sm border border-stone-700 hover:border-terracotta transition-colors group">
                                 <div className={`text-terracotta mb-4 ${isRTL ? 'font-arabic' : 'font-serif italic'} text-xl`}>{t.founder.card1Title}</div>
                                 <p className="text-stone-400 text-sm leading-relaxed group-hover:text-stone-200 transition-colors">
                                    {t.founder.card1Desc}
                                 </p>
                             </div>
                             <div className="bg-stone-800/50 p-8 rounded-xl backdrop-blur-sm border border-stone-700 hover:border-majorelle transition-colors group">
                                 <div className={`text-majorelle mb-4 ${isRTL ? 'font-arabic' : 'font-serif italic'} text-xl`}>{t.founder.card2Title}</div>
                                 <p className="text-stone-400 text-sm leading-relaxed group-hover:text-stone-200 transition-colors">
                                    {t.founder.card2Desc}
                                 </p>
                             </div>
                         </div>
                         <div className="mt-10">
                             <p className={`text-xl font-light text-stone-300 border-l-2 border-majorelle pl-6 ${isRTL ? 'border-l-0 border-r-2 pr-6' : ''} ${isRTL ? 'font-arabic' : 'italic'} mb-8`}>
                                 "{t.founder.quote}"
                             </p>
                             <button onClick={openBooking} className="px-8 py-4 bg-majorelle text-white rounded-full hover:bg-majorelle-light transition-colors shadow-lg font-bold tracking-wide flex items-center gap-2">
                                 {t.founder.cta} <ArrowRight size={18} className={isRTL ? 'rotate-180' : ''}/>
                             </button>
                         </div>
                     </div>
                 </div>
             </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-24 bg-stone-50">
           <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <span className="text-majorelle font-bold tracking-widest uppercase text-xs mb-2 block">Insights</span>
                  <h2 className={`${fontHeader} text-3xl md:text-5xl text-stone-900 mb-4`}>{t.blog.title}</h2>
                  <p className="text-stone-500 max-w-2xl mx-auto">{t.blog.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {t.blog.articles.map((article: any, i: number) => {
                    const icons = [Building, Cpu, Globe];
                    const colors = ["bg-blue-100 text-blue-600", "bg-purple-100 text-purple-600", "bg-orange-100 text-orange-600"];
                    const Icon = icons[i % icons.length];
                    const colorClass = colors[i % colors.length];
                    
                    return (
                       <article key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 group">
                          <div className={`h-48 w-full ${colorClass.split(' ')[0]} relative flex items-center justify-center overflow-hidden`}>
                              <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent"></div>
                              <Icon size={48} className={`transform group-hover:scale-110 transition-transform duration-500 ${colorClass.split(' ')[1]}`} />
                          </div>
                          <div className="p-8">
                              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">
                                  <span className={isRTL ? 'ml-auto' : 'mr-auto'}>{article.category}</span>
                                  <span>{article.date}</span>
                              </div>
                              <h3 className={`${fontHeader} text-xl font-bold text-stone-900 mb-3 group-hover:text-majorelle transition-colors`}>
                                  {article.title}
                              </h3>
                              <p className="text-stone-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                  {article.excerpt}
                              </p>
                              <button className="text-majorelle font-bold text-xs uppercase tracking-widest flex items-center gap-2 group/btn hover:text-majorelle-dark transition-colors">
                                  {t.blog.readMore} <ArrowRight size={14} className={`transition-transform ${isRTL ? 'rotate-180 group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'}`} />
                              </button>
                          </div>
                       </article>
                    )
                 })}
              </div>
           </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-white pattern-grid">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-majorelle font-bold tracking-widest uppercase text-xs mb-2 block">FAQ</span>
                        <h2 className={`${fontHeader} text-3xl md:text-5xl text-stone-900 mb-4`}>{t.faq.title}</h2>
                        <p className="text-stone-500">{t.faq.subtitle}</p>
                    </div>
                    
                    <div className="space-y-4 mb-12">
                        {t.faq.items.map((item, index) => (
                            <div 
                                key={index}
                                className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                <button 
                                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                    className="w-full p-6 flex items-start gap-4 text-left focus:outline-none"
                                >
                                    <div className={`mt-1 transition-transform duration-300 ${activeFaq === index ? 'rotate-180 text-majorelle' : 'text-stone-400'}`}>
                                        <ChevronDown size={20} />
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-semibold text-stone-900 ${fontHeader}`}>{item.q}</h3>
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {activeFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-6 pl-14">
                                                <p className="text-stone-600 leading-relaxed">
                                                    {item.a}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    <div className="bg-stone-100 p-8 rounded-2xl text-center">
                        <h4 className={`text-xl font-bold text-stone-900 mb-2 ${fontHeader}`}>{t.faq.ctaTitle}</h4>
                        <button onClick={openBooking} className="mt-4 px-6 py-3 bg-stone-900 text-white rounded-full font-bold text-sm tracking-wide uppercase hover:bg-majorelle transition-colors shadow-lg">
                            {t.faq.ctaBtn}
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer role="contentinfo" className="bg-white border-t border-stone-200 py-16">
             <div className="container mx-auto px-6">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                     <div>
                         <div className="flex items-center gap-3 mb-6">
                            <BrandLogo size={40} />
                            <div className="flex flex-col leading-none">
                                <span className={`${fontHeader} font-bold text-lg text-stone-900 uppercase`}>ARABIC AI AGENTS</span>
                                <span className={`text-[8px] tracking-[0.1em] uppercase text-terracotta font-bold mt-1 ${isRTL ? 'font-arabic' : ''}`}>{t.nav.slogan}</span>
                            </div>
                         </div>
                         <p className="text-stone-500 text-sm leading-relaxed">
                             {t.footer.desc}
                         </p>
                     </div>
                     <div>
                         <h4 className="font-bold text-stone-900 uppercase tracking-widest text-xs mb-6">{t.footer.contact}</h4>
                         <div className="space-y-4 text-stone-600 text-sm">
                             <a href="mailto:salam@arabicaiagents.com" className="flex items-center gap-3 hover:text-majorelle transition-colors">
                                 <Mail size={16} /> salam@arabicaiagents.com
                             </a>
                             <div className="flex items-center gap-3">
                                 <MapPin size={16} /> Casablanca & London
                             </div>
                         </div>
                     </div>
                 </div>
                 <div className="border-t border-stone-100 mt-16 pt-8 text-center text-xs text-stone-400">
                     <p>© 2026 Arabic AI Agents | Leading Agentic AI Consultant in MENA Region</p>
                     <nav aria-label="Footer navigation" className="flex justify-center gap-6 mt-4">
                       <a href="https://github.com/arabicaiagents" rel="noopener noreferrer" target="_blank" aria-label="Visit our GitHub profile" className="hover:text-majorelle transition-colors">
                         GitHub Projects
                       </a>
                     </nav>
                 </div>
             </div>
        </footer>

        <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />

        {/* LLM-Readable SEO Context (invisible to users) */}
        <SEOContext />

      </main>
    </div>
  );
};

export default App;