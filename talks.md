---
layout: page
title: Talks
icon: fa-bullhorn
---

Below you'll find a list of talks I have given at meetups and conferences. If you would like me to give a presentation at your meetup or conference, hit me up with an [e-mail](mailto:niklas@modess.io).

---

### Deploying PHP Applications

November 14, 2014 @ [Symfony November Camp](http://www.symfony.se/november-camp/) | [feedback](https://joind.in/12540), [slides](http://www.slideshare.net/niklasmodess/deploying-php-applications-41590200)

> The world of PHP is very interesting right now and it has been catching up on best coding practices. It's time we bring our deploy processes up to par with this and start using best practices for it as well. So what are the goals for it and which steps can be taken to reach them? How can we make the process fit better into the more and more Agile world we live in?

This talk gives a theoretical overview for what to consider when setting up a deploy process for a PHP application. It covers areas such as agility, environments, automation, rollbacks, goals and maturity. I also wrote a [blog post](http://modess.io/2014/11/15/so-i-spoke-at-a-conference/) on my experience giving this talk for the first time.

<blockquote class="twitter-tweet" width="50%" lang="en"><p>The deployment progress by <a href="https://twitter.com/niklasmodess">@niklasmodess</a> <a href="https://twitter.com/hashtag/NovemberCamp?src=hash">#NovemberCamp</a> <a href="http://t.co/PEXpTlLdip">pic.twitter.com/PEXpTlLdip</a></p>&mdash; Symfony Sverige (@symfonyse) <a href="https://twitter.com/symfonyse/status/533213303074750464">November 14, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

---

### Laravel's IoC Container

October 10, 2014 @ [Laravel Stockholm](http://www.meetup.com/Laravel-Stockholm/events/207408992/) | [slides](http://www.slideshare.net/niklasmodess/laravels-ioc-container)

Dependency injection and inversion of control are terms often used when we want to decouple code and write testable code. We take a look at how Laravel's IoC container and how it works to apply this to our code. It also covers how it's used for Laravel's internal components and what kind of awesome features provided by the framework that are available to us, such as service providers and interface bindings.

<img src="/public/img/talk-laravels-ioc-container.jpeg" width="50%" />

---

### Deploying AngularJS applications with git hooks

March 25, 2014 @ [Stockholm AngularJS](http://www.meetup.com/Stockholm-AngularJS/events/165507582/)

When writing AngularJS applications we often rely on certain tools for building our application, such as concatenation or minification of files through Gulp or Grunt. Since we have these tools we could use them to automate deploys of our applications. This talk gives a brief explanation of what we want to achieve with our deploy process. Then it dives in to automating deploys with the use of git hooks and a live demo of a deploy to a remote server using `git push` only.

<img src="/public/img/talk-angularjs-git-hooks.jpg" width="50%" />