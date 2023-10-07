import { Stack } from "@chakra-ui/react";
import { query, collection, where, orderBy, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Community } from "../../atoms/CommunitiesAtom";
import { Post } from "../../atoms/PostAtom";
import { auth, firestore } from "../../firebase/clientApp";
import usePosts from "../../hooks/usePosts";
import PostItem from "./PostItem";
import PostLoader from "./PostLoader";

type PostsProps = {
  communityData: Community;
  userId?: string;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  // if user ?
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
 

 

  useEffect(() => {
   
  }, [communityData]);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          
        </Stack>
      )}
    </>
  );
};
export default Posts;
