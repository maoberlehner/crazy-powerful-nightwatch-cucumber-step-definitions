Feature: Homepage

Scenario: Show latest articles

  When I open "http://localhost:8080"
  Then there should be 3 elements in the article list section
  # Then there should be 3 elements in the article list section in the article section
  # Then there should be 3 article preview elements in the article list section
