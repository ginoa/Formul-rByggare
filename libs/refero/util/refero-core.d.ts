import { QuestionnaireResponseItem, QuestionnaireResponseItemAnswer, QuestionnaireItem, QuestionnaireItemEnableWhen, QuestionnaireResponse } from '../types/fhir';
import { FormData, FormDefinition } from '../reducers/form';
export declare function getRootQuestionnaireResponseItemFromData(definitionLinkId: string, formData: FormData): Array<QuestionnaireResponseItem> | undefined;
export declare function isInGroupContext(path: Path[], item: QuestionnaireResponseItem, items: QuestionnaireResponseItem[]): boolean;
export declare function getQuestionnaireResponseItemWithLinkid(linkId: string, responseItem: QuestionnaireResponseItem, referencePath: Array<Path>): QuestionnaireResponseItem | undefined;
export declare function getQuestionnaireResponseItemsWithLinkId(linkId: string, responseItems: Array<QuestionnaireResponseItem>, recursive?: boolean): Array<QuestionnaireResponseItem>;
export declare function getArrayContainingResponseItemFromItems(linkId: string, items: Array<QuestionnaireResponseItem>): Array<QuestionnaireResponseItem> | undefined;
export declare function getAnswerFromResponseItem(responseItem: QuestionnaireResponseItem | undefined): QuestionnaireResponseItemAnswer[] | QuestionnaireResponseItemAnswer | undefined;
export declare function getResponseItems(formData: FormData | null): Array<QuestionnaireResponseItem> | undefined;
export declare function getDefinitionItems(formDefinition: FormDefinition | null): Array<QuestionnaireItem> | undefined;
export declare function getItemWithIdFromResponseItemArray(linkId: string, responseItems: Array<QuestionnaireResponseItem> | undefined): Array<QuestionnaireResponseItem> | undefined;
export declare function getItemsWithIdFromResponseItemArray(linkId: string, responseItems: Array<QuestionnaireResponseItem> | undefined, recurse?: boolean): Array<QuestionnaireResponseItem>;
export declare function getItemWithTypeFromArray(type: string, items: Array<QuestionnaireResponseItem> | undefined): Array<QuestionnaireResponseItem> | undefined;
export declare function hasAnswer(answer: QuestionnaireResponseItemAnswer): boolean;
export declare function hasBooleanAnswer(answer: QuestionnaireResponseItemAnswer): boolean;
export declare function hasCodingAnswer(answer: QuestionnaireResponseItemAnswer): boolean;
export declare function hasQuantityAnswer(answer: QuestionnaireResponseItemAnswer): boolean;
export declare function hasDateAnswer(answer: QuestionnaireResponseItemAnswer): boolean;
export declare function hasDateTimeAnswer(answer: QuestionnaireResponseItemAnswer): boolean;
export declare function hasTimeAnswer(answer: QuestionnaireResponseItemAnswer): boolean;
export declare function hasDecimalAnswer(answer: QuestionnaireResponseItemAnswer): boolean;
export declare function hasIntegerAnswer(answer: QuestionnaireResponseItemAnswer): boolean;
export declare function hasStringAnswer(answer: QuestionnaireResponseItemAnswer): boolean;
export declare function hasAttachmentAnswer(answer: QuestionnaireResponseItemAnswer): boolean;
export declare function enableWhenMatchesAnswer(enableWhen: QuestionnaireItemEnableWhen, answers: Array<QuestionnaireResponseItemAnswer> | undefined): boolean;
export interface Path {
    linkId: string;
    index?: number;
}
export declare function createIdSuffix(path: Array<Path> | undefined, index: number | undefined, repeats: boolean | undefined): string;
export declare function createPathForItem(path: Array<Path> | undefined, item: QuestionnaireItem, responseItem: QuestionnaireResponseItem, index: number | undefined): Array<Path>;
export declare function shouldRenderDeleteButton(item: QuestionnaireItem, index: number): boolean;
export declare function getResponseItemAndPathWithLinkId(linkId: string, item: QuestionnaireResponse | QuestionnaireResponseItem, currentPath?: Path[]): Array<ItemAndPath>;
export interface ItemAndPath {
    item: QuestionnaireResponseItem;
    path: Path[];
}
export declare function getResponseItemWithPath(path: Array<Path>, formData: FormData): QuestionnaireResponseItem | undefined;
export declare function getQuestionnaireDefinitionItem(linkId: string, definitionItems: QuestionnaireItem[] | undefined): QuestionnaireItem | undefined;
export declare function getQuestionnaireDefinitionItemWithLinkid(linkId: string, definitionItem: QuestionnaireItem | undefined, index?: number): QuestionnaireItem | undefined;
export declare function getQuestionnaireItemsWithType(type: string, items: Array<QuestionnaireItem> | undefined, itemsWithType?: Array<QuestionnaireItem>): Array<QuestionnaireItem> | undefined;
