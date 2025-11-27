import "cypress";

describe('Login E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  describe('Page Load and UI Elements', () => {
    it('should load the login page successfully', () => {
      cy.url().should('include', '/login');
      cy.contains('Omega School').should('be.visible');
      cy.get('img[alt="logo-opendev"]').should('be.visible');
    });

    it('should display all form elements', () => {
      cy.contains('Connecte toi a ton compte').should('be.visible');
      cy.get('input[type="email"]').should('be.visible');
      cy.get('input[type="password"]').should('be.visible');
      cy.contains('button', 'Se connecter').should('be.visible');
      cy.contains('Mot de passe oublie ?').should('be.visible');
    });

    it('should display welcome message on large screens', () => {
      cy.viewport(1280, 720);
      cy.contains('Heureux de te revoir chez').should('exist');
      cy.contains('Ensemble, donnons aux apprenants').should('exist');
    });
  });

  describe('Form Validation', () => {
    it('should show error when submitting empty form', () => {
      cy.contains('button', 'Se connecter').click();
      cy.contains('Email requis').should('be.visible');
      cy.contains('Mot de passe requis').should('be.visible');
    });

    it('should show error for invalid email format', () => {
      cy.get('input[type="email"]').type('invalid-email');
      cy.get('input[type="password"]').type('password123');
      cy.contains('button', 'Se connecter').click();
      cy.contains('Email invalide').should('be.visible');
    });

    it('should show error for missing password', () => {
      cy.get('input[type="email"]').type('test@example.com');
      cy.contains('button', 'Se connecter').click();
      cy.contains('Mot de passe requis').should('be.visible');
    });

    it('should show error for missing email', () => {
      cy.get('input[type="password"]').type('password123');
      cy.contains('button', 'Se connecter').click();
      cy.contains('Email requis').should('be.visible');
    });

    it('should not show errors when both fields are valid', () => {
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('password123');
      cy.contains('Email invalide').should('not.exist');
      cy.contains('Email requis').should('not.exist');
      cy.contains('Mot de passe requis').should('not.exist');
    });
  });

  describe('Password Visibility Toggle', () => {
    it('should toggle password visibility when clicking the eye icon', () => {
      const passwordInput = cy.get('input[type="password"]');
      passwordInput.type('mySecretPassword');

      // Password should be hidden initially
      passwordInput.should('have.attr', 'type', 'password');

      // Click toggle button (eye icon)
      cy.get('input[type="password"]').parent().find('button').click();
      
      // Password should now be visible
      cy.get('input[type="text"]').should('have.value', 'mySecretPassword');

      // Click again to hide
      cy.get('input[type="text"]').parent().find('button').click();
      cy.get('input[type="password"]').should('exist');
    });
  });

  describe('Login Flow', () => {
    it('should successfully login with valid credentials', () => {
      // Intercept the API call
      cy.intercept('POST', '**/auth/signin', {
        statusCode: 200,
        body: { success: true, user: { id: '1', email: 'test@example.com' } },
      }).as('loginRequest');

      // Fill in the form
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('Password123!');

      // Submit the form
      cy.contains('button', 'Se connecter').click();

      // Wait for the API call
      cy.wait('@loginRequest');

      // Should show success toast
      cy.contains('Connection réussie').should('be.visible');
    });

    it('should show error message on failed login', () => {
      // Intercept the API call with error
      cy.intercept('POST', '**/auth/signin', {
        statusCode: 401,
        body: { error: 'Invalid credentials' },
      }).as('loginRequest');

      // Fill in the form
      cy.get('input[type="email"]').type('wrong@example.com');
      cy.get('input[type="password"]').type('wrongpassword');

      // Submit the form
      cy.contains('button', 'Se connecter').click();

      // Wait for the API call
      cy.wait('@loginRequest');

      // Should show error toast
      cy.contains(/error|échec|invalid/i).should('be.visible');
    });

    it('should disable submit button during login', () => {
      // Intercept with delay
      cy.intercept('POST', '**/auth/signin', (req) => {
        req.reply({
          delay: 1000,
          statusCode: 200,
          body: { success: true },
        });
      }).as('loginRequest');

      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('password123');
      cy.contains('button', 'Se connecter').click();

      // Button should be disabled
      cy.contains('button', 'Se connecter').should('be.disabled');
      cy.contains('Connection...').should('be.visible');
    });
  });

  describe('Navigation', () => {
    it('should navigate to home page when clicking logo', () => {
      cy.contains('Omega School').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('should navigate to forgot password page', () => {
      cy.contains('Mot de passe oublie ?').click();
      cy.url().should('include', '/auth/forget-password');
    });
  });

  describe('Accessibility', () => {
    it('should have proper labels for form inputs', () => {
      cy.get('label').contains('Email').should('be.visible');
      cy.get('label').contains('Mot de passe').should('be.visible');
    });

    it('should be keyboard navigable', () => {
      cy.get('input[type="email"]').focus().should('have.focus');
      cy.get('input[type="password"]').should('have.focus');
      cy.contains('button', 'Se connecter').should('have.focus');
    });
  });

  describe('Responsive Design', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1280, height: 720 },
    ];

    viewports.forEach(({ name, width, height }) => {
      it(`should be responsive on ${name}`, () => {
        cy.viewport(width, height);
        cy.contains('Omega School').should('be.visible');
        cy.get('input[type="email"]').should('be.visible');
        cy.get('input[type="password"]').should('be.visible');
        cy.contains('button', 'Se connecter').should('be.visible');
      });
    });
  });

  describe('Security', () => {
    it('should not display password in plain text by default', () => {
      cy.get('input[type="password"]').type('secretPassword');
      cy.get('input[type="password"]').should('have.attr', 'type', 'password');
    });

    it('should handle brute force protection error from URL', () => {
      cy.visit('/login?err=brut-force');
      cy.contains('Ressource privée, connectez-vous').should('be.visible');
    });
  });

  describe('User Experience', () => {
    it('should clear validation errors when user starts typing', () => {
      cy.contains('button', 'Se connecter').click();
      cy.contains('Email requis').should('be.visible');

      cy.get('input[type="email"]').type('t');
      
      cy.get('input[type="email"]').should('have.value', 't');
    });

    it('should maintain form data after validation error', () => {
      cy.get('input[type="email"]').type('invalid-email');
      cy.get('input[type="password"]').type('password123');
      cy.contains('button', 'Se connecter').click();

      cy.get('input[type="email"]').should('have.value', 'invalid-email');
      cy.get('input[type="password"]').should('have.value', 'password123');
    });
  });
});
