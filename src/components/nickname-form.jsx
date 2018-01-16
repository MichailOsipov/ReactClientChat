import React from 'react';
import {Field, reduxForm} from 'redux-form';

export const NicknameForm = reduxForm({
    form: 'nicknameForm'
})(({
    handleSubmit
}) => (
    <form onSubmit={handleSubmit}>
        <label>Nickname:</label><br />
        <Field
            name="nickname"
            component="input"
            placeholder="Type your nickname here"
        />
        <button type="submit">Сохранить</button>
    </form>
));
