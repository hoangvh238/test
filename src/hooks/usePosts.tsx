
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authModelState } from "../atoms/authModalAtom";
import { CommunityState } from "../atoms/CommunitiesAtom";
import { Post, postState, Like } from "../atoms/PostAtom";
import { disLike, like } from "../../apis/posts";
import { getUser } from "./userStorage";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const user = getUser();
  const router = useRouter();
  const setAuthModalState = useSetRecoilState(authModelState);
  const currentCommunity = useRecoilValue(CommunityState).currentCommunity;
  const onVote = async (
    event: React.MouseEvent<Element, MouseEvent>,
    post: number,
    vote: number,
    communityId: string
  ) => {
    event.stopPropagation();
    // check user ?

    

  const onSelectPost = (post: Post) => {
    setPostStateValue((prev) => ({
      ...prev,
      selectedPost: post,
    }));
    router.push(`group/${post.groupName}/${post.postId}`);
  };

  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      // // check if image delete if exists
      // if (post.imageURL) {
      //   const imageRef = ref(storage, `posts/${post.id}/image`);
      //   await deleteObject(imageRef);
      // }
      // delete post document from firestore
      // const postDocRef = doc(firestore, "posts", post.p!);
      // await deleteDoc(postDocRef);

      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.postId !== post.postId),
      }));

      return true;
    } catch (error) {
      return false;
    }
  };

  const getCommunityPostVotes = async (communityId: string) => {
    // const postVotesQuarry = query(
    //   collection(firestore, "users", `${user?.uid}/postVotes`),
    //   where("communityId", "==", communityId)
    // );

    // const postVoteDocs = await getDocs(postVotesQuarry);
    // const postVotes = postVoteDocs.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));
    // setPostStateValue((prev) => ({
    //   ...prev,
    //   postVotes: postVotes as Vote[],
    // }));
  };



  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};
}

export default usePosts
