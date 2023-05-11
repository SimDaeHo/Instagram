import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { getUserForProfile } from "@/service/user";
import { notFound } from "next/navigation";

type Props = { params: { username: string } };
export default async function Userpage({ params: { username } }: Props) {
  const user = await getUserForProfile(username);

  if (!user) {
    notFound();
  }

  return (
    <>
      <UserProfile user={user} />;
      <UserPosts user={user} />
    </>
  );
}
