export interface TextToSpeechRequest {
  text: string;
  voice?: string;
  language?: string;
  speed?: number;
}

export interface TextToSpeechResponse {
  audioUrl: string;
  duration: number;
}
