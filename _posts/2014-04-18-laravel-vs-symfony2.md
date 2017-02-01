---
layout: post
title: Laravel vs Symfony
description: Which one of the frameworks is the best is a question I get asked a lot. Somehow there is a fight between them, Laravel vs Symfony.
permalink: /laravel-vs-symfony/
---

This is a question that frequently arises. Someone will ask me _“Oh, you [work with/prefer/love] Laravel?”_ and my answer to that is a simple yes. What baffles me is the very frequent follow up question to that, which is _“Well, what about Symfony?”_. Every time I get this question, I’m stricken by it because I have never understood the question. It seems like there is a battle, Laravel vs Symfony.

<!-- more -->

When someone ask me that question my brain tries to figure out why this person is asking me that. Is it because the person prefers Symfony2 over Laravel? Is it because they think that they are mutually exclusive? That somehow you have to make a choice between the two?

## A moot question

Let me explain why I don’t really consider this a legit question. As of todays’ version of the [Laravel framework package](https://packagist.org/packages/laravel/framework) which is `4.1.28` as I am writing this, it has 24 dependencies. Out of these, **12** are Symfony2 components. So you could easily say that Laravel is depending a lot on those components.

That is actually a great philosophy for the framework. Since the components it’s depending on are well written, do one job great each and are fully tested. This means Laravel can leave the lower level heavy lifting to those components. They handle HTTP requests and responses, routing, filesystem operations and the `artisan` command line tool, just to name a few.

This lets Laravel focus on wrapping/extending the components and providing a more elegant interface for the developer to work with. And the underlying components are always easy to get if you need to do some lower level work. Try this:

{% highlight php %}
<?php
$requestInstance = Request::instance();
{% endhighlight %}

This will return an instance of `Illuminate\Http\Request`. If we take a look at [that class](https://laravel.com/api/5.2/Illuminate/Http/Request.html) we can see that it extends the Symfony component

{% highlight php %}
<?php
class Request extends \Symfony\Component\HttpFoundation\Request
{% endhighlight %}

This is a great example of how Laravel (the _Illuminate_ namespace) is wrapping/extending the functionality of one of the components.

## Let’s stop trying to compare Laravel vs Symfony

I think that they really can’t be compared on an equal level. Let’s just embrace the synergy that Laravel accomplishes with Symfony2 as a foundation and then adding its sugar on top. This is one of the things that I think makes it so great.
