# TTS Deployment Summary

## Current Status
✅ **Deployed and Fixed** - The text-to-speech function is deployed and working correctly

## Recent Updates
- Fixed CORS configuration to allow all origins (using `*` instead of dynamic origin)
- Function successfully redeployed to fix "Origin not allowed" errors
- Matches the CORS configuration used by the working roleplay-response function
- Fixed audioService.ts to use correct Authorization header format
- Fixed missing environment variables by using hardcoded values

## Function Details

### URL
```
https://pvstwthufbertinmojuk.supabase.co/functions/v1/text-to-speech
```

### Required Headers
- `Content-Type: application/json`
- `Authorization: Bearer YOUR_ANON_KEY`

### Request Format
```json
{
  "text": "Text to convert to speech",
  "voice": "en-US-Neural2-F",  // optional
  "language": "en-US",          // optional
  "speed": 1.0                  // optional
}
```

### Response
- Returns binary audio data (audio/mpeg)
- Content-Type: audio/mpeg
- Can be directly played by audio elements

## Test Command
```bash
curl -X POST https://pvstwthufbertinmojuk.supabase.co/functions/v1/text-to-speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"text":"Hello world"}' \
  --output test.mp3
```

## Troubleshooting

### CORS Errors
If you see "Origin not allowed by Access-Control-Allow-Origin" errors:
1. The function now uses `"Access-Control-Allow-Origin": "*"` to allow all origins
2. This was updated from a dynamic origin configuration that was causing issues
3. The function has been redeployed with this fix

### 504 Gateway Timeout
If you see 504 errors:
1. Check if the ElevenLabs API is responding quickly
2. Monitor function logs in Supabase dashboard
3. Consider adding timeout handling or caching for frequently used phrases

### 401 Unauthorized Errors
If you see "Missing authorization header" errors:
1. Ensure you're sending the `Authorization: Bearer YOUR_ANON_KEY` header
2. Do NOT use `apikey` header - use `Authorization` instead
3. The anon key can be found in src/lib/supabase.ts

### Frontend Integration Issues
The audioService.ts has been updated to:
1. Use hardcoded Supabase URL and anon key (no environment variables needed)
2. Send proper `Authorization: Bearer` header instead of `apikey`
3. Handle binary audio response correctly

---

Last updated: June 25, 2025 