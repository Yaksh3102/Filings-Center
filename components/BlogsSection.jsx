import { useDetails } from "@/contexts/DetailsContext";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BlogCardSmall from "./BlogCardSmall";
import Link from "next/link";

const BlogsSection = ({blogsData}) => {
    const { BASE_URL_API } = useDetails();
    const [recentBlogs, setRecentBlogs] = useState([]);

    const fetchRecentBlogs = async () => {
        try {
            const response = await fetch(
                `${BASE_URL_API}/get-recent/blog-cms?limit=3`,
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

    return (
        <Container className="my-5">
            <Row className="gap-5">
                <Col md={6} className="my-5">
                    <div dangerouslySetInnerHTML={{__html:blogsData?.content}}></div>
                </Col>
                <Col md={5}>
                    <div className="recent-blogs">
                        <div className="">
                            <h4 className="d-flex justify-content-between align-items-center recent-blogs-title mb-3">
                                <p>Recent Posts</p>
                                <Link className="view-all-btn" href={"/blogs"}>
                                    View All
                                </Link>
                            </h4>
                        </div>
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
    );
};

export default BlogsSection;
