var ROK = Class.create({
	
	initialize: function()
	{
		this.viewport = { x: 0, y: 0};

		// register ad zones as changeable depending on the viewport size
		
		this.ads = [
			{ breakpoint: 0, mode: "mobile" },
			{ breakpoint: 480, mode: "portable" },
			{ breakpoint: 1024, mode: "hd" }
		];

		this.navigators = {};		
		this.storeNavigation();
		
		Event.observe(window, "resize", this.setViewport.bind(this));
		this.setViewport();
	},
	
	checkAds: function()
	{
		var defaultAd = this.ads.find( function(s) { return s.breakpoint == 0 } );

		for(i = 0; i < this.ads.length; i++)
		{
			if(this.viewport.x > this.ads[i].breakpoint)
			{
				currentMode = this.ads[i].mode;
			}
		}
		
		$$(".advert").each(
			function(e)
			{
				e.innerHTML = currentMode;
			}
		)
	},
	
	storeNavigation: function()
	{
		responders = $$(".navigation.responsive");
		for(i = 0; i < responders.length; i++)
		{
			this.navigators[responders[i].identify()] = new Array();
			
			nav = responders[i];
			
			options = $$("#"+nav.identify() + " option");
			for(j = 0; j < options.length; j++)
			{
				this.navigators[responders[i].identify()][ this.navigators[responders[i].identify()].length ] = { name: options[j].innerHTML, value: options[j].value }
			}
		}		
	},
	
	navigation: function()
	{
		for(i in this.navigators)
		{
			id = i;

			var width = $(id).up().getWidth();
			
			if(width <= 480)
			{			
				// is it already a selector?
				$(id).removeClassName("list");
				$(id).addClassName("selector");

				if(
					$(id).firstDescendant().inspect() != "<select>"
				)
				{
					console.log("redrawing #" + id + " as selector");					
					
					temp = new Element("select");
					// build ul
					
					for(j = 0; j < this.navigators[i].length; j++)
					{
						temp.insert(new Element("option", { value: this.navigators[i][j].value } ).update(this.navigators[i][j].name) );
					}
					
					$(id).update(temp);
				}
			}
			else
			{
				$(id).removeClassName("selector");
				$(id).addClassName("list");

				if(
					$(id).firstDescendant().inspect() != "<ul>"
				)
				{
					console.log("redrawing #" + id + " as ul");
					
					temp = new Element("ul");
					// build ul
					
					for(j = 0; j < this.navigators[i].length; j++)
					{
						li = new Element("li");
						a = new Element("a", { href: this.navigators[i][j].value } ).update(this.navigators[i][j].name);
						
						li.insert(a);
						temp.insert(li);
					}
					
					$(id).update(temp);
				}
			}
		}
	},
	
	setViewport: function()
	{		
		this.viewport.x = document.viewport.getDimensions().width;
		this.viewport.y = document.viewport.getDimensions().height;

		document.body.setAttribute("viewport-x", this.viewport.x);
		document.body.setAttribute("viewport-y", this.viewport.y);
		
		this.navigation();
		
		/*
		this.checkSelectorVertical();
		this.resizeSelectorHorizontal();
		this.setTabs();
		*/
		
		this.checkAds();

		this.register(
			".blogs",
			[
				{ breakpoint: 400, styles: { class: "large" } }
			]
		);

		this.register(
			".articles",
			[
				{ breakpoint: 400, styles: { class: "large" } }
			]
		);

		this.register(
			".comments",
			[
				{ breakpoint: 400, styles: { class: "large" } }
			]
		);

		this.register(
			".shelf",
			[
				{ breakpoint: 320, styles: { class: "tiny" } },
				{ breakpoint: 480, styles: { class: "small" } }	
			]
		);		

		this.register(
			".people",
			[
				{ breakpoint: 500, styles: { class: "large" } }	
			]
		);		

		this.register(
			".headline",
			[
				{ breakpoint: 400, styles: { class: "large" } }	,
				{ breakpoint: 540, styles: { class: "giant" } }	
			]
		);		

		this.register(
			".related-content",
			[
				{ breakpoint: 400, styles: { class: "medium" } },
				{ breakpoint: 564, styles: { class: "large" } }
			]
		);

		this.register(
			".game-overview",
			[
				{ breakpoint: 240, styles: { class: "small" } }
			]
		);

		this.register(
			".advert.mpu",
			[
				{ breakpoint: 0, styles: { display: "none" } },
				{ breakpoint: 300, styles: { display: "block" } }
			]
		);

		this.register(
			".hero",
			[
				{ breakpoint: 600, styles: { class: "large" } }
			]
		);		
		//this.register( ".advert.skyscraper", [ { breakpoint: 300, styles: { display: "none" } } ] );
		//this.register( ".advert.leaderboard", [ { breakpoint: 728, styles: { display: "none" } } ] );
		//this.register( ".advert.wide-leaderboard", [ { breakpoint: 1260, styles: { display: "none" } } ] );
	},
	
	register: function(element, rules)
	{
		$$(element).each(
			function(e)
			{
				if(e.getAttribute("ruok-force"))
				{
					e.className = (element.replace(".", " ") + " " + e.getAttribute("ruok-force")).strip();
				}
				else
				{
					var width = e.up().getWidth();
					
					e.show();
					for(i = 0; i < rules.length; i++)
					{
						if(width > rules[i].breakpoint)
						{
							if(rules[i].styles.class)
							{
								e.className = (element.replace(".", " ") + " " + rules[i].styles.class).strip();
								
								var images = $$("#" + e.identify() + " img").findAll(function(el) { return el.getAttribute("ruok-" + rules[i].styles.class) > ""; });
								for(j = 0; j < images.length; j++)
								{
									images[j].src = images[j].getAttribute("ruok-" + rules[i].styles.class);
								}
							}
							e.setStyle( rules[i].styles );
						}
						else
						{
							if(rules[i].styles.class)
							{
								e.className = element.replace(".", " ").strip();
							}					
						}
					}
				}
			}
		);
	},

	setTabs: function()
	{
		$$(".selector.tabbed").each(
			function(e)
			{
				children = e.childElements();				
				children[0].addClassName("on");
				
				targets = new Array();
				for(i = 0; i < children.length; i++)
				{
					targets[targets.length] = children[i].getAttribute("tab-target");
				}
				
				targets.each(
					function(o)
					{
						o = o.strip();
						if($(o))
						{
							$(o).hide();
						}
					}
				);
				
				$(targets[0].strip()).show();
			}
		);
	},

	resizeSelectorHorizontal: function()
	{
		$$(".selector.horizontal").each(
			function(e)
			{
				var items = $$("#"+e.identify() + " li").findAll(function(el) { return el.getStyle("display") != "none"; });

				// give horizontal items an equal width ratio
				var ratio = 100 / items.length;				
				for(i = 0; i < items.length; i++)
				{
					items[i].setStyle(
						{
							width: ratio + "%"
						}
					);
				}
			}
		);			
	},

	checkSelectorVertical: function()
	{
		if(this.viewport.x <= 480)
		{
			$$(".selector.vertical").each(
				function(e)
				{
					e.setAttribute("original-type", "selector vertical");
					e.removeClassName("vertical");
					e.addClassName("horizontal");
				}
			);		
		}
		else
		{
			$$(".selector.horizontal").each(
				function(e)
				{
					if(e.getAttribute("original-type"))
					{					
						e.className = e.getAttribute("original-type");
						
						// reset item widths back to 100%
						items = $$("#"+e.identify() + " li");
						for(i = 0; i < items.length; i++)
						{
							items[i].setStyle(
								{
									width: "100%"
								}
							);
						}

					}
				}
			);		
		}
	},
});