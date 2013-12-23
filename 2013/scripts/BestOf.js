var BestOf = Class.create({
	
	initialize: function(args)
	{
		this.main = $$("main").shift();
		this.main.focus();
		this.buttons = $$("footer a");

		new Event.observe(this.main, "scroll", this.scrollSpy.bind(this));
	},
	
	scrollSpy: function(e)
	{
		if(document.viewport.getDimensions().width > 1024)
		{
			e.preventDefault();
			
			this.slide = Math.floor(this.main.scrollTop / this.main.getHeight());		
			this.buttons.each(function(o) { o.removeClassName("active"); });
			this.buttons[this.slide].addClassName("active");
			
			return;
		}
	}
});