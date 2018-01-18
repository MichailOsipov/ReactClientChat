import React from 'react';
import {block} from '@redneckz/react-bem-helper';
import styles from './middle-text.scss';

export const MiddleText = block('middle-text', ({highlight}) => ({highlight}), {styles})(({
    highlight,
    ...rest
}) => (
    <div {...rest} />
));
