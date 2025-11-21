package com.omega.school.service.impl;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.omega.school.service.MailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendTemporaryPassword(String to, String temporaryPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Votre mot de passe temporaire");
        message.setText("Bonjour,\n\n" +
                "Voici votre mot de passe temporaire pour votre première connexion : " + temporaryPassword + "\n" +
                "Veuillez le changer après votre première connexion.\n\n" +
                "Cordialement,\nL'équipe Omega School");
        mailSender.send(message);
    }
}