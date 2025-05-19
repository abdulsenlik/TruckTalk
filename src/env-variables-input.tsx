import React from "react";

const EnvVariablesInput = () => {
  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
      <h3 className="text-lg font-medium text-yellow-800 mb-2">
        Configure Text-to-Speech API Keys
      </h3>
      <p className="text-sm text-yellow-700 mb-4">
        To enable high-quality AI voice for vocabulary words, please add one of
        the following API keys in your project settings:
      </p>
      <ul className="list-disc pl-5 text-sm text-yellow-700 space-y-2">
        <li>
          <strong>ELEVENLABS_API_KEY</strong>: For premium quality
          natural-sounding voices (recommended)
        </li>
      </ul>
      <p className="text-xs text-yellow-600 mt-4">
        Note: If no key is provided, the app will fall back to using the
        browser's built-in Web Speech API.
      </p>
    </div>
  );
};

export default EnvVariablesInput;
