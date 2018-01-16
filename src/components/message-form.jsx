import React from 'react';
import {Field, reduxForm} from 'redux-form';

export const MessageForm = reduxForm({
    form: 'message'
})(({
    handleSubmit
}) => (
    <form onSubmit={handleSubmit}>
        <Field
            name="message"
            component="input"
            placeholder="Type message here"
        />
        <button type="submit">Отправить</button>
    </form>
));
