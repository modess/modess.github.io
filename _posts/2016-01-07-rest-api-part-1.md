---
layout: post
title: "PHP micro framework for your REST API – Part 1: Selection"
description: Picking a PHP micro framework for your REST API can feel overwhelming. So many available frameworks are available. This will guide you through the jungle.
permalink: /php-micro-framework-for-a-restful-api-part-1/
---

With the large number of frameworks that exists today, picking the right one for your next project can feel overwhelming. To make things easier for you when choosing your PHP micro framework, I want to take an in-depth at the available micro frameworks that you can build your next REST API with. I’ll try to make a fair and unbiased review of them based on their pros and cons. I’ll not be discussing on how you should build your API, I leave that to _Phil Sturgeon_ and I can’t recommend his excellent book, [Build APIs You Won’t Hate](https://apisyouwonthate.com/), enough.

<!-- more -->

I’ve seen a few of these comparisons around on the interwebs, but find them very contradictory. They are usuallyally named something click-batey like _“10 best and most amazing X for 2016 that will make you shit bricks!”_. Then 7–8 of them are denounced as utter garbage and that you shouldn’t use them. This isn’t the approach I want to take here. I want to show my selection process before I get to the actual comparison. This is how I would approach it if I had to make a decision.

For comparison of these frameworks I often see a big focus on the performance metric. I’m not going to argue it’s a bad metric, but to me there are more important factors since most of the micro frameworks will be fast to a certain degree. So I’m going to ignore that metric in my comparison and take the ignorant _“it probably is fast enough”_-approach, ignorance is truly bliss sometimes. And I also don’t think that _“we chose this framework because it can handle a gazillion of requests per second”_ is a good argument except in some very edgy edge cases. A great PHP micro framework delivers a lot more than performance in my opinion.

This is the first part of this series where I’ll gather all possible candidates I can find and run them through the list of what I consider important. Some will fall off, some will stay on, and in the end I can give my judgment on the ones that lasted until the bitter end. **I have found 26 different micro frameworks**. Here is a list of all of them in no order what so ever. [Wave](http://www.waveframework.com/), [Zaphpa](http://zaphpa.org/), [Bullet PHP](http://bulletphp.com/), [One PHP](http://oneframework.net/), [Tonic](http://www.peej.co.uk/tonic/), [Silex](http://silex.sensiolabs.org/), [Slim](http://www.slimframework.com/), [Phalcon](https://phalconphp.com/), [Limonade](http://limonade-php.github.io/), [Lumen](https://lumen.laravel.com/), [Fat-Free Framework](http://fatfreeframework.com/home), [Flight](http://flightphp.com/), [Jolt](https://github.com/freekrai/jolt), [Aura](http://auraphp.com/), [Epiphany](https://github.com/jmathai/epiphany), [FRAPI](http://frapi.github.io/), [Zend Expressive](https://zendframework.github.io/zend-expressive/), [Respect/Rest](https://github.com/Respect/Rest), [Swiftlet](https://github.com/AliasIO/Swiftlet), [PolyFrameWork](http://polymedio.github.io/polyframework/), [Nanite](http://nirix.github.io/nanite/), [MicroMVC](https://github.com/Xeoncross/micromvc), [Hackwork](https://github.com/ZDroid/hackwork), [Fitzgerald](http://gregmolnar.github.io/fitzgerald/), [Deano](https://github.com/colindean/deano), [Afro](https://github.com/jbrooksuk/Afro). Phew, that’s a lot.

## Community & activity

The community around a framework is often what makes it or breaks it. A PHP micro framework isn’t depending on that to the same extent since it’s smaller by design. A large community around it is _nice_ to have, but not a must. It brings maintenance, engagement, tools, packages and plugins to the table.

Community or not, the code needs to be maintained with regular activity. A framework without commits in the last three months or so I’ll consider dead and not even consider. Unless you’re willing to take over the maintenance of a framework or fork it, I don’t think it’s good to use a PHP micro framework that isn’t being maintained.

## Requirements

There need to be some sort of requirement for our candidates. Since I’m looking for a PHP micro framework to build a REST API with we need a few things fulfilled, or at least have the possibility of fulfilling those requirements. Also I need to clarify that I’m looking for **frameworks**, not _components_ or _packages_. I want it to come as a package deal, it can be very minimal with the addition of extending it, that is enough for me.

First and foremost I’ll be looking at documentation. To me a framework isn’t a framework without excellent documentation. It boils down to developer experience, [PHP Round Table have a great podcast episode](https://www.phproundtable.com/episode/documentation-and-developer-experience) on how these tie together. I’d never consider choosing a framework without extensive documentation, no matter what type of application I’m building. I might be harsh, but I don’t find a Github wiki page or readme sufficient as documentation when it comes to frameworks. For a package or a component I can live with that, but for a framework I expect more of the author and contributors.

What I want a PHP micro framework to provide for us is:

*   **PSR-compatible autoloading**. Since it’s 2016 now.
*   **Not try to be a know-it-all**. We want it to embrace the mentality of a framework. That is gluing together the best pieces available out there and presenting it in a nice fashion to the developer. If a framework is a “one file”-framework without dependencies, we shouldn’t bother. It’s then solving problems that have been solved somewhere else.
*   **Routing**. A rather obvious one, but it should be able to route on HTTP verbs (GET, POST, PUT, PATCH, DELETE). Another nice feature would be if we can group routes for API versioning.
*   **Middleware**. In supporting middleware we unlock some great potential for an API, such as global token authentication, rate limiting, etc.
*   **Configuration**. We want configuration with environment support.
*   **Database**. We need to store and retrieve data, since 99% of all PHP applications use either MySQL or PostgreSQL as their main persistent storage.
*   **Cache**. I do believe that cache is important, even though it’s not a deal breaker. But since I previously stated that I don’t care for performance as a metric, this is a good counter measure to that.
*   **Logging**. We all need to debug our applications at some point.
*   **Testing**. We should write tests for our applications to some extent.
*   **Validation**. An API often handles input from the consumer and that data needs to be validated.
*   **Service container & providers**. If we don’t have these, we’ll have a hard time extending the framework. Service providers can be seen as optional since we can probably do our bindings in the service container somehow.

A few features often ship with frameworks that I’d like not to see. I want to have the ability of removing them, since they have no place in a REST API. These are:

*   **Views & templates**. We don’t need to present HTML to our consumers, we should present JSON.
*   **Sessions**. We’ll be using a token based authentication for the API and therefor don’t need session handling.

## Elimination round

Now that we’ve established some ground rules, it’s time to start wielding the hammer of doom to narrow down the list. I don’t think many frameworks claiming to be a PHP micro framework will survive this round. Eliminating the prospects that don’t deliver according to the list of requirements. In no particular order here are the ones that’s eliminated and why.

*   **Zaphpa**. Have no dependencies, can’t be trusted in my book.
*   **Bullet PHP**. No activity for almost 11 months, dead.
*   **Wave**. Extensive documentation filled with examples that made it look promising. It also had the features I was looking for. But then the last commit was around one year ago, dead.
*   **One PHP**. Wouldn’t qualify as a framework to me. Over six months ago since the latest commit, dead.
*   **Limonade**. It got me intrigued with good (even though a messy single page one) documentation, then I found that it’s a “one file”-framework trying to solve everything itself without any dependencies. That file that had no commits for over 2 years, dead.
*   **Tonic**. Some good ideas here, with _HATEOAS_ support out of the box for example. But the documentation is limited to a one page readme file on github. No activity in the main branch for over six months, dead.
*   **FRAPI**. Interesting approach to building REST APIs. But the documentation is messy and there hasn’t been any commits to the master branch for almost two years, dead.
*   **Nanite**. Not really a framework, and only support `GET` and `POST` requests.
*   **Fat-Free Framework**. With an excellent site and documentation, it showed some real promise. But when looking at the code it has no dependencies and tried to solve everything on its own. No thank you.
*   **Jolt**. No activity for over a year, dead.
*   **Epiphany**. Trying to be a jack of all trades, not relying on any dependencies. No activity for over a year on top of that, dead.
*   **Respect/Rest**. Just a component, and [it does not want to be a framework](https://github.com/Respect/Framework). So that’s a no-go.
*   **Swiftlet**. Another framework that doesn’t feel the need to depend on any other packages.
*   **PolyFrameWork**. Uhm, no habla espanol..?
*   **MicroMVC**. No commits to the actual source code for over 3 years, super dead.
*   **hackwork**. Not even a composer file.
*   **Fitzgerald**. No composer file either, over 3 years since last activity, dead.
*   **Deano**. Activity stopped over a year ago, dead.
*   **Afro**. No composer file, no activity, dead.
*   **Flight**. I was excited about this one. Seemed like it had a great philosophy as a micro PHP framework, extendable and flexible. Then I saw that it had no dependencies, and I don’t see a reason to reinvent the wheel.
*   **Aura**. Branded as packages that can be built into frameworks. The packages are of excellent quality but gluing them together to a framework is too much of a task for this post, and that’s why it fell out.
*   **Phalcon**. This stands out as it’s a framework written in C that’s available as a PHP extension. However that leaves no room for slimming it down. You either get it all or nothing.

The amount of dead frameworks is simply astounding. Frameworks should come with a “don’t try this at home kids” warning label on them. It seems many people are interested in the thought of creating a framework, but may not be as keen on maintaining it. A PHP micro framework need just as much tender loving care as the rest of the frameworks.

## The survivors

It made me kind of sad that so many prospects got discarded in the elimination process, as I was hoping for more than one new and upcoming to be on the list. Perhaps there isn’t room enough for one more PHP micro framework, sounds a bit unlikely though. We are left with a list that could be named _The Big Three and the newcomer_.

*   **Lumen**
*   **Silex**
*   **Slim**
*   **Zend Expressive**

The perk of a short list is that it allows for an more in-depth review and comparison. It makes us go deeper in finding the “best” PHP micro framework. Lets begin with a short introduction of them before I dive into implementation in the next part of the series.

## Lumen, by Laravel

*   **Website**: [https://lumen.laravel.com/](https://lumen.laravel.com/)
*   **Documentation**: [http://lumen.laravel.com/docs](http://lumen.laravel.com/docs)
*   **First stable release**: April 14, 2015
*   **Repository**: [https://github.com/laravel/lumen](https://github.com/laravel/lumen)

![PHP micro framework: Lumen, by Laravel](/public/images/lumen.png)

A new player in the world of micro frameworks. It’s a trimmed down version of Laravel, one of the worlds most popular PHP frameworks. This comes with many advantages for a PHP micro framework. The community around it is huge, and almost all concepts applicable to Laravel will be applicable to Lumen. Because of this, any community resource will be relevant. Also since it’s based on components from the `Illuminate` package that powers Laravel, any updates there goes into Lumen as well. This also ensures great maintenance and updates to the underlying packages, which are built on top of the Symfony packages. The synergies could not be better here.

It features a few things out-of-the-box, packages that derive from Laravel. Database, cache, encryption, events, queues and so forth. All we need to get the show on the road. In a best case scenario we can remove packages we don’t have a need for. Unfortunately we can’t always plug-and-play third party packages for Laravel since they might depend on extended functionality, but often we can adapt them or find an alternative that is specific to Lumen.

**Community resources**

For the most part these are for Laravel, but they’re also applicable to Lumen.

*   Screencasts / tutorials:
    *   [Laracasts](http://laracasts.com/)
    *   [Sitepoint](http://www.sitepoint.com/?s=laravel)
    *   [Tuts+](http://net.tutsplus.com/tag/laravel/)
*   Community sites, forums, Q&A, chat
    *   [Laravel.io](http://laravel.io/) – forum
    *   [Laravel News](https://laravel-news.com/) – community site
    *   [Laracasts](https://laracasts.com/discuss) – forum
    *   [Larachat](http://larachat.co/) – slack
    *   <span class="externalcitation"><span class="externalcitation">[#laravel](irc://irc.freenode.net/laravel)</span></span> – IRC
    *   [Reddit: /r/lumen](https://www.reddit.com/r/Lumen)
    *   [Reddit: /r/laravel](https://www.reddit.com/r/laravel/)
    *   [Stackoverflow: lumen](http://stackoverflow.com/questions/tagged/lumen)
    *   [Stackoverflow: laravel](http://stackoverflow.com/questions/tagged/laravel)
*   Books
    *   [Leanpub](https://leanpub.com/bookstore?search=laravel)
    *   [Amazon](http://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Dstripbooks&field-keywords=laravel+php)
*   Social
    *   [@laravelphp](https://twitter.com/laravelphp) – official
    *   [@taylorotwell](https://twitter.com/taylorotwell) – the creator of Laravel
    *   [Google+](https://plus.google.com/communities/106838454910116161868)
    *   [Facebook](https://www.facebook.com/LaravelCommunity)
    *   [LinkedIn](https://www.linkedin.com/grps?gid=4419933)
*   Newsletters
    *   [Laravel Weekly](http://laravelweekly.com/)
    *   [Laravel News](https://laravel-news.com/newsletter/)
*   Podcasts
    *   [The Laravel Podcast](http://www.laravelpodcast.com/)
    *   [The Laracasts Snippet](https://laracasts.simplecast.fm/)
    *   [Laravel News Podcast](https://laravel-news.com/podcast/)
*   Other
    *   [Laracon US](http://laracon.us/) – annual conference
    *   [Laracon EU](http://laracon.eu/) – annual conference
    *   [Packalyst](http://packalyst.com/) – Laravel packages

## The Silex framework

*   **Website**: [http://silex.sensiolabs.org/](http://silex.sensiolabs.org/)
*   **Documentation**: [http://silex.sensiolabs.org/documentation](http://silex.sensiolabs.org/documentation)
*   **First stable release**: September 26, 2014
*   **Repository**: [https://github.com/silexphp/Silex](https://github.com/silexphp/Silex)

![The Silex Framework](/public/images/silex.png)

A relative newcomer but has been around a little while longer than Lumen. You could say that this is a trimmed down version of Symfony, but I’d argue it’s slightly different. The Silex framework is created by Fabien Potencier, the creator of Symfony, so you can expect it to be built mostly with Symfony components. And it is. It’s also inspired by the [Sinatra framework](http://www.sinatrarb.com/), a micro framework for Ruby. Since it’s based on Symfony components you never have to worry about the quality of code, or maintenance to stop. Symfony is the most popular PHP framework and the community around it is so extensive it’s hardly worth mentioning. You can find anything for this PHP micro framework.

It arrives with a few services that meets the requirements, such as logging, database and validation to name a few. I hope we can trim the features down to the bare essentials we want, since it comes with a template engine and a session handler for example. There’s also no shortage of third party packages available for it.

**Community resources**

Since Silex ties into Symfony so much, pretty much all of these resources are for Symfony.

*   Screencasts / tutorials:
    *   [Youtube: SensioLabs](https://www.youtube.com/user/SensioLabs)
    *   [Tuts+](http://tutsplus.com/tutorials/search?utf8=%E2%9C%93&search%5Bterms%5D=Symfony+2&button=)
    *   [Sitepoint](http://www.sitepoint.com/?s=symfony)
*   Community sites, forums, Q&A, chat
    *   [Symfony News](http://symfony-news.com/)
    *   [Sensio Labs Connect](https://connect.sensiolabs.com)
    *   <span class="externalcitation"><span class="externalcitation">[#symfony](irc://irc.freenode.net/symfony)</span></span> – IRC
    *   [Reddit: /r/silexphp](https://www.reddit.com/r/silexphp)
    *   [Reddit: /r/symfony](https://www.reddit.com/r/symfony/)
    *   [Stackoverflow: silex](http://stackoverflow.com/questions/tagged/silex)
    *   [Stackoverflow: symfony2](http://stackoverflow.com/questions/tagged/symfony2)
*   Books
    *   [Leanpub](https://leanpub.com/bookstore?search=symfony)
    *   [Amazon](http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords=symfony+php)
*   Social
    *   [@symfony](https://twitter.com/symfony) – official
    *   [@fabpot](https://twitter.com/fabpot) – the creator of Symfony
    *   [Google+](https://plus.google.com/communities/109013871316146116610)
    *   [Facebook](https://www.facebook.com/SymfonyFramework/)
    *   [LinkedIn](https://www.linkedin.com/grps/symfony-29205)
*   Newsletters
    *   [Sensio Labs Connect](https://connect.sensiolabs.com)
*   Podcasts
    *   [Sound of Symfony](http://www.soundofsymfony.com/)
*   Other
    *   [SymfonyCon](http://live.symfony.com/) – conferences
    *   [Knp Bundles](http://knpbundles.com/) – bundles

## Slim PHP framework

*   **Website**: [http://www.slimframework.com/](http://www.slimframework.com/)
*   **Documentation**: [http://www.slimframework.com/docs/](http://www.slimframework.com/docs/)
*   **First stable release**: November 2, 2010
*   **Repository**: [https://github.com/slimphp/Slim](https://github.com/slimphp/Slim)

![The Slim PHP framework](/public/images/slim.png)

Let me repeat the date of the first stable release, **November 2, 2010**. It has actually been around in a stable version for over 5 years now! That’s an impressive track record for being one of the top contenders in the PHP micro framework battle today. I’m quite sure it has gone through a major evolution process during those years, but I’m very impressed by the team for keeping the Slim PHP framework up to date for all these years.

This is very bare-bone, all you get supplied with is an application container, routing and an interface for HTTP requests and responses, including middleware. This is very promising since we can extend it in any way we please. There are also many, many packages with implementations for it. If you want a true **micro** PHP framework, this might be your choice.

**Community resources**

The community around it is substantially smaller than the other two big frameworks, mainly because it doesn’t have an older parent. However implementations aren’t as specific as in the other frameworks where you have many packages with APIs tied to them.

*   Screencasts / tutorials:
    *   [Youtube](https://www.youtube.com/results?search_query=php+slim)
    *   [Sitepoint](http://www.sitepoint.com/?s=slim)
    *   [Tuts+](http://tutsplus.com/tutorials/search?utf8=%E2%9C%93&search%5Bterms%5D=Slim&button=)
*   Community sites, forums, Q&A, chat
    *   [Official blog](http://www.slimframework.com/blog)
    *   [Official support forum](http://help.slimframework.com/)
    *   <span class="externalcitation"><span class="externalcitation">[#slimphp](irc://irc.freenode.net:6667/slimphp)</span></span> – IRC
    *   [Stackoverflow](http://stackoverflow.com/questions/tagged/slim)
*   Social
    *   [@slimphp](https://twitter.com/slimphp) – official
    *   [@codeguy](https://twitter.com/codeguy) – creator of Slim
*   Podcasts
    *   [PHP Townhall](http://phptownhall.com/blog/2015/03/12/episode-39-hi-josh/) – episode with the creator of Slim as a guest

## Zend Expressive

*   **Website**: [http://framework.zend.com/expressive](https://zendframework.github.io/zend-expressive/)
*   **Documentation**: [http://zend-expressive.readthedocs.org/](http://zend-expressive.readthedocs.org/)
*   **First stable release**: N/A
*   **Repository**: [https://github.com/zendframework/zend-expressive](https://github.com/zendframework/zend-expressive)

![Zend Expressive](/public/images/zf-logo-mark.png)

The new kid on the block as a PHP micro framework that [was announced in August 2015](http://framework.zend.com/blog/announcing-expressive.html). It does not have a stable release yet, there is only a release candidate as I’m writing this. With that said you should be extremely cautious to use this in production, and there might be some breaking changes before a stable version is ready. But it shows great promise and has a very modern framework approach. It’s fully [PSR–7](http://www.php-fig.org/psr/psr-7/) compatible and is based on middleware. I probably don’t have to tell you about Zend, the giant in the PHP community with its Zend Framework that have been around for ages. This is completely different from the Zend Framework though but you can expect quality because of it.

It comes with a minimal core, and you can then choose what components you want to include. It supports a few different routers and dependency injectors, and there’s an option to include a template engine, but that isn’t something we’re interested in. All in all we get a minimal framework with excellent flexibility and ability to extend it.

**Community resources**

Since it’s so new and it differs so much from Zend Framework there isn’t much community around the framework at the moment. The framework provides best practices more than a toolbox of solving certain tasks, that’s why I don’t consider the lack of community alarming since we have the entire PHP community at our disposal.

## Summing up our quest for a PHP micro framework

We’ve taken a look at many candidates for being a good PHP micro framework we could build a REST API with. However it turned out that only a few, four to be specific, made the cut. We’ve briefly looked at the different frameworks in terms of background, features, current activity as well as the community around them. All of them seem like good options at the moment. _Lumen_ and _Silex_ provide a larger toolbox while _Slim_ and _Zend Expressive_ are more DIY solutions. All features lacking in Slim and Zend Expressive can be implemented using packages that you tie into your application, this could even be packages from the other frameworks.

It comes down to personal preference what you want as your PHP micro framework. Do you want full flexibility? Even though you’ll have to do some coding to get features that are provided for you otherwise. Do you want a complete toolbox from the start? If you find sacrificing a bit of flexibility, and maybe performance, to be worth it.

Whichever you go with, I think they’re all great options as a PHP micro framework. In the next part I’ll code a basic API in all of the three and report on the developer experience for each of them. Hopefully I’ve shed some light on the current frameworks and why they are, or are not, suitable as micro frameworks for a REST API.
