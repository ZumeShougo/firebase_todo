
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';

type TodoItemType = {
  todo: {
    id: string;
    text: string;
    timestamp: any;
  };
};

const TodoItem: React.FC<TodoItemType> = (props) => {
  const { id, text, timestamp } = props.todo;
  const [update, setUpdate] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const updateInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const refInput = updateInput.current;
    if(isEdit === true){
      if(refInput === null)return;
      refInput?.focus();
    }
  }, [isEdit]);

  const onSubmitUpdate = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateItem(id);
  };
  const updateItem = async(id: string) => {
    if(update === '')return;
    await updateDoc(doc(db, 'todos', id), {
      text: update,
    });
    setIsEdit(false);
  };
  const deleteItem = async(id: string) => {
    await deleteDoc(doc(db, 'todos', id));
  };





  return(
    <li>
      {isEdit === false ? (
        <div onDoubleClick={() => setIsEdit(true)}>
          <span>{text}</span>
          <span> {new Date(timestamp?.toDate()).toLocaleString()}</span>
        </div>
      ): (
        <div>
          <form onSubmit={onSubmitUpdate}>
            <input type='text' placeholder={text} ref={updateInput} onChange={(e) => setUpdate(e.target.value)} />
            <button>更新</button>
          </form>
        </div>
      )}
      <button onClick={() => updateItem(id)}>削除</button>
    </li>
  );
};

export default TodoItem;