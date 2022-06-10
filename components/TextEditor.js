import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { signIn, signOut, useSession } from "next-auth/react";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import Content from "./Content";

const TextEditor = () => {
  const { data: session, status } = useSession();

  const [showTextArea, setShowTextArea] = useState(false);
  const [note, setNote] = useState({
    heading: "",
    detail: ""
  });
  const [allNotes, setAllNotes] = useState([])

  useEffect(() => {
    db.collection('userNotes')
      .doc(session?.user.email)
      .collection('notes')
      .orderBy('timestamp', 'desc')
      .onSnapshot((querySnapshot) => {
        setAllNotes([])
        querySnapshot.forEach((doc) => {
          setAllNotes((oldDocs) => [...oldDocs, doc])
        })
      })
  }, [])

  const hideContentAndsaveContent = () => {
    if (!session) {
      return;
    }
    const val = db.collection("userNotes").doc(session.user.email).collection("notes").add({
      fileHeading: note.heading,
      fileDetail: note.detail,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setShowTextArea(false);
    setNote({
      heading: "",
      detail: ""
    })

    // console.log(snapshot);

  }

  const handleChange = (e) => {
    let updatedValue = { ...note, [e.target.name]: e.target.value }
    setNote(updatedValue);
  }

  allNotes.map((note) => {
    console.log(note.data())
  })


  return (
    <div className='flex flex-col' style={{ width: "100%" }}>
      <div className={"flex mx-auto flex-col my-10 box-shadow px-2 py-1 rounded-md w-5/6 content-bp-1:w-4/6 content-bp-2:w-3/6" + (showTextArea ? " h-26" : " h-10")}>
        { }
        <input type="text" value={note.heading} name="heading" onChange={(e) => handleChange(e)} placeholder='Title goes here' className='p-2 border-0 outline-none text-sm font-semibold placeholder-style' onClick={() => setShowTextArea(true)} />
        {

          showTextArea &&
          <div className='flex flex-col py-2'>
            <textarea value={note.detail} name="detail" id="" onChange={(e) => handleChange(e)} placeholder='Take a note' className='p-2 border-0 outline-none text-sm font-semibold placeholder-style'></textarea>
            <span onClick={hideContentAndsaveContent} className='text-sm ml-auto bg-yellow-400 text-white py-1 px-2 rounded-md mt-2 cursor-pointer font-semibold'>Save</span>
          </div>

        }

      </div>
      <div className='flex flex-wrap items-center ml-6'>
        {allNotes?.map((doc) => (
          <Content
            key={doc.id}
            id={doc.id}
            heading={doc.data().fileHeading}
            detail={doc.data().fileDetail}
            time={doc.data().timestamp}
          />
        ))}
      </div>
    </div>
  )
}

export default TextEditor