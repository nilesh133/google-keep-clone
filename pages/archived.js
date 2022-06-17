import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Icon from "@material-tailwind/react/Icon"
import Button from "@material-tailwind/react/Button"
import "@material-tailwind/react/tailwind.css";
import 'tailwindcss/tailwind.css';
import Head from "next/head"
import { signIn, signOut, useSession } from "next-auth/react";
import Content from "../components/Content";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { MdArchive, MdDelete, MdUnarchive } from "react-icons/md";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

const Archived = () => {
    const { data: session, status } = useSession();
    const [allArchievedNotes, setAllArchievedNotes] = useState([])
    useEffect(() => {
        db.collection('archiveNotes')
            .doc(session?.user.email)
            .collection('archive')
            .orderBy('timestamp', 'desc')
            .onSnapshot((querySnapshot) => {
                setAllArchievedNotes([])
                querySnapshot.forEach((doc) => {
                    setAllArchievedNotes((oldDocs) => [...oldDocs, doc])
                })
            })
    }, [])

    const router = useRouter();

    const unarchiveNoteHandler = async (heading, detail, id) => {
        if (!session) {
            return;
        }
        await db.collection("userNotes").doc(session.user.email).collection("notes").add({
            fileHeading: heading,
            fileDetail: detail,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        await db.collection("archiveNotes").doc(session.user.email).collection("archive").doc(id).delete({
        })
    }

    return (
        <div>
            <Head>
        <title>Google Keep</title>
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

            <Header />
            <div className="flex flex-col md:flex-row mb-4 font-opensans">
                <Navbar />
                <div className='flex flex-wrap items-center ml-6 w-full'>
                    {allArchievedNotes?.map((doc) => (
                        <div className="relative my-7 mx-2 cursor-pointer p-3 h-40 rounded-md content-shadow hover:content-hover-shadow transition duration-500 content-w content-bp-1:content-w-bp-1 content-bp-2:content-w-bp-2">
                            <h3 className="text-sm font-bold text-[16px]">{doc.data().archieveHeading.slice(0, 25)}{doc.data().archieveHeading.length > 25 ? "..." : " "}</h3>
                            <p className="text-lg mt-2 font-semibold text-gray-500">{doc.data().archieveDetail.slice(0, 40)}{doc.data().archieveDetail.length > 40 ? "..." : " "}</p>
                            <span className="absolute right-4 bottom-4 text-lg text-gray-700 content-shadow p-1 rounded-xl cursor-pointer" onClick={() => unarchiveNoteHandler(doc.data().archieveHeading, doc.data().archieveDetail, doc.id)}><MdUnarchive /></span>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )
}

export default Archived;