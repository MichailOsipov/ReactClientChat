import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {MainTitle, MainTitleImportant} from 'modules/main-title';
import {InputField} from 'modules/field/input-field';
import {SubmitButton} from 'modules/submit-button';

export const NicknameForm = reduxForm({
    form: 'nicknameForm'
})(({
    nickname,
    handleSubmit
}) => (
    <form onSubmit={handleSubmit}>
        <MainTitle>
            People know you as:
            <MainTitleImportant>{nickname}</MainTitleImportant>
        </MainTitle>
        <Field
            name="nickname"
            component={InputField}
            placeholder="Type your nickname here"
        />
        <SubmitButton type="submit">Сохранить</SubmitButton>
    </form>
));
