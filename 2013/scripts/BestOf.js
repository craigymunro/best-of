var BestOf = Class.create({
	
	initialize: function(args)
	{
		this.main = $$("main").shift();
		this.main.focus();
		this.sections = this.main.select("section");
		
		this.buttons = $$("footer a");

		new Event.observe(this.main, "scroll", this.scrollSpy.bind(this));
		this.scrollSpy();
	},
	
	scrollSpy: function(e)
	{
		if(document.viewport.getDimensions().width > 1024)
		{
			if(e) e.preventDefault();
			
			this.slide = Math.floor(this.main.scrollTop / this.main.getHeight());		
			this.buttons.each(function(o) { o.removeClassName("active"); });

			this.buttons[this.slide].addClassName("active");
			this.sections[this.slide].addClassName("active");
			this.sections[Math.min(this.sections.length-1, this.slide+1)].addClassName("active");
			
			return;
		}
	}
});