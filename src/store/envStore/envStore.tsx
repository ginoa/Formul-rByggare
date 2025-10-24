import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormBuilderContextType {
    isShowFormBuilder: boolean;
    setIsShowFormBuilder: (value: boolean) => void;
    hasShownFormBuilder: boolean;
}

// Create the context with a default value
const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

// Create the provider component
export const FormBuilderProvider = ({ children }: { children: ReactNode }) => {
    const [isShowFormBuilder, setIsShowFormBuilderState] = useState(false);
    const [hasShownFormBuilder, setHasShownFormBuilder] = useState(false);

    // Wrapped setter to update both states
    const setIsShowFormBuilder = (value: boolean) => {
        if (value) {
            setHasShownFormBuilder(true); // Once true, stays true
        }
        setIsShowFormBuilderState(value);
    };

    return (
        <FormBuilderContext.Provider value={{ isShowFormBuilder, setIsShowFormBuilder, hasShownFormBuilder }}>
            {children}
        </FormBuilderContext.Provider>
    );
};

// Custom hook to use the context
export const useFormBuilder = () => {
    const context = useContext(FormBuilderContext);
    if (!context) {
        throw new Error('useFormBuilder must be used within a FormBuilderProvider');
    }
    return context;
};
