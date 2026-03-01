import { useParams, Link } from "react-router-dom";
import "../App.css";
import "../index.css";
import { formatDate } from "../utils/formatDate";
import { useState, useEffect } from "react";

type Post = {
  id: string;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdAt: string;
  categories: string[];
};

export default function PostsDetail() {
  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [post, setPostDetail] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true); //読み込み中の状態管理

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(
          `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`,
        );
        const data = await res.json();
        setPostDetail(data.post);
      } catch (e) {
        console.log(e);
        setError("エラーが発生しました");
      } finally {
        setIsLoading(false);
      }
    };

    fetcher();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <p>ローディング中...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8">
        <p className="text-red-600">{error}</p>
        <Link to="/" className="text-blue-600">
          一覧へ戻る
        </Link>
      </div>
    );
  }

  if (!post) return <div>データがありません</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white">
      <img
        src={post.thumbnailUrl}
        className="w-full h-auto object-cover mb-4"
      />
      <div className="text-black">
        <p className="text-sm text-gray-600">
          {formatDate(post.createdAt)}, {post.categories}
        </p>
        <h1 className="font-bold text-2xl my-4">{post.title}</h1>
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
        <Link to="/">
          <p className="text-blue-600 mb-8">一覧へ戻る</p>
        </Link>
      </div>
    </div>
  );
}
