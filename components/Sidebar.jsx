// components/Sidebar.js
import { Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import { IoPersonCircle } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import Link from "next/link";

export default function Sidebar() {
    const router = useRouter();

    return (
        <div className="d-flex flex-column gap-3 dashboard-sidebar">
            <Link
                href={"/dashboard/profile"}
                style={{
                    cursor: "pointer",
                    backgroundColor:
                        router.pathname === "/dashboard/profile"
                            ? "#0020382c"
                            : "",
                }}
                className="d-flex align-items-center text-decoration-none gap-2 dashboard-link"
            >
                <IoPersonCircle size={22} />
                PROFILE
            </Link>
            <Link
                href={"/dashboard/orders"}
                style={{
                    cursor: "pointer",
                    backgroundColor:
                        router.pathname.startsWith("/dashboard/orders")
                            ? "#0020382c"
                            : "",
                }}
                className="d-flex align-items-center text-decoration-none gap-2 dashboard-link"
            >
                <TbTruckDelivery size={22} />
                ORDERS
            </Link>
        </div>
    );
}
