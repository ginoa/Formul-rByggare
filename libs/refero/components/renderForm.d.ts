import { Resources } from '../util/resources';
import { ReferoProps } from '../types/referoProps';
interface RenderFormProps {
    isAuthorized: boolean;
    isStepView: boolean;
    referoProps: ReferoProps;
    resources: Resources;
    formItemsToBeRendered: Array<JSX.Element> | JSX.Element | undefined;
    onSave: () => void;
    onSubmit: () => void;
    displayNextButton?: boolean;
    displayPreviousButton?: boolean;
    nextStep?: () => void;
    previousStep?: () => void;
}
declare const RenderForm: ({ isAuthorized, isStepView, referoProps, resources, formItemsToBeRendered, onSave, onSubmit, displayNextButton, displayPreviousButton, nextStep, previousStep, }: RenderFormProps) => JSX.Element;
export default RenderForm;
