//import { handleSubmit } from './js/formHandler';
const { handleSubmit } = require('./js/formHandler');

import './styles/resets.scss';
import './styles/base.scss';
import './styles/form.scss';
import './styles/footer.scss';
import './styles/header.scss';

window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    form.addEventListener('submit', handleSubmit);
})
  
export {
    handleSubmit,
};