import { Questionnaire, QuestionnaireItem } from '../../../types/fhir';
import { Resources } from '../../../util/resources';
export interface Props {
    id?: string;
    item?: QuestionnaireItem;
    questionnaire?: Questionnaire | null;
    enable?: boolean;
    pdf?: boolean;
    onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string;
    resources?: Resources;
}
declare const connectedComponent: import("react-redux").ComponentClass<import("react-redux").Omit<import("../../with-common-functions").Props, keyof import("../../with-common-functions").Props> & import("../../with-common-functions").Props>;
export default connectedComponent;
