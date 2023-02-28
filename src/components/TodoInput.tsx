import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";//データをCloud Firestoreに登録するにはaddDoc()を使います。

const TodoInput: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const onSubmitAdd = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(inputText === '')return;
    await addDoc(collection(db, 'todos'),{
      text: inputText,
      timeStamp: serverTimestamp(),
    });
    setInputText('');
  };

  return(
    <form onSubmit={onSubmitAdd}>
      <input onChange={(e) => setInputText(e.target.value) } value={inputText} />
      <button>追加</button>
    </form>
  );
};
export default TodoInput;
