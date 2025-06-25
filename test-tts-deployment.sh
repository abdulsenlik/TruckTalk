#!/bin/bash

echo "🧪 Testing Supabase TTS Function Deployment"
echo "=========================================="

BASE_URL="https://pvstwthufbertinmojuk.supabase.co/functions/v1/text-to-speech"
ORIGIN="https://thetrucktalk.com"

echo ""
echo "1. Testing CORS Preflight (OPTIONS request)..."
echo "---------------------------------------------"
curl -X OPTIONS "$BASE_URL" \
  -H "Origin: $ORIGIN" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type" \
  -v 2>&1 | grep -E "(< HTTP|Access-Control|Vary)" || echo "No CORS headers found"

echo ""
echo "2. Testing Audio Generation (POST request)..."
echo "--------------------------------------------"
curl -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -H "Origin: $ORIGIN" \
  -d '{"text":"Hello, this is a test of the truck talk audio system."}' \
  -v 2>&1 | grep -E "(< HTTP|Content-Type|Access-Control)" || echo "No response headers found"

echo ""
echo "3. Testing Error Handling (missing text)..."
echo "------------------------------------------"
curl -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -H "Origin: $ORIGIN" \
  -d '{}' \
  -v 2>&1 | grep -E "(< HTTP|Content-Type)" || echo "No error response found"

echo ""
echo "✅ Test completed! Check the output above for:"
echo "   - HTTP 200 responses"
echo "   - Proper CORS headers"
echo "   - Audio/mpeg content type for successful requests"
echo "   - JSON error responses for invalid requests" 