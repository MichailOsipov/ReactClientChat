import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {InputField} from 'modules/field/input-field';

export const CreateRoomForm = reduxForm({
    form: 'createRoomForm'
})(({
    handleSubmit
}) => (
    <form onSubmit={handleSubmit}>
        <Field
            name="roomName"
            component={InputField}
            placeholder="Type your new room name"
            autoComplete="off"
        />
    </form>
));
