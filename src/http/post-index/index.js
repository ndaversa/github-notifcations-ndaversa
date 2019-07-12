const { IncomingWebhook } = require('@slack/webhook')
const webhook = new IncomingWebhook(process.env.WEBHOOK_URL)
const users = ["mackenzie-gray", "arvinsingla", "ddamico-ecobee", "nataliegirard", "heymiguel", "duthied", "ndaversa"]

exports.handler = async function http(request) {
  const { action, issue, repository, sender } = request.body

  const text = [
    `<${issue.html_url}|Issue ${action}: ${issue.title}>`,
    `for <${repository.html_url}|${repository.name}>`,
    `by <${sender.html_url}|${sender.login}>`
  ].join('\n')

  if (users.includes(sender.login)) {
    webhook.send({
      text: text
    })
  }

  return {
    status: 200,
    type: 'application/json',
    body: JSON.stringify({ ok: true }),
  }
}

