import { FullPost, SimplePost } from "@/model/post";
import Image from "next/image";
import userSWR from "swr";
import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";
import Avatar from "./Avatar";

type Props = {
  post: SimplePost;
};
export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes } = post;
  const { data } = userSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;

  return (
    <section>
      <div className="relative">
        <Image src={image} alt={`photo by ${username}`} priority fill sizes="650px" />
      </div>
      <div>
        <PostUserAvatar image={userImage} username={username} />
        <ul>
          {comments &&
            comments.map(({ image, username: commentUsername, comment }, index) => (
              <li key={index}>
                <Avatar image={image} size="small" highlight={commentUsername === username} />
                <div>
                  <span>{commentUsername}</span>
                  <span>{comment}</span>
                </div>
              </li>
            ))}
        </ul>
        <ActionBar likes={likes} username={username} createdAt={createdAt} />
        <CommentForm />
      </div>
    </section>
  );
}
