import { useEffect, useState } from "react";

import { apiBase } from "../../services/apiBase/api";

import { PostType, CommentType, AuthorType } from "./types";
import styles from "./style.module.scss";

export function Post(props: PostType) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [author, setAuthor] = useState<AuthorType>({} as AuthorType);
  const [showComments, setShowComments] = useState<Boolean>(false);

  useEffect(() => {
    getComments(props.id);
    getAuthor(props.userId);
  }, []);

  async function getComments(postId: number) {
    try {
      const { data: comments } = await apiBase.get(`/posts/${postId}/comments`);

      if (!comments) return;

      setComments(comments);
    } catch (error) {
      console.error(`Não foi possível recuperar os comentários ${error}`);
    }
  }

  async function getAuthor(userId: number) {
    try {
      const { data: userData } = await apiBase.get(`/users/${userId}`);

      if (!userData) return;

      setAuthor(userData);
    } catch (error) {
      console.error(`Não foi possível achar o autor do post ${error}`);
    }
  }

  function toggleComments() {
    setShowComments(!showComments);
  }

  return (
    <li className={styles.card}>
      <span>{author.name}</span>
      <h1>{props.title}</h1>
      <p>{props.body}</p>

      <button
        onClick={toggleComments}
        className={showComments ? styles.buttonActive : ""}
      >
        <small>
          {!showComments ? "Visualizar comentários" : "Ocultar comentários"}{" "}
          {comments.length} comentários
        </small>
      </button>

      {showComments && (
        <div className={styles.comments}>
          {comments.map((comment) => (
            <div key={comment.id}>
              <h3>{comment.email}</h3>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}
