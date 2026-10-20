export type Role = "consumer" | "dealer" | "operations";

export const bike = {
  id: "bike-racemax-4819",
  name: "3T RaceMax Project X",
  frame: "3T-RMX-••••-4819",
  status: "Agreement active",
  image: "/assets/3t-racemax-project-x.png",
};

export const agreement = {
  reference: "RCR-10482",
  customer: "Alex P.",
  monthlyPayment: 166,
  remainingBalance: 6239.33,
  paidPercent: 36,
  started: "18 Nov 2025",
  termEnds: "18 Nov 2027",
  choiceWindow: "18 Aug–18 Nov 2027",
  nextPayment: "18 Oct 2026",
  serviceDue: "18 Oct 2026",
  dealer: "Service De Velo, Botley",
};

export const services = [
  { title: "Annual service completed", detail: "Service De Velo, Botley · Technician JP", date: "22 Sep 2026", status: "Verified" },
  { title: "Brake pads replaced", detail: "Parts and technician record attached", date: "22 Sep 2026", status: "Verified" },
  { title: "Rental started", detail: "Bike handed to Alex P.", date: "18 Nov 2025", status: "Verified" },
  { title: "Pre-rental inspection", detail: "Original specification confirmed", date: "17 Nov 2025", status: "Verified" },
];

export const estate = [
  { customer: "Alex P.", bike: "3T RaceMax Project X", agreement: "RCR-10482", status: "On track", next: "Renewal opens · 18 Aug 2027", dealer: "Service De Velo" },
  { customer: "Jamie R.", bike: "Cannondale Mavaro Neo", agreement: "RCR-10479", status: "Service due", next: "Service · 02 Oct 2026", dealer: "Service De Velo" },
  { customer: "Sam K.", bike: "Trek Allant+ 7", agreement: "RCR-10291", status: "Return booked", next: "Return · 28 Sep 2026", dealer: "Service De Velo" },
];
