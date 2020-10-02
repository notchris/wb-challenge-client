# Whitebox Code Challenge - Client

## Self Review

### Client
For this challenge, I was asked to create a 2-page SPA to pull in product data from a server.

#### Framework Choice
I chose to use Vue  framework to help simplify routing and state management (to retain custom filters). I believe it was a good decision, however, applying multiple filters on computed properties and reactively updating the paginating proved to be tricker than I had thought. With more time, I would have cleaned up the filter implementation.

#### Bundle / Assets
The client site is served using Webpack, this makes development and reloading a breeze, however, because of the large amount of asset types (fonts, images, etc), there were some relative vs absolute path issues I had to fix. With more time I would like to revisit how assets are being served to evade these conflicts.

#### Data / Control decisions
The data being pulled is mock data, so the product fields do not exactly align with all the filters / options available in the template. Because of this, and to not get too focused on every detail, I removed the 'Sort by Color' filter on the All Products page as well as the option to sort by 'Popularity'. On the product details page, I did not update the 'Related Products' area. If I were to have more time, I would list products (in this scenario) by common tag or price range. Finally, on the product details page, I did not update the slider (it appeared to have no accompanying JS, but plugin-specific classes), so I simply loaded the static product image for the main image and thumbnails.

### Server
The server took less time to build, especially since their were only two main endpoints. I chose to use Express simply because I'm familiar with it and how it handles routing / request types. With more time, I would like to better handle different response statuses better, on both the server and client applications. For instance, a contextually styled message for when no products are found or if there was an error loading the product JSON.

### Final notes

For this challenge, I focused on not relying on additional packages (apart from Vue as a framework) to handle the 'hook-up' of the client-side components. In past situations, I would use a common component for pagination and data filtering, among other things. I'm happy that I got a refresher on applying filters and sorting data and overall I believe I met the goals of the challenge.


## Project setup
You will want to install both the client / server apps.
You can find the server here: ['Server Repo'](https://github.com/notchris/wb-challenge-server)

```
npm install
```

### Compiles and hot-reloads for development
```
npm run start
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
