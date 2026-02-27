/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Compiler disabled (fix build error)
  
  // Security Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // HTTPS/SSL - Strict Transport Security
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // CSP - Content Security Policy (prevent XSS)
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' https: data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: data:; style-src 'self' 'unsafe-inline' https: data:; img-src 'self' https: data:; font-src 'self' https: data:; connect-src 'self' https: ws: wss:; frame-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self' https:; frame-ancestors 'self';"
          },
          // X-Frame-Options - prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          // X-Content-Type-Options - prevent MIME sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // X-XSS-Protection - enable XSS filter in older browsers
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Referrer-Policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()'
          },
          // Cross-Origin-Opener-Policy (COOP) for security
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups'
          },
          // Cross-Origin-Resource-Policy (CORP)
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin'
          },
          // Remove X-Powered-By header
          {
            key: 'X-Powered-By',
            value: ''
          },
          // X-DNS-Prefetch-Control
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'off'
          }
        ]
      }
    ]
  }
};

export default nextConfig;