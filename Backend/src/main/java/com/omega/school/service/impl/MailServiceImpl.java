package com.omega.school.service.impl;

import com.omega.school.service.MailService;
import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService {

    private final SendGrid sendGrid;

    @Value("${app.mail.from}")
    private String sender;

    public MailServiceImpl(SendGrid sendGrid) {
        this.sendGrid = sendGrid;
    }

    @Override
    public void sendTemporaryPassword(String to, String tempPassword) {
        Email fromEmail = new Email(sender);
        Email toEmail = new Email(to);
        String subject = "Votre mot de passe temporaire – Omega School";

        String message = "Bonjour,\n\nVoici votre mot de passe temporaire : "
                + tempPassword +
                "\n\nVeuillez le changer à votre première connexion. \n\nCordialement,\nL'équipe Omega School";

        Content content = new Content("text/plain", message);
        Mail mail = new Mail(fromEmail, subject, toEmail, content);

        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            Response response = sendGrid.api(request);
            System.out.println("SendGrid status : " + response.getStatusCode());
            System.out.println("SendGrid body : " + response.getBody());

        } catch (Exception e) {
            System.err.println("Erreur lors de l’envoi d’email SendGrid : " + e.getMessage());
        }
    }
}
