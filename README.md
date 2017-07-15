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


```
cd app
cp env.js.tmpl env.js
```
Edit the `cfg/env.js` to set your settings. The file is self documented.

Then install, config, an start

```
npm i
npm config
npm start
```

The website is accessible at [http://localhost:8000/app/](http://localhost:8000/app/).




### Web install

1. make a [development platform](#development-platform)
2. build and deploy
```
npm rebuild
npm deploy
```

