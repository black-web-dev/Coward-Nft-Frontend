const { ChainId } = require('@sushiswap/core-sdk')
// const defaultTheme = require('tailwindcss/defaultTheme')

// const { screens } = defaultTheme

/** @type {import('next').NextConfig} */

module.exports = {
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Uncoment to add domain whitelist
  images: {
    loader: 'akamai',
    path: '',
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
  network: {
    chainIds: [ChainId.ETHEREUM, ChainId.ARBITRUM],
    defaultChainId: ChainId.ETHEREUM,
    domains: [
      {
        domain: 'som.ovh',
        defaultChainId: ChainId.ETHEREUM,
      },
      // {
      //   domain: 'sonofmars.io',
      //   defaultChainId: ChainId.ARBITRUM,
      // },
    ],
  },
  publicRuntimeConfig: {
    // breakpoints: screens,
  },
  env: {
    PORT: 8000,
    NEXT_PUBLIC_NETWORK: 'https://etherscan.io',
    NEXT_PUBLIC_TEST_NETWORK: 'https://rinkeby.etherscan.io',
    NEXT_PUBLIC_RPC_URL: 'https://mainnet.infura.io/v3/',
    NEXT_PUBLIC_TEST_RPC_URL: 'https://rinkeby.infura.io/v3/',
    NEXT_PUBLIC_MULTICALL: '',
    NEXT_PUBLIC_MULTICALL_DIVISOR: ''
  },
  distDir: 'build',
};
