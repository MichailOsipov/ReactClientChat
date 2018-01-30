import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {InputField} from 'modules/field/input-field';
import {MESSAGE_FORM_NAME} from '../constants';

export const MessageForm = reduxForm({
    form: MESSAGE_FORM_NAME
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
