# Contributing to My Margdarshaka
Education has the power to change the world and with My Margdardhaka, we hope to make a mark on the path to Quality Education for Everyone! Thank you for taking the time to contribute to this endeavour!

The following is a set of guidelines for contributing to this project ([GitHub Repository](https://github.com/shree675/MyMargdarshaka)). These are mostly guidelines. Feel free to make the best of this repository and suggest changes to this document as well, in a pull request.

## What should I know before I get started?
The central idea of the project is to cater to Indian School dropouts. Hence, all improvements should revolve around the idea of improving the system for this target audience: making sure it is safe, easy to use and effective. 

The project currently consists of the main functionality which matches learners and mentors based on compatibility with respect to criteria such as:
1. Preferred Language of Instruction
2. Preferred Time slot
3. Class and subjects interested in teaching or learning

### Getting the API keys
A few API keys are required for the project to work. The steps to get each of them are as follows:

1. REACT_APP_FIREBASE_API_KEY: This is the API key for the Firebase Authentication system. Go to [Firebase](https://console.firebase.google.com) and create a new project. You will find the API Key named as Web API key in the project settings.
2. SERVICE_ACCOUTN_CRED: Follow [this](https://cloud.google.com/docs/authentication/#create_service_account) link to create a service account. Store the details obtained using base64 encoding in the environment variable.
3. REACT_APP_HUGGINGFACE_TOKEN: Create an account on [HuggingFace](https://huggingface.co/). You can create an API key using [this](https://huggingface.co/settings/token) link 


### Overall Project structure
This is a Full MERN stack web appplication. The backend contains Mongoose Schemas for the MongoDB database in the [models](backend/models) folder and routers in the [routes](backend/routes) folder. 
The [server.js](server.js) connects the MongoDB Database. 
- NOTE: The connection strings and API keys are provided in a separate config.env file which is not included in the repository. Kindly reach out to the project owners for details.

The frontend is a React Project with all UI pages created keeping modularity in mind, grouped into respective folders within the [components](client/src/components) folder. You should be able to find your way to any particular UI page or component you may be looking for from the descriptive titles given to each component. 

Naming conventions to keep in mind: To reduce conflicts and difficult to debug issues due to css classnames, a strict convention of prefixing every css classname with the a part of the parent component name must be maintained. 

## How can I contribute?
### Report Bugs
To submit a good bug report
1. Use a clear and descriptive title for the issue.
2. Provide a step-by-step description of how to reproduce the bug with complete details of any possible influencing factors such as the platform you are running it on, the input and so on.
3. Explain how it could create future problems and why it should be addressed.

### Suggest Enhancements
1. Specify as precisely as possible which module or submodule your suggestion pertains to.
2. Give a detailed explanation with examples on how and why it would improve the current version.
3. Provide well commented code with clear explanation on how it would integrate with the repository without negatively impacting any other components.

