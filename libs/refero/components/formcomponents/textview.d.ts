import * as React from 'react';
import { QuestionnaireItem } from '../../types/fhir';
interface Props {
    id?: string;
    item: QuestionnaireItem;
    value?: string | number;
    textClass?: string;
    onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string;
    helpButton?: JSX.Element;
    helpElement?: JSX.Element;
}
declare const textView: React.SFC<Props>;
export default textView;
