import './css/index.css';

import {mul} from './mul';
console.log(mul(2,3),'mul');


import(/* webpackChunkName: 'sum' */'./sum').then(function({sum}){

  console.log(sum(2,3),'sum');
})