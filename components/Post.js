import React, { useState, useEffect } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import Moment from "react-moment";
import InputEmoji from "react-input-emoji";

const Post = ({ id, username, userImg, img, caption }) => {
  const { data: session, status } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  //// GETTING COMMENTS
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  //// GETTING LIKES
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  //// CHECK IF POST HAS BEEN LIKED BY THE USER
  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  //// click heart/like function
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
      setHasLiked(false);
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
      setHasLiked(true);
    }
  };

  // ON CLICK FUNCTION THAT SENDS THE COMMENT TO THE DATABASE
  const sendComment = async (e) => {
    e.preventDefault();

    ///FOR THE BETTER VISUAL EFFECT
    const commentToSend = comment;
    setComment("");

    ///WE CREATE A COMMENT COLLECTION IN THE ALREADY EXISITNG POST
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      userImage: session.user.image,
      username: session.user.username,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* //// UPLOADER DATA */}
      <div className="flex items-center p-5">
        <img
          className="rounded-full h-12 w-12 border p-1 mr-3 object-contain"
          src={userImg}
          alt=""
        />
        <p className="flex-1 font-bald">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* /// IMG */}
      <img src={img} className="object-cover w-full" alt="" />

      {/* ACTION BUTTONS */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>

          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* //// CAPTION */}
      <div className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </div>

      {/* COMMENTS */}
      {comments.length > 0 && (
        <div className="h-20 ml-10 overflow-y-scroll scrollbar-thumb-back scrollbar-thin">
          {comments.map((item) => (
            <div key={item.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={item.data().userImage}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{item.data().username} </span>
                {item.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs text-gray-500">
                {item.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form className="flex items-center p-4">
          <InputEmoji
            value={comment}
            onChange={setComment}
            cleanOnEnter
            className="border-none flex-1 focus:ring-0 outline-none"
            type="text"
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-500"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
