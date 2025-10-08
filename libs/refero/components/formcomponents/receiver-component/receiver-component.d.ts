import * as React from 'react';
import { Coding } from '../../../types/fhir';
import { EnhetType, OrgenhetHierarki } from '../../../types/orgenhetHierarki';
import { Resources } from '../../../util/resources';
export interface ReceiverComponentProps {
    selected?: Array<string | undefined>;
    id?: string;
    resources?: Resources;
    label?: string;
    fetchReceivers?: (successCallback: (receivers: Array<OrgenhetHierarki>) => void, errorCallback: () => void) => void;
    handleChange: (code?: string, systemArg?: string, displayArg?: string) => void;
    clearCodingAnswer: (coding: Coding) => void;
}
interface ReceiverComponentState {
    selectedPath: Array<number>;
    selectedReceiver: string;
    isValid: boolean;
    isValidated: boolean;
    receiverTreeNodes: Array<OrgenhetHierarki>;
    isLoading: boolean;
    hasLoadError: boolean;
}
declare class ReceiverComponent extends React.Component<ReceiverComponentProps, ReceiverComponentState> {
    constructor(props: ReceiverComponentProps);
    componentDidMount(): void;
    loadSuccessCallback(receivers: Array<OrgenhetHierarki>): void;
    loadErrorCallback(): void;
    findPathToEndpointNode(nodes: Array<OrgenhetHierarki> | null, target: string, currentPath?: Array<number>, finalPaths?: Array<Array<number>>): Array<Array<number>>;
    onChangeDropdownValue(level: number, selectedNode: OrgenhetHierarki): void;
    findTreeNodeFromPath(searchData: Array<OrgenhetHierarki> | null, searchPath: Array<number>): OrgenhetHierarki | undefined;
    getReceiverName(searchData: Array<OrgenhetHierarki>, searchPath: Array<number>): string;
    getEndepunktVerdi(endepunktId: string | null | undefined): string;
    validateField(): Promise<void>;
    isValid(): boolean;
    getLabelText(enhetType: EnhetType): string | undefined;
    createSelect(treeNodes: Array<OrgenhetHierarki>, level: number, selectKey: string): JSX.Element;
    renderSelects(): JSX.Element;
    renderErrorMessage(): JSX.Element | null;
    render(): JSX.Element;
}
export default ReceiverComponent;
