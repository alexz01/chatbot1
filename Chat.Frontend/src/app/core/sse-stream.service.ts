import { Injectable, signal, WritableSignal } from '@angular/core';

export interface StreamOptions {
  headers?: Record<string, string>;
  keepAlive?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SseStreamService {
  // -----------------------------------------------------------
  // Core SSE stream handler (shared by GET + POST)
  // -----------------------------------------------------------
  private streamInternal<T>(request: () => Promise<Response>): {
    output: WritableSignal<string>;
    abort: () => void;
  } {
    const output = signal('');
    const abortController = new AbortController();

    request()
      .then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        if (!response.body) throw new Error('Missing response body');

        const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

        let buffer = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += value;

          // SSE events are separated by blank lines
          let boundary;
          while ((boundary = buffer.indexOf('\n\n')) !== -1) {
            const raw = buffer.slice(0, boundary);
            buffer = buffer.slice(boundary + 2);

            if (raw.startsWith('data:')) {
              const jsonStr = raw.replace(/^data:\s*/, '');
              try {
                const evt: T = JSON.parse(jsonStr);

                const text = (evt as any)?.token?.text ?? '';
                output.update((prev) => prev + text);
              } catch (err) {
                console.warn('SSE parse error:', err);
              }
            }
          }
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Stream error:', err);
        }
      });

    return {
      output,
      abort: () => abortController.abort(),
    };
  }

  // -----------------------------------------------------------
  // Public GET streaming method
  // -----------------------------------------------------------
  streamGET<T = any>(url: string, opts: StreamOptions = {}) {
    const headers = {
      Accept: 'text/event-stream',
      ...(opts.headers ?? {}),
    };

    return this.streamInternal<T>(() =>
      fetch(url, {
        method: 'GET',
        headers,
        signal: new AbortController().signal,
      })
    );
  }

  // -----------------------------------------------------------
  // Public POST streaming method
  // -----------------------------------------------------------
  streamPOST<T = any>(url: string, body: any, opts: StreamOptions = {}) {
    const headers = {
      Accept: 'text/event-stream',
      'Content-Type': 'application/json',
      ...(opts.headers ?? {}),
    };

    return this.streamInternal<T>(() =>
      fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: new AbortController().signal,
      })
    );
  }
}
