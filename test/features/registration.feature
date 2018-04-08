Feature: Registration

Scenario: User gets feedback after registering

  When I open "http://localhost:8080"
  And I enter "Markus" in the first name field
  And I click on the submit button
  Then I should see a success message
  # Then I should see a success message in the 1st alert section
  # Then I shouldn't see an error message

Scenario: User gets feedback after registering

  Given I have successfully registered
  Then I should see a success message

Scenario: User gets error message when submitting invalid registration

  When I open "http://localhost:8080"
  And I click on the submit button
  Then the text "Error!" should be visible
  # Then the text "Error!" should be visible in the 1st alert section
  # Then the text "Success!" should not be visible in the 1st alert section

Scenario: User gets error message when submitting invalid registration

  Given I have submitted invalid registration data
  Then the text "Error!" should be visible
  # Then the text "Error!" should be visible in the 1st alert section
  # Then the text "Success!" should not be visible in the 1st alert section
