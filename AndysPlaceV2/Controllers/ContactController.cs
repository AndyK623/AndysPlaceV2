using AndysPlaceV2.Data;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using System;

namespace AndysPlaceV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        [HttpPost]
        [Route("SendEmail")]
        public bool SendEmail(ContactForm contactForm)
        {
            try
            {
                var mail = new MimeMessage();
                mail.Sender = MailboxAddress.Parse("andresbottazzi23@gmail.com");
                mail.To.Add(MailboxAddress.Parse("andresbottazzi23@gmail.com"));

                mail.Subject = "New message from the website!!";
                mail.From.Add(mail.Sender);

                var constructor = new BodyBuilder();

                constructor.TextBody = $"Name of the person: {contactForm.name}\n\nEmail to respond at: {contactForm.email}\n\nMessage:\n{contactForm.message}";

                mail.Body = constructor.ToMessageBody();

                using var smtp = new SmtpClient();
                smtp.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
                smtp.Authenticate("andresbottazzi23@gmail.com", "************");
                smtp.Send(mail);
                smtp.Disconnect(true);

                return true;

            }
            catch (Exception ex)
            {
                return false;
            }

        }



    }
}
