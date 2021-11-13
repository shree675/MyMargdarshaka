class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet = () => {
    const message = this.createChatBotMessage("Hello friend.");
    this.addMessageToState(message);
  };

  handleLearnOnline = () => {
    const message = this.createChatBotMessage(
      "Fantastic. Here is your quiz. Good luck!",
      {
        widget: "learnOnline",
      }
    );

    this.addMessageToState(message);
  };
  
  handleFeedback = () => {
    const message = this.createChatBotMessage(
      "Please go to the following url and type in your issues",
      {
        widget: "feedback",
      }
    );

    this.addMessageToState(message);
  };

  handleFAQ = () => {
    const message = this.createChatBotMessage(
      "Here are a few commonly asked questions",
      {
        widget: "faq",
      }
    );

    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
