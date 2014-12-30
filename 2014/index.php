<html>
<head>
	<title>Best of, 2014</title>

	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0" />
		
	<? $debug = false; ?>

	<? if($debug) { ?>
		<link rel="stylesheet/less" type="text/css" href="less/base.less" />	
		<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/2.1.2/less.min.js"></script>
	<? } else { ?>
		<link rel="stylesheet" type="text/css" href="css/base.css" />	
	<? } ?>

	<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet"/>


	<script src="//use.typekit.net/qew6vet.js"></script>
	<script>try{Typekit.load();}catch(e){}</script>
</head>
<body>
	<header>
		<h1>Best of, 2014</h1>		
		<p>This year I saw around twenty new releases. These are my favourites.</p>
	</header>

	<?
	$films = json_decode(file_get_contents("films.json"));
	$films->films = array_reverse($films->films);
	?>
	
	<main>
		<? for($i = 10; $i > 0; $i--) { ?>
		
			<?
			$film = $films->films[$i-1];
			?>
		
			<section class="position-<?=$i?>">
				<div style="background-image:url(images/<?=$film->image?>.jpg);">
					<div>
						<h2>
							<span>#<?=$i?></span>
							<?=$film->title?>
						</h2>
					</div>
				</div>
			</section>
		
		<? } ?>
	</main>
</body>
</html>