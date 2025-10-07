import type { ICocktail } from "../models/ICocktail";

export const cocktails: ICocktail[] = [
	{
		id: "2o8f7hdgr42863xszb82fd",
		title: "Honeymoon Amaretto",
		description: "A refreshing Cuban classic made with rum, lime juice and simple syrup, served in a martini glass.",
		author: "Joaquin Gonzalez Budino",
		date: new Date("2025-08-05"),
		imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		glass: "martini",
		tags: ["modern", "craft", "sour", "dessert"],
		ingredients: [
			{ name: "Whiskey", units: "3/4", measurementType: "oz" },
			{ name: "Fresh lime juice", units: "1/4", measurementType: "oz" },
			{ name: "Honey syrup", units: "3/4", measurementType: "oz" },
			{ name: "Amaretto", units: "1 1/2", measurementType: "oz" },
			{ name: "Egg white", units: "1", measurementType: "unit" }
		],
		steps: [
			{ order: 1, description: "Dry shake all ingredients (no ice) if using egg white for 15 seconds" },
			{ order: 2, description: "Shake again with ice for 10~15 seconds" },
			{ order: 3, description: "Double strain into a chilled martini or coupe glass" },
			{ order: 4, description: "twist a lemon peel over the foam to release its oils" },
			{ order: 5, description: "(Optional) Place a small nougat bar across the rim of the glass as an edible garnish" },
			{ order: 6, description: "(Optional) Drizzle a tiny heart shape onto the foam using a thin stream of honey, similar to latte art" }
		],
		likeCounter: 0
	},
	{
		id: "2o8f73hdncsdsdmnfb82oh",
		title: "Daiquiri",
		description: "A refreshing Cuban classic made with rum, lime juice and simple syrup, served in a martini glass.",
		author: "Jennings Cox",
		date: new Date("1898-01-01"),
		imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		glass: "martini",
		tags: ["classic", "citrus", "refreshing"],
		ingredients: [
			{ name: "White rum", units: "2", measurementType: "oz" },
			{ name: "Fresh lime juice", units: "3/4", measurementType: "oz" },
			{ name: "Simple syrup", units: "3/4", measurementType: "oz" }
		],
		steps: [
			{ order: 1, description: "Combine rum, fresh lime juice and simple syrup in a shaker." },
			{ order: 2, description: "Add ice to the shaker." },
			{ order: 3, description: "Shake well (about 8-10 seconds) until chilled." },
			{ order: 4, description: "Double strain into a chilled cocktail glass." },
			{ order: 5, description: "Garnish with a lime wheel or twist." }
		],
		likeCounter: 0
	},
	{
		id: "03q9foc48qyrhnhmkcvvzx",
		title: "Negroni",
		description: "A bitter-sweet Italian aperitif with equal parts gin, Campari, and sweet vermouth, garnished with orange.",
		author: "Count Camillo Negroni",
		date: new Date("1919-01-01"),
		imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		glass: "old fashioned",
		tags: ["classic", "bitter", "aperitif", "strong"],
		ingredients: [
			{ name: "Gin", units: "1", measurementType: "oz" },
			{ name: "Campari", units: "1", measurementType: "oz" },
			{ name: "Sweet vermouth", units: "1", measurementType: "oz" }
		],
		steps: [
			{ order: 1, description: "Fill an old-fashioned glass with ice." },
			{ order: 2, description: "Pour gin, Campari, and sweet vermouth over the ice." },
			{ order: 3, description: "Stir gently to chill and dilute slightly." },
			{ order: 4, description: "Garnish with an orange slice or orange peel." }
		],
		likeCounter: 0
	},
	{
		id: "089cfq3274yhnisanofd",
		title: "Tom Collins",
		description: "A fizzy and refreshing gin-based cocktail with lemon juice, sugar, and soda water, served in a tall glass.",
		author: "Jerry Thomas",
		date: new Date("1876-01-01"),
		imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		glass: "Collins",
		tags: ["classic", "refreshing", "fizz", "citrus"],
		ingredients: [
			{ name: "London Dry Gin", units: "2", measurementType: "oz" },
			{ name: "Fresh lemon juice", units: "1", measurementType: "oz" },
			{ name: "Simple syrup", units: "1/2", measurementType: "oz" },
			{ name: "Club soda", units: "4", measurementType: "oz" },
		],
		steps: [
			{ order: 1, description: "Shake gin, lemon juice, and simple syrup with ice" },
			{ order: 2, description: "Strain into a highball or Collins glass filled with ice" },
			{ order: 3, description: "Top with club soda" },
			{ order: 4, description: "Garnish with a lemon slice and a cherry" }
		],
		likeCounter: 0
	},
	{
		id: "qo827HNgdfghfdhedrXWXFS",
		title: "Gin Sour",
		description: "A bright and silky gin cocktail with lemon, sugar and optional egg white foam.",
		author: "Jerry Thomas",
		date: new Date("1862-01-01"),
		imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		glass: "old fashioned",
		tags: ["classic", "sour", "citrus"],
		ingredients: [
			{ name: "Gin", units: "1 2/3", measurementType: "oz" },
			{ name: "Fresh lemon juice", units: "3/4", measurementType: "oz" },
			{ name: "Simple syrup", units: "1/2", measurementType: "oz" },
			{ name: "Egg white", units: "1", measurementType: "unit" }
		],
		steps: [
			{ order: 1, description: "Dry shake all ingredients (no ice) to foam" },
			{ order: 2, description: "Shake again with ice" },
			{ order: 3, description: "Strain into a rocks glass filled with fresh ice" },
			{ order: 4, description: "Garnish with a lemon slice (optional)" }
		],
		likeCounter: 0
	},
	{
		id: "p09zs8uhncfegfghngxbv",
		title: "Gin & Tonic",
		description: "A timeless highball of gin and tonic water, light and refreshing with lime garnish.",
		author: "British officers / Unknown",
		date: new Date("1868-01-01"),
		imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		glass: "highball",
		tags: ["classic", "refreshing", "fizz"],
		ingredients: [
			{ name: "Tanqueray London Dry Gin", units: "1 2/3", measurementType: "oz" },
			{ name: "Tonic water", units: "6 3/4", measurementType: "oz" },
			{ name: "Lime wedges", units: "2", measurementType: "unit" }
		],
		steps: [
			{ order: 1, description: "Fill a highball glass with ice" },
			{ order: 2, description: "Add gin and top with tonic water" },
			{ order: 3, description: "Stir gently" },
			{ order: 4, description: "Garnish with two lime wedges" }
		],
		likeCounter: 0
	},
	{
		id: "jkxzchias65htiftiafg",
		title: "Aviation",
		description: "A floral gin cocktail with lemon, maraschino liqueur and crème de violette, finished with a cherry.",
		author: "Hugo Ensslin",
		date: new Date("1916-01-01"),
		imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		glass: "cocktail",
		tags: ["classic", "floral", "citrus", "sour"],
		ingredients: [
			{ name: "Gin", units: "1 2/3", measurementType: "oz" },
			{ name: "Fresh lemon juice", units: "3/4", measurementType: "oz" },
			{ name: "Maraschino liqueur", units: "1/2", measurementType: "oz" },
			{ name: "Crème de Violette", units: "1/6", measurementType: "oz" }
		],
		steps: [
			{ order: 1, description: "Shake all ingredients with ice" },
			{ order: 2, description: "Fine strain into a chilled cocktail (martini) glass" },
			{ order: 3, description: "Garnish with a cherry" }
		],
		likeCounter: 0
	},
	{
		id: "iozhsu67fhcnbgklyhfnlihzg",
		title: "Whiskey Sour",
		description: "A classic sour cocktail with whiskey, lemon juice, sugar and egg white, smooth and refreshing.",
		author: "Jerry Thomas",
		date: new Date("1862-01-01"),
		imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		glass: "old fashioned",
		tags: ["classic", "sour", "strong"],
		ingredients: [
			{ name: "Whiskey", units: "2", measurementType: "oz" },
			{ name: "Fresh lemon juice", units: "1", measurementType: "oz" },
			{ name: "Simple syrup", units: "1/2", measurementType: "oz" },
			{ name: "Egg white", units: "1", measurementType: "unit" }
		],
		steps: [
			{ order: 1, description: "Dry shake all ingredients (no ice) if using egg white" },
			{ order: 2, description: "Shake again with ice" },
			{ order: 3, description: "Strain into a rocks (old fashioned) glass filled with ice" },
			{ order: 4, description: "Garnish with a cherry and a lemon wedge" }
		],
		likeCounter: 0
	},
	{
		id: "d6f8gv74j84jb68j4cfjkgh",
		title: "Old Fashioned",
		description: "A timeless cocktail of bourbon, sugar and bitters, served over ice with orange and cherry garnish.",
		author: "Jerry Thomas",
		date: new Date("1880-01-01"),
		imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		glass: "old fashioned",
		tags: ["classic", "strong", "sweet"],
		ingredients: [
			{ name: "Bourbon", units: "2", measurementType: "oz" },
			{ name: "Sugar cube", units: "1", measurementType: "unit" },
			{ name: "Angostura bitters", units: "3", measurementType: "dashes" },
			{ name: "Water", units: "1/4", measurementType: "oz" }
		],
		steps: [
			{ order: 1, description: "Place sugar cube in old fashioned glass, add bitters and a splash of water" },
			{ order: 2, description: "Muddle sugar until dissolved" },
			{ order: 3, description: "Add bourbon and ice, stir gently until chilled and slightly diluted" },
			{ order: 4, description: "Garnish with an orange twist (and cherry if desired)" }
		],
		likeCounter: 0
	},
	{
		id: "a39854fgjcf8tg4lk4lkd",
		title: "Rob Roy",
		description: "A Scotch-based Manhattan-style cocktail with sweet vermouth and bitters, elegant and smooth.",
		author: "Unnamed bartender at the Waldorf-Astoria",
		date: new Date("1894-01-01"),
		imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		glass: "cocktail",
		tags: ["classic", "strong", "dry"],
		ingredients: [
			{ name: "Scotch whisky", units: "1 1/3", measurementType: "oz" },
			{ name: "Sweet vermouth", units: "2/3", measurementType: "oz" },
			{ name: "Angostura bitters", units: "3", measurementType: "dashes" }
		],
		steps: [
			{ order: 1, description: "Add all ingredients into a mixing glass with ice" },
			{ order: 2, description: "Stir to mix, chill and dilute" },
			{ order: 3, description: "Fine strain into a chilled cocktail glass (martini style)" },
			{ order: 4, description: "Garnish with a cherry" }
		],
		likeCounter: 0
	},
	{
		id: "kmf6586t7i7468dv4fnsedr",
		title: "Mojito",
		description: "A refreshing mojito variation with Captain Morgan White Rum, lime, mint and soda water.",
		author: "Traditional Cuban / Unknown",
		date: new Date("1927-01-01"),
		imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		glass: "collins",
		tags: ["classic", "refreshing", "herbal", "citrus"],
		ingredients: [
			{ name: "White rum", units: "1 2/3", measurementType: "oz" },
			{ name: "Simple syrup", units: "1/2", measurementType: "oz" },
			{ name: "Club soda", units: "1", measurementType: "oz" },
			{ name: "Mint leaves", units: "6", measurementType: "unit" },
			{ name: "Lime", units: "1", measurementType: "unit" }
		],
		steps: [
			{ order: 1, description: "Place lime, mint and sugar/simple syrup in the glass" },
			{ order: 2, description: "Muddle gently" },
			{ order: 3, description: "Add rum, then fill with crushed ice or cubes" },
			{ order: 4, description: "Top with soda water and stir gently" },
			{ order: 5, description: "Garnish with a mint sprig" }
		],
		likeCounter: 0
	},
	{
		id: "mkop8678ty48jdv4tndsfng",
		title: "Cuba Libre",
		description: "A Cuban classic combining rum, cola, lime and a touch of bitters.",
		author: "American Bar, Havana",
		date: new Date("1902-01-01"),
		imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		glass: "highball",
		tags: ["classic", "refreshing", "fizz", "sweet"],
		ingredients: [
			{ name: "Rum", units: "1 1/2", measurementType: "oz" },
			{ name: "Cola", units: "3", measurementType: "oz" },
			{ name: "Angostura bitters", units: "1", measurementType: "dashes" },
			{ name: "Fresh lime juice", units: "1/2", measurementType: "oz" },
			{ name: "Lime slice", units: "1", measurementType: "unit" }
		],
		steps: [
			{ order: 1, description: "Fill a highball glass with ice" },
			{ order: 2, description: "Add rum and lime juice" },
			{ order: 3, description: "Top with cola and bitters" },
			{ order: 4, description: "Stir gently and garnish with a lime slice" }
		],
		likeCounter: 0
	},
	{
		id: "6897f647tisdrths8ejhcg",
		title: "Margarita",
		description: "A premium margarita with Don Julio tequila, triple sec and lime juice, served with a salted rim.",
		author: "Carlos “Danny” Herrera",
		date: new Date("1938-01-01"),
		imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		glass: "margarita",
		tags: ["classic", "citrus"],
		ingredients: [
			{ name: "Tequila", units: "1 2/3", measurementType: "oz" },
			{ name: "Fresh lime juice", units: "3/4", measurementType: "oz" },
			{ name: "Triple sec", units: "3/4", measurementType: "oz" }
		],
		steps: [
			{ order: 1, description: "Shake all ingredients with ice" },
			{ order: 2, description: "Strain into a margarita glass with salted rim" },
			{ order: 3, description: "Garnish with a lime slice" }
		],
		likeCounter: 0
	},
	{
		id: "89v44w55hvd6fthxzdf87whxhf",
		title: "Tequila Sunrise",
		description: "A colorful tequila cocktail with orange juice and grenadine, creating a sunrise effect.",
		author: "Bobby Lozoff & Billy Rice",
		date: new Date("1972-01-01"),
		imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		glass: "highball",
		tags: ["classic", "fruity", "sweet", "citrus"],
		ingredients: [
			{ name: "Tequila", units: "1 2/3", measurementType: "oz" },
			{ name: "Fresh orange juice", units: "4", measurementType: "oz" },
			{ name: "Grenadine", units: "1/2", measurementType: "oz" }
		],
		steps: [
			{ order: 1, description: "Add tequila and orange juice into a highball glass with ice" },
			{ order: 2, description: "Stir gently to combine" },
			{ order: 3, description: "Slowly pour grenadine over to create sunrise effect" },
			{ order: 4, description: "Garnish with an orange slice and a cherry" }
		],
		likeCounter: 0
	},
];
