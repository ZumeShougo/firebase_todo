
import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

type TodoItemType = {
  todo: { id: string; text: string; timestamp: any };
};

const TodoItem: React.FC<TodoItemType> = (props) => {
  const { id, text, timestamp } = props.todo;

  const [update, setUpdate] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const updateInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 選択したアイテムにフォーカスを当てる
    const refInput = updateInput.current;
    if (isEdit === true) {
      if (refInput === null) return;
      refInput?.focus();
    }
  }, [isEdit]);

  const onSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateItem(id);
  };
  const updateItem = async (id: string) => {
    if (update === '') return;
    await updateDoc(doc(db, 'todos', id), {
      text: update,
      // timestamp: serverTimestamp(),
    });
    setIsEdit(false);
  };
  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <li className="border-b-2 border-gray-300 p-4 flex justify-between items-center">
      {isEdit === false ? (
        <div onDoubleClick={() => setIsEdit(true)} className="flex items-center space-x-2">
          <span className="text-lg">{text}</span>
          <span className="text-sm text-gray-500">{new Date(timestamp?.toDate()).toLocaleString()}</span>
        </div>
      ) : (
        <div>
          <form onSubmit={onSubmitUpdate} className="flex items-center space-x-2">
            <input
              type="text"
              className="border border-gray-400 py-1 px-2 rounded-md w-64"
              placeholder={text}
              ref={updateInput}
              onChange={(e) => setUpdate(e.target.value)}
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md">
              更新
            </button>
          </form>
        </div>
      )}

      <button
        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md"
        onClick={() => deleteItem(id)}
      >
        削除
      </button>
    </li>
  );
};

export default TodoItem;
