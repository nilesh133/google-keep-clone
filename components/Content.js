import Icon from "@material-tailwind/react/Icon"
import Button from "@material-tailwind/react/Button"
import { signIn, signOut, useSession } from "next-auth/react";
import { db } from "../firebase";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { useState } from "react";
import { MdModeEditOutline, MdDelete, MdArchive } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io"
import { useRouter } from 'next/router';

const Content = ({ id, heading, detail, time }) => {
    const { data: session, status } = useSession();
    const [showModal, setShowModal] = useState(false);
    const [newHeading, setNewHeading] = useState(heading);
    const [newDetail, setNewDetail] = useState(detail);
    const date = new Date(time?.seconds * 1000);
    const router = useRouter();

    const updateNewContent = () => {
        setShowModal(false);
        db.collection("userNotes").doc(session.user.email).collection("notes").doc(id).update({
            fileHeading: newHeading,
            fileDetail: newDetail,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    const refreshInput = () => {
        setNewHeading("");
        setNewDetail("");
    }
    const archiveNoteHandler = () => {
        if (!session) {
            return;
        }
        db.collection("archiveNotes").doc(session.user.email).collection("archive").add({
            archieveHeading: heading,
            archieveDetail: detail,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        db.collection("userNotes").doc(session.user.email).collection("notes").doc(id).delete({
        })
    }

    const deleteNoteHandler = () => {
        if (!session) {
            return;
        }
        db.collection("deleteNotes").doc(session.user.email).collection("delete").add({
            deleteHeading: heading,
            deleteDetail: detail,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        db.collection("userNotes").doc(session.user.email).collection("notes").doc(id).delete({
        })
    }

    const modal = (
        <Modal
            size="regular"
            active={showModal}
            toggler={() => setShowModal(false)}
        >

            <ModalBody>
                <input
                    value={newHeading}
                    onChange={(e) => setNewHeading(e.target.value)}
                    type="text"
                    className='outline-none modal-w modal-bp-1:modal-w-bp-1 modal-bp-2:modal-w-bp-2 modal-bp-3:modal-w-bp-3'
                    placeholder='Title'
                    onKeyDown={(e) => e.key === "Enter" && updateNewContent()}
                />

            </ModalBody>
            <ModalBody>
                
                <textarea
                    value={newDetail}
                    onChange={(e) => setNewDetail(e.target.value)}
                    className='outline-none modal-w h-40 modal-bp-1:modal-w-bp-1 modal-bp-2:modal-w-bp-2 modal-bp-3:modal-w-bp-3'
                    placeholder='Take a note'
                    onKeyDown={(e) => e.key === "Enter" && updateNewContent()}
                />
                <span className="absolute text-md text-white right-0 p-2 bg-green-400 rounded-2xl cursor-pointer" onClick={() => refreshInput()}><IoMdRefresh /></span>

            </ModalBody>

            <ModalFooter>
                <p
                    className="absolute text-gray-400 font-semibold bottom-16 text-xs right-6 modal-bp-2:left-4 modal-bp-2:text-sm"
                >Last Edited: {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}</p>
                <Button
                    color="yellow"
                    buttonType="link"
                    onClick={(e) => setShowModal(false)}
                    ripple="dark"
                >
                    Cancel
                </Button>
                <Button
                    color="yellow"
                    onClick={updateNewContent}
                    ripple="light"
                >
                    Update
                </Button>

            </ModalFooter>
        </Modal>
    )

    return (
        <>
            {modal}
            <div className="group m-2 py-2 px-3 flex flex-col h-40 rounded-md cursor-pointer content-shadow hover:content-hover-shadow transition duration-500 
            content-w content-bp-1:content-w-bp-1 content-bp-2:content-w-bp-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold">{heading.slice(0, 25)}{heading.length > 25 ? "..." : " "}</h3>
                    <span className="text-lg text-gray-700 content-shadow p-1 rounded-xl opacity-0 group-hover:opacity-100 transition duration-700" onClick={() => setShowModal(true)}><MdModeEditOutline /></span>
                </div>

                <p className="text-gray-700 text-lg mt-2">{detail.slice(0, 40)}{detail.length > 40 ? "..." : " "}</p>
                <div className="flex ml-auto mt-auto">
                    <span className="text-lg text-gray-700 content-shadow p-1 rounded-xl mr-2" onClick={() => archiveNoteHandler()}><MdArchive /></span>
                    <span className="text-lg text-gray-700 content-shadow p-1 rounded-xl" onClick={() => deleteNoteHandler()}><MdDelete /></span>
                </div>
            </div>
        </>
    )
}

export default Content;