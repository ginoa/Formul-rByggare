import { FormDefinition } from "../reducers/form";
import { QuestionnaireItem } from "../types/fhir";
export declare const getTopLevelElements: (formDefinition: FormDefinition) => QuestionnaireItem[] | undefined;
