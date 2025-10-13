import { ContactDetail, Extension, Meta, Period, UsageContext } from './fhir';

export enum IQuestionnaireMetadataType {
    title = 'title',
    description = 'description',
    name = 'name',
    id = 'id',
    status = 'status',
    approvalDate = 'approvalDate',
    publisher = 'publisher',
    contact = 'contact',
    language = 'language',
    url = 'url',
    useContextCategory = 'useContext[category]',
    useContextLegislation = 'useContext[legislation]',
    useContextPurpose = 'useContext[purpose]',
    copyright = 'copyright',
    meta = 'meta',
    extension = 'extension',
    version = 'version',
    useContext = 'useContext',
    effectivePeriodStart = 'effectivePeriod.start',
    effectivePeriodEnd = 'effectivePeriod.end',
}

export interface IQuestionnaireMetadata {
    url?: string;
    id?: string;
    resourceType?: string;
    language?: string;
    name?: string;
    title?: string;
    description?: string;
    version?: string;
    status?: string;
    date?: string;
    publisher?: string;
    meta?: Meta;
    useContext?: Array<UsageContext>;
    contact?: Array<ContactDetail>;
    subjectType?: Array<string>;
    extension?: Array<Extension>;
    purpose?: string;
    copyright?: string;
    useContextCategory?: Array<UsageContext>;
    useContextLegislation?: Array<UsageContext>;
    effectivePeriod?: Period;
}

export enum IQuestionnaireStatus {
    active = 'active',
    draft = 'draft',
    retired = 'retired',
    //unknown = 'unknown',
}

export enum IUseContextCode {
    category = 'category',
    legislation = 'legislation',
    purpose = 'purpose',
}
