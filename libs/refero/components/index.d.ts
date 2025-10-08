import { ReferoProps } from '../types/referoProps';
import { DispatchProps } from '../types/dispatchProps';
import { FormDefinition, FormData } from '../reducers/form';
interface StateProps {
    formDefinition?: FormDefinition | null;
    formData?: FormData | null;
}
declare const ReferoContainer: import("react-redux").ComponentClass<import("react-redux").Omit<StateProps & DispatchProps & ReferoProps, keyof StateProps | keyof DispatchProps> & ReferoProps>;
export { ReferoContainer };
