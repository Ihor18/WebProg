function speakGoodBye() {
  let speakWord = "Good Bye";
  return function speak(name) {
    console.log(speakWord + " " + name);
  }
}
