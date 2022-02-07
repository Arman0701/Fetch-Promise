function FakeTimeout(func, time){
   const date = Date.now();
   while(true){
      if (date+time <= Date.now()){
         func();
         break;
      }
   }
}

function test(){
   console.log('success');
}

FakeTimeout(test, 1);