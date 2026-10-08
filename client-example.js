// Frontend example: consume the streaming chat endpoint (works in browsers & Node 18+)
async function streamChat(message, history, context, onChunk) {
  const res = await fetch('http://localhost:3000/api/ai/chat/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, context })
  });
  if (!res.ok) throw new Error((await res.json()).error);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const events = buffer.split('\n\n');
    buffer = events.pop(); // keep incomplete event for next read

    for (const evt of events) {
      const event = /^event: (.+)$/m.exec(evt)?.[1];
      const data = JSON.parse(/^data: (.+)$/m.exec(evt)?.[1] || '{}');
      if (event === 'chunk') onChunk(data.text);
      if (event === 'error') throw new Error(data.error);
    }
  }
}

// Usage:
// streamChat('Why is this app suspicious?', [], threatRecord, t => process.stdout.write(t));
