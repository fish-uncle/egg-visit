const html = {
  404: function (err, status) {
    return `<html>
            <head>
            <meta charset="UTF-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
            <meta name="renderer" content="webkit"/>
            <title>Not Found</title>
            </head>
            <body>
            <h2>Not Found, real status: ${status}</h2>
            <p>${err}</p>
            </body>
            </html>`
  },
  500: function (err, status) {
    return `<html>
            <head>
            <meta charset="UTF-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
            <meta name="renderer" content="webkit"/>
            <title>Internal Server Error</title>
            </head>
            <body>
            <h2>Internal Server Error, real status: ${status}</h2>
            <p>${err}</p>
            </body>
            </html>`
  }
};
module.exports = html;