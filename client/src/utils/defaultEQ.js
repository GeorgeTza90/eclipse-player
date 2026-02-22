export const EQ_BANDS = [
  { label: "25Hz", value: 25 },
  { label: "50Hz", value: 50 },
  { label: "80Hz", value: 80 },
  { label: "125Hz", value: 125 },
  { label: "250Hz", value: 250 },
  { label: "630Hz", value: 630 },
  { label: "1kHz", value: 1000 },
  { label: "2kHz", value: 2000 },
  { label: "4kHz", value: 4000 },
  { label: "6kHz", value: 6000 },
  { label: "10kHz", value: 10000 },
  { label: "15kHz", value: 15000 },
];

export const DEFAULT_EQ = EQ_BANDS.reduce((acc, band) => {
  acc[band.label] = 0;
  return acc;
}, {});