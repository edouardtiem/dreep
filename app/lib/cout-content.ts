import type { CoutPageData } from "./cout-types";

export const coutPages: CoutPageData[] = [
  // ─── PAGE 1: Turnover / Startup SaaS (décideur) ───
  {
    problem: "turnover",
    industry: "startup-saas",
    metaTitle: "Coût du turnover en startup SaaS — Calculateur gratuit | Dreep",
    metaDescription:
      "Un départ en startup SaaS coûte entre 30 000 € et 90 000 €. Calculez l'impact réel du turnover sur votre croissance avec notre outil interactif.",
    heroStatNumber: "67 000 €",
    heroStatLabel: "Coût moyen d'un départ en startup SaaS",
    heroSubtitle:
      "Recrutement, formation, perte de vélocité produit — le turnover est le frein invisible de votre croissance.",
    breakdowns: [
      { label: "Coût de recrutement", formula: "Cabinet + temps interne", amount: 15000, category: "Recrutement" },
      { label: "Onboarding & formation", formula: "3 mois à productivité réduite", amount: 18000, category: "Formation" },
      { label: "Perte de vélocité produit", formula: "Features retardées × impact CA", amount: 22000, category: "Productivité" },
      { label: "Impact moral de l'équipe", formula: "Baisse de productivité collective", amount: 12000, category: "Culture" },
    ],
    sliders: [
      { id: "salary", label: "Salaire brut annuel chargé", min: 35000, max: 120000, defaultValue: 55000, unit: "€", step: 5000 },
      { id: "departures", label: "Nombre de départs par an", min: 1, max: 15, defaultValue: 3, unit: "", step: 1 },
      { id: "ramp", label: "Mois avant pleine productivité", min: 1, max: 9, defaultValue: 4, unit: "mois", step: 1 },
    ],
    calculatorFormula: "(s0 * 0.5 + s0 / 12 * s2 * 0.4) * s1",
    calculatorResultLabel: "Coût annuel estimé du turnover",
    faq: [
      {
        question: "Combien coûte réellement un départ en startup SaaS ?",
        answer:
          "Entre 50 % et 200 % du salaire annuel selon le poste. Pour un développeur senior à 65 000 € brut, le coût total (recrutement, formation, perte de vélocité) atteint 60 000 à 130 000 €. Les postes techniques coûtent plus cher à remplacer à cause du temps de ramp-up sur le codebase.",
      },
      {
        question: "Pourquoi le turnover est-il si élevé en startup SaaS ?",
        answer:
          "Trois facteurs principaux : la pression de croissance rapide, les salaires parfois en dessous du marché (compensés par equity), et le manque de processus RH structurés dans les phases early-stage. Le taux moyen de turnover en tech française est de 15-20 % par an.",
      },
      {
        question: "Comment réduire le turnover en SaaS ?",
        answer:
          "Les leviers les plus efficaces : onboarding structuré (réduit le turnover de 25 % dans les 12 premiers mois), entretiens de rétention trimestriels, grilles salariales transparentes, et mobilité interne. Le ROI d'un programme de rétention est souvent 3-5× son coût.",
      },
      {
        question: "Quel est le coût caché du turnover sur le produit ?",
        answer:
          "Chaque départ de développeur retarde le roadmap de 2-4 semaines en moyenne. Sur une équipe de 8, perdre 2 personnes par an représente 1-2 mois de features perdues, soit un manque à gagner de 50 000 à 200 000 € en ARR retardé.",
      },
    ],
    ctaHeading: "Découvrez votre coût exact avec un calculateur personnalisé",
    ctaButtonLabel: "Créer mon calculateur gratuit",
    relatedPages: [
      { problem: "churn-client", industry: "saas-b2b", label: "Coût du churn client en SaaS B2B" },
      { problem: "recrutement-rate", industry: "pme", label: "Coût d'un recrutement raté en PME" },
      { problem: "pipeline-non-structure", industry: "equipe-commerciale", label: "Coût d'un pipeline non structuré" },
    ],
    pageType: "decideur",
  },

  // ─── PAGE 2: Recrutement raté / PME (décideur) ───
  {
    problem: "recrutement-rate",
    industry: "pme",
    metaTitle: "Coût d'un recrutement raté en PME — Calculateur gratuit | Dreep",
    metaDescription:
      "Un recrutement raté coûte en moyenne 45 000 € à une PME. Calculez l'impact réel sur votre entreprise avec notre outil interactif gratuit.",
    heroStatNumber: "45 000 €",
    heroStatLabel: "Coût moyen d'un recrutement raté en PME",
    heroSubtitle:
      "Salaire versé, temps de management perdu, nouveau recrutement — une erreur de casting coûte 3 à 5 fois le salaire mensuel.",
    breakdowns: [
      { label: "Salaire versé pendant la période d'essai", formula: "Salaire × durée avant départ", amount: 12000, category: "Salaires" },
      { label: "Coûts de recrutement (annonce + cabinet)", formula: "Frais directs de sourcing", amount: 8000, category: "Recrutement" },
      { label: "Temps de management absorbé", formula: "Heures × taux horaire manager", amount: 10000, category: "Management" },
      { label: "Impact sur l'équipe et la productivité", formula: "Désorganisation + surcharge", amount: 9000, category: "Productivité" },
      { label: "Relancement du recrutement", formula: "Nouveau processus complet", amount: 6000, category: "Recrutement" },
    ],
    sliders: [
      { id: "salary", label: "Salaire brut mensuel du poste", min: 2000, max: 8000, defaultValue: 3500, unit: "€", step: 250 },
      { id: "months", label: "Mois avant constat de l'erreur", min: 1, max: 12, defaultValue: 5, unit: "mois", step: 1 },
      { id: "recruitCost", label: "Frais de recrutement (cabinet/annonces)", min: 2000, max: 20000, defaultValue: 6000, unit: "€", step: 1000 },
    ],
    calculatorFormula: "s0 * s1 * 1.45 + s2 * 2",
    calculatorResultLabel: "Coût total d'un recrutement raté",
    faq: [
      {
        question: "Combien coûte un recrutement raté en PME ?",
        answer:
          "Selon le cabinet Robert Half, un recrutement raté coûte entre 30 000 et 150 000 € en PME. Le coût moyen est de 45 000 €, soit environ 3 à 5 fois le salaire mensuel brut chargé. Ce montant inclut les salaires versés, les frais de recrutement, le temps de management et l'impact sur la productivité de l'équipe.",
      },
      {
        question: "Quels sont les signes d'un recrutement raté ?",
        answer:
          "Les indicateurs précoces incluent : objectifs non atteints après la période de formation, conflits récurrents avec l'équipe, absentéisme croissant, et un décalage entre les compétences annoncées et réelles. En PME, le constat arrive en moyenne après 4-5 mois.",
      },
      {
        question: "Comment un cabinet de recrutement réduit-il ce risque ?",
        answer:
          "Un cabinet spécialisé réduit le taux d'échec de 25-30 % à 5-10 % grâce au sourcing ciblé, aux assessments structurés, et à la garantie de remplacement. Le ROI est positif dès que le coût du cabinet est inférieur au risque d'erreur : 8 000 € de cabinet vs 45 000 € d'erreur.",
      },
    ],
    ctaHeading: "Découvrez votre coût exact avec un calculateur personnalisé",
    ctaButtonLabel: "Créer mon calculateur gratuit",
    relatedPages: [
      { problem: "turnover", industry: "startup-saas", label: "Coût du turnover en startup SaaS" },
      { problem: "poste-vacant", industry: "cabinet-recrutement", label: "Coût d'un poste vacant non pourvu" },
      { problem: "absence-crm", industry: "pme", label: "Coût de l'absence de CRM en PME" },
    ],
    pageType: "decideur",
  },

  // ─── PAGE 3: Churn client / SaaS B2B (décideur) ───
  {
    problem: "churn-client",
    industry: "saas-b2b",
    metaTitle: "Coût du churn client en SaaS B2B — Calculateur gratuit | Dreep",
    metaDescription:
      "1 % de churn mensuel = 11,4 % de revenu perdu par an. Calculez le coût réel de l'attrition client sur votre ARR avec notre outil interactif.",
    heroStatNumber: "230 000 €",
    heroStatLabel: "Revenu annuel perdu pour un SaaS B2B à 2M€ d'ARR avec 1 % de churn mensuel",
    heroSubtitle:
      "Le churn est le tueur silencieux du SaaS. Chaque client perdu coûte 5 à 7 fois plus à remplacer qu'à retenir.",
    breakdowns: [
      { label: "Revenu récurrent perdu (ARR)", formula: "ARR × taux churn annualisé", amount: 114000, category: "Revenu" },
      { label: "Coût d'acquisition du remplaçant", formula: "CAC × nombre clients perdus", amount: 60000, category: "Acquisition" },
      { label: "Expansion revenue manquée", formula: "Upsell perdu sur clients partis", amount: 35000, category: "Croissance" },
      { label: "Impact sur la valorisation", formula: "Multiple SaaS × churn penalty", amount: 21000, category: "Valorisation" },
    ],
    sliders: [
      { id: "arr", label: "ARR actuel", min: 200000, max: 10000000, defaultValue: 2000000, unit: "€", step: 100000 },
      { id: "churnRate", label: "Taux de churn mensuel", min: 0.5, max: 5, defaultValue: 1.5, unit: "%", step: 0.1 },
      { id: "cac", label: "CAC moyen par client", min: 500, max: 15000, defaultValue: 3000, unit: "€", step: 500 },
    ],
    calculatorFormula: "s0 * (s1 / 100 * 12) + (s0 / 10000 * s1 / 100 * 12) * s2",
    calculatorResultLabel: "Coût annuel estimé du churn",
    faq: [
      {
        question: "Quel est le taux de churn acceptable en SaaS B2B ?",
        answer:
          "Le benchmark est un churn mensuel inférieur à 1 % (soit ~11 % annuel). Les meilleurs SaaS B2B visent un net revenue retention (NRR) supérieur à 110 %, ce qui signifie que l'expansion compense les départs. Au-delà de 2 % mensuel, la croissance devient très difficile car il faut acquérir plus de 24 % de nouveaux clients par an juste pour compenser.",
      },
      {
        question: "Comment calculer le coût réel du churn en SaaS ?",
        answer:
          "Le coût réel dépasse le simple revenu perdu. La formule complète : (ARR perdu) + (CAC pour remplacer les clients perdus) + (expansion revenue manquée) + (impact sur le multiple de valorisation). Pour un SaaS à 2M€ d'ARR avec 1,5 % de churn mensuel, le coût total peut atteindre 400 000 € par an.",
      },
      {
        question: "Quelles sont les principales causes de churn en B2B ?",
        answer:
          "Les 3 causes principales : mauvais onboarding client (30 % des churns dans les 90 premiers jours), manque de suivi proactif du Customer Success, et inadéquation produit-besoin. Le churn involontaire (carte expirée, budget coupé) représente 20-30 % des départs mais est le plus facile à réduire.",
      },
      {
        question: "Quel est le ROI d'un programme anti-churn ?",
        answer:
          "Réduire le churn de 1 point (de 2 % à 1 % mensuel) sur un ARR de 2M€ économise environ 240 000 € par an en revenu direct. Un CSM coûte 50-70k€/an et peut gérer 30-50 comptes. Le ROI est généralement de 3-5× dès la première année.",
      },
    ],
    ctaHeading: "Découvrez votre coût exact avec un calculateur personnalisé",
    ctaButtonLabel: "Créer mon calculateur gratuit",
    relatedPages: [
      { problem: "turnover", industry: "startup-saas", label: "Coût du turnover en startup SaaS" },
      { problem: "onboarding-client-bacle", industry: "agence-digitale", label: "Coût d'un onboarding client bâclé" },
      { problem: "pipeline-non-structure", industry: "equipe-commerciale", label: "Coût d'un pipeline non structuré" },
    ],
    pageType: "decideur",
  },

  // ─── PAGE 4: Prospection manuelle / Consultant B2B (décideur) ───
  {
    problem: "prospection-manuelle",
    industry: "consultant-b2b",
    metaTitle: "Coût de la prospection manuelle pour un consultant B2B | Dreep",
    metaDescription:
      "Un consultant B2B perd 15 à 25 heures par mois en prospection manuelle. Calculez le manque à gagner réel avec notre outil interactif gratuit.",
    heroStatNumber: "38 000 €",
    heroStatLabel: "Manque à gagner annuel d'un consultant en prospection manuelle",
    heroSubtitle:
      "Chaque heure passée à prospecter manuellement est une heure non facturée. Le temps est votre ressource la plus précieuse.",
    breakdowns: [
      { label: "Heures non facturées en prospection", formula: "Heures/mois × TJM horaire × 12", amount: 21600, category: "Temps" },
      { label: "Missions perdues par manque de visibilité", formula: "Missions ratées × panier moyen", amount: 10000, category: "Revenu" },
      { label: "Coût des outils non optimisés", formula: "Abonnements + temps de gestion", amount: 3600, category: "Outils" },
      { label: "Stress et fatigue décisionnelle", formula: "Impact sur la qualité de travail", amount: 2800, category: "Bien-être" },
    ],
    sliders: [
      { id: "tjm", label: "Taux journalier moyen (TJM)", min: 300, max: 2000, defaultValue: 700, unit: "€", step: 50 },
      { id: "hours", label: "Heures de prospection par mois", min: 5, max: 40, defaultValue: 18, unit: "h", step: 1 },
      { id: "convRate", label: "Taux de conversion prospection", min: 1, max: 15, defaultValue: 4, unit: "%", step: 1 },
    ],
    calculatorFormula: "(s0 / 8) * s1 * 12 + (s0 * 20 * 12 * (1 - s2 / 100) * 0.1)",
    calculatorResultLabel: "Manque à gagner annuel estimé",
    faq: [
      {
        question: "Combien de temps un consultant B2B passe-t-il à prospecter ?",
        answer:
          "En moyenne 15 à 25 heures par mois, soit 20-30 % du temps de travail. Pour un consultant à 700 €/jour, cela représente 1 500 à 2 200 € de temps non facturé par mois. Les consultants les plus efficaces réduisent ce temps à 5-8 heures grâce à des systèmes de prospection automatisés.",
      },
      {
        question: "Quel est le vrai coût d'opportunité de la prospection manuelle ?",
        answer:
          "Le coût d'opportunité ne se limite pas aux heures perdues. Il inclut la fatigue décisionnelle (moins de créativité sur les missions), les missions ratées par manque de réactivité, et l'impossibilité de scaler. Un consultant qui automatise sa prospection augmente son CA de 20-40 % en moyenne.",
      },
      {
        question: "Comment automatiser la prospection en tant que consultant ?",
        answer:
          "Les leviers les plus efficaces : contenu LinkedIn (inbound), séquences email automatisées, calculateurs de coût interactifs (comme Dreep) pour qualifier les prospects, et partenariats stratégiques. Le ROI d'un bon système d'automatisation se mesure en jours facturables récupérés.",
      },
      {
        question: "Quel taux de conversion viser en prospection B2B ?",
        answer:
          "Le benchmark en conseil B2B : 2-5 % en cold outreach, 10-20 % en inbound qualifié, 30-50 % via recommandation. Un calculateur de coût personnalisé augmente le taux de conversion de 2-3× par rapport à un pitch classique.",
      },
    ],
    ctaHeading: "Découvrez votre coût exact avec un calculateur personnalisé",
    ctaButtonLabel: "Créer mon calculateur gratuit",
    relatedPages: [
      { problem: "pipeline-non-structure", industry: "equipe-commerciale", label: "Coût d'un pipeline non structuré" },
      { problem: "absence-crm", industry: "pme", label: "Coût de l'absence de CRM en PME" },
      { problem: "churn-client", industry: "saas-b2b", label: "Coût du churn client en SaaS B2B" },
    ],
    pageType: "decideur",
  },

  // ─── PAGE 5: Pipeline non structuré / Équipe commerciale (commercial) ───
  {
    problem: "pipeline-non-structure",
    industry: "equipe-commerciale",
    metaTitle: "Coût d'un pipeline commercial non structuré | Dreep",
    metaDescription:
      "Un pipeline non structuré fait perdre 30 % des deals qualifiés. Calculez le coût réel pour votre équipe commerciale avec notre outil gratuit.",
    heroStatNumber: "180 000 €",
    heroStatLabel: "Revenu perdu par an pour une équipe de 5 commerciaux sans pipeline structuré",
    heroSubtitle:
      "Sans visibilité sur le pipeline, les deals tombent dans les trous. 30 % des opportunités qualifiées ne sont jamais relancées.",
    breakdowns: [
      { label: "Deals perdus par oubli de relance", formula: "Deals oubliés × panier moyen", amount: 72000, category: "Revenu" },
      { label: "Temps perdu en reporting manuel", formula: "Heures × coût horaire × équipe", amount: 36000, category: "Productivité" },
      { label: "Prévisions de CA erronées", formula: "Impact décisions basées sur mauvais data", amount: 45000, category: "Stratégie" },
      { label: "Turnover commercial amplifié", formula: "Frustration → départs → coût remplacement", amount: 27000, category: "RH" },
    ],
    sliders: [
      { id: "reps", label: "Nombre de commerciaux", min: 2, max: 20, defaultValue: 5, unit: "", step: 1 },
      { id: "dealSize", label: "Panier moyen par deal", min: 2000, max: 50000, defaultValue: 8000, unit: "€", step: 1000 },
      { id: "lostDeals", label: "Deals perdus par oubli / mois / commercial", min: 1, max: 8, defaultValue: 3, unit: "", step: 1 },
    ],
    calculatorFormula: "s0 * s1 * s2 * 12",
    calculatorResultLabel: "Revenu annuel perdu estimé",
    faq: [
      {
        question: "Combien de deals perd-on sans pipeline structuré ?",
        answer:
          "Selon HubSpot, 29 % des commerciaux citent le manque de suivi comme première cause de deals perdus. Sans CRM ou pipeline structuré, chaque commercial perd en moyenne 2-4 deals qualifiés par mois par simple oubli de relance. Pour une équipe de 5, cela représente 10-20 deals/mois.",
      },
      {
        question: "Quel est le coût du temps passé en reporting manuel ?",
        answer:
          "Un commercial passe en moyenne 5-8 heures par semaine sur des tâches administratives (reporting, mise à jour de tableaux Excel, recherche d'information). À un coût chargé de 50 €/h, cela représente 12 000 à 20 000 € par commercial et par an en temps non productif.",
      },
      {
        question: "Comment structurer un pipeline commercial efficace ?",
        answer:
          "Les fondamentaux : définir 5-7 étapes claires (prospection → qualification → proposition → négo → closing), assigner des actions et deadlines à chaque étape, automatiser les rappels de relance, et faire une revue de pipeline hebdomadaire. Un CRM bien configuré est le minimum viable.",
      },
      {
        question: "Comment prouver le coût d'un pipeline non structuré à un prospect ?",
        answer:
          "Utilisez un calculateur de coût interactif (comme Dreep) : le prospect saisit son nombre de commerciaux, son panier moyen, et ses deals perdus estimés. Le résultat chiffré crée un déclic émotionnel impossible à obtenir avec un pitch classique. Le taux de conversion augmente de 2-3×.",
      },
    ],
    ctaHeading: "Créez ce calculateur pour votre prospect en 30 secondes",
    ctaButtonLabel: "Créer un calculateur prospect",
    relatedPages: [
      { problem: "absence-crm", industry: "pme", label: "Coût de l'absence de CRM en PME" },
      { problem: "churn-client", industry: "saas-b2b", label: "Coût du churn client en SaaS B2B" },
      { problem: "prospection-manuelle", industry: "consultant-b2b", label: "Coût de la prospection manuelle" },
    ],
    pageType: "commercial",
  },

  // ─── PAGE 6: Absence de CRM / PME (commercial) ───
  {
    problem: "absence-crm",
    industry: "pme",
    metaTitle: "Coût de l'absence de CRM en PME — Calculateur gratuit | Dreep",
    metaDescription:
      "Sans CRM, une PME perd 23 % de ses opportunités commerciales. Calculez le coût réel pour votre entreprise avec notre outil interactif.",
    heroStatNumber: "95 000 €",
    heroStatLabel: "Revenu annuel perdu par une PME de 15 personnes sans CRM",
    heroSubtitle:
      "Fichiers Excel, notes éparpillées, contacts perdus — l'absence de CRM coûte bien plus qu'un abonnement logiciel.",
    breakdowns: [
      { label: "Opportunités commerciales perdues", formula: "Deals oubliés × valeur moyenne", amount: 42000, category: "Revenu" },
      { label: "Temps perdu en double saisie", formula: "Heures × coût horaire × équipe", amount: 24000, category: "Productivité" },
      { label: "Connaissance client non capitalisée", formula: "Départs commerciaux × perte relationnelle", amount: 18000, category: "Capital client" },
      { label: "Décisions sans données fiables", formula: "Mauvaises allocations de ressources", amount: 11000, category: "Stratégie" },
    ],
    sliders: [
      { id: "employees", label: "Nombre de personnes à fonction commerciale", min: 2, max: 30, defaultValue: 6, unit: "", step: 1 },
      { id: "avgDeal", label: "Valeur moyenne d'un client", min: 1000, max: 50000, defaultValue: 5000, unit: "€", step: 500 },
      { id: "lostPerMonth", label: "Clients potentiels perdus par mois", min: 1, max: 10, defaultValue: 3, unit: "", step: 1 },
    ],
    calculatorFormula: "s1 * s2 * 12 + s0 * 4000",
    calculatorResultLabel: "Coût annuel estimé de l'absence de CRM",
    faq: [
      {
        question: "Combien coûte l'absence de CRM en PME ?",
        answer:
          "Selon Salesforce, les entreprises sans CRM perdent en moyenne 23 % de leurs opportunités commerciales. Pour une PME réalisant 500 000 € de CA avec 6 commerciaux, le manque à gagner atteint 80 000 à 120 000 € par an — soit 10 à 20 fois le coût d'un CRM adapté.",
      },
      {
        question: "Quels sont les vrais coûts cachés de gérer les clients sur Excel ?",
        answer:
          "Au-delà des deals perdus : la double saisie coûte 4-6 heures par semaine par commercial, les données deviennent obsolètes (30 % des contacts B2B changent chaque année), et quand un commercial part, il emporte 80 % de la connaissance client dans sa tête.",
      },
      {
        question: "Quel est le ROI d'un CRM pour une PME ?",
        answer:
          "Le ROI moyen d'un CRM est de 8,71 € pour chaque euro investi (source : Nucleus Research). Pour une PME, les gains principaux viennent de la récupération des deals perdus (+20-30 % de conversion) et du temps gagné en automatisation (5-8 heures par semaine par personne).",
      },
      {
        question: "Comment convaincre un dirigeant de PME d'adopter un CRM ?",
        answer:
          "Montrez le coût de l'inaction avec des chiffres concrets : nombre de leads non relancés, temps passé en double saisie, CA perdu lors du départ du dernier commercial. Un calculateur de coût comme Dreep transforme ces arguments abstraits en un montant précis et personnalisé.",
      },
    ],
    ctaHeading: "Créez ce calculateur pour votre prospect en 30 secondes",
    ctaButtonLabel: "Créer un calculateur prospect",
    relatedPages: [
      { problem: "pipeline-non-structure", industry: "equipe-commerciale", label: "Coût d'un pipeline non structuré" },
      { problem: "recrutement-rate", industry: "pme", label: "Coût d'un recrutement raté en PME" },
      { problem: "prospection-manuelle", industry: "consultant-b2b", label: "Coût de la prospection manuelle" },
    ],
    pageType: "commercial",
  },

  // ─── PAGE 7: Poste vacant / Cabinet recrutement (commercial) ───
  {
    problem: "poste-vacant",
    industry: "cabinet-recrutement",
    metaTitle: "Coût d'un poste vacant non pourvu — Calculateur recruteur | Dreep",
    metaDescription:
      "Un poste vacant coûte 500 € par jour à une entreprise. Calculez l'impact réel pour convaincre votre client avec notre outil interactif.",
    heroStatNumber: "52 000 €",
    heroStatLabel: "Coût moyen d'un poste cadre non pourvu pendant 4 mois",
    heroSubtitle:
      "Chaque jour sans pourvoir un poste coûte à votre client. Quantifiez ce coût pour accélérer la décision de recrutement.",
    breakdowns: [
      { label: "Perte de productivité directe", formula: "Travail non réalisé × valeur journalière", amount: 28000, category: "Productivité" },
      { label: "Surcharge de l'équipe existante", formula: "Heures sup × coût × nombre de collègues", amount: 12000, category: "RH" },
      { label: "Opportunités business manquées", formula: "Projets retardés ou refusés", amount: 8000, category: "Revenu" },
      { label: "Risque de départs en cascade", formula: "Turnover induit par surcharge", amount: 4000, category: "Rétention" },
    ],
    sliders: [
      { id: "dailyCost", label: "Valeur produite par le poste (par jour)", min: 200, max: 1500, defaultValue: 500, unit: "€", step: 50 },
      { id: "vacancyDays", label: "Durée de la vacance", min: 30, max: 180, defaultValue: 90, unit: "jours", step: 10 },
      { id: "overloadFactor", label: "Surcoût de surcharge équipe", min: 10, max: 50, defaultValue: 25, unit: "%", step: 5 },
    ],
    calculatorFormula: "s0 * s1 + s0 * s1 * (s2 / 100)",
    calculatorResultLabel: "Coût total estimé du poste vacant",
    faq: [
      {
        question: "Combien coûte un poste vacant par jour ?",
        answer:
          "Le coût varie de 200 à 1 500 € par jour selon le poste. Pour un cadre, la règle empirique est de 1,5 à 3 fois le salaire journalier brut (qui inclut la valeur ajoutée au-delà du simple salaire). Un développeur senior à 55 000 € brut coûte environ 400-600 € par jour de vacance à l'entreprise.",
      },
      {
        question: "Comment calculer le coût d'un poste vacant pour un client ?",
        answer:
          "La formule : (valeur journalière du poste × nombre de jours vacants) + (surcoût de surcharge de l'équipe) + (opportunités manquées). Pour un poste cadre vacant pendant 90 jours, le total atteint facilement 40 000 à 80 000 €. C'est un argument massue pour justifier vos honoraires.",
      },
      {
        question: "Pourquoi un cabinet de recrutement doit quantifier le coût du poste vacant ?",
        answer:
          "Parce que vos honoraires (15-25 % du salaire annuel, soit 8 000 à 15 000 €) semblent élevés en valeur absolue. Mais comparés au coût du poste vacant (40 000 à 80 000 €), ils deviennent un investissement évident. Un calculateur chiffré accélère la prise de décision de 30-50 %.",
      },
      {
        question: "Comment accélérer les recrutements de vos clients ?",
        answer:
          "Envoyez un calculateur de coût de poste vacant à votre interlocuteur RH avant le premier call. Le montant affiché crée un sentiment d'urgence concret. Les cabinets qui utilisent cette technique réduisent leur cycle de vente de 2-3 semaines en moyenne.",
      },
    ],
    ctaHeading: "Créez ce calculateur pour votre prospect en 30 secondes",
    ctaButtonLabel: "Créer un calculateur prospect",
    relatedPages: [
      { problem: "recrutement-rate", industry: "pme", label: "Coût d'un recrutement raté en PME" },
      { problem: "turnover", industry: "startup-saas", label: "Coût du turnover en startup SaaS" },
      { problem: "pipeline-non-structure", industry: "equipe-commerciale", label: "Coût d'un pipeline non structuré" },
    ],
    pageType: "commercial",
  },

  // ─── PAGE 8: Onboarding client bâclé / Agence digitale (commercial) ───
  {
    problem: "onboarding-client-bacle",
    industry: "agence-digitale",
    metaTitle: "Coût d'un onboarding client bâclé en agence digitale | Dreep",
    metaDescription:
      "Un onboarding bâclé fait perdre 35 % des clients en agence dans les 6 premiers mois. Calculez l'impact réel sur votre CA récurrent.",
    heroStatNumber: "72 000 €",
    heroStatLabel: "Revenu annuel perdu par une agence de 10 personnes à cause d'un onboarding défaillant",
    heroSubtitle:
      "Les 30 premiers jours définissent la relation client. Un onboarding bâclé mène au churn, aux litiges et aux mauvais avis.",
    breakdowns: [
      { label: "Clients perdus dans les 6 premiers mois", formula: "Clients churned × CA récurrent annuel", amount: 36000, category: "Revenu" },
      { label: "Temps perdu en allers-retours", formula: "Heures de correction × taux horaire", amount: 18000, category: "Productivité" },
      { label: "Coût d'acquisition gaspillé", formula: "CAC des clients perdus", amount: 12000, category: "Acquisition" },
      { label: "Réputation et bouche-à-oreille négatif", formula: "Avis négatifs × impact acquisition", amount: 6000, category: "Marque" },
    ],
    sliders: [
      { id: "clientValue", label: "Valeur annuelle d'un client", min: 3000, max: 50000, defaultValue: 12000, unit: "€", step: 1000 },
      { id: "churnCount", label: "Clients perdus dans les 6 premiers mois / an", min: 1, max: 10, defaultValue: 3, unit: "", step: 1 },
      { id: "fixHours", label: "Heures de correction par onboarding raté", min: 5, max: 40, defaultValue: 15, unit: "h", step: 5 },
    ],
    calculatorFormula: "s0 * s1 + s1 * s2 * 80",
    calculatorResultLabel: "Coût annuel estimé des onboardings ratés",
    faq: [
      {
        question: "Combien coûte un onboarding client raté en agence ?",
        answer:
          "Le coût direct est la perte du client (valeur annuelle moyenne de 8 000 à 20 000 € en agence digitale) plus le CAC gaspillé (3 000 à 5 000 €). Le coût indirect inclut les heures de correction (15-30h par client mécontent) et l'impact sur la réputation. Total moyen : 15 000 à 30 000 € par client perdu.",
      },
      {
        question: "Quel est le taux de churn en agence digitale ?",
        answer:
          "Le taux moyen de churn en agence est de 25-35 % par an. Les agences avec un processus d'onboarding structuré réduisent ce chiffre à 10-15 %. La corrélation entre qualité de l'onboarding et rétention client est la plus forte de tous les facteurs mesurables.",
      },
      {
        question: "Comment structurer un onboarding client en agence ?",
        answer:
          "Les éléments essentiels : kick-off structuré avec livrables clairs, séquence de check-ins à J+7, J+15, J+30, template de brief client standardisé, et un dashboard partagé pour le suivi. Les agences qui investissent dans l'onboarding augmentent leur LTV client de 40-60 %.",
      },
      {
        question: "Comment utiliser le coût de l'onboarding raté pour vendre ses services ?",
        answer:
          "Si vous vendez du conseil en agence ou un outil de gestion de projet, quantifiez le problème avant de pitcher la solution. Un calculateur de coût (comme Dreep) permet au prospect de voir son propre coût en 30 secondes. Le taux de conversion passe de 10 % à 25-30 % avec cette approche.",
      },
    ],
    ctaHeading: "Créez ce calculateur pour votre prospect en 30 secondes",
    ctaButtonLabel: "Créer un calculateur prospect",
    relatedPages: [
      { problem: "churn-client", industry: "saas-b2b", label: "Coût du churn client en SaaS B2B" },
      { problem: "absence-crm", industry: "pme", label: "Coût de l'absence de CRM en PME" },
      { problem: "poste-vacant", industry: "cabinet-recrutement", label: "Coût d'un poste vacant non pourvu" },
    ],
    pageType: "commercial",
  },
];

export function getCoutPage(problem: string, industry: string): CoutPageData | undefined {
  return coutPages.find((p) => p.problem === problem && p.industry === industry);
}
