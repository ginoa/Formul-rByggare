import * as React from 'react';
import { Questionnaire, QuestionnaireItem, QuestionnaireResponseItemAnswer } from '../../../types/fhir';
import { Options } from '@helsenorge/form/components/radio-group';
import { Resources } from '../../../util/resources';
interface Props {
    options?: Array<Options>;
    item: QuestionnaireItem;
    questionnaire?: Questionnaire;
    id?: string;
    handleChange: (code: string) => void;
    selected?: Array<string | undefined>;
    validateInput: (value: string) => boolean;
    resources?: Resources;
    renderDeleteButton: (className?: string) => JSX.Element | undefined;
    repeatButton: JSX.Element;
    oneToTwoColumn?: boolean;
    renderOpenField: () => JSX.Element | undefined;
    answer: Array<QuestionnaireResponseItemAnswer> | QuestionnaireResponseItemAnswer;
    children?: JSX.Element;
    renderHelpButton: () => JSX.Element;
    renderHelpElement: () => JSX.Element;
    onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string;
}
declare const _default: React.ForwardRefExoticComponent<Props & React.RefAttributes<React.Component<{}, {}, any>>>;
export default _default;
