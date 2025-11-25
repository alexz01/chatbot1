import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SseStreamService } from './sse-stream.service';

@Injectable({
  providedIn: 'root',
})
export class HfTextGenerationInferenceService {
  private sseStreamService = inject(SseStreamService);
  private http = inject(HttpClient);

  generate(inputs: string) {
    return this.http.post('tgi/generate', {
      inputs,
      parameters: {
        max_new_tokens: 50,
        temperature: 0.7,
        top_p: 0.9,
        stream: true,
      },
    });
  }

  generateStream() {}
}
