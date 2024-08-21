import { HashLink } from "react-router-hash-link";
import styles from "./BlogPost.module.css";

function BlogPost({ post }) {
  return (
    <li className={styles.blog}>
      <HashLink to={post.url} className={`${styles.hashLink}`}>
        <div className={styles.blogImage}>
          <img src={post.imgUrl} alt="Blog postures" />
        </div>
        <div className={styles.blogContent}>
          <h2>{post.type}</h2>
          <div>
            <h3 className={styles.title}>{post.title}</h3>
            <div className={styles.postDate}>
              <span>Post by: {post.postedBy}</span>
              <span>{post.postedDate}</span>
            </div>
          </div>
        </div>
      </HashLink>
    </li>
  );
}

export default BlogPost;
