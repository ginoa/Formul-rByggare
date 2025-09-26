import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { emptyPropertyReplacer } from '../../helpers/emptyPropertyReplacer';
import { generateQuestionnaireForPreview } from '../../helpers/generateQuestionnaire';
import { getLanguagesInUse, INITIAL_LANGUAGE } from '../../helpers/LanguageHelper';
import { getResources } from '../../locales/referoResources';
import rootReducer from '@helsenorge/refero/reducers';
import { TreeState } from '../../store/treeStore/treeStore';

import { ReferoContainer } from '@helsenorge/refero/components';
import FormFillerSidebar from './FormFillerSidebar';
import Button from '@helsenorge/designsystem-react/components/Button';
import IconBtn from '../IconBtn/IconBtn';
import Select from '../Select/Select';

import { QuestionnaireResponse } from '@helsenorge/refero/types/fhir';
import InputField from '../InputField/inputField';

type Props = {
    showFormFiller: () => void;
    language?: string;
    state: TreeState;
};

const FormFillerPreview = ({ showFormFiller, language, state }: Props): JSX.Element => {
    const store: Store = createStore(rootReducer, applyMiddleware(thunk));
    const { t } = useTranslation();
    const languages = getLanguagesInUse(state);
    const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(
        language || state.qMetadata.language || INITIAL_LANGUAGE.code,
    );
    const [selectedGender, setSelectedGender] = useState<string>('');
    const [selectedAge, setSelectedAge] = useState<string>('');
    const [selectedPatient, setSelectedPatient] = useState<string>('');
    const [selectedDoctor, setSelectedDoctor] = useState<string>('');
    const questionnaireForPreview = JSON.parse(
        JSON.stringify(
            generateQuestionnaireForPreview(state, selectedLanguage, selectedGender, selectedAge),
            emptyPropertyReplacer,
        ),
    );
    const [questionnaireResponse, setQuestionnaireResponse] = useState<QuestionnaireResponse>();
    const [showResponse, setShowResponse] = useState<boolean>(false);
    const [referoKey, setReferoKey] = useState<string>('123');

    useEffect(() => {
        setReferoKey(Math.random().toString());
    }, [selectedLanguage, selectedGender, selectedAge, selectedPatient, selectedDoctor]);

    return (
        <Provider store={store}>
            <div className="overlay">
                <div className="preview-window">
                    <div className="title align-everything">
                        <IconBtn type="x" title={t('Close')} onClick={showFormFiller} />
                        <h1>{t('Preview')}</h1>
                        <div className="pull-right">
                            <InputField defaultValue={t('Kalle Karlsson')}/>

                            <InputField defaultValue={t('Läkare Olsson')}/>
                        </div>
                    </div>

                    <FormFillerSidebar questionnaire={questionnaireForPreview} />

                    <div className="referoContainer-div">
                        {!showResponse ? (
                            <div className="page_refero">
                                <ReferoContainer
                                    key={referoKey}
                                    store={store}
                                    questionnaire={questionnaireForPreview}
                                    onCancel={showFormFiller}
                                    onSave={(questionnaireResponse: QuestionnaireResponse) => {
                                        setQuestionnaireResponse(questionnaireResponse);
                                        setShowResponse(true);
                                    }}
                                    onPause={() => console.log('onPause')}
                                    onSubmit={() => console.log('onSubmit')}
                                    authorized={true}
                                    resources={getResources(language || '')}
                                    sticky={true}
                                    saveButtonDisabled={false}
                                    loginButton={<Button>Login</Button>}
                                    syncQuestionnaireResponse
                                    validateScriptInjection
                                />
                            </div>
                        ) : (
                            <div>
                                <p>{JSON.stringify(questionnaireResponse)}</p>
                                <Button onClick={() => setShowResponse(false)}>Tilbake til skjemautfyller</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Provider>
    );
};

export default FormFillerPreview;
