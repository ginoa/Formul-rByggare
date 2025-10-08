import * as React from 'react';
import { QuestionnaireItem } from '../../types/fhir';
interface Props {
    item: QuestionnaireItem | undefined;
    callback: (isOpen: boolean) => void;
}
declare const HelpButton: React.SFC<Props>;
export default HelpButton;
