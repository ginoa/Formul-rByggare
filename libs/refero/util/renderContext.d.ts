import { QuestionnaireItem } from '../types/fhir';
import { RenderContextType } from '../constants/renderContextType';
export declare class RenderContext {
    RenderContextType: RenderContextType;
    Columns: string[];
    Owner: string;
    RenderChildren?: (children: QuestionnaireItem[], renderItem: (item: QuestionnaireItem, renderContext: RenderContext) => Array<JSX.Element | undefined>) => JSX.Element[];
    constructor(renderContextType?: RenderContextType, owner?: string, columns?: string[]);
}
