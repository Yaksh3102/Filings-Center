import Link from "next/link";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import React from "react";
import { Card } from "react-bootstrap";

const BlogCardSmall = ({ blog }) => {
    return (
        <Card className="blog-card-small">
            <Link href={`/blogs/${blog._id}`} className="blog-card-small-link">
                <div className="blog-card-small-content">
                    <div className="blog-thumbnail">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${blog.banner}`}
                            alt={blog.title}
                            width={60}
                            height={60}
                            className="blog-card-small-img"
                        />
                    </div>

                    <div className="blog-info">
                        <h5 className="blog-title-small">{blog.title}</h5>
                        <div className="blog-meta">
                            <FaCalendarAlt className="blog-icon" />
                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </Card>
    );
};

export default BlogCardSmall;
