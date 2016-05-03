module INGAApp{
export interface HeadingOption{
  open: boolean,
  heading: string,
  options: Array<FilterOption>,
  selected?: FilterOption
}

export interface FilterOption{
  key: string,
  value?: string
}

export interface Assessment{
  title: string,
  gradeLevel: Grade,
  subjectArea: string,
  term: string,
  schoolYear: string,
  standardType?: string,
  scheduleDate?: string,
  reportGroup?: string,
  checked?: boolean
}

export interface Grade{
  gradeName: string,
  gradeCode?: string,
  gradeKey: number
}


}
