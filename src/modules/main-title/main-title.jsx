import {block} from '@redneckz/react-bem-helper';
import styles from './main-title.scss';

export const MainTitle = block('main-title', {styles})('div');
export const MainTitleImportant = MainTitle.element('important')('div');
