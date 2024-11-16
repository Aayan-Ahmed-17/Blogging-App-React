import React, {useState} from "react";

const Blog = ({title, description, mode, dbDocId, setDbDocId, docId, e, index, handleDeleteBlog, handleUserRedirect}) => {

    return(
        <>
            <div className="w-full rounded-lg p-5 bg-white -ml-7 mb-6 shadow-md"> {/** card container */}
                <div className="min-h-28 min-w-[45rem] flex gap-4 items-center">
                    <img src="../../src/assets/images/profile-image1.png" alt="profile" className="h-24"/>
                    <div className="min-h-24 w-1/2 ">
                        <p className="text-2xl leading-7 font-semibold text-gray-700">{title} </p>
                        <p className="text-gray-600 font-medium mt-2">Inzamam Malik - <span>August 16th, 2023</span></p>
                    </div>
                </div> {/** card header */}
                <div className=" text-gray-500 min-h-60 mt-2"><p>{description}</p></div> {/** card Body */}
                {mode == "modify" && <div className="bg-white flex gap-4 mt-3">
                    <button type="button" className="text-purple-700">Edit</button>
                    <button type="button" className="text-purple-700" onClick={() => {
                setDbDocId({
                  docid: docId,
                  index
                })
                // console.log(dbDocId)
                document.getElementById('delete-modal').showModal()
                }}>Delete</button>
                </div>}
                <dialog id="delete-modal" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Are you sure!</h3>
                        <p className="py-4">You want to delete this Blog?</p>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn btn-error mx-2" onClick={()=> handleDeleteBlog(dbDocId)}>Yes</button>
                                <button className="btn btn-success mx-2">No</button>
                            </form>
                        </div>
                    </div>
                </dialog>
                {mode == "view" && <button className="text-[#7749F8] text-lg" onClick={() => handleUserRedirect(e.uid)}>see all from this user</button>}
            </div>
        </>
    )
}

export default Blog