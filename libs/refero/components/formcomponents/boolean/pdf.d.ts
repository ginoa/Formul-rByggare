import * as React from 'react';
import { QuestionnaireItem } from '../../../types/fhir';
interface Props {
    item: QuestionnaireItem;
    checked: boolean;
    onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string;
}
declare const pdf: React.SFC<Props>;
export default pdf;
