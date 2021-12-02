import messages from "./messages";
import axios from "axios";
import fetch from "node-fetch";
// require("dotenv").config();
// import env from "react-dotenv";

async function query(data) {
  const res = await axios.get("/getToken");
  console.log("TOKEN", res);
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/blenderbot-1B-distill",
    {
      headers: {
        Authorization: `Bearer ${res.data}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  async parse(message) {
    // console.log(message);
    const lowercase = message.toLowerCase();
    const response = await query(lowercase);
    console.log(response);

    if (
      lowercase.includes("what is your name") ||
      lowercase.includes("who are you") ||
      lowercase.includes("your name")
    ) {
      this.actionProvider.handleSingleOption(
        "I am Lola! What's yours?",
        "options"
      );
    } else if (
      lowercase.includes("i love you") ||
      lowercase.includes("like you")
    ) {
      this.actionProvider.handleSingleOption(
        "I love me too! I'm Lola and I like forests! How can I help you? ",
        "options"
      );
    } else if (
      lowercase.includes("how are you") ||
      lowercase.includes("whats up") ||
      lowercase.includes("sup") ||
      lowercase.includes("wyd")
    ) {
      this.actionProvider.handleSingleOption(
        "I'm doing well, thank you! My name is Lola and my preferred pronouns are they/them. How can I help you today?",
        "options"
      );
    } else if (lowercase.includes("robot") || lowercase.includes("human")) {
      this.actionProvider.handleSingleOption(
        "Heyyy, I’m Lola, not a robot! I can help you with the following!",
        "options"
      );
    } else if (
      lowercase.includes("margdarshaka") ||
      lowercase.includes("how to")
    ) {
      this.actionProvider.handleSingleOption(
        "Hmmm...do you want help with using My Margdarshaka? Maybe try the following",
        "gettingStarted"
      );
    } else if (
      lowercase.includes("joke") ||
      lowercase.includes("laugh") ||
      lowercase.includes("funny") ||
      lowercase.includes("pun") ||
      lowercase.includes("fun")
    ) {
      fetch("https://sv443.net/jokeapi/v2/joke/Pun?safe-mode&type=single")
        .then((res) => res.json())
        .then((data) => {
          /* console.log(data.joke) */ this.actionProvider.handleSingleOption(
            "Here's something that might make you laugh. \n\n" + data.joke,
            "options"
          );
        });
    } else if (
      lowercase.includes("something") ||
      lowercase.includes("fact") ||
      lowercase.includes("anything") ||
      lowercase.includes("random") ||
      lowercase.includes("bored")
    ) {
      axios
        .get("http://numbersapi.com/random/trivia")
        .then((response) => {
          console.log(response.data);
          this.actionProvider.handleSingleOption(
            "Here's a fun fact for you! \n\n" + response.data,
            "options"
          );
        })
        .catch((error) => console.log(error));
    } else if (
      response.generated_text !== null ||
      response.generated_text !== "" ||
      response.generated_text !== undefined
    ) {
      this.actionProvider.handleSingleOption(
        response.generated_text,
        "options"
      );
      // console.log(response);
    } else {
      let i = Math.floor(Math.random()) % messages.default.length;
      let message = messages.default[i];
      //console.log(message)
      this.actionProvider.handleSingleOption(message, "options");
      //this.actionProvider.handleSingleOption("I'm sorry, I didn't quite understand that. Please choose on of the options I can help you with. ", "options");
    }
  }
}

export default MessageParser;
