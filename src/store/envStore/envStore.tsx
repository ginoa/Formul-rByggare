import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface FormBuilderContextType {
    isShowFormBuilder: boolean;
    setIsShowFormBuilder: (value: boolean) => void;
}

// Create the context with a default value
const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

// Create the provider component
export const FormBuilderProvider = ({ children }: { children: ReactNode }) => {
    const [isShowFormBuilder, setIsShowFormBuilder] = useState(false);

    return (
        <FormBuilderContext.Provider value={{ isShowFormBuilder, setIsShowFormBuilder }}>
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
