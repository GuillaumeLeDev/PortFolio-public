export const profil = {
  nom: "Guillaume Brunel",
  titre: "Data Analyst & Full Stack Developer",
  bio: "Étudiant à Epitech. Je transforme la donnée brute en décisions stratégiques.",
  contact: "guillaumebrunel1@gmail.com",
  description: `

🎯 Developpeur Web en formation – en recherche d’alternance, à partir de janvier 2026, pour une durée de 12 mois sur Lyon et ses alentours.

Après plusieurs années dans le monde professionnel, j’ai choisi de me reconvertir avec conviction vers le métier de Développement Web, un rôle qui me permet de mettre à profit ma curiosité, mon esprit logique et ma volonté de contribuer à des projets à impact.

🎓 Je suis actuellement en formation intensive à EPITECH, dans le cadre d’un programme de développement informatique . Mon année de formation se déroule en deux temps :

Septembre à décembre : cours en présentiel intensifs

Janvier à juillet : alternance en entreprise (2 semaines école / 4 semaines entreprise)`
  
};

export const competences = [
  { name: "Docker", image: "/docker.png" },
  { name: "Express.js", image: "/expressjs.png" },
  { name: "Figma", image: "/figma.png" },
  { name: "Java", image: "/java.png" },
  { name: "Linux", image: "/linux.png" },
  { name: "Python", image: "/python.png" },
  { name: "React", image: "/react.png" },
  { name: "SharePoint", image: "/sharepoint.png" },
  { name: "SQL", image: "/sql.png" },
  { name: "Tailwind CSS", image: "/tailwind.png" },
];

export const projets = [
  {
    id: 1,
    titre: "Analyse de la pollution des eaux dans le monde",
    description: "Nettoyage de données Python pour étudier les analyses de la pollution dans l'eau.",
    technos: ["Python", "Pandas", "Power BI"],
    lien: "https://github.com/GuillaumeLeDev/water-pollution-analysis"
  },
  {
    id: 2,
    titre: "Zombie Shooter ",
    description: "Jeux-video créer sous java avec la libgdx , pour un projet scolaire réalisé en groupe en 3 semaines.",
    technos: ["java", "lib gdx", "Tiled"],
    lien: "https://github.com/EpitechMscProPromo2028/T-JAV-501-LYO_7",
    image: "/shooter.png"
  },
  // autres projet
];

export const experiences = [
  {
    id: 1,
    titre : "Epitech",
    date : "2025 - 2028",
    description : `L'Ecole de l'expertise informatique depuis 25 ans`
},
{
    id: 2,
    titre : "Enedis",
    date : "2023 - 2025",
    description : `Support aux équipes pour la fiabilisation des données techniques.
                   Gestion des mises à jours et garantie de la cohérence des informations.
                   Collaboration transverses avec différent interlocuteurs métiers.`
}
,
{
    id: 3,
    titre : "BTS Architecture metalique | Alternance Castel et Fromaget",
    date : "2021 - 2023",
    description : "Conception et réalisation d'ouvrages métalliques Modélisation 3D complexe, calculs de structures et respect strict des normes techniques et des cahiers des charges."
}
,
{
    id: 4,
    titre : "Chef d'équipe de maintenance sur pylone télécome",
    date : "2019 - 2021",
    description : `Pilotage d'interventions et reporting technique
                   Vérification des points de sécurité sur site en itinérance
                   Organisation des plannings, encadrement d'équipe et rédaction de rapports d'activité précis pour assurer la traçabilité des opérations. `
}
]



