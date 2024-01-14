const structureMetrics = {
    date: 'date',
    femaleDeaths28Days: 'femaleDeaths28Days',
    maleDeaths28Days: 'maleDeaths28Days',
    newCasesByPublishDate: 'newCasesByPublishDate',
    newDeathsByDeathDate: 'newDeathsByDeathDate',
    maleCases: 'maleCases',
    hospitalCases: 'hospitalCases',
    newCasesBySpecimenDateRollingSum: 'newCasesBySpecimenDateRollingSum',
    variants: 'variants'
}

export type StructureMetricsType = typeof structureMetrics;

export const hospitalCases: Partial<StructureMetricsType> = {
    date: 'date',
    hospitalCases: 'hospitalCases',
}

export const variants: Partial<StructureMetricsType> = {
    variants: 'variants'
}