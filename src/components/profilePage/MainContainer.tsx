import { Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { Post, Like } from "../../atoms/PostAtom";
import { auth, firestore } from "../../firebase/clientApp";

import usePosts from "../../hooks/usePosts";

import PageContent from "../Layout/PageContent";
import PostItem from "../posts/PostItem";
import PostLoader from "../posts/PostLoader";
import NoPost from "./NoPost";
import ProfileSide from "./ProfileSide";
import ProfileTopBar from "./ProfileTopBar";
import {User} from "@/atoms/userAtom"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Props = {
  slug : string | undefined
};

function MainContainer({slug}:Props) {

  const router = useRouter();
  const slugdata = router.query.slug?.toString();
  const currenUser = useSelector((state:RootState)=> state.userInfor.currentUser);




  const [loading, setLoading] = useState(false);
 

  //const communityStateValue = useRecoilValue(CommunityState);

  // const buildUserHomeFeed = async () => {
  //   try {
  //     if (communityStateValue.mySnippets.length) {
  //       const myCommunityIds = communityStateValue.mySnippets.map(
  //         (snippet) => snippet.communityId
  //       );

  //       const postQuery = query(
  //         collection(firestore, "posts"),
  //         where("communityId", "in", myCommunityIds)
  //       );

  //       const postDoc = await getDocs(postQuery);
  //       const posts = postDoc.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       setPostStateValue((prev: any) => ({
  //         ...prev,
  //         posts: posts as Post[],
  //       }));
  //     } else {
  //       buildUserHomeFeed();
  //     }
  //   } catch (error) {
  //     console.log("Building HHome Error", error);
  //   }
  // };
  // const buildNoUserHomeFeed = async () => {
  //   setLoading(true);
  //   try {
  //     const postQuery = query(
  //       collection(firestore, "posts"),
  //       where("creatorId", "==", uid),
  //       orderBy("voteStatus", "desc")
  //     );

  //     const postDocs = await getDocs(postQuery);
  //     const posts = postDocs.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  //     setPostStateValue((prev) => ({
  //       ...prev,
  //       posts: posts as Post[],
  //     }));
  //   } catch (error) {
  //     console.log("BuildNoUserHome", error);
  //   }
  //   setLoading(false);
  // };

  // const getUserPostVotes = async () => {
  //   try {
  //     const postIds = postStateValue.posts.map((post) => post.id);

  //     const batches: PostVote[] | any[][] = [];

  //     while (postIds.length) {
  //       const batch = postIds.splice(0, 10);

  //       const postVotesQuery = query(
  //         collection(firestore, `users/${user?.uid}/postVotes`),
  //         where("postId", "in", [...batch])
  //       );
  //       const postVoteDoc = await getDocs(postVotesQuery);

  //       const postVotes = postVoteDoc.docs.map((doc: any) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       batches.push(postVotes as any);
  //     }

  //     setPostStateValue((prev) => ({
  //       ...prev,
  //       postVotes: batches.flat() as PostVote[],
  //     }));
  //   } catch (error) {
  //     console.log("getUserPostVotes Error", error);
  //   }
  // };

  // useEffect(() => {
  //   if (communityStateValue.snippetsFetched) buildNoUserHomeFeed();
  // }, [communityStateValue.snippetsFetched]);

  // useEffect(() => {
  //   if (!user && !loadingUser) buildNoUserHomeFeed();
  // }, [user, loadingUser]);

  // useEffect(() => {
  //   if (user && postStateValue.posts.length) getUserPostVotes();

  //   return () => {
  //     setPostStateValue((prev) => ({
  //       ...prev,
  //       postVotes: [],
  //     }));
  //   };
  // }, [user, postStateValue.posts]);

  return (
    <PageContent>
      <>
        <ProfileTopBar />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            <>
              
                  
            </>
          </Stack>
        )}
      </>
      <Stack spacing={5}>
       
      </Stack>
    </PageContent>
  );
}

export default MainContainer;
