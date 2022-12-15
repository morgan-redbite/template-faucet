import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Securo Faucet Portal`,
    description: `Securo makes your DeFi development process effortless. Use your existing development framework to access any DeFi protocols with REST APIs.`,
    twitterUsername: `@securo_dev`,
    image: `https://uploads-ssl.webflow.com/6290cf3a53480a66812736a9/6374660ff4b1daf35be445a8_image%203.png`,
    siteUrl: `https://faucet.securo.dev`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ['gatsby-plugin-mantine', `gatsby-plugin-provide-react`, 'gatsby-plugin-postcss', `gatsby-plugin-sass`,
  {
    resolve: "gatsby-plugin-react-svg",
    options: {
      rule: {
        include: /assets/
      }
    }
  }
  ],
}

export default config
