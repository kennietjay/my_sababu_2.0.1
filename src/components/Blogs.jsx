import BlogPost from "./BlogPost";
import styles from "./Blogs.module.css";

const posts = [
  {
    id: 1,
    postedBy: "Admin",
    imgUrl: "/images/sb-2023-agm-members-1.jpg",
    title: "Supporting Our Community with Empathy and Resources",
    author: "Amara Tamia",
    postedDate: "8/7/2024",
    type: "News Letter",
    views: 121,
    comments: 40,
    likes: 70,
    url: "https://sababufund.org/home/newsletters/welcome#top",
  },
  {
    id: 2,
    postedBy: "Admin",
    imgUrl: "/images/sb-2023-agm-members-4.jpg",
    title: "Showing solidarity with a grieving family",
    author: "Amit Azurath",
    postedDate: "6/20/2024",
    type: "News Letter",
    views: 10,
    comments: 2,
    likes: 7,
    url: "https://sababufund.org/home/newsletters/showing-solidarity#top",
  },
  {
    id: 3,
    postedBy: "Admin",
    imgUrl: "/images/sb-2023-agm-members-2.jpg",
    title: "Sababu Fund for your family",
    author: "Hassan Sesay",
    postedDate: "4/21/2024",
    type: "Blog",
    views: 21,
    comments: 8,
    likes: 13,
    url: "https://sababufund.org/home/newsletters/sababu-for-you#top",
  },
];

function Blogs() {
  return (
    <section className={`${"section sectionLayout"}`}>
      <p className={`${"intro"}`}>News & Blogs</p>
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
