module.exports = {
  title: `Kwinten's Blog`,
  description: `My personal blog about Node.js, JavaScript, Cloud computing, and random stuff...`,
  author: `Kwinten`,
  introduction: `My personal blog about Node.js, JavaScript, Cloud computing, and random stuff...`,
  siteUrl: 'https://blog.imkwinten.com',
  social: {
    twitter: ``, // Your Twitter account
    github: ``, // Your GitHub account
    medium: `https://imkwinten.medium.com/`, // Your Medium account
    facebook: ``, // Your Facebook account
    linkedin: ``, // Your LinkedIn account
    instagram: ``, // Your Instagram account
  },
  icon: `content/assets/favicon/favicon-32x32.png`,
  keywords: [`blog`],
  comment: {
    disqusShortName: '', // Your disqus-short-name. check disqus.com.
    utterances: '', // Your repository for archive comment
  },
  configs: {
    countOfInitialPost: 10, // Config your initial count of post
  },
  sponsor: {
    buyMeACoffeeId: process.env.GATSBY_BUY_ME_COFFEE_ID,
  },
  share: {
    facebookAppId: '', // Add facebookAppId for using facebook share feature v3.2
  },
  ga: process.env.GATSBY_GA_TRACKING_ID, // Add your google analytics tranking ID
}
