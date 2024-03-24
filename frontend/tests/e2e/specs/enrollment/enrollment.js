describe('Enrollment', () => {
    beforeEach(() => {
        cy.deleteAllButArs();
        cy.createEnrollmentsDemoEntities();
    });

    afterEach(() => {
        cy.deleteAllButArs();
    });

    it('create enrollment', () => {

        const MOTIVATION = 'MOTIVATION';
        const NUMBER = '0';

        cy.intercept('GET', '/users/*/getInstitution').as('getInstitution');
        cy.intercept('GET', '/activities').as('getActivities');
        cy.intercept('POST', '/activities/*/enrollments').as('createEnrollment');    

        cy.demoMemberLogin()

        // Get the activities
        cy.get('[data-cy="institution"]').click();
        cy.get('[data-cy="activities"]').click();
        cy.wait('@getInstitution');

        // Check if there are 3 activities
        cy.get('[data-cy="memberActivitiesTable"] tbody tr').should('have.length', 3);

        // Check if the first activity has 0 enrollments
        cy.get('[data-cy="memberActivitiesTable"] tbody tr')
            .should('have.length', 3)
            .eq(0)
            .children()
            .eq(4)
            .should('contain', NUMBER)

        // Login as volunteer
        cy.logout();
        cy.demoVolunteerLogin();
        
        // Go to volunteer activities view
        cy.get('[data-cy="volunteerActivities"]').click();
        cy.wait('@getActivities');

        
        // Create enrollment
        cy.get('[data-cy="volunteerActivitiesTable"]').within(() => {
            cy.get('[data-cy="newEnrollment"]').first().click();
        });

        // Fill the form
        cy.get('[data-cy="motivationInput"]').type(MOTIVATION);
        cy.get('[data-cy="saveEnrollment"]').click()
        cy.wait('@createEnrollment')
        
        cy.logout();


        //Login as member
        cy.demoMemberLogin();
        cy.intercept('GET', '/activities/*/enrollments').as('showEnrollments');
        //Get the activities
        cy.get('[data-cy="institution"]').click();
        cy.get('[data-cy="activities"]').click();
        cy.wait('@getInstitution');
        //Get the enrollments for the first activity
        cy.get('[data-cy="memberActivitiesTable"] tbody tr').first().within(() => {
            cy.get('[data-cy="showEnrollments"]').click();
        })
        cy.wait('@showEnrollments');
        //Check if the first activity has one enrollment
        cy.get('[data-cy="activityEnrollmentsTable"] tbody tr').should('have.length', 1);
        //Check if the enrollment has motivation
        cy.get('[data-cy="activityEnrollmentsTable"] tbody tr').first().should('contain', MOTIVATION);
        cy.logout();

    });
});