---
title: "Strapi beta version set default file upload provider to AWS S3 / Google Cloud Storage (GCS) / Cloudinary"
featuredImage: strapi-beta-version-default-upload-provider.png
tags: ['node.js', 'CMS', 'strapi', 'strapi-beta']
canonicalUrl: "https://blog.imkwinten.com/article/Strapi-beta-version-set-default-file-upload-provider-to-AWS-S3-Google-Cloud-Storage-(GCS)-Cloudinary"
date: 2020-04-14 22:04:00
draft: false
status: draft
---

![](./strapi-beta-version-default-upload-provider.png)

### For Strapi version 3.0.0-beta.19.5 or before
----------
Recently I am exploring the features of one of the most famous headless CMS open-source platforms — Strapi. 
In case you are new to Strapi, here is a short description of them

> Strapi comes from the word Bootstrap, and helps Bootstrap your API

Strapi is a flexible, open-source Headless CMS that allows you to create content-type with several clicks and it will prepare all the needed schema, ORM and generated some handy predefined APIs for you.

#### Set default file upload provider as Cloudinary

By default, Strapi will use a plugin called *strapi-plugin-upload-local* which will upload files to your local file system.

If you are deploying your Strapi application to Heroku and looking for a workaround for its [ephemeral file system](https://devcenter.heroku.com/articles/dynos#ephemeral-filesystem) nature which doesn’t persist your files after restarting the server, you can change your file upload provider to some other cloud storage providers.

Currently, there are 3 options available from the official Strapi team:

1. [Cloudinary](https://www.npmjs.com/package/strapi-provider-upload-cloudinary)

1. [AWS S3](https://www.npmjs.com/package/strapi-provider-upload-aws-s3)

1. [Rackspace](https://www.npmjs.com/package/strapi-provider-upload-rackspace)

You can also check out other community plugins [here](https://www.npmjs.com/search?q=strapi-provider-upload-).

After you have installed the plugin and follow through the [guide](https://strapi.io/documentation/3.0.0-beta.x/plugins/upload.html#install-providers). You would be able to change your file plugin provider by using the admin panel UI.

But in case you don’t want to do it manually and instead, you would like to change the default provider, this article will go through the process using Cloudinary as an example

#### Steps

1. Install the plugin using npm or yarn

```bash
yarn add strapi-provider-upload-cloudinary
// OR
npm install --save strapi-provider-upload-cloudinary
```

2. Copy below code snippet to your config/functions/bootstrap.js

```javascript
"use strict";

const isFirstRun = async () => {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: "type",
    name: "setup",
  });
  const initHasRun = await pluginStore.get({ key: "initHasRun" });
  await pluginStore.set({ key: "initHasRun", value: true });
  return !initHasRun;
};

const setDefaultFileUploader = async () => {
  if (strapi.config.environment !== "production") {
    return;
  }
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: "plugin",
    name: "upload",
  });
  const config = await pluginStore.get({ key: "provider" });
  await pluginStore.set({
    key: "provider",
    value: {
      ...config,
      ...{
        provider: "cloudinary",
        name: "Cloudinary",
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      },
    },
  });
};

module.exports = async () => {
  const shouldInit = await isFirstRun();
  if (shouldInit) {
    await setDefaultFileUploader();
  }
};
```

Let me explain a bit the code here.

Strapi will run the bootstrap.js whenever the application is started.

The `isFirstRun` method here will detect whether it is the first time running your Strapi application. This method is shared by **Maxime Castres’s** article [here](https://strapi.io/blog/build-a-blog-with-react-strapi-and-apollo).

It is a good place to set the default file upload provider!

The `setDefaultFileUploader` method here will check if the current running environment is production, and then get the existing file upload config and override it with the settings required for Cloudinary.

```bash
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET,
```

You can set this Node environment variables with dotenv or if you are deploying it to Heroku, you can set environment variables using

```bash
heroku config:set CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
heroku config:set CLOUDINARY_API_KEY=YOUR_API_KEY
heroku config:set CLOUDINARY_API_SECRET=YOUR_API_SECRET
```

And that’s it! Enjoy!

![](./photo-1471560090527-d1af5e4e6eb6.jpeg)

Photo by [Drew Coffman](https://unsplash.com/@drewcoffman/?utm_source=Kwinten_Blog&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=Kwinten_Blog&utm_medium=referral)


----------

*This article [originally posted](https://blog.imkwinten.com/article/Strapi-beta-version-set-default-file-upload-provider-to-AWS-S3-Google-Cloud-Storage-(GCS)-Cloudinary?utm_source=medium&utm_medium=referral) on [my personal blog](https://blog.imkwinten.com/?utm_source=medium&utm_medium=referral) where I shared different topics on Node.js, Cloud computing, and other interesting stuff.*
