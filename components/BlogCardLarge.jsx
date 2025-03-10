import React from "react";
import { Card, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

const BlogCardLarge = ({ blog }) => {
    return (
        <Card className="blog-card mx-2 mb-5">
            <div className="blog-img-wrapper">
                <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/${blog.banner}`}
                    alt={blog.title}
                    width={400}
                    height={250}
                    className="blog-img"
                />
            </div>
            <Card.Body>
                <Card.Title className="blog-title">{blog.title}</Card.Title>
                <span className="blog-category">
                    {blog.categoryDetails?.category}
                </span>
                <Card.Text className="blog-description">
                    {blog.description}
                </Card.Text>
                <div className="blog-footer">
                    <div className="d-flex flex-column">
                        <span className="blog-date">
                            Published :{" "}
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        <span className="blog-date">
                            Updated :{" "}
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <Link href={`/blogs/${blog._id}`} passHref>
                        <Button className="read-more-btn">Read More</Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export default BlogCardLarge;
