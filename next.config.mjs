/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(?:js|ts)$/,
      include: [/node_modules\/(undici)/],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
            plugins: [
              '@babel/plugin-transform-private-property-in-object',
              '@babel/plugin-transform-private-methods',
            ],
          },
        },
      ],
    })
    return config
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/links',
        permanent: true,
      },
    ]
  },
}

if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

export default nextConfig
