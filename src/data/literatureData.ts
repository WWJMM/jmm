export interface MaterialProperty {
  [key: string]: string;
}

export interface LiteratureItem {
  id: string;
  title: string;
  authors: string[];
  doi: string;
  structure: string;
  properties: MaterialProperty;
  model3d: string;
  year: number;
  journal: string;
  abstract: string;
  keywords: string[];
  imageUrl: string;
}

export const literatureData: LiteratureItem[] = [
  {
    id: "MAT-2023-XRD-001",
    title: "Novel Perovskite Solar Cell Interface Engineering",
    authors: ["Zhang, L.", "Wang, Q.", "Liu, J.", "Chen, H."],
    doi: "10.1039/d3ta01234k",
    structure: "Perovskite_Cubic",
    properties: {
      bandgap: "1.65eV",
      efficiency: "25.3%",
      stability: "1000h"
    },
    model3d: "/models/perovskite.glb",
    year: 2023,
    journal: "Journal of Materials Chemistry A",
    abstract: "We report a novel interface engineering approach for perovskite solar cells that leads to improved stability and efficiency. The addition of a hydrophobic interlayer between the perovskite and hole transport material significantly reduces moisture-induced degradation.",
    keywords: ["perovskite", "solar cell", "interface engineering", "stability"],
    imageUrl: "https://images.pexels.com/photos/60575/solar-energy-solar-system-renewable-energy-photovoltaic-60575.jpeg"
  },
  {
    id: "MAT-2022-BAT-002",
    title: "High-capacity Lithium-sulfur Batteries with Carbon Nanotube Interlayers",
    authors: ["Johnson, M.", "Smith, A.", "Patel, K."],
    doi: "10.1021/acsenergylett.2b00123",
    structure: "Carbon_Nanotube",
    properties: {
      capacity: "1200mAh/g",
      cycles: "500",
      chargeRate: "1C"
    },
    model3d: "/models/cnt-sulfur.glb",
    year: 2022,
    journal: "ACS Energy Letters",
    abstract: "Lithium-sulfur batteries represent a promising next-generation energy storage technology. Here, we demonstrate the use of functionalized carbon nanotube interlayers to trap polysulfides and enhance cycle life.",
    keywords: ["lithium-sulfur", "battery", "carbon nanotubes", "energy storage"],
    imageUrl: "https://images.pexels.com/photos/163999/pexels-photo-163999.jpeg"
  },
  {
    id: "MAT-2023-CAT-003",
    title: "Single-atom Catalysts for Efficient CO2 Reduction",
    authors: ["Martinez, R.", "Kim, Y.", "Gupta, A."],
    doi: "10.1038/s41929-023-00956-x",
    structure: "Single_Atom_Catalyst",
    properties: {
      selectivity: "95%",
      faradaicEfficiency: "92%",
      turnoverFrequency: "3452h-1"
    },
    model3d: "/models/single-atom.glb",
    year: 2023,
    journal: "Nature Catalysis",
    abstract: "Single-atom catalysts offer maximum atom efficiency and unique selectivity. In this work, we develop a scalable method to synthesize Fe-N-C single-atom catalysts with remarkable activity for CO2 reduction to CO.",
    keywords: ["catalysis", "CO2 reduction", "single-atom catalyst", "electrochemistry"],
    imageUrl: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg"
  },
  {
    id: "MAT-2021-2D-004",
    title: "Mechanical Properties of MXene-Polymer Composites",
    authors: ["Brown, T.", "Zhao, L.", "Anderson, D."],
    doi: "10.1002/adma.202102156",
    structure: "MXene_Layer",
    properties: {
      tensileStrength: "320MPa",
      youngsModulus: "12GPa",
      thermalConductivity: "15W/mK"
    },
    model3d: "/models/mxene.glb",
    year: 2021,
    journal: "Advanced Materials",
    abstract: "Two-dimensional MXenes offer exceptional mechanical and functional properties. We investigate the mechanical reinforcement of polymer matrices with various MXene compositions and surface terminations.",
    keywords: ["MXene", "2D materials", "composite", "mechanical properties"],
    imageUrl: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
  },
  {
    id: "MAT-2023-QD-005",
    title: "Quantum Dot Light-Emitting Diodes with Ultrahigh Efficiency",
    authors: ["Park, J.", "Lee, S.", "Wilson, M."],
    doi: "10.1021/acsnano.3c00567",
    structure: "Quantum_Dot",
    properties: {
      externalQuantumEfficiency: "28.5%",
      luminance: "1,200,000cd/m2",
      lifetime: "10,000h"
    },
    model3d: "/models/quantum-dot.glb",
    year: 2023,
    journal: "ACS Nano",
    abstract: "We demonstrate quantum dot light-emitting diodes with record efficiency and brightness through careful band alignment engineering and surface passivation strategies.",
    keywords: ["quantum dots", "LED", "displays", "optoelectronics"],
    imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg"
  }
];

export const journalList = [
  "Nature Materials",
  "Advanced Materials",
  "ACS Nano",
  "Science",
  "Journal of Materials Chemistry A",
  "Nature Catalysis",
  "ACS Energy Letters",
  "Nano Letters",
  "Advanced Functional Materials",
  "Materials Today"
];

export const structureTypes = [
  "Perovskite_Cubic",
  "Carbon_Nanotube",
  "Single_Atom_Catalyst",
  "MXene_Layer",
  "Quantum_Dot",
  "Metal_Organic_Framework",
  "Zeolite",
  "Graphene",
  "Spinel",
  "Layered_Oxide"
];