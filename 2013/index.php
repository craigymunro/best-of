<?
ini_set('display_errors',1); 
error_reporting(E_ALL);
$debug = array_key_exists("debug", $_GET);
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<? $title = "A year in film, 2013"; ?>
	<title><?=$title?></title>
		
	<? if($debug) { ?>
		<link rel="stylesheet/less" href="less/Projects/BestOf2013/base.less?v=<?=microtime(true);?>"/>
	<? } else { ?>
		<link rel="stylesheet" href="base.css"/>	
	<? } ?>
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0" />	
	<script>
		localStorage.clear();
		less = {}; less.env = 'development';
	</script>
	<script src="scripts/less.js?v=<?=microtime(true);?>"></script>	

	<script src="//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js"></script>
	<script>
		WebFont.load({ google: { families: ['Crimson Text'] } });
	</script>
	
    <script src="//ajax.googleapis.com/ajax/libs/prototype/1.7.1/prototype.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/scriptaculous/1.9.0/effects.js"></script>
	<script src="scripts/BestOf.js?v=<?=microtime(true);?>"></script>

<!--[if lt IE 9]>
<script>
document.createElement('header');
document.createElement('main');
document.createElement('section');
document.createElement('footer');
</script>
<![endif]-->
</head>
<body>

	<header>
		<h1><?=$title?></h1>
		<p>This year I watched almost one hundred films. Here's a list of my ten favourite films of 2013.</p>
	</header>
	
	<?
	$items = array(
		array("title" => "Only God Forgives", "image" => "ogf1.jpg", "why" => "Refn's purposeful turn away from Hollywood following Drive, <em>Only</em> delivers cinematography oozing with meaning. A rewarding experience if you have the patience to read deep into this film."),
		array("title" => "The Place Beyond The Pines", "image" => "pines.jpg", "why" => "Cianfrance's epic about fathers and sons is a lesson in classical structure. Beautiful naturalistic cinematography and some iconic characterisations."),
		array("title" => "Promised Land", "image" => "matt-damon-promised-land-movie.jpg", "why" => "A timely film about fracking, it weighs important decisions about legacy, heritage, and providing a future for your family."),
		array("title" => "Side Effects", "image" => "side_effects_29.jpg", "why" => "Hopefully not Soderbergh's last picture, this ensemble psychological-thriller managed to keep me off kilter as it veered in different directions."),
		array("title" => "Blue Jasmine", "image" => "parallax-6.jpg", "why" => "Woody Allen's films will always make my list. This is his most critically acclaimed for a while."),
		array("title" => "Hitchcock", "image" => "tXqU8FznaIfCaDCraAiKc1OAjrn.jpg", "why" => "More fun than <em>The Girl</em>, the insinuating BBC drama about Hitch from 2013, this was a loving homage to the master of suspense."),
		array("title" => "Jack Reacher", "image" => "jack_reacher_7.jpg", "why" => "Tom Cruise isn't the image of Jack Reacher from the novels, but Christopher McQuarrie orchestrated some tense scenes in this triller."),
		array("title" => "Clear History", "image" => "Clear-History-danny-mcbride-bill-hader-michael-keaton-larry-david.jpg", "why" => "Technically a movie (though broadcast on HBO) Larry David does <em>Curb</em> without doing <em>Curb</em>."),
		array("title" => "Les Miserables", "image" => "Les_Miserables_2012.jpg", "why" => "Excusing Crowe's voice, this was a landmark piece for all actors involved. Special mention goes to the sound design team for capturing the sound live and not using dubbing for the songs."),
		#array("title" => "Trouble With the Curve", "image" => "trouble-with-the-curve-still07.jpg", "why" => "A modest film about a soon-to-be-replaced baseball scout, this was Clint Eastwood's first appearance in front of the camera since 2008."),
		array("title" => "Gravity", "image" => "gravity4.jpg", "why" => "Cuaron's experimental film had huge impact on the big screen, and was full of heart-stopping, sweaty-palm moments. Those complaining about the lack of a great narrative in this film miss the point of this technical marvel."),
	);
	
	$h = array("left", "right");
	$v = array("top", "bottom");
	$p = 10;
	?>
	
	<main tabindex="-1">
		<? foreach(array_reverse($items) as $key => $item) { ?>
			<section>
				<a name="<?=$p?>"></a>
				<div class="cover" style="background-image: url(images/<?=$item["image"]?>);"></div>
			
				<div class="details <?=$h[$key % 2]?> <?=$v[$key % 3]?>">
					<span>Number <?=$p?></span>
					<h2><?=$item["title"]?></h2>
					
					<p><?=$item["why"]?></p>
				</div>
				
			</section>
			
			<? $p--; ?>
		<? } ?>

		<section>
			<a name="11"></a>
			<div class="cover" style="background-image: url(images/large_copycat_blu-ray_3.jpg);"></div>
		
			<div class="details bottom right">
				<span>Extra</span>
				<h2>Top ten I saw this year that were released before 2013</h2>
				<p>Most of the films I watched this year were on DVD. Here's my pick of the films not released in 2013.</p>

				<ol>
					<li>Copycat (1995)</li>
					<li>The Bird with the Crystal Plumage (1970)</li>
					<li>Pumping Iron (1977)</li>
					<li>Syriana (2005)</li>
					<li>Here Comes The Boom (2012)</li>
					<li>Cop Land (1997)</li>
					<li>The Queen (2006)</li>
					<li>Don't Look Now (1973)</li>
					<li>The Untouchables (1987)</li>
					<li>Freddy vs. Jason (2003)</li>
				</ol>
			</div>
			
		</section>
	</main>
	
	<footer>
		<div>
			<? for($i = 10; $i >= 1; $i--) { ?>
				<a href="#<?=$i?>" data-shortcut="<?=$i?>"><?=$i?></a>
			<? } ?>
			<a href="#11" data-shortcut="11">Extra!</a>
		</div>
	</footer>
	
	<script>
		document.observe("dom:loaded", function() {
			var bestof = new BestOf({});
		});
	</script>
</body>
</html>
