function speakHello  () {
  let speakWord = "Hello";
  return function speak(name) {
    console.log(speakWord + " " + name);
}}
