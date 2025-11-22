package com.omega.school.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.omega.school.service.MailService;
import com.resend.Resend;
import com.resend.services.emails.model.SendEmailRequest;
import com.resend.services.emails.model.SendEmailResponse;

@Service
public class MailServiceImpl implements MailService {

    @Value("${resend.api.key}")
    private String apiKey;

    @Override
    public void sendTemporaryPassword(String to, String temporaryPassword) {
        // Initialise le client Resend
        Resend resend = new Resend(apiKey);

        String htmlContent = "<p>Bonjour,</p>" +
                "<p>Voici votre mot de passe temporaire pour votre première connexion : <b>" + temporaryPassword
                + "</b></p>" +
                "<p>Veuillez le changer après votre première connexion.</p>" +
                "<p>Cordialement,<br>L'équipe Alpha School</p>";

        // Construire la requête
        SendEmailRequest request = SendEmailRequest.builder()
                .from("onboarding@resend.dev")
                .to(to)
                .subject("Votre mot de passe temporaire")
                .html(htmlContent)
                .build();

        // Envoyer l'email
        SendEmailResponse response = resend.emails().send(request);

        System.out.println("Email envoyé avec l’ID : " + response.getId());
    }
}
