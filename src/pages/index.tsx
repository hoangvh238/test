import { Stack } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { Post, Like } from "../atoms/PostAtom";
import CreatePostLink from "../components/Community/CreatePostLink";
import PersonalHome from "../components/Community/PersonalHome";
import Premium from "../components/Community/Premium";
import Recommendation from "../components/Community/Recommendation";
import PageContent from "../components/Layout/PageContent";
import PostItem from "../components/posts/PostItem";
import PostLoader from "../components/posts/PostLoader";
import { auth, firestore } from "../firebase/clientApp";
import useCommunityData from "../hooks/useCommunityData";
import usePosts from "../hooks/usePosts";
import { getAllPost } from "../../apis/posts";
import PostRead from "@/components/Post/Post";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Home: NextPage = () => {
  const user = useSelector((state:RootState)=> state.userInfor.currentUser);
  console.log(user);
  
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();
  const { communityStateValue } = useCommunityData();

  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postData = await getAllPost();
      setPostStateValue((prev) => ({
        ...prev,
        posts: postData.data as Post[],
      }));
    } catch (error) {
      console.error("BuildNoUserHome", error);
    }
    setLoading(false);
  };

  const getUserPostVotes = async () => {
    // Implement this function if needed
  };

  // useEffect(() => {
  //   if (communityStateValue.snippetsFetched) buildNoUserHomeFeed();
  // }, [communityStateValue.snippetsFetched]);
  useEffect(() => {
    buildNoUserHomeFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  // useEffect(() => {
    
  //   if (user && postStateValue.posts.length) buildNoUserHomeFeed();

  //   return () => {
  //     setPostStateValue((prev) => ({
  //       ...prev,
  //       postVotes: [],
  //     }));
  //   };
  // }, [user, postStateValue.posts]);


console.log(postStateValue);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Head>
        <title>Reddit Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/header.png" />
      </Head>
      <PageContent>
        <>
          <CreatePostLink />
          {loading ? (
            <PostLoader />
          ) : (
            <Stack>
              {postStateValue.posts.map((post, index) => {
                // Check if post.postVotes is defined before using reduce
                const votesAmt = post.likes ? post.likes.reduce((acc, vote) => {
                  if (vote.status === 1) return acc + 1;
                  if (vote.status === -1) return acc - 1;
                  return acc;
                }, 0) : 0;

                const currentVote = post.likes?.find((like) => like.auth === user.userName);


                return (
                  
                  <PostItem
                    key={index}
                    post={post}
                    userIsCreator={user?.userName === post.author}
                    userVoteValue={currentVote?.status}
                    onVote={onVote}
                    onSelectPost={onSelectPost}
                    onDeletePost={onDeletePost} votesAmt={votesAmt} commentAmt={post.comments.length}             
                       />
                )
              })}
            </Stack>
          )}
        </>
        <Stack spacing={5}>
          <Recommendation />
          <Premium />
          <PersonalHome />
        </Stack>
      </PageContent>
    </motion.div>
  );
};

export default Home;
