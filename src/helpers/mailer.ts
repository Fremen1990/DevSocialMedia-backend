import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import config from 'config'

const { OAuth2 } = google.auth
const oauth_link = 'https://developers.google.com/oauthplayground'

// old env package
// const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env

// new config package with types
const EMAIL = config.get<string>('email')
const MAILING_ID = config.get<string>('mailing_id')
const MAILING_REFRESH = config.get<string>('mailing_refresh')
const MAILING_SECRET = config.get<string>('mailing_secret')

// !!! YOU HAVE TO PASS IN ORDER: ID -> SECRET -> REFRESH !!!!
// @ts-ignore
const auth = new OAuth2(MAILING_ID, MAILING_SECRET, MAILING_REFRESH, oauth_link)

export const sendVerificationEmailHelper = (email, name, url) => {
    auth.setCredentials({
        refresh_token: MAILING_REFRESH,
    })
    const accessToken = auth.getAccessToken()
    const stmp = nodemailer.createTransport({
        // @ts-ignore
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
        // minified html email
        html: `<!doctype html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'><meta http-equiv='X-UA-Compatible' content='ie=edge'><title>Document</title></head><body><div style="max-width:700px;margin:0;padding:50px;display:flex;flex-direction:column;align-items:center;justify-content:center;background-color:black;color:white;text-align:center;"><img src='https://www.devthomas.pl/static/media/TS.471bb4f7.webp' alt=''><h2>Action required: Activate your DevSocialMedia account</h2><h2>Hello</h2><h3>You recently created an account on awesome DevSocialMedia application. To complete your registration, please confirm your account.</h3><a href=${url} style='text-align:center
width:300px;padding:10px 15px;background:darkgreen;color:white;text-decoration:none;font-weight:bold;'>Confirm your account</a><br><span style='padding-top:30px;margin:20px 50px 0 50px;'>DevSocialMedia allows you to stay in touch with all your developer friends, once registred on DevSocialMedia you can share photos, organize events and much more!!</span></div></body></html>`,
    }

    stmp.sendMail(mailOptions, (err, res) => {
        if (err) return err
        return res
    })
}

export const sendResetCode = (email, name, code) => {
    auth.setCredentials({
        refresh_token: MAILING_REFRESH,
    })
    const accessToken = auth.getAccessToken()
    const stmp = nodemailer.createTransport({
        // @ts-ignore
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

    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Reset DevSocialMedia password',
        // minified html email
        html: `<!doctype html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'><meta http-equiv='X-UA-Compatible' content='ie=edge'><title>Document</title></head><body><div style="max-width:700px;margin:0;padding:50px;display:flex;flex-direction:column;align-items:center;justify-content:center;background-color:black;color:white;text-align:center;"><img src='https://www.devthomas.pl/static/media/TS.471bb4f7.webp' alt=''><h2 style="color:white">Reset your password to DevSocialMedia account</h2><h3 style='color:white'>Below you can find reset code:</h3><div style='text-align:center
width:300px;padding:30px;background:darkgreen;color:white;text-decoration:none;font-size:35px;font-weight:bold;'>${code}</div><br><span style='padding-top:30px;margin:20px 50px 0 50px;'>DevSocialMedia allows you to stay in touch with all your developer friends, once registred on DevSocialMedia you can share photos, organize events and much more!!</span></div></body></html>`,
    }

    stmp.sendMail(mailOptions, (err, res) => {
        if (err) return err
        return res
    })
}
