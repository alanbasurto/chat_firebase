import React, { SyntheticEvent, useState } from 'react'
import { useUser } from '../context/user'
import { firebase, firestore } from "../services/firebase"
import { useCollectionData } from "react-firebase-hooks/firestore"

interface IMessage {
   id: string,
   text: string,
   uid: string,
   photoURL: string,
   displayName: string,
   createdAt: firebase.firestore.Timestamp
}

const messagesRef = firestore.collection("messages");
const messageQuery = messagesRef.orderBy("createdAt", "desc").limit(100);

const Chanel = () => {

   const [text, setText] = useState("");
   const { logout, user } = useUser();
   const [messages, loading] = useCollectionData<IMessage>(messageQuery, { idField: "id" });

   const sendMessage = (event: SyntheticEvent) => {
      event.preventDefault();
      
      if(text.trim().length < 3) return ;
      
      if (user) {
         const { displayName, uid, photoURL, } = user;
         messagesRef.add({
            text,
            uid, 
            photoURL, 
            displayName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
         })
      }
      setText("");
   }

   if(loading){
      return(
         <h1>Cargando</h1>
      )
   }


   return (
      <section>
         <button onClick={logout}>logout</button>
         <section>
            {messages && messages.reverse().map(({photoURL, text, displayName, id }) => (
               <div key={id}>
                  [<img src={photoURL} width="16" height="16" alt={displayName}/> {""}{displayName}]: {text}
               </div>
            ))}
         </section>
         <form onSubmit={sendMessage}>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <button>Send</button>
         </form>

      </section>
   )
}

export default Chanel
