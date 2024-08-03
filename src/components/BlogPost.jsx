import { HashLink } from "react-router-hash-link";
import styles from "./BlogPost.module.css";

function BlogPost({ post }) {
  return (
    <li className={styles.blog}>
      <div className={styles.blogImage}>
        <img src={post.imgUrl} alt="Blog postures" />
      </div>
      <HashLink to="/home" className={`${styles.hashLink}`}>
        <div className={styles.blogContent}>
          <h2>Meeting</h2>
          <div>
            <h3 className={styles.title}>{post.title}</h3>
            <div className={styles.postDate}>
              <span>Post by: {post.postedBy}</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </HashLink>
    </li>
  );
}

export default BlogPost;
