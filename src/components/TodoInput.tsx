import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import '../App.css';

const TodoInput: React.FC = () => {
  const [inputText, setInputText] = useState('');

  // TODO追加
  const onSubmitAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText === '') return;
    await addDoc(collection(db, 'todos'), {
      text: inputText,
      timestamp: serverTimestamp(),
    });
    setInputText('');
  };

  return (
    <form onSubmit={onSubmitAdd} className="flex items-center space-x-2">
      <input
        className="border border-gray-400 py-2 px-3 rounded-md w-64"
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md"
        type="submit"
      >
        追加
      </button>
    </form>
  );
};

export default TodoInput;
