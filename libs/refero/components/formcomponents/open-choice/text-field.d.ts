import * as React from 'react';
import { Questionnaire, QuestionnaireItem, QuestionnaireResponseItemAnswer } from '../../../types/fhir';
import { ValidationProps } from '@helsenorge/form/components/form/validation';
import { Resources } from '../../../util/resources';
interface Props {
    id?: string;
    pdf?: boolean;
    item: QuestionnaireItem;
    questionnaire?: Questionnaire;
    answer: QuestionnaireResponseItemAnswer;
    handleStringChange: (event: React.FormEvent<{}>) => void;
    onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string;
    resources?: Resources;
}
declare const textField: React.SFC<Props & ValidationProps>;
export default textField;
