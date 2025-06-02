export interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  category: string;
  color: string;
  description: string;
}

export const periodicElements: Element[] = [
  {
    symbol: "H",
    name: "Hydrogen",
    atomicNumber: 1,
    category: "nonmetal",
    color: "#FFFFFF",
    description: "Lightest and most abundant chemical element in the universe"
  },
  {
    symbol: "He",
    name: "Helium",
    atomicNumber: 2,
    category: "noble-gas",
    color: "#D9FFFF",
    description: "Second most abundant element in the universe"
  },
  {
    symbol: "Li",
    name: "Lithium",
    atomicNumber: 3,
    category: "alkali-metal",
    color: "#CC80FF",
    description: "Crucial element for battery technology"
  },
  {
    symbol: "Be",
    name: "Beryllium",
    atomicNumber: 4,
    category: "alkaline-earth",
    color: "#C2FF00",
    description: "Used in aerospace materials and X-ray equipment"
  },
  {
    symbol: "C",
    name: "Carbon",
    atomicNumber: 6,
    category: "nonmetal",
    color: "#909090",
    description: "Foundation of organic chemistry and life"
  },
  {
    symbol: "N",
    name: "Nitrogen",
    atomicNumber: 7,
    category: "nonmetal",
    color: "#3050F8",
    description: "Essential for protein structure in all living organisms"
  },
  {
    symbol: "O",
    name: "Oxygen",
    atomicNumber: 8,
    category: "nonmetal",
    color: "#FF0D0D",
    description: "Critical for respiration in living organisms"
  },
  {
    symbol: "Fe",
    name: "Iron",
    atomicNumber: 26,
    category: "transition-metal",
    color: "#E06633",
    description: "Most common element on Earth by mass"
  },
  {
    symbol: "Cu",
    name: "Copper",
    atomicNumber: 29,
    category: "transition-metal",
    color: "#C88033",
    description: "Excellent conductor of heat and electricity"
  },
  {
    symbol: "Si",
    name: "Silicon",
    atomicNumber: 14,
    category: "metalloid",
    color: "#F0C8A0",
    description: "Backbone of modern electronics and solar cells"
  },
  {
    symbol: "Au",
    name: "Gold",
    atomicNumber: 79,
    category: "transition-metal",
    color: "#FFD123",
    description: "Precious metal with exceptional resistance to corrosion"
  },
  {
    symbol: "Ag",
    name: "Silver",
    atomicNumber: 47,
    category: "transition-metal",
    color: "#C0C0C0",
    description: "Highest electrical and thermal conductivity of any metal"
  }
];

// Simplified periodic table grid positions
export const elementPositions = {
  "H": { row: 1, col: 1 },
  "He": { row: 1, col: 18 },
  "Li": { row: 2, col: 1 },
  "Be": { row: 2, col: 2 },
  "C": { row: 2, col: 14 },
  "N": { row: 2, col: 15 },
  "O": { row: 2, col: 16 },
  "Fe": { row: 4, col: 8 },
  "Cu": { row: 4, col: 11 },
  "Si": { row: 3, col: 14 },
  "Au": { row: 6, col: 11 },
  "Ag": { row: 5, col: 11 }
};