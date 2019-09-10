var promise1 = new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve('probando aqui');
    }, 300);
  });
  
  promise1.then(function(value) {
    console.log(value);
    // expected output: "foo"
  });
  