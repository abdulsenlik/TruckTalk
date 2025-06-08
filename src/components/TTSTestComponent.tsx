import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { audioService } from "@/lib/audioService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TestResult {
  success: boolean;
  message: string;
  details?: any;
}

export default function TTSTestComponent() {
  const [testText, setTestText] = useState(
    "Hello, this is a test of the text-to-speech system.",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    edgeFunction: TestResult | null;
    audioService: TestResult | null;
    directFetch: TestResult | null;
  }>({ edgeFunction: null, audioService: null, directFetch: null });

  // Test 1: Direct fetch to the edge function
  const testDirectFetch = async () => {
    console.log("[TTS Test] Testing direct fetch to edge function...");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/text-to-speech`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ text: testText }),
        },
      );

      console.log("[TTS Test] Direct fetch response status:", response.status);
      console.log(
        "[TTS Test] Direct fetch response headers:",
        Object.fromEntries(response.headers.entries()),
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const contentType = response.headers.get("content-type");
      console.log("[TTS Test] Content-Type:", contentType);

      if (
        !contentType?.includes("audio/mpeg") &&
        !contentType?.includes("audio/mp3")
      ) {
        console.warn("[TTS Test] Unexpected content type:", contentType);
      }

      const arrayBuffer = await response.arrayBuffer();
      console.log(
        "[TTS Test] Audio data size:",
        arrayBuffer.byteLength,
        "bytes",
      );

      if (arrayBuffer.byteLength === 0) {
        throw new Error("Received empty audio data");
      }

      // Test if we can create a blob and URL
      const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      console.log("[TTS Test] Created blob URL:", url);

      // Test if we can create an audio element
      const audio = new Audio(url);
      audio.preload = "auto";

      return {
        success: true,
        message: `Successfully fetched ${arrayBuffer.byteLength} bytes of audio data`,
        details: {
          contentType,
          size: arrayBuffer.byteLength,
          blobUrl: url,
        },
      };
    } catch (error: any) {
      console.error("[TTS Test] Direct fetch error:", error);
      return {
        success: false,
        message: `Direct fetch failed: ${error.message}`,
        details: error,
      };
    }
  };

  // Test 2: Supabase client invoke
  const testSupabaseInvoke = async () => {
    console.log("[TTS Test] Testing Supabase client invoke...");
    try {
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-text-to-speech",
        { body: { text: testText } },
      );

      console.log("[TTS Test] Supabase invoke response:", {
        data: data ? "received" : "null",
        error,
      });

      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }

      if (!data) {
        throw new Error("No data returned from Supabase function");
      }

      // Check if data is ArrayBuffer or similar
      console.log("[TTS Test] Data type:", typeof data);
      console.log("[TTS Test] Data constructor:", data.constructor.name);

      let arrayBuffer: ArrayBuffer;
      if (data instanceof ArrayBuffer) {
        arrayBuffer = data;
      } else if (data instanceof Uint8Array) {
        arrayBuffer = data.buffer;
      } else {
        // Try to convert to ArrayBuffer
        arrayBuffer = new Uint8Array(data).buffer;
      }

      console.log(
        "[TTS Test] Audio data size:",
        arrayBuffer.byteLength,
        "bytes",
      );

      if (arrayBuffer.byteLength === 0) {
        throw new Error("Received empty audio data");
      }

      return {
        success: true,
        message: `Successfully received ${arrayBuffer.byteLength} bytes via Supabase client`,
        details: {
          dataType: typeof data,
          constructor: data.constructor.name,
          size: arrayBuffer.byteLength,
        },
      };
    } catch (error: any) {
      console.error("[TTS Test] Supabase invoke error:", error);
      return {
        success: false,
        message: `Supabase invoke failed: ${error.message}`,
        details: error,
      };
    }
  };

  // Test 3: AudioService playText
  const testAudioService = async () => {
    console.log("[TTS Test] Testing AudioService playText...");
    try {
      // First check audio support
      const support = await audioService.checkAudioSupport();
      console.log("[TTS Test] Audio support:", support);

      // Test with a unique identifier
      const identifier = `test-${Date.now()}`;
      await audioService.playText(testText, identifier);

      return {
        success: true,
        message: "AudioService playText completed successfully",
        details: { audioSupport: support, identifier },
      };
    } catch (error: any) {
      console.error("[TTS Test] AudioService error:", error);
      return {
        success: false,
        message: `AudioService failed: ${error.message}`,
        details: error,
      };
    }
  };

  const runAllTests = async () => {
    setIsLoading(true);
    setResults({ edgeFunction: null, audioService: null, directFetch: null });

    console.log("[TTS Test] Starting comprehensive TTS tests...");
    console.log("[TTS Test] Test text:", testText);
    console.log("[TTS Test] Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
    console.log(
      "[TTS Test] Has Anon Key:",
      !!import.meta.env.VITE_SUPABASE_ANON_KEY,
    );

    try {
      // Test 1: Direct fetch
      const directResult = await testDirectFetch();
      setResults((prev) => ({ ...prev, directFetch: directResult }));

      // Test 2: Supabase invoke
      const edgeResult = await testSupabaseInvoke();
      setResults((prev) => ({ ...prev, edgeFunction: edgeResult }));

      // Test 3: AudioService (only if previous tests passed)
      if (directResult.success && edgeResult.success) {
        const audioResult = await testAudioService();
        setResults((prev) => ({ ...prev, audioService: audioResult }));
      } else {
        setResults((prev) => ({
          ...prev,
          audioService: {
            success: false,
            message: "Skipped due to previous test failures",
          },
        }));
      }
    } catch (error: any) {
      console.error("[TTS Test] Unexpected error during tests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const ResultCard = ({
    title,
    result,
  }: {
    title: string;
    result: TestResult | null;
  }) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {result ? (
          <div>
            <Alert
              className={result.success ? "border-green-500" : "border-red-500"}
            >
              <AlertDescription>
                <span
                  className={result.success ? "text-green-700" : "text-red-700"}
                >
                  {result.success ? "✅" : "❌"} {result.message}
                </span>
              </AlertDescription>
            </Alert>
            {result.details && (
              <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
                {JSON.stringify(result.details, null, 2)}
              </pre>
            )}
          </div>
        ) : (
          <div className="text-gray-500">Not tested yet</div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6">TTS System Test & Audit</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Test Text:</label>
        <Input
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          placeholder="Enter text to test TTS with..."
          className="mb-4"
        />
        <Button
          onClick={runAllTests}
          disabled={isLoading || !testText.trim()}
          className="w-full"
        >
          {isLoading ? "Running Tests..." : "Run All TTS Tests"}
        </Button>
      </div>

      <div className="grid gap-4">
        <ResultCard title="1. Direct Fetch Test" result={results.directFetch} />
        <ResultCard
          title="2. Supabase Edge Function Test"
          result={results.edgeFunction}
        />
        <ResultCard
          title="3. AudioService Test"
          result={results.audioService}
        />
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-2">Test Information:</h3>
        <ul className="text-sm space-y-1">
          <li>
            <strong>Supabase URL:</strong> {import.meta.env.VITE_SUPABASE_URL}
          </li>
          <li>
            <strong>Has Anon Key:</strong>{" "}
            {import.meta.env.VITE_SUPABASE_ANON_KEY ? "Yes" : "No"}
          </li>
          <li>
            <strong>Function Name:</strong> supabase-functions-text-to-speech
          </li>
          <li>
            <strong>Expected Content-Type:</strong> audio/mpeg
          </li>
          <li>
            <strong>Browser Audio Support:</strong>{" "}
            {window.Audio ? "Yes" : "No"}
          </li>
          <li>
            <strong>Web Audio Context Support:</strong>{" "}
            {window.AudioContext || (window as any).webkitAudioContext
              ? "Yes"
              : "No"}
          </li>
        </ul>
      </div>
    </div>
  );
}
