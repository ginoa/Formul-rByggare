import * as React from 'react';
import { Questionnaire, QuestionnaireItem, QuestionnaireResponseItemAnswer } from '../../../types/fhir';
import { Options } from '@helsenorge/form/components/radio-group';
import { Resources } from '../../../util/resources';
interface Props {
    options?: Array<Options>;
    item: QuestionnaireItem;
    questionnaire?: Questionnaire;
    id?: string;
    handleChange: (radioButton: string) => void;
    selected?: Array<string | undefined>;
    resources?: Resources;
    repeatButton: JSX.Element;
    renderDeleteButton: (className?: string) => JSX.Element | undefined;
    renderOpenField: () => JSX.Element | undefined;
    answer: Array<QuestionnaireResponseItemAnswer> | QuestionnaireResponseItemAnswer;
    renderHelpButton: () => JSX.Element;
    renderHelpElement: () => JSX.Element;
    onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string;
}
declare const CheckboxView: React.SFC<Props>;
export default CheckboxView;
