import * as React from 'react';
import { Moment } from 'moment';
import { QuestionnaireItem, QuestionnaireResponseItemAnswer } from '../../../types/fhir';
import { Resources } from '../../../util/resources';
interface Props {
    id?: string;
    pdf?: boolean;
    item: QuestionnaireItem;
    resources?: Resources;
    label?: JSX.Element;
    subLabel?: JSX.Element;
    helpButton?: JSX.Element;
    helpElement?: JSX.Element;
    onDateValueChange: (newValue: string) => void;
    onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string;
    className?: string;
    maxDate?: Moment;
    minDate?: Moment;
    answer: QuestionnaireResponseItemAnswer;
}
export declare const DateYearInput: (props: React.PropsWithChildren<Props>) => JSX.Element;
export {};
