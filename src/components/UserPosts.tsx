"use client";
import { ProfileUser } from "@/model/user";
import { useState } from "react";
import useSWR from "swr";
import PostIcon from "./ui/icons/PostIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";

type Props = {
  user: ProfileUser;
};
const tabs = [
  { type: "posts", icon: <PostIcon /> },
  { type: "saved", icon: <BookmarkIcon className="w-3 h-3" /> },
  { type: "liked", icon: <HeartIcon className="w-3 h-3" /> },
];

export default function UserPosts({ user: { username } }: Props) {
  const [tab, setTab] = useState("saved");
  const { data: posts, isLoading, error } = useSWR(`/api/users/${username}/${tab}`);
  console.log(posts);
  return (
    <section>
      <ul>
        {tabs.map(({ type, icon }) => (
          <li key={type}>
            <button>{icon}</button>
            <span>{type}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
