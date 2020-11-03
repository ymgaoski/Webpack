import '../css/index.css';

function sum(...args){

 return args.reduce(function(f,next){
    return f + next;
  })
}

sum(1,2,3,4);