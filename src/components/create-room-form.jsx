import React from 'react';
import {Field, reduxForm} from 'redux-form';

export const CreateRoomForm = reduxForm({
    form: 'createRoomForm'
})(({
    handleSubmit
}) => (
    <form onSubmit={handleSubmit}>
        <Field
            name="roomName"
            component="input"
            placeholder="Type your room name here"
        />
        <button type="submit">Создать</button>
    </form>
));
