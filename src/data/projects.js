export const projects = [
  {
    id: 5,
    title: "Lab Réseau Avancé — GNS3 + OPNSense + MikroTik",
    subtitle: "GNS3 · OPNSense · MikroTik CHR · OSPF · Firewall",
    image: "/carteGNS3Reseau.png",
    shortDescription: "Infrastructure réseau complète sous GNS3 : firewall OPNSense périmétrique et routage dynamique OSPF via MikroTik.",
    description: "Simulation d'une infrastructure réseau d'entreprise complète sous GNS3 avec déploiement d'OPNSense comme firewall périmétrique (WAN/LAN/DMZ, filtrage, NAT) et routage dynamique OSPF via MikroTik Cloud Hosted Router. Interconnexion GNS3 ↔ VirtualBox via interface Host-only.",
    tags: ["GNS3", "OPNSense", "MikroTik", "OSPF", "Firewall", "DMZ", "Réseau"],
    category: "sécurité",
    highlights: [
      "Firewall OPNSense WAN/LAN/DMZ avec règles de filtrage (Default Deny)",
      "Routage dynamique OSPF single-area — adjacence Full validée",
      "Isolation DMZ→LAN et exposition HTTP/HTTPS contrôlée",
      "Interconnexion GNS3 ↔ VirtualBox via Cloud node et vboxnet0"
    ],
    github: "https://github.com/GuillaumeLeDev/lab-GNS3-OPNSense",
    status: "en cours",
    featured: true
  },
  {
    id: 6,
    title: "Inventaire Réseau Automatisé — Cisco Meraki API",
    subtitle: "Python · Cisco Meraki · REST API · JSON · DevNet Sandbox",
    image: "/CarteCiskoInventory.png",
    shortDescription: "Script Python interrogeant l'API Cisco Meraki pour inventorier automatiquement les équipements réseau d'une organisation.",
    description: "Script Python qui interroge l'API REST Cisco Meraki pour inventorier automatiquement les équipements réseau d'une organisation (firewalls MX, switches MS, access points MR, cameras MV). Authentification par clé API, récupération des données en JSON et export structuré. Testé sur le Cisco DevNet Meraki Sandbox (always-on).",
    tags: ["Python", "Cisco Meraki", "REST API", "JSON", "DevNet", "Réseau", "Automatisation"],
    category: "automatisation",
    highlights: [
      "Consommation de l'API REST Meraki v1 avec authentification par header X-Cisco-Meraki-API-Key",
      "Inventaire automatique de tous les équipements d'une organisation (MX, MS, MR, MV)",
      "Export JSON structuré avec horodatage — exploitable par un outil de gestion de parc ou CMDB",
      "Gestion des credentials via fichier .env — aucune clé exposée dans le code source"
    ],
    github: "https://github.com/GuillaumeLeDev/MerakiDeviceInventory",
    status: "terminé",
    featured: true
  },
  {
    id: 3,
    title: "Serveur Linux — Admin & Sécurisation SSH",
    subtitle: "Debian · SSH Ed25519 · UFW · Fail2ban",
    image: "/carteLinuxHeardless.png",
    shortDescription: "Serveur Debian 13 headless déployé from scratch avec hardening SSH complet : Ed25519, Fail2ban, UFW.",
    description: "Déploiement from scratch d'un serveur Debian 13 headless avec configuration réseau dual-interface (NAT + Host-Only) et IP statique. Hardening complet : SSH par clé Ed25519, port custom, root désactivé, Fail2ban, UFW et principe du moindre privilège.",
    tags: ["Linux", "Debian", "SSH", "Fail2ban", "UFW", "Hardening"],
    category: "systèmes",
    highlights: [
      "Installation from scratch sans GUI",
      "Auth SSH par clé Ed25519 uniquement",
      "Protection brute-force Fail2ban",
      "Firewall UFW Default Deny"
    ],
    github: "https://github.com/GuillaumeLeDev/linux-server-admin",
    status: "terminé",
    featured: true
  },
  {
    id: 1,
    title: "Firewall & VPN — Sécurisation Périmétrique (pfSense / OpenVPN / PKI)",
    subtitle: "pfSense · OpenVPN · PKI · DMZ",
    image: "/cartePfsenseOpenVpn.png",
    shortDescription: "Firewall pfSense avec politique Default Deny, DMZ et tunnel VPN OpenVPN chiffré avec PKI complète.\n ",
    description: "Déploiement d'un firewall pfSense avec politique Default Deny, DMZ, NAT et Port Forwarding. Configuration d'un tunnel VPN OpenVPN (UDP) avec PKI complète (CA interne, certificats clients, révocation). Services réseau DHCP/DNS sur VMs Debian isolées.",
    tags: ["pfSense", "OpenVPN", "PKI", "DMZ", "NAT", "Debian", "VirtualBox"],
    category: "sécurité",
    highlights: [
      "Politique Default Deny sur toutes les interfaces",
      "PKI complète avec CA interne",
      "Tunnel VPN chiffré UDP + certificats clients",
      "Isolation DMZ avec règles de filtrage"
    ],
    github: "https://github.com/GuillaumeLeDev/lab-pfsense-openvpn",
    status: "terminé",
    featured: true
  },
  {
    id: 2,
    title: "VLab Architecture LAN/WAN & Commutation",
    subtitle: "VLANs · Trunk 802.1Q · Routage inter-VLAN",
    image: "/carteVlanLab.jpg",
    shortDescription: "Architecture réseau d'entreprise virtualisée avec VLANs, Trunk 802.1Q et routage inter-VLAN.",
    description: "Simulation d'une architecture réseau d'entreprise virtualisée avec routeurs et switchs. Configuration avancée des VLANs, liens Trunk 802.1Q et routage inter-VLAN pour isoler et contrôler les flux entre sous-réseaux.",
    tags: ["VLANs", "802.1Q", "Routage", "LAN/WAN", "VirtualBox"],
    category: "réseau",
    highlights: [
      "Segmentation réseau multi-VLAN",
      "Trunk 802.1Q entre switchs",
      "Routage inter-VLAN contrôlé",
      "Architecture virtualisée complète"
    ],
    github: "https://github.com/GuillaumeLeDev/VlanLab",
    status: "terminé",
    featured: true
  },
  {
    id: 4,
    title: "Gestion de Parc — Automatisation API REST",
    subtitle: "Python · API REST · JSON · CSV",
    image: null,
    shortDescription: "Script Python automatisant la gestion d'un inventaire de parc via API REST, avec export JSON/CSV.",
    description: "Script Python interrogeant une API REST (GET/POST/PUT/DELETE) pour automatiser la gestion d'un inventaire de parc informatique. Filtrage des équipements à renouveler, génération de rapports JSON/CSV et gestion des erreurs HTTP et exceptions réseau.",
    tags: ["Python", "API REST", "JSON", "CSV", "Automatisation"],
    category: "automatisation",
    highlights: [
      "Consommation API REST complète (CRUD)",
      "Filtrage automatique parc à renouveler",
      "Export JSON et CSV",
      "Gestion erreurs HTTP 401/404/500"
    ],
    github: "https://github.com/GuillaumeLeDev/gestion-parc",
    status: "terminé",
    featured: true
  },
  {
    id: 7,
    title: "mini-PAM / IAM — Gestion des Accès à Privilèges",
    subtitle: "Python · Docker · RBAC · Bastion · Rotation de secrets · IAM",
    image: "/Pam-Interface.png",
    shortDescription: "Simulation complète d'une solution PAM enterprise : vault chiffré, bastion SSH, rotation automatique, RBAC et audit trail.",
    description: "Lab PAM (Privileged Access Management) simulant les composants d'une solution enterprise type CyberArk ou BeyondTrust. Architecture microservices Docker avec un Secret Store chiffré Fernet (AES-128), un Jump Server avec session recording, un agent de rotation automatique des mots de passe et un portail web RBAC. L'utilisateur n'accède jamais directement aux credentials — principe zero-knowledge.",
    tags: ["Python", "Docker", "Flask", "PAM", "RBAC", "Fernet/AES", "SSH", "Bastion", "Sécurité"],
    category: "sécurité",
    highlights: [
      "Secret Store chiffré Fernet/AES-128 avec TTL, rate limiting et audit trail JSON",
      "Bastion zero-knowledge : session recording, accès JIT avec timeout automatique",
      "Rotation automatique des secrets SSH (serveur d'abord, vault ensuite — fail-safe)",
      "RBAC complet : politique rôle × cible × durée, export CSV pour auditeurs"
    ],
    github: "https://github.com/GuillaumeLeDev/mini-pam",
    status: "terminé",
    featured: true
  },
  {
    id: 8,
    title: "iPhoneShare — Transfert Local iPhone → Linux",
    subtitle: "Python · Flask · Docker · HTTPS · iOS Shortcuts",
    image: "/Iphone-share.png",
    shortDescription: "Serveur local sécurisé permettant d'envoyer photos et texte depuis iPhone vers PC Ubuntu en 2 taps, sans cloud.",
    description: "Outil de transfert local réseau entre iPhone et PC Ubuntu via un serveur Flask conteneurisé Docker. Le script d'installation détecte automatiquement l'IP, génère un certificat TLS auto-signé, configure un token Bearer et crée un service qui démarre au boot. L'accès est restreint par sous-réseau Wi-Fi déclaré. Un Raccourci iOS natif s'intègre dans le menu Partager sans application tierce.",
    tags: ["Python", "Flask", "Docker", "HTTPS", "TLS", "Bash", "iOS Shortcuts", "Automatisation"],
    category: "outils",
    highlights: [
      "Certificat TLS auto-signé généré à l'installation — tout le trafic LAN chiffré",
      "Authentification par token Bearer + filtrage IP par sous-réseau déclaré",
      "Démarrage automatique au boot via Docker Compose — zéro intervention après install",
      "Installation en une ligne (curl | bash) avec détection auto IP et configuration multi-réseau"
    ],
    github: "https://github.com/GuillaumeLeDev/iphoneShare",
    status: "terminé",
    featured: true
  },
];

export const projectCategories = ["Tous", "Réseau", "Sécurité", "Systèmes", "Automatisation", "Outils"];
