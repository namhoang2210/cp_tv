import { FC } from "react";
import { Comments, FacebookProvider } from 'react-facebook';
interface CommentProps {
    movieId: string
    episodeIndex: number | undefined
  }
const Comment: FC<CommentProps> = ({ movieId, episodeIndex }) => {
  console.log(movieId);
  
  return (
    <div className="mt-10 w-ful">
      <h1 className="text-2xl my-3">Bình luận</h1>
    <div className="bg-gray-100 rounded-lg">
      <FacebookProvider appId="1020036582169543">
      <Comments width="100%" numPosts={3} mobile={true} href={`https://chuppytv.vercel.app/${episodeIndex ? 'tv' : 'movie'}/${movieId}/${episodeIndex ? episodeIndex : "" }`} />
      </FacebookProvider>
    </div>
    </div>
  );
};

export default Comment;
