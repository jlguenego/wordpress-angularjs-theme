Wordpress AngularJS Theme
=========================

Website example using the Wordpress JSON REST API to access wordpress content from an AngularJS SPA website.

TODO: Provide a demo link.

Installation
------------

### Development platform

```
git clone https://github.com/jlguenego/wordpress-angularjs-theme.git
cd wordpress-angularjs-theme
```

Edit the config file `app/config.js`
Copy the `cfg/env.js.tmpl` to `cfg/env.js`
Edit the `cfg/env.js` to set your settings. The file is self documented.

```
npm i
npm config
npm start
```



### Web install

1. make a [development platform](#Development-platform)
2. build and deploy
```
npm rebuild
npm deploy
```

