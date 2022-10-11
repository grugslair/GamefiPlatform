/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'grugslair.xyz',
      'styles.redditmedia.com',
      'lh3.googleusercontent.com',
      "grugslair.fra1.digitaloceanspaces.com",
    ]
  }
}

module.exports = nextConfig
