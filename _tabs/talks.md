---
title: Talks
icon: fas fa-bullhorn
order: 1
---


Below you'll find a list of talks I have given at meetups and conferences. If you would like me to give a presentation at your meetup or conference, contact me!

---

### Why and how to Jenkins with PHP

October 4, 2018 @ [PHP Stockholm](https://www.meetup.com/php-stockholm/events/254879661/)

Can you tell how healthy your code is by looking at it? Do you continuously make sure it's doing well and make improvements for its well being? If you're not doing Continuous Integration (CI), the answer to these questions are probably no. Jenkins is the number 1 free and open source continuous integration platform and we'll take a look at how it plays nicely with our PHP applications, for happier and healthier code.

---

### The interface is dead, long live the interface!

March 7, 2018 @ [PHP Stockholm](https://www.meetup.com/php-stockholm/events/247514671/)

A talk on the culture of over architecturing that I have experienced emerging among Laravel developers. The talks focus was on stop using interfaces where they are unnecessary and mostly do more harm than good, and then discussing when they should be used.

---

### Guest lectures at Chas Academy

November 2-3, 2017 @ [Chas Academy](https://chasacademy.se/)

Two lectures at Chas Academy, an education for future full stack web developers in Stockholm. One lecture was about _deploying PHP applications_, best practices and tools on how to achieve a great and lasting deployment process. The other lecture consisted of the basics of _unit testing with PHPUnit_, how to get started with unit testing and TDD in the world of PHP.

---

### Deploying Symfony applications with Capifony

November 23, 2015 @ [Symfony NYC](http://www.meetup.com/Symfony-NYC/events/226057010/)

It should not be difficult, scary or time consuming to deploy your application. The key is automation and covering the important steps in your deploy process. This talk will be on general aspects of deployment and show how we can create a good and automated deploy process for Symfony applications using Capifony.


---

### Roll your own micro framework

September 7, 2015 @ [PHP Stockholm](http://www.meetup.com/php-stockholm/events/224760608/) &raquo; [slides](https://speakerdeck.com/modess/roll-your-own-micro-framework), [code](https://github.com/modess/micro-frameworks-talk)

Are micro frameworks the future? When you choose a framework your often have to make compromises and you couple your code to the framework itself. Let's explore how we can create our own micro framework we can tailor for our application's needs and how it fits well in a service oriented architecture.

<blockquote class="twitter-tweet" width="50%" lang="en"><p lang="en" dir="ltr">. <a href="https://twitter.com/niklasmodess">@niklasmodess</a> is going all technical on us about building a micro service <a href="https://twitter.com/hashtag/phpse?src=hash">#phpse</a> <a href="https://twitter.com/hashtag/sthlmtech?src=hash">#sthlmtech</a> <a href="http://t.co/UArKzPJnyK">pic.twitter.com/UArKzPJnyK</a></p>&mdash; Tobias Nyholm (@TobiasNyholm) <a href="https://twitter.com/TobiasNyholm/status/640947023554945025">September 7, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

### Deploying PHP Applications

November 14, 2014 @ [Symfony November Camp](http://www.symfony.se/november-camp/) &raquo; [feedback](https://joind.in/12540), [slides](http://www.slideshare.net/niklasmodess/deploying-php-applications-41590200)

> The world of PHP is very interesting right now and it has been catching up on best coding practices. It's time we bring our deploy processes up to par with this and start using best practices for it as well. So what are the goals for it and which steps can be taken to reach them? How can we make the process fit better into the more and more Agile world we live in?

This talk gives a theoretical overview for what to consider when setting up a deploy process for a PHP application. It covers areas such as agility, environments, automation, rollbacks, goals and maturity. I also wrote a [blog post](https://modess.io/so-i-spoke-at-a-conference/) on my experience giving this talk for the first time.

<blockquote class="twitter-tweet" width="50%" lang="en"><p>The deployment progress by <a href="https://twitter.com/niklasmodess">@niklasmodess</a> <a href="https://twitter.com/hashtag/NovemberCamp?src=hash">#NovemberCamp</a> <a href="http://t.co/PEXpTlLdip">pic.twitter.com/PEXpTlLdip</a></p>&mdash; Symfony Sverige (@symfonyse) <a href="https://twitter.com/symfonyse/status/533213303074750464">November 14, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

---

### Laravel's IoC Container

October 10, 2014 @ [Laravel Stockholm](http://www.meetup.com/Laravel-Stockholm/events/207408992/) &raquo; [slides](http://www.slideshare.net/niklasmodess/laravels-ioc-container)

Dependency injection and inversion of control are terms often used when we want to decouple code and write testable code. We take a look at how Laravel's IoC container and how it works to apply this to our code. It also covers how it's used for Laravel's internal components and what kind of awesome features provided by the framework that are available to us, such as service providers and interface bindings.

<iframe src="https://player.vimeo.com/video/108762932" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

---

### Deploying AngularJS applications with git hooks

March 25, 2014 @ [Stockholm AngularJS](http://www.meetup.com/Stockholm-AngularJS/events/165507582/)

When writing AngularJS applications we often rely on certain tools for building our application, such as concatenation or minification of files through Gulp or Grunt. Since we have these tools we could use them to automate deploys of our applications. This talk gives a brief explanation of what we want to achieve with our deploy process. Then it dives in to automating deploys with the use of git hooks and a live demo of a deploy to a remote server using `git push` only.

<img src="/public/images/talk-angularjs-git-hooks.jpg" width="50%" />
