"use client";

import BlogCardLarge from "@/components/BlogCardLarge";
import BlogCardSmall from "@/components/BlogCardSmall";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useDetails } from "@/contexts/DetailsContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    Container,
    Form,
    Row,
    Col,
    Button,
    InputGroup,
    Pagination,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const Index = () => {
    const { BASE_URL_API, services, companyDetails } = useDetails();
    const [blogsData, setBlogsData] = useState([]);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [popularCategories, setPopularCategories] = useState([]);
    const [blogCategories, setBlogCategories] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [query, setQuery] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const fetchBlogs = async () => {
        setLoading(true);
        let skip = (pageNo - 1) * perPage;
        if (skip < 0) skip = 0;

        const dataToSend = {
            skip: skip,
            per_page: perPage,
            match: query,
            IsActive: true,
            category: selectedCategories,
        };

        try {
            const response = await fetch(`${BASE_URL_API}/list/blog-cms`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });

            const data = await response.json();
            if (data.blogs.length > 0) {
                setBlogsData(data.blogs);
                setTotalPages(Math.ceil(data.total / perPage));
            } else {
                setBlogsData([]);
                setTotalPages(0);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setBlogsData([]);
        } finally {
            setLoading(false);
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

    const fetchPopularCategories = async () => {
        try {
            const response = await fetch(
                `${BASE_URL_API}/get-popular-categories/blog-cms?limit=5`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            const res = await response.json();

            if (res.isOk) {
                setPopularCategories(res.data);
            } else {
                setPopularCategories([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchBlogCategories = async () => {
        try {
            const response = await fetch(`${BASE_URL_API}/list/blog-category`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const res = await response.json();

            if (res.isOk) {
                setBlogCategories(res.data);
            } else {
                setBlogCategories([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategories((prev) => {
            if (categoryId === "") {
                return [];
            }
            return prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId];
        });
    };

    useEffect(() => {
        fetchRecentBlogs();
        fetchPopularCategories();
        fetchBlogCategories();
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [pageNo, selectedCategories]);

    useEffect(() => {
        setPageNo(1);
        fetchBlogs();
    }, []);

    const isLoading =
        !services.length ||
        !companyDetails ||
        !blogsData ||
        !recentBlogs ||
        !popularCategories ||
        !blogCategories;

    if (isLoading) {
        return <LoadingOverlay />;
    }

    const handleSearch = () => {
        setPageNo(1);
        fetchBlogs();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handlePageChange = (page) => {
        setPageNo(page);
    };

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
                        <Link href="/">Home</Link> &gt; <span>Blogs</span>
                    </span>
                </div>
            </div>

            <Container className="my-5">
                {/* Search Bar */}
                <Row className="justify-content-center">
                    <Col sm={12} md={7}>
                        <>
                            <Row className="mx-2 d-flex justify-content-between align-items-center">
                                <Col sm={12}>
                                    <InputGroup className="blog-search-container-mobile">
                                        <Form.Control
                                            type="text"
                                            placeholder="Search blogs..."
                                            value={query}
                                            onChange={(e) =>
                                                setQuery(e.target.value)
                                            }
                                            onKeyDown={handleKeyDown}
                                            className="blog-search-bar"
                                        />
                                        <Button
                                            variant="primary"
                                            onClick={handleSearch}
                                            className="blog-search-btn"
                                        >
                                            <FaSearch />
                                        </Button>
                                    </InputGroup>
                                </Col>
                                <Col sm={12} md={7} className="flex-grow-1">
                                    {popularCategories.length > 0 && (
                                        <div className="mb-4">
                                            <h5
                                                className="mb-2 popular-cat-title"
                                                style={{
                                                    color: "#003049",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Popular Categories
                                            </h5>
                                            <div
                                                className="d-flex flex-wrap gap-2 popular-cat-container"
                                                style={{
                                                    border: "1px solid #90EE90",
                                                    borderRadius: "30px",
                                                    padding: "5px",
                                                }}
                                            >
                                                {popularCategories.map(
                                                    (category) => (
                                                        <Button
                                                            key={category._id}
                                                            variant={
                                                                selectedCategories.includes(
                                                                    category._id
                                                                )
                                                                    ? "#90EE90"
                                                                    : "light"
                                                            }
                                                            style={{
                                                                color: "#003049",
                                                                fontWeight:
                                                                    "bold",
                                                                backgroundColor:
                                                                    selectedCategories.includes(
                                                                        category._id
                                                                    )
                                                                        ? "#90EE90"
                                                                        : "#e7e7e7",
                                                            }}
                                                            size="sm"
                                                            onClick={() =>
                                                                handleCategorySelect(
                                                                    category._id
                                                                )
                                                            }
                                                            className="rounded-pill"
                                                        >
                                                            {category.category}
                                                            {selectedCategories.includes(
                                                                category._id
                                                            ) && (
                                                                <span
                                                                    className="ms-2"
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        e.stopPropagation();
                                                                        handleCategorySelect(
                                                                            category._id
                                                                        );
                                                                    }}
                                                                >
                                                                    &#x2715;
                                                                </span>
                                                            )}
                                                        </Button>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </Col>
                                <Col sm={12} md={4} className="select-category">
                                    <select
                                        className="rounded-pill select-cat-item"
                                        style={{
                                            padding: "10px 20px",
                                            border: "1px solid #90EE90",
                                            backgroundColor: "white",
                                        }}
                                        onChange={(e) =>
                                            handleCategorySelect(e.target.value)
                                        }
                                        value={selectedCategories}
                                    >
                                        <option selected value="">
                                            Select Category
                                        </option>
                                        {blogCategories.map((category) => (
                                            <option
                                                key={category._id}
                                                value={category._id}
                                            >
                                                {category.category}
                                            </option>
                                        ))}
                                    </select>
                                </Col>
                            </Row>
                        </>
                        {loading ? (
                            <p className="loading-text">Loading blogs...</p>
                        ) : blogsData.length > 0 ? (
                            <>
                                {blogsData.map((blog) => (
                                    <BlogCardLarge blog={blog} key={blog._id} />
                                ))}

                                {/* Pagination */}
                                <Pagination className="justify-content-center mt-4">
                                    <Pagination.Prev
                                        onClick={() =>
                                            handlePageChange(pageNo - 1)
                                        }
                                        disabled={pageNo === 1}
                                    />
                                    {[...Array(totalPages).keys()].map(
                                        (num) => (
                                            <Pagination.Item
                                                key={num + 1}
                                                active={num + 1 === pageNo}
                                                onClick={() =>
                                                    handlePageChange(num + 1)
                                                }
                                            >
                                                {num + 1}
                                            </Pagination.Item>
                                        )
                                    )}
                                    <Pagination.Next
                                        onClick={() =>
                                            handlePageChange(pageNo + 1)
                                        }
                                        disabled={pageNo === totalPages}
                                    />
                                </Pagination>
                            </>
                        ) : (
                            <p className="no-blogs-message">
                                No blogs found. Try searching for something
                                else.
                            </p>
                        )}
                    </Col>
                    <Col sm={12} md={4}>
                        <InputGroup className="blog-search-container">
                            <Form.Control
                                type="text"
                                placeholder="Search blogs..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="blog-search-bar"
                            />
                            <Button
                                variant="primary"
                                onClick={handleSearch}
                                className="blog-search-btn"
                            >
                                <FaSearch />
                            </Button>
                        </InputGroup>
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

export default Index;
