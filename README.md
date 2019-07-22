# Getting Started Guide

This project makes use of [arc.codes](https://arc.codes/quickstart).
Follow along with the quickstart guide to get setup on AWS and return
here when complete.

Checklist of things needed upon return:
- [ ] ~/.aws/credentials setup
- [ ] `npx` command available

## Create a Slack destination for your Github Activity to be delivered to
1. Create a channel either private or public on your Slack
2. Add the top of the channel there should be a `Add an app` button,
   click that
3. Click `View App Directory`
4. Search for `Incoming Webhooks`
5. Create an new Incoming Webhook for the channel you just created
6. Copy the URL, we will call this the <SLACKURL> from now on

## Steps to get this code up and running on Lambda
1. `npm install` in the root of this repo
2. `npm install` in `src/http/post-index/`
3. `npx env production WEBHOOK_URL_ALL <SLACKURL>`
Note: you should be putting the actual URL for the command above
4. There are also ENV's for <WEB_USERS> and <USERS> which are comma
   separated list of usernames that will send notifications to channels
   <WEBHOOK_URL_WEB> and <WEBHOOK_URL> respectively
5. `npx deploy production`

At this point you should have the main function running up on AWS
Lambda, you should be able to login to AWS console and see the code
there. When you run `npx deploy production` you should see the URL where
the function is available at, you'll use this later to configure the
webhook destination. <LAMBDAURL>

## Register your Github Webhook
1. Navigate to github.com at either an organization level or repo level
2. Navigate to settings
3. Point the webhook to your <LAMBDAURL>
4. Select which events you want to receive, this script is designed to
   handle only the `Pull Request` type, however you could easily adapt for more

At this point you should have code up and running on Lambda that is
receiving traffic from Github via the Webhook you just created. When
something matches the criteria (eg. the user performing the action is in
your `users` array and the action is in the `actions` array) it will
post a message to Slack via your Incoming Webhook URL that you also
setup
