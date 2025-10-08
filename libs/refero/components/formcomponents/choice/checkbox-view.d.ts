import * as React from 'react';
import { QuestionnaireItem, Questionnaire } from '../../../types/fhir';
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
    renderHelpButton: () => JSX.Element;
    renderHelpElement: () => JSX.Element;
    onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string;
}
declare const CheckboxView: React.SFC<Props>;
export default CheckboxView;
