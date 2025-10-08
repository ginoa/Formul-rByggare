import * as React from 'react';
import moment, { Moment } from 'moment';
import { QuestionnaireItem, QuestionnaireResponseItemAnswer, QuestionnaireItemInitial } from '../../../types/fhir';
import { LanguageLocales } from '@helsenorge/core-utils/constants/languages';
import { DateRangePicker } from '@helsenorge/date-time/components/date-range-picker';
import { DatePickerErrorPhrases } from '@helsenorge/date-time/components/date-range-picker/date-range-picker-types';
import { Resources } from '../../../util/resources';
interface Props {
    id?: string;
    pdf?: boolean;
    item: QuestionnaireItem;
    resources?: Resources;
    locale: LanguageLocales.ENGLISH | LanguageLocales.NORWEGIAN;
    label?: JSX.Element;
    subLabel?: JSX.Element;
    datepickerRef: React.RefObject<DateRangePicker>;
    helpButton?: JSX.Element;
    helpElement?: JSX.Element;
    onDateValueChange: (newValue: string) => void;
    onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string;
    validationErrorRenderer?: JSX.Element;
    className?: string;
    maxDate?: Moment;
    minDate?: Moment;
    answer: QuestionnaireResponseItemAnswer;
}
export declare class DateDayInput extends React.Component<Props, {}> {
    getDatepickerErrorPhrases(): DatePickerErrorPhrases;
    getDateAnswerValue(answer: QuestionnaireResponseItemAnswer | QuestionnaireItemInitial): string | undefined;
    getValue(): Date[] | undefined;
    isValidDate: (date: Date) => boolean;
    toLocaleDate(moment: Moment | undefined): Moment | undefined;
    onDateChange: (value: Moment | null) => void;
    getPDFValue: () => string;
    getSingleDateValue: () => moment.Moment | undefined;
    render(): JSX.Element;
}
export {};
