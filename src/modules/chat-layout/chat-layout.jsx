import {block} from '@redneckz/react-bem-helper';
import styles from './chat-layout.scss';

export const ChatLayoutContainer = block('chat-layout-container', {styles})('div');
export const ChatLayoutModule = ChatLayoutContainer.element('module', ({md = '1'}) => ([`md-${md}`]))('div');
