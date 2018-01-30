import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {MainTitle} from 'modules/main-title';
import {InputField} from 'modules/field/input-field';
import {NICKNAME_FORM_NAME} from './constants';

export const NicknameForm = reduxForm({
    form: NICKNAME_FORM_NAME
})(({
    handleSubmit
}) => (
    <form onSubmit={handleSubmit}>
        <MainTitle>
            People know you as:
        </MainTitle>
        <Field
            name="nickname"
            component={InputField}
            placeholder="Type your nickname here"
        />
    </form>
));
