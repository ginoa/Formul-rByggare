import { Resources } from '../util/resources';
import { FormDefinition } from '../reducers/form';
import { ReferoProps } from '../types/referoProps';
interface StepViewProps {
    isAuthorized: boolean;
    referoProps: ReferoProps;
    resources: Resources;
    formItems: Array<JSX.Element> | undefined;
    formDefinition: FormDefinition;
    onSave: () => void;
    onSubmit: () => void;
    onStepChange?: (stepIndex: number) => void;
}
declare const StepView: ({ isAuthorized, referoProps, resources, formItems, formDefinition, onSave, onSubmit, onStepChange }: StepViewProps) => JSX.Element;
export default StepView;
