import { useState, useEffect } from "react"
import { apiBase } from "../../services/apiBase/api"

import { Post } from "../posts"
import styles from "./styles.module.scss";

type PostProps = {
  id: number,
  userId: number,
  title: string,
  body: string
}

export function Timeline() {
  const [posts, setPosts] = useState<PostProps[]>([])

  useEffect(() => {
    getPosts()
  }, [])

  async function getPosts() {
    try {
      const { data: postsData } = await apiBase.get('/posts')
      
      if (!postsData) return
  
      setPosts(postsData)
    } catch (error) {
      console.log(`Erro ao buscar os posts: ${error}`)
    }
  }

  return (
    <ul className={styles.container}>
      {posts.map(post => (
        <Post 
          key={post.id}
          id={post.id}
          userId={post.userId}
          title={post.title}
          body={post.body}
        />
      ))}
    </ul>
  )
}