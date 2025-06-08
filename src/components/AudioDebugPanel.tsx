import React, { useState, useEffect } from "react";
import { audioService } from "@/lib/audioService";
import { useTTS } from "@/hooks/useTTS";
import { useAudioPermission } from "./AudioPermissionProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Volume2,
  Play,
  AlertCircle,
  CheckCircle,
  Loader2,
  RefreshCw,
  Mic,
} from "lucide-react";

interface TestResult {
  success: boolean;
  message: string;
  details?: any;
  timestamp: string;
}

export default function AudioDebugPanel() {
  const [testText, setTestText] = useState(
    "Hello, this is a test of the audio system.",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    audioService: TestResult | null;
    useTTSHook: TestResult | null;
    permissionCheck: TestResult | null;
    edgeFunction: TestResult | null;
  }>({
    audioService: null,
    useTTSHook: null,
    permissionCheck: null,
    edgeFunction: null,
  });

  const { hasPermission, requestPermission, isInitialized } =
    useAudioPermission();
  const { playAudio, loading: ttsLoading, error: ttsError } = useTTS();

  // Test 1: AudioService direct test
  const testAudioService = async () => {
    console.log("[AudioDebug] Testing AudioService directly...");
    try {
      await audioService.playText(testText, "debug-audioservice-test");
      return {
        success: true,
        message: "AudioService playText completed successfully",
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      console.error("[AudioDebug] AudioService error:", error);
      return {
        success: false,
        message: `AudioService failed: ${error.message}`,
        details: error,
        timestamp: new Date().toISOString(),
      };
    }
  };

  // Test 2: useTTS hook test
  const testUseTTSHook = async () => {
    console.log("[AudioDebug] Testing useTTS hook...");
    try {
      await playAudio(testText);
      return {
        success: true,
        message: "useTTS hook playAudio completed successfully",
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      console.error("[AudioDebug] useTTS hook error:", error);
      return {
        success: false,
        message: `useTTS hook failed: ${error.message}`,
        details: error,
        timestamp: new Date().toISOString(),
      };
    }
  };

  // Test 3: Permission check
  const testPermissionCheck = async () => {
    console.log("[AudioDebug] Testing audio permissions...");
    try {
      const support = await audioService.checkAudioSupport();
      const permissionGranted = await requestPermission();

      return {
        success: permissionGranted && support.supported,
        message: `Permission: ${permissionGranted ? "granted" : "denied"}, Support: ${support.supported ? "yes" : "no"}`,
        details: {
          permissionGranted,
          audioSupport: support,
          hasPermission,
          isInitialized,
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      console.error("[AudioDebug] Permission check error:", error);
      return {
        success: false,
        message: `Permission check failed: ${error.message}`,
        details: error,
        timestamp: new Date().toISOString(),
      };
    }
  };

  // Test 4: Direct edge function test
  const testEdgeFunction = async () => {
    console.log("[AudioDebug] Testing edge function directly...");
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

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const arrayBuffer = await response.arrayBuffer();

      return {
        success: arrayBuffer.byteLength > 0,
        message: `Edge function returned ${arrayBuffer.byteLength} bytes of audio data`,
        details: {
          status: response.status,
          contentType: response.headers.get("content-type"),
          size: arrayBuffer.byteLength,
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      console.error("[AudioDebug] Edge function error:", error);
      return {
        success: false,
        message: `Edge function failed: ${error.message}`,
        details: error,
        timestamp: new Date().toISOString(),
      };
    }
  };

  const runAllTests = async () => {
    setIsLoading(true);
    setResults({
      audioService: null,
      useTTSHook: null,
      permissionCheck: null,
      edgeFunction: null,
    });

    console.log("[AudioDebug] Starting comprehensive audio tests...");
    console.log("[AudioDebug] Test text:", testText);
    console.log("[AudioDebug] Environment:", {
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
      hasAnonKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
      hasPermission,
      isInitialized,
    });

    try {
      // Test 1: Permission check first
      const permissionResult = await testPermissionCheck();
      setResults((prev) => ({ ...prev, permissionCheck: permissionResult }));

      // Test 2: Edge function direct test
      const edgeResult = await testEdgeFunction();
      setResults((prev) => ({ ...prev, edgeFunction: edgeResult }));

      // Test 3: AudioService test (only if permission granted)
      if (permissionResult.success) {
        const audioServiceResult = await testAudioService();
        setResults((prev) => ({ ...prev, audioService: audioServiceResult }));

        // Test 4: useTTS hook test
        const useTTSResult = await testUseTTSHook();
        setResults((prev) => ({ ...prev, useTTSHook: useTTSResult }));
      } else {
        setResults((prev) => ({
          ...prev,
          audioService: {
            success: false,
            message: "Skipped due to permission failure",
            timestamp: new Date().toISOString(),
          },
          useTTSHook: {
            success: false,
            message: "Skipped due to permission failure",
            timestamp: new Date().toISOString(),
          },
        }));
      }
    } catch (error: any) {
      console.error("[AudioDebug] Unexpected error during tests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const ResultCard = ({
    title,
    result,
    icon,
  }: {
    title: string;
    result: TestResult | null;
    icon: React.ReactNode;
  }) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {result ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant={result.success ? "default" : "destructive"}
                className={result.success ? "bg-green-100 text-green-800" : ""}
              >
                {result.success ? "✅ Success" : "❌ Failed"}
              </Badge>
              <span className="text-xs text-gray-500">{result.timestamp}</span>
            </div>
            <Alert
              className={result.success ? "border-green-500" : "border-red-500"}
            >
              <AlertDescription>
                <span
                  className={result.success ? "text-green-700" : "text-red-700"}
                >
                  {result.message}
                </span>
              </AlertDescription>
            </Alert>
            {result.details && (
              <details className="mt-2">
                <summary className="text-xs cursor-pointer text-gray-600 hover:text-gray-800">
                  Show Details
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
                  {JSON.stringify(result.details, null, 2)}
                </pre>
              </details>
            )}
          </div>
        ) : (
          <div className="text-gray-500 text-sm">Not tested yet</div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">🔊 Audio System Debug Panel</h1>
        <p className="text-gray-600">
          Comprehensive testing and debugging tool for the TruckTalk audio
          system
        </p>
      </div>

      {/* Current Status */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Current Audio Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div
                className={`text-2xl mb-1 ${hasPermission ? "text-green-600" : "text-red-600"}`}
              >
                {hasPermission ? "✅" : "❌"}
              </div>
              <div className="text-sm font-medium">Permission</div>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl mb-1 ${isInitialized ? "text-green-600" : "text-red-600"}`}
              >
                {isInitialized ? "✅" : "❌"}
              </div>
              <div className="text-sm font-medium">Initialized</div>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl mb-1 ${ttsLoading ? "text-yellow-600" : "text-gray-400"}`}
              >
                {ttsLoading ? "⏳" : "⏸️"}
              </div>
              <div className="text-sm font-medium">TTS Loading</div>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl mb-1 ${ttsError ? "text-red-600" : "text-green-600"}`}
              >
                {ttsError ? "❌" : "✅"}
              </div>
              <div className="text-sm font-medium">TTS Status</div>
            </div>
          </div>
          {ttsError && (
            <Alert className="mt-4 border-red-500">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-700">
                TTS Error: {ttsError.message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Test Controls */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Test Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Test Text:
              </label>
              <Input
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                placeholder="Enter text to test audio with..."
                className="mb-4"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={runAllTests}
                disabled={isLoading || !testText.trim()}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {isLoading ? "Running Tests..." : "Run All Tests"}
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setResults({
                    audioService: null,
                    useTTSHook: null,
                    permissionCheck: null,
                    edgeFunction: null,
                  })
                }
                disabled={isLoading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear Results
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      <div className="grid gap-4 md:grid-cols-2">
        <ResultCard
          title="1. Permission Check"
          result={results.permissionCheck}
          icon={<Mic className="h-4 w-4" />}
        />
        <ResultCard
          title="2. Edge Function Test"
          result={results.edgeFunction}
          icon={<Volume2 className="h-4 w-4" />}
        />
        <ResultCard
          title="3. AudioService Test"
          result={results.audioService}
          icon={<Play className="h-4 w-4" />}
        />
        <ResultCard
          title="4. useTTS Hook Test"
          result={results.useTTSHook}
          icon={<CheckCircle className="h-4 w-4" />}
        />
      </div>

      <Separator className="my-6" />

      {/* Environment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Environment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Supabase URL:</strong>
                <br />
                <code className="text-xs bg-gray-100 p-1 rounded">
                  {import.meta.env.VITE_SUPABASE_URL || "Not set"}
                </code>
              </div>
              <div>
                <strong>Has Anon Key:</strong>
                <br />
                <Badge
                  variant={
                    import.meta.env.VITE_SUPABASE_ANON_KEY
                      ? "default"
                      : "destructive"
                  }
                >
                  {import.meta.env.VITE_SUPABASE_ANON_KEY ? "Yes" : "No"}
                </Badge>
              </div>
              <div>
                <strong>Function Name:</strong>
                <br />
                <code className="text-xs bg-gray-100 p-1 rounded">
                  supabase-functions-text-to-speech
                </code>
              </div>
              <div>
                <strong>Expected Content-Type:</strong>
                <br />
                <code className="text-xs bg-gray-100 p-1 rounded">
                  audio/mpeg
                </code>
              </div>
            </div>
            <div>
              <strong>Browser Support:</strong>
              <br />
              <div className="flex gap-2 mt-1">
                <Badge variant={window.Audio ? "default" : "destructive"}>
                  Audio API: {window.Audio ? "Supported" : "Not Supported"}
                </Badge>
                <Badge
                  variant={
                    window.AudioContext || (window as any).webkitAudioContext
                      ? "default"
                      : "destructive"
                  }
                >
                  Web Audio:{" "}
                  {window.AudioContext || (window as any).webkitAudioContext
                    ? "Supported"
                    : "Not Supported"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
