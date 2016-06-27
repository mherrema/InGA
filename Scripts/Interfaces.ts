namespace INGAApp {
export interface HeadingOption {
  open: boolean;
  heading: string;
  options: Array<FilterOption>;
  selected?: FilterOption;
  assessmentsOnly?: boolean;
  filterable?: boolean;
  input?: boolean;
}

export interface FilterOption {
  Key: string;
  Value?: string;
}

export interface BreadCrumb {
  Key: number;
  Title: string;
}

export interface UISelect {
  activate: Function;
}

export interface AssessmentPackage {
  Assessment: DistrictAssessment;
  ShouldRefresh: boolean;
  ShouldPublish?: boolean;
}

export interface AssessmentTemplatePackage {
  AssessmentTemplate: AssessmentTemplate;
  ShouldRefresh: boolean;
  ShouldMakeAvailableToUsers?: boolean;
}

export interface ErrorObject {
  title?: boolean;
  district?: boolean;
  calendar?: boolean;
  gradeLevel?: boolean;
  subject?: boolean;
  standardType?: boolean;
  schoolYear?: boolean;
}

export interface GridOptions {
  data: Object;
  enableSorting: boolean;
  enableFiltering?: boolean;
  enableColumnMenus: boolean;
  columnDefs: Array<ColumnDef>;
  enableCellEditOnFocus: boolean;
  rowHeight: number;
  filterOptions: Object;
  onRegisterApi: Function;
}

export interface ColumnDef extends Object {
  visible?: boolean;
  name?: string;
  minWidth?: number;
  pinnedLeft?: boolean;
  enableSorting?: boolean;
  cellEditableCondition?: boolean;
  cellTemplate?: string;
  headerCellTemplate?: string;
  enableFiltering?: boolean;
  filter?: Object;
  itemKey?: Object;
  field?: string;
  type?: string;
  pointsMax?: number;
  pointsMin?: number;
  validators?: Object;
  displayName?: string;
}

export interface GridApi {
  core: {notifyDataChange: Function; refresh: Function; getQualifiedColField: Function};
  grid?: {rows: Object};
}

export interface Notification {
  NotificationText?: string;
  Success?: boolean;
  Error?: boolean;
  Active?: boolean;
}

export interface SortableOptions {
  disabled: boolean;
  stop: Function;
}

export interface ReturnPackage {
  Success: boolean;
  Key: number;
  ErrorText: string;
}

export interface ConfirmationPackage {
  Action: string;
  Objects: string;
}

export interface PointsStepOption {
  Title: string;
  Step: number;
}



export interface AssessmentTemplate {
  AssessmentTemplateKey?: number;
  SubjectKey?: number;
  Subject?: Subject;
  CalendarKey?: number;
  Calendar?: Calendar;
  Title: string;
  StandardTypeKey?: number;
  StandardType?: StandardType;
  GradeLevelKey?: number;
  GradeLevel?: GradeLevel;
  AvailableToUsers?: boolean;
  Items?: Array<Item>;
  AssessmentTemplateItems?: Array<AssessmentTemplateItem>;
  District?: District;
  DistrictKey?: number;
  IsScantron?: boolean;
  checked?: boolean;
}

export interface AssessmentTemplateItem {
  AssessmentTemplateItemKey?: number;
  ItemKey?: number;
  AssessmentTemplateKey?: number;
  Item?: Item;
}

export interface Calendar {
  CalendarKey?: number;
  CalendarName?: string;
  DistrictKey?: number;
  MarkingPeriodKey?: number;
}

export interface Classroom {
  ClassroomKey?: number;
  SchoolKey?: number;
  School?: School;
  SchoolTeacherKey?: number;
  SchoolTeacher?: SchoolTeacher;
  ScheduleTermKey?: number;
  ScheduleTerm?: ScheduleTerm;
  CourseKey?: number;
  Course?: Course;
  SectionNumber?: string;
  checked?: boolean;
  IsAssigned?: boolean;
  ClassroomAssessments?: Array<ClassroomAssessment>;
  AssignedString?: string;
}

export interface ClassroomAssessment {
  Title?: string;
  ClassroomAssessmentKey?: number;
  DistrictAssessmentKey?: number;
  DistrictAssessment?: DistrictAssessment;
  SchoolTeacherKey?: number;
  SchoolTeacher?: SchoolTeacher;
  SchoolKey?: number;
  School?: School;
  ClassroomKey?: number;
  Classroom?: Classroom;
  Finalized?: boolean;
  DateFinalized?: string;
  AssignedString?: string;
  MarkingPeriodKey?: number;
  CalendarKey?: number;
}

interface Course {
  CourseKey?: number;
  SchoolKey?: number;
  School?: School;
  CourseCode?: string;
  CourseName?: string;
}

export interface District {
  DistrictKey?: number;
  DistrictName?: string;
  DistrictCode?: string;
}

export interface DistrictAssessment {
  DistrictAssessmentKey?: number;
  DistrictKey?: number;
  GradeLevelKey?: number;
  GradeLevel?: GradeLevel;
  StandardTypeKey?: number;
  StandardType?: StandardType;
  SubjectKey?: number;
  Subject?: Subject;
  Title: string;
  SchoolYearKey?: number;
  SchoolYear?: SchoolYear;
  TargetClass?: string;
  IsPublished?: boolean;
  DateFinalized?: string;
  Term?: string;
  CalendarKey?: number;
  MarkingPeriodKey?: number;
  Calendar?: Calendar;
  AssessmentTemplate?: AssessmentTemplate;
  AssessmentTemplateKey?: number;
  Items?: Array<Item>;
  DistrictAssessmentItems?: Array<DistrictAssessmentItem>;
  DateCreated?: string;
  IsScantron?: boolean;
  checked?: boolean;
  Status?: string;
  ReportGroup?: string;
  SelectedCalendar?: {$selected?: {CalendarKey?: number; MarkingPeriodKey?: number; Title?: string; }; };
  MarkingPeriod?: MarkingPeriod;
}

export interface DistrictAssessmentItem {
  DistrictAssessmentItemKey?: number;
  ItemKey?: number;
  DistrictAssessmentKey?: number;
  Item?: Item;
}

interface DistrictStudent {
  DistrictStudentKey?: number;
  FirstName?: string;
  LastName?: string;
}

export interface GradeLevel {
  GradeLevelKey?: number;
  GradeLevelAbbreviated?: string;
  GradeLevelCode?: string;
  GradeLevelName?: string;
  Rank?: number;
}

export interface Item {
  ItemKey?: number;
  ItemTypeKey?: number;
  ItemType?: ItemType;
  ItemOrder?: number;
  StandardKey?: number;
  StandardCode?: string;
  Standard?: Standard;
  CorrectScore?: string;
  Points?: number;
  AlternateValueList?: string;
  PointsMin?: number;
  PointsMax?: number;
  PointsStep?: number;
  Label?: string;
}

export interface ItemType {
  ItemTypeKey?: number;
  TypeName?: string;
}

export interface MarkingPeriod {
  MarkingPeriodKey?: number;
  Name?: string;
  Start?: string;
  End?: string;
  ParentKey?: number;
  Parent?: MarkingPeriod;
  SchoolYearKey?: number;
  SchoolYear?: SchoolYear;
  Sequence?: number;
  DistrictKey?: number;
  IsAssessable?: boolean;
  IsBenchmark?: boolean;
  CalendarKey?: number;
  Calendar?: Calendar;
  Children?: Array<MarkingPeriod>;
}

interface ScheduleTerm {
  ScheduleTermKey?: number;
  DistrictKey?: number;
  TermName?: string;
}

interface School {
  SchoolKey?: number;
  SchoolName?: string;
  SchoolCode?: string;
  DistrictKey?: number;
}

interface SchoolTeacher {
  SchoolTeacherKey?: number;
  DistrictKey?: number;
  SchoolKey?: number;
  School?: School;
  TeacherNumber?: string;
  FirstName?: string;
  LastName?: string;
}

export interface SchoolYear {
  SchoolYearKey?: number;
  StartTimeKey?: number;
  EndTimeKey?: number;
  SchoolYearName?: string;
  SchoolYearNameShort?: string;
  StartCalendarYear?: number;
  EndCalendarYear?: number;
  SchoolYearRank?: number;
}

export interface Score {
  Item?: Item;
  Score1?: string;
}

export interface Standard {
  StandardKey?: number;
  StandardTypeKey?: number;
  StandardType?: StandardType;
  SubjectMapKey?: number;
  Year?: number;
  StandardCode?: string;
  StandardDescription?: string;
}

export interface StandardType {
  StandardTypeKey?: number;
  StandardTypeName?: string;
  Description?: string;
}

export interface StudentAssessment {
  StudentAssessmentKey?: number;
  DistrictStudentKey?: number;
  ClassroomAssessmentKey?: number;
  IsAbsent?: boolean;
  ClassroomKey?: number;
  DistrictStudent?: DistrictStudent;
  Scores?: Array<Score>;
  hidden: boolean;
  checked: boolean;
}

export interface Subject {
  SubjectKey?: number;
  SubjectName?: string;
}


}

namespace uiGrid {
  export interface GridValidateService {
    setValidator: Function;
    isInvalid: Function;
  }
}
