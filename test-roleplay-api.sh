#!/bin/bash

# Test the roleplay-response function
echo "Testing roleplay-response function..."

# Test with a simple transcript
echo "Test 1: Basic greeting"
curl -X POST https://pvstwthufbertinmojuk.supabase.co/functions/v1/roleplay-response \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2c3R3dGh1ZmJlcnRpbm1vanVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwOTI2NDQsImV4cCI6MjA2MjY2ODY0NH0.PG7BJeWuYe-piU_JatbBfauK-I3d9sVh-2fJypAZHS8" \
  -d '{
    "transcript": "Good afternoon, officer. Here are my documents.",
    "context": {
      "currentExchangeIndex": 1,
      "conversationHistory": [
        {
          "speaker": "Officer",
          "text": "Good afternoon. License, registration, and insurance please."
        }
      ]
    }
  }' | jq .

echo -e "\n\nTest 2: Simple response"
curl -X POST https://pvstwthufbertinmojuk.supabase.co/functions/v1/roleplay-response \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2c3R3dGh1ZmJlcnRpbm1vanVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwOTI2NDQsImV4cCI6MjA2MjY2ODY0NH0.PG7BJeWuYe-piU_JatbBfauK-I3d9sVh-2fJypAZHS8" \
  -d '{"transcript": "Hello"}' | jq . 