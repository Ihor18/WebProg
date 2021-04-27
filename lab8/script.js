(function () {
  let names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim", "Anna"];
  let sayGoodBye = speakGoodBye();
  let sayHello = speakHello();
  console.log("%c"+"Names started on J or j - goodBye, others - hello \n ","color:"+"red");
  names.forEach(name => {
    if (name.toLowerCase().charAt(0) === "j") {
      sayGoodBye(name)
    } else {
      sayHello(name)
    }
  });

  console.log("%c"+"\nNames length%5===0 - goodBye, others - hello \n ","color:"+"green");

  names.forEach(name => {
    if (name.length%5===0) {
      sayGoodBye(name)
    } else {
      sayHello(name)
    }
  });

}());



