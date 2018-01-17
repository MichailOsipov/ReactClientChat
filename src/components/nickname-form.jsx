import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {MainTitle} from 'modules/main-title';
import {InputField} from 'modules/field/input-field';

export const NicknameForm = reduxForm({
    form: 'nicknameForm'
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
