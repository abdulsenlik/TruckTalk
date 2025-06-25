#!/bin/bash

# Health check script for Supabase Edge Functions
# Tests both text-to-speech and roleplay-response functions

ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2c3R3dGh1ZmJlcnRpbm1vanVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwOTI2NDQsImV4cCI6MjA2MjY2ODY0NH0.PG7BJeWuYe-piU_JatbBfauK-I3d9sVh-2fJypAZHS8"
BASE_URL="https://pvstwthufbertinmojuk.supabase.co/functions/v1"

echo "🔍 Testing Supabase Edge Functions Health..."
echo "Timestamp: $(date)"
echo "----------------------------------------"

# Test text-to-speech function
echo "📢 Testing text-to-speech function..."
TTS_RESPONSE=$(curl -s -w "%{http_code}" -X POST "$BASE_URL/text-to-speech" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ANON_KEY" \
  -d '{"text":"Health check"}' \
  --max-time 10)

TTS_STATUS="${TTS_RESPONSE: -3}"
if [ "$TTS_STATUS" = "200" ]; then
  echo "✅ text-to-speech: HEALTHY (HTTP 200)"
else
  echo "❌ text-to-speech: UNHEALTHY (HTTP $TTS_STATUS)"
fi

# Test roleplay-response function
echo "🎭 Testing roleplay-response function..."
ROLEPLAY_RESPONSE=$(curl -s -w "%{http_code}" -X POST "$BASE_URL/roleplay-response" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ANON_KEY" \
  -d '{"transcript":"Health check"}' \
  --max-time 15)

ROLEPLAY_STATUS="${ROLEPLAY_RESPONSE: -3}"
if [ "$ROLEPLAY_STATUS" = "200" ]; then
  echo "✅ roleplay-response: HEALTHY (HTTP 200)"
else
  echo "❌ roleplay-response: UNHEALTHY (HTTP $ROLEPLAY_STATUS)"
fi

# Summary
echo "----------------------------------------"
if [ "$TTS_STATUS" = "200" ] && [ "$ROLEPLAY_STATUS" = "200" ]; then
  echo "🎉 ALL FUNCTIONS HEALTHY - Audio should work on thetrucktalk.com"
  exit 0
else
  echo "⚠️  Some functions are unhealthy - Audio may not work properly"
  echo "💡 This is likely a temporary Supabase platform issue"
  echo "🔄 The frontend will automatically retry failed requests"
  exit 1
fi 