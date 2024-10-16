'use client';
import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { invoke } from '@tauri-apps/api/core';

const BE = dynamic(() => import('@components/backendeditor'), { ssr: false });
// const BEC = dynamic(() => import('@components/customdropdown'), { ssr: false });

export default function Home() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  interface Note {
    title: string;
    content: string;
  }

  const [notes, setNotes] = useState<Note[]>([]);

  async function greet() {
    setGreetMsg(await invoke('greet', { name }));
  }

  async function saveNote(title: string, content: string) {
    const result = await invoke('add_note', { title, content });
    console.log(result);
    getNotes();
  }

  const getNotes = useCallback(async () => {
    const notes = (await invoke('get_notes')) as Note[];
    setNotes(notes);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveNote(title, content);
    setTitle('');
    setContent('');
  };

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to Tauri!</h1>

      <form
        className="flex flex-row my-4 w-full justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          className="w-3/4 rounded-lg p-2 border border-gray-700 bg-gray-800 text-white"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a query..."
        />
        <button
          type="submit"
          className="p-2 text-black bg-yellow-500 w-1/4 rounded-lg hover:bg-yellow-400 transition"
        >
          Ask
        </button>
      </form>

      <span className="text-green-500 mt-2 w-full">{greetMsg}</span>

      <form onSubmit={handleSubmit} className="w-full mt-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 rounded-lg p-2 border border-gray-700 bg-gray-800 text-white"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-2 rounded-lg p-2 border border-gray-700 bg-gray-800 text-white"
          rows={4}
        />
        <button
          type="submit"
          className="p-2 text-black bg-green-500 w-full rounded-lg hover:bg-green-400 transition"
        >
          Save Note
        </button>
      </form>

      <div className="w-full mt-8 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Notes:</h2>
        <div className="space-y-4">
          {notes.length === 0 ? (
            <p>No notes yet.</p>
          ) : (
            notes.map((note, index) => (
              <div key={index} className="p-4 bg-gray-700 rounded-lg">
                <h3 className="font-bold">{note.title}</h3>
                <p>{note.content}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="w-full overflow-hidden overflow-y-scroll bg-[#1f1f1f] mt-8">
        <BE />
      </div>
      {/* <div className="w-full overflow-hidden overflow-y-scroll bg-[#1f1f1f] mt-8">
        <BEC />
      </div> */}
    </div>
  );
}
