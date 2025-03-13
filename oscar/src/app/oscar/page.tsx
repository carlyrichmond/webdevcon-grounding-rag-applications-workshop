'use client';

import { useChat } from 'ai/react';
import Spinner from '../components/Spinner';

export default function Completion() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, error, reload } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div>
              <div className="font-bold">{m.role === "assistant" ? "Oscar" : "Me"}</div>
              <p>{m.content}</p>
            </div>
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="spinner__container">
          <Spinner />
          <button id="stop__button" type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}

      {error && (
        <>
          <div className="error__container">Oscar has popped to the movies. Please try again later!</div>
          <button id="retry__button" type="button" onClick={() => reload()}>
            Retry
          </button>
        </>
      )}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Ask me anything about movies..."
          onChange={handleInputChange}
          disabled={error != null}
        />
      </form>
    </div>
  );
}