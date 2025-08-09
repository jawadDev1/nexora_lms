import { ICourseSection } from "@/modules/hokage/pages/CreateCourse";
import {
    CourseContentFormData,
    CourseInfoFormData,
    CourseOptionsFormData,
} from "@/schemas/course.schema";
import { create } from "zustand";

interface CourseSectionsData {
    course_info: CourseInfoFormData | null;
    course_content: CourseContentFormData | null;
    course_options: CourseOptionsFormData | null;
    course_preview: null;
}

interface CourseFormState {
    currentStepIndex: number;
    currentSection: ICourseSection;
    isFirstStep: boolean;
    isLastStep: boolean;
    courseSectionData: CourseSectionsData;
    isUpdate: string | null;
}

type ICourseSectionsData =
    | CourseInfoFormData
    | CourseContentFormData
    | CourseOptionsFormData
    | null;

type ICourseSectionUpdateData = {
    course_info: CourseInfoFormData;
    course_data: CourseContentFormData;
    course_options: CourseOptionsFormData;
    id: string;
};

export interface CourseFormActions {
    handleNextStep: (
        section: ICourseSection,
        data: ICourseSectionsData,
    ) => void;
    handlePreviousStep: (
        section: ICourseSection,
        currentData: ICourseSectionsData,
    ) => void;
    handleGetSectionData: (
        section: ICourseSection,
    ) => ICourseSectionsData | null;
    handleSetUpdateCourse: (data: ICourseSectionUpdateData) => void;
    handleClearForm: () => void;
}

export type CourseFormStore = CourseFormState & CourseFormActions;

const initialState: CourseFormState = {
    currentStepIndex: 1,
    isFirstStep: true,
    isLastStep: false,
    isUpdate: null,
    courseSectionData: {
        course_content: null,
        course_info: null,
        course_options: null,
        course_preview: null,
    },
    currentSection: "course_info",
};

const sectionsIndex: {
    [key: number]: ICourseSection;
} = {
    1: "course_info",
    2: "course_options",
    3: "course_content",
    4: "course_preview",
};

export const useCourseForm = create<CourseFormStore>((set, get) => ({
    ...initialState,
    handleNextStep(section, data) {
        const index = get().currentStepIndex + 1;
        const sections_data = get().courseSectionData;
        const nextSectoin = sectionsIndex[index];
        set(() => ({
            currentSection: nextSectoin,
            courseSectionData: { ...sections_data, [section]: data },
            currentStepIndex: index,
            isLastStep: index === 4,
            isFirstStep: false,
        }));
    },
    handlePreviousStep(section, currentData) {
        if (get().isFirstStep) {
            return;
        }

        const index = get().currentStepIndex - 1;
        const prevSection = sectionsIndex[index];

        const sections_data = get().courseSectionData;
        set(() => ({
            currentStepIndex: index,
            currentSection: prevSection,
            courseSectionData: {
                ...sections_data,
                [section]: currentData,
            },
        }));
    },
    handleGetSectionData(section) {
        const data = get().courseSectionData;
        return data[section];
    },
    handleSetUpdateCourse(data) {
        const { course_data, course_info, course_options, id } = data;

        set(() => ({
            courseSectionData: {
                course_info,
                course_options,
                course_content: course_data,
                course_preview: null,
            },
            isUpdate: id,
        }));
    },
    handleClearForm() {
        set(() => ({
            currentStepIndex: 1,
            currentSection: "course_info",
            courseSectionData: {
                course_content: null,
                course_info: null,
                course_options: null,
                course_preview: null,
            },
        }));
    },
}));
