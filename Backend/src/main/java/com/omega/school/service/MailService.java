package com.omega.school.service;

public interface MailService {
    void sendTemporaryPassword(String to, String temporaryPassword);
}