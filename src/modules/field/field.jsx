import React from 'react';

export const field = InputComponent => ({input, ...props}) => (
    <InputComponent {...input} {...props} />
);
