import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals = [...(config.externals || []), "_http_common"];
        }

        return config;
    },
};

export default nextConfig;
