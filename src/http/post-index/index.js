const {
  IncomingWebhook
} = require('@slack/webhook')
const webhook = new IncomingWebhook(process.env.WEBHOOK_URL)
const webhookAll = new IncomingWebhook(process.env.WEBHOOK_URL_ALL)
const users = ["mackenzie-gray", "arvinsingla", "ddamico-ecobee", "nataliegirard", "heymiguel", "duthied", "ndaversa"]

exports.handler = async function http(request) {
  const {
    action,
    pull_request,
    repository,
    sender
  } = request.body

  const text = `
    Pull Request <${pull_request.html_url}| #${pull_request.number}> ${action} by <${sender.html_url}|${sender.login}> for <${repository.html_url}|${repository.name}>
    *${pull_request.title}*
  `

  if (users.includes(sender.login)) {
    webhook.send({
      text: text
    })
  }
  else {
    webhookAll.send({
      text: text
    })
  }

  return {
    status: 200,
    type: 'application/json',
    body: JSON.stringify({
      ok: true
    }),
  }
}

