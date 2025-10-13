import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FrontPage from '../views/FrontPage';
import { TreeContextProvider } from '../store/treeStore/treeStore';
import { FormBuilderProvider } from '../store/envStore/envStore';

export default function Routes(): JSX.Element {
    return (
        <Switch>
            <Route path="/" exact>
                <TreeContextProvider>
                    <FormBuilderProvider>
                        <FrontPage />
                    </FormBuilderProvider>
                </TreeContextProvider>
            </Route>
        </Switch>
    );
}
