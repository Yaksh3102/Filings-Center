import { useRouter } from "next/router";
import React, { useEffect } from "react";

const index = () => {
    const router = useRouter();

    useEffect(() => {
        if(router)
        router.back();
    }, [router]);

    return <div>Not Allowed</div>;
};

export default index;
