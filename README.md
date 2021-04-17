# Personal Finance app

## Table of Contents

- [Synopsis](#synopsis)
- [Installation](#installation)
- [License](#license)

## Synopsis

This web application was developed to help you to keep track of your expenses and bank transactions.

Below are some of the features in the app.

- It has graphics to visualise your annual, monthly incomes and outcomes.
- It has responsive design, which means you can use the app in any device of your choice.
- Ability to make custom search for your transactions and expenses.

## Installation

### Ionic Framework - React 
* [Download the installer](https://nodejs.org/) for Node LTS.
* Install the ionic CLI globally: `npm install -g ionic`
* Clone this repository: `git clone https://git@github.com:luisschneiders/react-mobile.git`.
* Run `npm install` from the project root.
* Install [firebase](#firebase).
* Install [capacitor](#capacitor) (if you want to emulate it on a mobile device).
* Run `ionic serve` in a terminal from the project root.

### Firebase ###
Firebase gives you the tools to develop high-quality apps. For more information about Firebase, please visit Google Firebase Documentation: `https://firebase.google.com/docs/`

* Install Firebase `npm install firebase --save`
* Install firebase types `npm install @types/firebase --save-dev`

Information about how to configure the firebase connection is also available at [Google Firebase Documentation](https://firebase.google.com/docs/)

#### Deploying ####
Firebase hosting provides many benefits for Progressive Web Apps, including fast response times thanks to CDNs, HTTPS enabled by default, and support for HTTP2 push. 
First, if not already available, [create the project](https://console.firebase.google.com/) in Firebase.

Next, in a Terminal, install the Firebase CLI:
* `npm install -g firebase-tools`

Then within the project run:
* `firebase init`

Then the CLI will prompt:
"**Which Firebase CLI features do you want to set up for this folder?**" Choose "**Hosting: Configure and deploy Firebase Hosting sites**."
"**Select a default Firebase project for this directory:**" Choose the project you created on the Firebase website.
"**What do you want to use as your public directory?**" Enter "**build**".
"**Configure as a single-page app (rewrite all urls to /index.html)?**" Enter "**Yes**".
"**File build/index.html already exists. Overwrite?**" Enter "**No**".

Next, build an optimized version of the app by running:
* `ionic build --prod`

and finally deploy the optimized build to Firebase:
* `firebase deploy --only hosting`

After the deployment has finished successfully, the app is live.

Information about how to configure the firebase deploy is available at [Progressive Web Apps in React](https://ionicframework.com/docs/react/pwa).

## License

Personal Finance app is open source software [licensed as ISC](https://github.com/luisschneiders/finance-react-client/blob/main/LICENSE).
