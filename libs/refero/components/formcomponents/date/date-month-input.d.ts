import * as React from 'react';
import { Moment } from 'moment';
import { QuestionnaireItem, QuestionnaireResponseItemAnswer } from '../../../types/fhir';
import { LanguageLocales } from '@helsenorge/core-utils/constants/languages';
import { YearMonthResources, YearMonthValue } from '@helsenorge/date-time/components/year-month-input';
import { Resources } from '../../../util/resources';
interface Props {
    id?: string;
    pdf?: boolean;
    item: QuestionnaireItem;
    resources?: Resources;
    locale: LanguageLocales.ENGLISH | LanguageLocales.NORWEGIAN;
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
export declare class DateYearMonthInput extends React.Component<Props, {}> {
    getYearMonthInputResources(): YearMonthResources;
    onYearMonthChange: (newValue: YearMonthValue) => void;
    getDateValueFromAnswer: (answer: QuestionnaireResponseItemAnswer) => string | undefined;
    getValue: () => YearMonthValue | undefined;
    getMinMaxDate: (dateValue: Moment | undefined) => YearMonthValue | undefined;
    convertToPDFValue: (answer: QuestionnaireResponseItemAnswer) => string;
    getPDFValue: () => string;
    render(): JSX.Element;
}
export {};
