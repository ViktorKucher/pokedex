/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler:{
        styledComponents: true
    },
    images: {
        domains: ['lh3.googleusercontent.com','raw.githubusercontent.com'],
      },
}

module.exports = nextConfig
