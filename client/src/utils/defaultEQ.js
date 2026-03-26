export const EQ_BANDS = [
  { label: "25Hz", value: 25 },
  { label: "40Hz", value: 40 },
  { label: "63Hz", value: 63 },
  { label: "100Hz", value: 100 },
  { label: "160Hz", value: 160 },
  { label: "250Hz", value: 250 },
  { label: "400Hz", value: 400 },
  { label: "630Hz", value: 630 },
  { label: "1kHz", value: 1000 },
  { label: "1.6kHz", value: 1600 },
  { label: "2.5kHz", value: 2500 },
  { label: "4kHz", value: 4000 },
  { label: "6.3kHz", value: 6300 },
  { label: "10kHz", value: 10000 },
  { label: "16kHz", value: 16000 },
  { label: "20kHz", value: 20000 },
];

export const DEFAULT_EQ = EQ_BANDS.reduce((acc, band) => {
  acc[band.label] = 0;
  return acc;
}, {});