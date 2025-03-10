import BlogCardSmall from "@/components/BlogCardSmall";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useDetails } from "@/contexts/DetailsContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const BlogDetails = () => {
    const { BASE_URL_API } = useDetails();
    const router = useRouter();
    const { _id } = router.query;

    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [recentBlogs, setRecentBlogs] = useState([]);

    const fetchBlog = async (id) => {
        try {
            const res = await fetch(
                `${BASE_URL_API}/get-with-related/blog-cms/${id}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            const response = await res.json();
            if (response.isOk) {
                setBlog(response.data.blog);
                setRelatedBlogs(response.data.relatedBlogs);
            } else {
                setBlog(null);
                setRelatedBlogs([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchRecentBlogs = async () => {
        try {
            const response = await fetch(
                `${BASE_URL_API}/get-recent/blog-cms?limit=5`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            const res = await response.json();

            if (res.isOk) {
                setRecentBlogs(res.blogs);
            } else {
                setRecentBlogs([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRecentBlogs();
    }, []);

    useEffect(() => {
        if (_id) {
            fetchBlog(_id);
        }
    }, [_id]);

    const isLoading = !blog;

    if (isLoading) {
        return <LoadingOverlay />;
    }

    return (
        <>
            <div className="about-header">
                <Container>
                    <div className="about-header-content">
                        <h1 className="about-header-title">Blogs</h1>
                    </div>
                </Container>

                <div className="breadcrumb-container">
                    <span className="breadcrumb-pill">
                        <Link href="/">Home</Link> &gt;{" "}
                        <Link href="/blogs">Blogs</Link>
                    </span>
                </div>
            </div>

            <Container className="my-5">
                <Row>
                    {/* Main Blog Section */}
                    <Col md={8}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${blog?.banner}`}
                            alt={blog.title}
                            width={800}
                            height={400}
                            className="blog-img-main"
                        />
                        <h1 className="blog-title">{blog.title}</h1>
                        <p className="blog-meta-single mt-3">
                            <div className="d-flex gap-5">
                                <p>
                                    Published on -{" "}
                                    <span className="date">
                                        {new Date(
                                            blog.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </p>
                                <p>
                                    Updated on -{" "}
                                    <span className="date">
                                        {new Date(
                                            blog.updatedAt
                                        ).toLocaleDateString()}
                                    </span>
                                </p>
                            </div>
                            <p>
                                Category:{" "}
                                <span className="category">
                                    {blog.category?.category}
                                </span>
                            </p>
                        </p>
                        <div
                            className="blog-content"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        ></div>
                    </Col>

                    {/* Related Posts Section */}
                    <Col md={4}>
                        {relatedBlogs.length > 0 && (
                            <div className="recent-blogs mt-5">
                                <h4 className="recent-blogs-title mb-3">
                                    Related Posts
                                </h4>
                                {relatedBlogs.map((blog) => (
                                    <BlogCardSmall blog={blog} key={blog._id} />
                                ))}
                            </div>
                        )}

                        <div className="recent-blogs mt-5">
                            <h4 className="recent-blogs-title mb-3">
                                Recent Posts
                            </h4>
                            {recentBlogs.length > 0 ? (
                                recentBlogs.map((blog) => (
                                    <BlogCardSmall blog={blog} key={blog._id} />
                                ))
                            ) : (
                                <p className="no-blogs-message">
                                    No recent blogs available.
                                </p>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default BlogDetails;
