const nodemailer = require('nodemailer');

const { BadRequest } = require('../../errors/errors');
const { HTTP_CODE : { SUCCESS } } = require('../../constants/index');

const isEmpty = require('lodash/isEmpty');


module.exports =  async (req, res, next) => {
    const { userData, updateEntries } = req.body;

    try {
        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'squadhelpservice@gmail.com',
                pass: 'ServiceecivreS'
            }
        });

        const mailOptions = {
            from: 'squadhelpservice@gmail.com',
            to: userData,
            subject: 'About your entry ...',
            html:
                `<span>Your entry has been reviewed and he : </span><b>${updateEntries.isValid}</b>`
        };


        transporter.sendMail(mailOptions);
        return res.status(SUCCESS.ACCEPTED.CODE).send(`Entry ${updateEntries.isValid}`);


    }catch (e) {
        next(e)
    }
};