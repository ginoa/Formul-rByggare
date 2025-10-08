import { QuestionnaireItem, Questionnaire } from '../../types/fhir';
import { Resources } from '../../util/resources';
interface Props {
    item: QuestionnaireItem;
    questionnaire?: Questionnaire;
    onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string;
    resources?: Resources;
}
declare const Label: ({ item, onRenderMarkdown, questionnaire, resources }: Props) => JSX.Element | null;
export default Label;
