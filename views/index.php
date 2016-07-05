<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Daniel Sibitzky</title>
    <link href="assets/build.min.css" rel="stylesheet">
  </head>
  <body>
    <header>
      <h1>Hello,<br> my name is <span>Daniel</span> and this is my cv</h1>
    </header>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-7">
          <div class="box">
            <h2>About Me</h2>
            <p>I've always loved figuring out how things work. As a kid, I took apart everything I could get my hands on (most of which I'm sure my parents wish I wouldn't have).</p>
            <p>This drive to learn translates well into software development, where I can investigate and solve problems on a daily basis.</p>
          </div>
          <div class="box">
            <h2>Experience</h2>
            <div class="job clearfix">
              <div class="col-xs-3">
                <div class="where">Mobelux</div>
                <div class="year">2016 - Current</div>
              </div>
              <div class="col-xs-9">
                <div class="profession">Web Developer</div>
                <div class="description">Assisted in maintanence and upkeep on several client products, primarily ecommerce and publishing projects.</div>
                <ul class="tech">
                  <li>Python</li>
                  <li>Django</li>
                  <li>Postgres</li>
                  <li>Gulp</li>
                  <li>React + Redux</li>
                </ul>
              </div>
            </div>
            <div class="job clearfix">
              <div class="col-xs-3">
                <div class="where">Entrepreneur Magazine</div>
                <div class="year">2013 - 2015</div>
              </div>
              <div class="col-xs-9">
                <div class="profession">Senior Engineer</div>
                <div class="description">Helped lead the rebuild of the flagship product, Entrepreneur.com using modern development techniques. Restructured the home-rolled CMS and implemented a queue to take some load off the user experience and help with static asset generation.</div>
                <ul class="tech">
                  <li>Apache</li>
                  <li>PHP</li>
                  <li>Symfony</li>
                  <li>Laravel</li>
                  <li>MySQL</li>
                  <li>Riak</li>
                  <li>JavaScript</li>
                  <li>CSS</li>
                  <li>RabbitMQ</li>
                  <li>Gulp</li>
                  <li>Varnish</li>
                  <li>Git</li>
                  <li>AWS</li>
                  <li>VirtualBox/libvirt</li>
                </ul>
              </div>
            </div>
            <div class="job clearfix">
              <div class="col-xs-3">
                <div class="where">Louddoor</div>
                <div class="year">2012 - 2013</div>
              </div>
              <div class="col-xs-9">
                <div class="profession">Web Developer</div>
                <div class="description">Set up promotions in their in-house Facebook analytics platform. Completed small projects for miscellaneous clients.</div>
                <ul class="tech">
                  <li>Apache</li>
                  <li>PHP</li>
                  <li>MySQL</li>
                  <li>HTML</li>
                  <li>JavaScript</li>
                  <li>Less</li>
                  <li>Git</li>
                  <li>AWS</li>
                </ul>
              </div>
            </div>
            <div class="job clearfix">
              <div class="col-xs-3">
                <div class="where">Parrazi</div>
                <div class="year">2009 - 2010</div>
              </div>
              <div class="col-xs-9">
                <div class="profession">Developer</div>
                <div class="description">Co-created an application for the identification and cataloging of items in video and still images.</div>
                <ul class="tech">
                  <li>Apache</li>
                  <li>PHP</li>
                  <li>CodeIgniter</li>
                  <li>MySQL</li>
                  <li>JavaScript</li>
                  <li>Flash/AS3</li>
                  <li>HTML</li>
                  <li>CSS</li>
                </ul>
              </div>
            </div>
            <div class="job clearfix">
              <div class="col-xs-3">
                <div class="where">Robertson Marketing Group</div>
                <div class="year">2008 - 2012</div>
              </div>
              <div class="col-xs-9">
                <div class="profession">Frontend Developer</div>
                <div class="description">Turned layout designs into UI.</div>
                <ul class="tech">
                  <li>.NET</li>
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>JavaScript</li>
                  <li>SVN</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-5">
          <div class="box clearfix">
            <h2>Contact</h2>
            <table id="contact">
              <tr>
                <td class="icon"><span class="fa fa-envelope fa-fw"></span></td>
                <td class="title"><a href="mailto:daniel@sibitzky.com">daniel@sibitzky.com</a></td>
              </tr>
              <tr>
                <td class="icon"><span class="fa fa-linkedin fa-fw"></span></td>
                <td class="title"><a href="https://www.linkedin.com/in/sibitzky">sibitzky</a></td>
              </tr>
              <tr>
                <td class="icon"><span class="fa fa-stack-overflow fa-fw"></span></td>
                <td class="title"><a href="http://careers.stackoverflow.com/dsibitzky">dsibitzky</a></td>
              </tr>
            </table>
          </div>
          <div class="box">
            <h2>Skills</h2>
            <div class="skills">
              <div class="item-skills" data-percent="0.90">PHP</div>
              <div class="item-skills" data-percent="0.80">MySQL/Postgres</div>
              <div class="item-skills" data-percent="0.80">JavaScript</div>
              <div class="item-skills" data-percent="0.75">HTML</div>
              <div class="item-skills" data-percent="0.70">CSS</div>
              <div class="item-skills" data-percent="0.60">Python</div>
              <div class="item-skills" data-percent="0.40">Django</div>
            </div>
          </div>
          <div class="box">
            <h2>Hobbies</h2>
            <div class="hobby">Climbing</div>
            <div class="hobby">Motorcycles</div>
            <div class="hobby">Computers</div>
            <div class="hobby">Music</div>
            <div class="hobby">Cooking</div>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <p>Background image from <a href="https://unsplash.com/">Unsplash</a> - rev {{ rev }}</p>
    </footer>
    <canvas id="bubbles"></canvas>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-25609352-3', 'auto');
      ga('send', 'pageview');
    </script>
    <script src="assets/build.min.js"></script>
  </body>
</html>
