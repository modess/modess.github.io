---
layout: post
title: Simple pagination in PHP with the Laravel pagination package
description: A simple pagination in PHP can be achieved using the Laravel pagination package. This tutorial features explanations and examples on how to do this.
permalink: /simple-pagination-in-php-with-the-laravel-pagination-package/
---

Pagination is something most web developers deal with from time and time. You can create a simple pagination in PHP in many ways. There are a few things to keep track of when creating a pagination though. Fetching and parsing data, items per page, current page, number of pages, which pages to show and so on. Using a tried and tested package instead of writing your own implementation is often the way to go. Laravel provides the great package `illuminate/pagination` for pagination that you can use. This package is not depending on the framework in any way.

<!-- more -->

A while back I wrote a blog post on [Custom pagination in Laravel 4](https://modess.io/custom-pagination-in-laravel-4/). That post is now a bit outdated, and it’s also somewhat irrelevant if you’re not using Laravel (4). That example creates a new view instead of extending the paginator, something which is a better practice. Instead you should extract the paginator from the framework, then you can apply it to any project in need of pagination.

## How to do simple pagination in PHP

Pagination is the idea of splitting a collection of items up into “pages”. Displaying a current set of items while hiding the other ones, linking to those pages. This is for a better overview and a better user experience. Pagination in PHP doesn’t differ from pagination in other languages, it’s the same concept. It’s not a complex task, but you need to have the following in mind when creating a pagination:

*   **Items** — Your data to display, most often an array.
*   **Per page** — How many items to display per page. The amount will differ for what kind of content you’re displaying. A slide show will have one per page. If you’re displaying links to blog posts, perhaps 10.
*   **Total number of pages** — Calculate this by dividing the number of items with items per page. Then round that number up to the closest integer. If you have 60 items and want to display 50 per page, the number of pages would be 2\. 60 divided by 50 is 1.2, but you want to display full pages so you round that up to 2.
*   **Current page** — Which page the user is looking at right now. This is for keeping track of getting current items, next/previous links and styling of the current page.
*   **Paths** — How do you parse the current page from the URL? How do you create links to other pages (paths)? Often using a query string such as /posts?page=3.
*   **Total number of items** — Only necessary when you want to display page numbers in your pagination. If you only grab 25 items through a database query, you must do a count of the total items you can query also.

![Simple PHP pagination visualised](/public/images/pagination-2.png)

### Database queries

Most often you query a database for paginated results to display in your pagination. Some queries are simple and some are complex, you can apply this concept to any query. The `LIMIT` modifier consists of two parts, how many results to get and an offset to where it should start. `LIMIT 0,10` will start at 0 and fetch the first 10 results. You calculate the offset with `per page * (current page - 1)` as displayed in the image above. The number of results is the amount of results per page you want to display.

Say you are one page four and want display 20 results, your offset will be `20 * (4 - 1) = 60`. The query looks like this:

{% highlight sql %}
SELECT * FROM your_table LIMIT 60,20;
{% endhighlight %}

You can have conditionals, joins and so on to your query also. Just apply the limit to it:

{% highlight sql %}
SELECT yt.* FROM your_table yt
JOIN some_table st ON st.join_column = yt.id
WHERE yt.category = 'some_category'
GROUP BY yt.id
LIMIT 60,20;
{% endhighlight %}

In cases where you want to display pages in your pagination, you need the total amount of items. You can do this in two ways. Either you fetch all results from the database, count how many and then use PHP to grab the results you want to display. Or you use the method of limiting the results in your query and execute another query for the count.

{% highlight sql %}
SELECT * FROM your_table LIMIT 60,20;
SELECT count(*) FROM your_table;
{% endhighlight %}

Keep in mind the performance implications of both methods. Fetching all results and dealing with them in PHP might be a bad idea for performance if you have a large number of items. I suggest you stick with two database queries in these cases, one for the results and one for the count. For this you should make sure to optimize your queries with indexes.

## The PHP pagination class in the Laravel pagination package

The class we’ll use for pagination in PHP is `Illuminate\Pagination\Paginator`. You can take a look at the [Paginator](https://github.com/illuminate/pagination) class in the github repository if you want to dive deeper. It provides the functionality discussed in the earlier sections, and it consists of two main parts.

*   The **paginator** itself implementing the `Illuminate\Contracts\Pagination\Paginator` interface.
*   A **presenter** implementing the `Illuminate\Contracts\Pagination\Presenter` interface.

The paginator is responsible for keeping track of the items and managing the pages. The presenter is responsible of generating HTML markup. This is a good separation of responsibility that allow you to extend the presentation. By default it uses markup for [Bootstrap](http://getbootstrap.com/) but you can create presenters for other front-end frameworks, or your own custom markup.

## PHP pagination example

Start by installing `illuminate/pagination` with Composer

~~~
composer require illuminate/pagination
~~~

When you have it installed it you can use it just like any other component. It does not depend on anything in the Laravel framework. Here’s a simple example of pagination with it:

{% highlight php %}
{% raw %}
<?php
require_once __DIR__ . '/vendor/autoload.php';

// Populate items
$items = array_map(function ($value) {
    return [
        'name' => 'Blog post #' . $value,
        'url' => '/post/' . $value,
    ];
}, range(1,1000));

// Get current page from query string
$currentPage  = isset($_GET['page']) ? (int) $_GET['page'] : 1;

// Items per page
$perPage      = 10;

// Get current items calculated with per page and current page
$currentItems = array_slice($items, $perPage * ($currentPage - 1), $perPage);

// Create paginator
$paginator = new Illuminate\Pagination\Paginator($items, 10, $currentPage);
?>
<html>
    <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    </head>

    <body>

    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <h1>Blog posts - page <?=$paginator->currentPage()?></h1>

                <?php foreach ($paginator->items() as $blogPost) { ?>
                <a href="<?=$blogPost['url']?>"><h3><?=$blogPost['name']?></h3></a>
                <?php } ?>

                <?=$paginator->render()?>
                </div>
            </div>
        </div>

    </body>
</html>
{% endraw %}
{% endhighlight %}

This is all you need to create a pagination in PHP. It populates an array with “blog posts”, fetches or sets the current page, slices out the current items to display and creates a paginator. Then there is some markup that we also render the paginator in. This simple pagination looks like this:

![PHP pagination class simple example](/public/images/1-simple-1.png)

When creating the paginator you pass:

*   `$items` — the current items to display
*   `$perPage` — items per page
*   `$currentPage = null` — current page
*   `$options = []` — options for path, fragments, etc

The paginator uses `Illuminate\Pagination\SimpleBootstrapThreePresenter` as its default presenter. As you can see this pagination displays a previous and next link, but no pages. When creating a pagination in PHP, you most often want to display pages.

### Displaying pages

Would you want to display pages you need another presenter, the `Illuminate\Pagination\BootstrapThreePresenter`. You can’t use this presenter with the default `Paginator`. Instead you need to create a `Illuminate\Pagination\LengthAwarePaginator`. This paginator accepts one more parameter when instantiated, the rest is the same.

*   `$items` — the current items to display.
*   `$total` — total number of items (this being different from the previous paginator)
*   `$perPage` — items per page
*   `$currentPage = null` — current page
*   `$options = []` —options for path, fragments, etc

{% highlight php %}
$paginator = new Illuminate\Pagination\LengthAwarePaginator($currentItems, count($items), $perPage, $currentPage);
{% endhighlight %}

This code change is all you need to do. It implements the same interface as the simple paginator. Now you have this output instead:

![Pages example for simple PHP pagination](/public/images/2-pages.png)

If you have hundreds or thousands of pages, you do not want to display them all. By default the paginator deals with this, take note of the truncated pages (…) in the image above. `Illuminate\Pagination\UrlWindow` that is passed to the presenter handles this responsibility, .

### Create your own presenter

Perhaps you want to create your own presenter for custom markup or another CSS framework. This is a simple procedure and I will show this with [Semantic UI](http://semantic-ui.com/), like I did in my previous blog post. Extending the paginator with your own presenter is the best approach for your pagination in PHP. The markup for pagination in this CSS framework looks like this:

{% highlight html %}
<div class="ui pagination menu">
  <a class="active item">
    1
  </a>
  <div class="disabled item">
    ...
  </div>
  <a class="item">
    10
  </a>
  <a class="item">
    11
  </a>
  <a class="item">
    12
  </a>
</div>
{% endhighlight %}

To render this markup you first create a `SemanticUIPresenter` class and copy all contents from `Illuminate\Pagination\BootstrapThreePresenter`. Keep the `BootstrapThreeNextPreviousButtonRendererTrait` and `UrlWindowPresenterTrait` since they render buttons for next and previous buttons, and truncating pages. You could create your own implementations of these as well, but they work fine with Semantic UI.

Now it’s a matter of updating the markup in the class to match that in the example markup. Also add some use statements since you aren’t in the `Illuminate\Pagination` namespace anymore. After that the class will look like this (I have removed doc blocks to keep the output down a bit).

{% highlight php %}
<?php

use Illuminate\Support\HtmlString;
use Illuminate\Contracts\Pagination\Paginator as PaginatorContract;
use Illuminate\Contracts\Pagination\Presenter as PresenterContract;
use Illuminate\Pagination\UrlWindow;
use Illuminate\Pagination\BootstrapThreeNextPreviousButtonRendererTrait;
use Illuminate\Pagination\UrlWindowPresenterTrait;

class SemanticUIPresenter implements PresenterContract
{
    use BootstrapThreeNextPreviousButtonRendererTrait, UrlWindowPresenterTrait;

    protected $paginator;

    protected $window;

    public function __construct(PaginatorContract $paginator, UrlWindow $window = null)
    {
        $this->paginator = $paginator;
        $this->window = is_null($window) ? UrlWindow::make($paginator) : $window->get();
    }

    public function hasPages()
    {
        return $this->paginator->hasPages();
    }

    public function render()
    {
        if ($this->hasPages()) {
            return new HtmlString(sprintf(
                '<div class="ui pagination menu">%s %s %s</div>',
                $this->getPreviousButton(),
                $this->getLinks(),
                $this->getNextButton()
            ));
        }

        return '';
    }

    protected function getAvailablePageWrapper($url, $page, $rel = null)
    {
        $rel = is_null($rel) ? '' : ' rel="'.$rel.'"';

        return '<a href="'.htmlentities($url).'" class="item"'.$rel.'>'.$page.'</a></li>';
    }

    protected function getDisabledTextWrapper($text)
    {
        return '<div class="disabled item">'.$text.'</div>';
    }

    protected function getActivePageWrapper($text)
    {
        return '<a class="active item">'.$text.'</a>';
    }

    protected function getDots()
    {
        return $this->getDisabledTextWrapper('...');
    }

    protected function currentPage()
    {
        return $this->paginator->currentPage();
    }

    protected function lastPage()
    {
        return $this->paginator->lastPage();
    }
}
{% endhighlight %}

Now you create a new instance of this and pass it to the paginator’s render method.

{% highlight php %}
$presenter = new SemanticUIPresenter($paginator);
// [...]
<?=$paginator->render($presenter)?>
{% endhighlight %}

This is what the updated view looks like with Semantic UI included and the new presenter:

{% highlight php %}
{% raw %}
<?php
require_once __DIR__ . '/vendor/autoload.php';

// Populate items
$items = array_map(function ($value) {
    return [
        'name' => 'Blog post #' . $value,
        'url'  => '/post/' . $value,
    ];
}, range(1,1000));

// Get current page from query string
$currentPage  = isset($_GET['page']) ? (int) $_GET['page'] : 1;

// Items per page
$perPage      = 10;

// Get current items calculated with per page and current page
$currentItems = array_slice($items, $perPage * ($currentPage - 1), $perPage);

// Create paginator
$paginator = new Illuminate\Pagination\LengthAwarePaginator($currentItems, count($items), $perPage, $currentPage);
$presenter = new SemanticUIPresenter($paginator);
?>
<html>
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/semantic.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/semantic.min.js"></script>
</head>

<body>

    <div class="ui text container">
        <h1 class="ui dividing header">Blog posts - page <?=$paginator->currentPage()?></h1>

        <?php foreach ($paginator->items() as $blogPost) { ?>
        <a href="<?=$blogPost['url']?>"><h3><?=$blogPost['name']?></h3></a>
        <?php } ?>

        <?=$paginator->render($presenter)?>
    </div>

</body>
</html>
{% endraw %}
{% endhighlight %}

This is what you end up with (ignore the poor padding), a pagination in PHP customized to a CSS framework:

![Semantic UI implementation for simple pagination in PHP](/public/images/4-semantic-ui.png)

### Custom URLs

You can change how the paginator constructs URLs for pages. The default is appending `?page=X` to the current URL. But you might want `/posts/?page=X` instead for your paginator. Or you might need to change the query string name. You can either do this when creating the paginator, or by using setters.

{% highlight php %}
<?php
// Constructor for 'posts/?page=X'
$paginator = new Illuminate\Pagination\LengthAwarePaginator(
    $currentItems,
    count($items),
    $perPage,
    $currentPage,
    ['path' => 'posts']
);

// Setter for 'posts/?page=X'
$paginator->setPath('posts');

// Constructor for '?current_page=X'
$paginator = new Illuminate\Pagination\LengthAwarePaginator(
    $currentItems,
    count($items),
    $perPage,
    $currentPage,
    ['pageName' => 'current_page']
);

// Setter for ?current_page=X
$paginator->setPageName('current_page');
{% endhighlight %}

If you want to customise the paginator for pretty URLs, such as `posts/page/2`. That is not an out of the box-solution and you should take a look at Laravel Paginator Pretty URLs if this is a solution you need.

## Why this approach?

You might argue that this isn’t a _simple_ way of dealing with pagination in PHP. I beg to differ. You now have a paginator from one of the most popular PHP frameworks of today. You can manage the version of your dependency and install the one you need. If you write a custom presenter, why not share it with the rest of the world as a Composer package? You could also find other presenters that people have written and install them. Less code in your repository is always preferable. One less thing to maintain in your application.
