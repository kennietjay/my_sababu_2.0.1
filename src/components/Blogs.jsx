import BlogPost from "./BlogPost";
import styles from "./Blogs.module.css";

const posts = [
  {
    id: 1,
    postedBy: "Admin",
    imgUrl: "/images/sb-2023-agm-members-1.jpg",
    title: "Why A Community Scheme Is Crucial for our Community",
    author: "Amara Tamia",
    postedDate: "",
    views: 121,
    comments: 40,
    likes: 70,
  },
  {
    id: 2,
    postedBy: "Admin",
    imgUrl: "/images/sb-2023-agm-members-4.jpg",
    title: "Showing solidarity with a grieving family",
    author: "Amit Azurath",
    postedDate: "",
    views: 10,
    comments: 2,
    likes: 7,
  },
  {
    id: 3,
    postedBy: "Admin",
    imgUrl: "/images/sb-2023-agm-members-2.jpg",
    title: "Sababu Fund for your family",
    author: "Hassan Sesay",
    postedDate: "",
    views: 21,
    comments: 8,
    likes: 13,
  },
];

function Blogs() {
  return (
    <section className={`${"section sectionLayout"}`}>
      <p className={`${"intro"}`}>Blogs & news</p>
      <div className={styles.blogList}>
        <h1 className={`${"headingSecondary"}`}>News and Blogs</h1>
        <ul className={`${"grid gridThreeCol"} ${styles.blogLayout}`}>
          {posts.map((post) => (
            <BlogPost post={post} key={post.id} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Blogs;
