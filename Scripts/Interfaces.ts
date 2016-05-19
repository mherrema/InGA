module INGAApp{
export interface HeadingOption{
  open: boolean,
  heading: string,
  options: Array<FilterOption>,
  selected?: FilterOption
}

export interface FilterOption{
  Key: string,
  Value?: string
}

export interface AssessmentPackage{
  Assessment: DistrictAssessment,
  ShouldRefresh: boolean,
  ShouldPublish?: boolean
}

export interface SortableOptions{
  disabled: boolean,
  stop: Function
}



export interface AssessmentTemplate{
  AssessmentTemplateKey?: number,
  SubjectKey?: number,
  Subject?: Subject,
  CalendarKey?: number,
  Calendar?: Calendar,
  Title: string,
  StandardTypeKey?: number,
  StandardType?: StandardType,
  GradeLevelKey?: number,
  GradeLevel?: GradeLevel,
  AvailableToUsers?: boolean,
  Items?: Array<Item>
}

export interface Calendar{
  CalendarKey?: number,
  CalendarName?: string,
  DistrictKey?: number
}

interface Classroom{
  ClassroomKey?: number,
  SchoolKey?: number,
  School?: School,
  SchoolTeacherKey?: number,
  SchoolTeacher?: SchoolTeacher,
  ScheduleTermKey?: number,
  ScheduleTerm?: ScheduleTerm,
  CourseKey?: number,
  Course?: Course,
  SectionNumber?: string
}

export interface ClassroomAssessment{
  Title?: string,
  ClassroomAssessmentKey?: number,
  DistrictAssessmentKey?: number,
  DistrictAssessment?: DistrictAssessment,
  SchoolTeacherKey?: number,
  SchoolTeacher?: SchoolTeacher,
  SchoolKey?: number,
  School?: School,
  ClassroomKey?: number,
  Classroom?: Classroom,
  Finalized?: boolean,
  DateFinalized?: Date
}

interface Course{
  CourseKey?: number,
  SchoolKey?: number,
  School?: School,
  CourseCode?: string,
  CourseName?: string
}

export interface DistrictAssessment{
  DistrictAssessmentKey?: number,
  DistrictKey?: number,
  GradeLevelKey?: number,
  GradeLevel?: GradeLevel,
  StandardTypeKey?: number,
  StandardType?: StandardType,
  SubjectKey?: number,
  Subject?: Subject,
  Title: string,
  SchoolYearKey?: number,
  SchoolYear?: SchoolYear,
  TargetClass?: string,
  IsPublished?: boolean,
  DateFinalized?: Date,
  Term?: string,
  CalendarKey?: number,
  Calendar?: Calendar,
  AssessmentTemplate?: AssessmentTemplate,
  AssessmentTemplateKey?: number,
  Items?: Array<Item>,
  checked?: boolean
}

interface DistrictStudent{
  DistrictStudentKey?: number,
  FirstName?: string,
  LastName?: string
}

export interface GradeLevel{
  GradeLevelKey?: number,
  GradeLevelAbbreviated?: string,
  GradeLevelCode?: string,
  GradeLevelName?: string,
  Rank?: number
}

export interface Item{
  ItemKey?: number,
  ItemTypeKey?: number,
  ItemType?: ItemType,
  ItemOrder?: number,
  StandardKey?: number,
  Standard?: Standard,
  CorrectScore?: string,
  Points?: number,
  AlternateValueList?: string,
  PointsMin?: number,
  PointsMax?: number,
  PointsStep?: number
}

export interface ItemType{
  ItemTypeKey?: number,
  TypeName?: string
}

interface MarkingPeriod{
  MarkingPeriodKey?: number,
  Name?: string,
  Start?: Date,
  End?: Date,
  ParentKey?: number,
  Parent?: MarkingPeriod,
  SchoolYearKey?: number,
  SchoolYear?: SchoolYear,
  Sequence?: number,
  DistrictKey?: number,
  IsAssessable?: boolean,
  IsBenchmark?: boolean,
  CalendarKey?: number,
  Calendar?: Calendar
}

interface ScheduleTerm{
  ScheduleTermKey?: number,
  DistrictKey?: number,
  TermName?: string
}

interface School{
  SchoolKey?: number,
  SchoolName?: string,
  SchoolCode?: string
}

interface SchoolTeacher{
  SchoolTeacherKey?: number,
  DistrictKey?: number,
  SchoolKey?: number,
  School?: School,
  TeacherNumber?: string,
  FirstName?: string,
  LastName?: string
}

export interface SchoolYear{
  SchoolYearKey?: number,
  StartTimeKey?: number,
  EndTimeKey?: number,
  SchoolYearName?: string,
  SchoolYearNameShort?: string,
  StartCalendarYear?: number,
  EndCalendarYear?: number,
  SchoolYearRank?: number
}

interface Standard{
  StandardKey?: number,
  StandardTypeKey?: number,
  StandardType?: StandardType,
  SubjectMapKey?: number,
  Year?: number,
  StandardCode?: string,
  StandardDescription?: string
}

export interface StandardType{
  StandardTypeKey?: number,
  StandardTypeName?: string,
  Description?: string
}

export interface Subject{
  SubjectKey?: number,
  SubjectName?: string
}


}
