# YourHealthy.city : About the App

## Inspiration
Picture this: You are walking down the street and you start to get hungry. You've been trying to eat healthy late and have started a diet. However, as you walk down this street, all you see are fast food restaurants, and other places where you aren't sure if they have meals that fit your diet.

Introducing **[YourHealthy.City](http://YourHealthy.City)** ! An easy, and intuitive way to find meals that meet your specific dietary needs.

![App Icon in Launcher](https://challengepost-s3-challengepost.netdnassl.com/photos/production/software_photos/000/471/065/datas/gallery.jpg) ![HealthyCity app](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/000/471/066/datas/gallery.jpg) ![HealthyCity on Desktop](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/000/471/086/datas/gallery.jpg)

## What it does
When you first open [YourHealthy.City](http://YourHealthy.City), you are asked to enter parameters (Calories, Carbohydrates(g), Proteins(g) and Fats(g)),  as to what you need/want in your meal. The app then finds restaurants nearby and gives you ratings to tell you if their meal is close to meeting your requirements. 

When in the map view, Pins will appear to mark the nearby restaurants, color-coded by how their meals compare to your requirements. A **red** pin means that the restaurant has no meals that are close to the needs you specified, **yellow** means its has at least one meal that is close to satisfying your needs, and **green** means it has at least one meal that almot perfectly matches your meal requirements. 

Now that you have found your restaurant, its time to pick your meal! Tapping/clicking on the pin opens a details view for the given restaurant. It lists details about it, as well as lists the meals it offers with ratings on how the compare to your requirements. Ratings are measured between 0 and 5 apples, 0 being the furthest from your needs, 5 meaning exactly what you need. 

And thats it! You are now ready to take on that diet with one more tool to help you succeed in meeting your goals.
## How We built it
The app was written in Javascrip using a Node.JS server and a MongoDB databse. We chose these options so that we could quickly create a working prototype to demonstrate our proof of concept. 
## What's next for YourHealthy.City
We have big plans for our application! 

The first improvement we want to make is improve the client facing side of the app, by adding photos of the restaurants we list, as well as photos of the meals that each restaurant offers. We also want to implement an administrative portal for restaurants to manage their listing

**But how do I make money??** - Kevin O'Leary

Well kev, as with any search-based application, there is always ways to make money. With our app, the easiest way to do so is to implement ways for the restaurants to promote themselves, such as prioritized listings, or advertising of promotions. 

Our goal is to build the brand so that we can eventually charge restaurants to list themselves on the app, thus generating even more revenue from our application.

So, with a brand build, and plenty of money-making potential, we believe that [YourHealthy.City](http://YourHealthy.City) will become an excellent way to help people get healthy and stay healthy.

After all, **A healthy city, is a smart city**

##Find out more : 
[GoogleSlides Presentation](https://docs.google.com/presentation/d/1nl8f_ICTYGokdCP4vbV6s1vtar2Dyv_n5xcpWL2FWgI/edit?usp=drivesdk)

# YourHealthy.City : Installation

## Getting Started
1- `git clone https://github.com/skiracerdude/hackatown2017.git`

2- Install [NodeJS](https://nodejs.org/en/)

3- Go inside directory `cd hackatown2017`

4- Install "nodemon" for live reload `npm install -g nodemon`

5- Run the server using nodemon `nodemon index.js`

6- Browse your app on `localhost:5000` !


# node-js-getting-started

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone git@github.com:heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
