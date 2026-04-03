export const EQ_BANDS = [
    { label: "25", value: 25 },
    { label: "40", value: 40 },
    { label: "63", value: 63 },
    { label: "100", value: 100 },
    { label: "160", value: 160 },
    { label: "250", value: 250 },
    { label: "400", value: 400 },
    { label: "630", value: 630 },
    { label: "1k", value: 1000 },
    { label: "1.6", value: 1600 },
    { label: "2.5k", value: 2500 },
    { label: "4k", value: 4000 },
    { label: "6.3k", value: 6300 },
    { label: "10k", value: 10000 },
    { label: "16k", value: 16000 },
    { label: "20k", value: 20000 },
];

export const DEFAULT_EQ = EQ_BANDS.reduce((acc, band) => {
    acc[band.label] = 0;
    return acc;
}, {});