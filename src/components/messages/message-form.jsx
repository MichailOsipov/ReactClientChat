import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {InputField} from 'modules/field/input-field';

export const MessageForm = reduxForm({
    form: 'messageForm'
})(({
    handleSubmit
}) => (
    <form onSubmit={handleSubmit}>
        <Field
            name="message"
            component={InputField}
            placeholder="Type a message here"
            autoComplete="off"
        />
    </form>
));
