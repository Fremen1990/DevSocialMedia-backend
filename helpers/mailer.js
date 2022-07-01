const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const { OAuth2 } = google.auth
const oauth_link = 'https://developers.google.com/oauthplayground'
const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env

// !!! YOU HAVE TO PASS IN ORDER: ID -> SECRET -> REFRESH !!!!
const auth = new OAuth2(MAILING_ID, MAILING_SECRET, MAILING_REFRESH, oauth_link)

exports.sendVerificationEmail = (email, name, url) => {
    auth.setCredentials({
        refresh_token: MAILING_REFRESH,
    })
    const accessToken = auth.getAccessToken()
    const stmp = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: EMAIL,
            clientId: MAILING_ID,
            clientSecret: MAILING_SECRET,
            refreshToken: MAILING_REFRESH,
            accessToken,
        },
    })

    //     const minifiedHTML = `<!doctype html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'><meta http-equiv='X-UA-Compatible' content='ie=edge'><title>Document</title></head><body><div style="max-width:700px;margin:0;padding:50px;display:flex;flex-direction:column;align-items:center;justify-content:center;background-color:black;color:white;text-align:center;"><img src='https://www.devthomas.pl/static/media/TS.471bb4f7.webp' alt=''><h2>Action required: Activate your DevSocialMedia account</h2><h2>Hello</h2><h3>You recently created an account on awesome DevSocialMedia application. To complete your registration, please confirm your account.</h3><a href=${url} style='text-align:center
    // width:300px;padding:10px 15px;background:darkgreen;color:white;text-decoration:none;font-weight:bold;'>Confirm your account</a><br><span style='padding-top:30px;margin:20px 50px 0 50px;'>DevSocialMedia allows you to stay in touch with all your developer friends, once registred on DevSocialMedia you can share photos, organize events and much more!!</span></div></body></html>`

    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'DevSocialMedia email verification',
        html: `<!doctype html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'><meta http-equiv='X-UA-Compatible' content='ie=edge'><title>Document</title></head><body><div style="max-width:700px;margin:0;padding:50px;display:flex;flex-direction:column;align-items:center;justify-content:center;background-color:black;color:white;text-align:center;"><img src='https://www.devthomas.pl/static/media/TS.471bb4f7.webp' alt=''><h2>Action required: Activate your DevSocialMedia account</h2><h2>Hello</h2><h3>You recently created an account on awesome DevSocialMedia application. To complete your registration, please confirm your account.</h3><a href=${url} style='text-align:center
width:300px;padding:10px 15px;background:darkgreen;color:white;text-decoration:none;font-weight:bold;'>Confirm your account</a><br><span style='padding-top:30px;margin:20px 50px 0 50px;'>DevSocialMedia allows you to stay in touch with all your developer friends, once registred on DevSocialMedia you can share photos, organize events and much more!!</span></div></body></html>`,
    }

    stmp.sendMail(mailOptions, (err, res) => {
        if (err) return err
        return res
    })
}

//TODO DO AGAIN Google Clout OAuth2.0 access tokens and all setups and change ENV to new ones
