import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "5000",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "upergilzjtwdbdkxnmfm.supabase.co",
                port: "",
                pathname: "/storage/v1/object/public/**",
            },
        ],
    },
};

export default nextConfig;
