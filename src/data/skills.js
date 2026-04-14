export const skills = [
  {
    category: "Réseau & Protocoles",
    icon: "🌐",
    relatedProjectIds: [2, 5],
    items: [
      { name: "TCP/IP", level: "intermédiaire" },
      { name: "VLANs / 802.1Q", level: "intermédiaire" },
      { name: "DNS / DHCP", level: "intermédiaire" },
      { name: "Routage inter-VLAN", level: "intermédiaire" },
      { name: "LAN / WAN", level: "intermédiaire" },
      { name: "WiFi (bases)", level: "notions" },
    ]
  },
  {
    category: "Sécurité & Firewall",
    icon: "🔒",
    relatedProjectIds: [1, 5],
    items: [
      { name: "pfSense", level: "intermédiaire" },
      { name: "OPNSense", level: "intermédiaire" },
      { name: "OpenVPN / PKI", level: "intermédiaire" },
      { name: "Fail2ban", level: "intermédiaire" },
      { name: "UFW", level: "intermédiaire" },
      { name: "NAT / DMZ", level: "intermédiaire" },
    ]
  },
  {
    category: "Systèmes & Administration",
    icon: "🖥️",
    relatedProjectIds: [3],
    items: [
      { name: "Linux Debian/Ubuntu", level: "intermédiaire" },
      { name: "SSH (hardening)", level: "intermédiaire" },
      { name: "Windows Server (bases)", level: "notions" },
      { name: "Virtualisation VirtualBox", level: "intermédiaire" },
    ]
  },
  {
    category: "Simulation & Labs",
    icon: "🔬",
    relatedProjectIds: [5, 2],
    items: [
      { name: "GNS3", level: "intermédiaire" },
      { name: "Cisco Packet Tracer", level: "intermédiaire" },
      { name: "Cisco Meraki", level: "notions" },
      { name: "Cisco IOS (bases)", level: "en cours" },
    ]
  },
  {
    category: "Automatisation & Dev",
    icon: "⚙️",
    relatedProjectIds: [4, 6],
    items: [
      { name: "Python (scripts réseau)", level: "notions" },
      { name: "API REST", level: "intermédiaire" },
      { name: "Bash", level: "notions" },
      { name: "Git / GitHub", level: "intermédiaire" },
    ]
  },
  {
    category: "Cloud & Supervision",
    icon: "☁️",
    relatedProjectIds: [],
    items: [
      { name: "Azure (bases)", level: "en cours" },
      { name: "Zabbix", level: "à venir" },
      { name: "ITIL (notions)", level: "notions" },
    ]
  }
];

// Couleurs associées aux niveaux — utilisées dans SkillBadge
export const levelColors = {
  "intermédiaire": "green",   // compétence maîtrisée
  "notions": "blue",          // compétence acquise
  "en cours": "orange",       // en apprentissage actif
  "à venir": "gray"           // roadmap
};
