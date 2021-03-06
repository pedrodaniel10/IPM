var FOOD_ITEMS = {
    "menu-entradas": [
        { _name: "Bolo do Caco",
            _price: 250,
            _desc: "Pão tradicional da Madeira, servido com manteiga de alho.",
            _img: "images/foods/bolocaco.jpg",
            _classif: 4,
            _ctime: 2,
            _ingredientsString: "Pão e manteiga de alho.",
            _ingredients: ["Manteiga de Alho"] },

        { _name: "Camarão",
            _price: 300,
            _desc: "Prato de camarões temperados e molho cocktail.",
            _img: "images/foods/camaroes.jpg",
            _classif: 5,
            _ctime: 1,
            _ingredientsString: "Camarão e molho cocktail.",
            _ingredients: ["Molho cocktail"] },

        { _name: "Salada de Polvo",
            _price: 400,
            _desc: "Temperada com cebola, alho e um molho com pimentos.",
            _img: "images/foods/saladapolvo.jpg",
            _classif: 5,
            _ctime: 1,
            _ingredientsString: "Polvo, cebola, alho e pimentos.",
            _ingredients: ["Cebola", "Alho", "Pimentos"] },
    ],
    "menu-sopas": [
        { _name: "Sopa de Agrião",
            _price: 250,
            _desc: "Com o agrião mais fresco da nossa região.",
            _img: "images/foods/sagriao.jpg",
            _classif: 4,
            _ctime: 3,
            _ingredientsString: "Agrião, cenoura e batata",
            _ingredients: ["Agrião", "Cenoura"] },

        { _name: "Caldo Verde",
            _price: 300,
            _desc: "Tradicional caldo português à base de couve.",
            _img: "images/foods/caldoverde.jpg",
            _classif: 5,
            _ctime: 3,
            _ingredientsString: "Couve, choriço, alho e batata.",
            _ingredients: [ "Choriço", "Alho"] },

        { _name: "Sopa de Castanha",
            _price: 250,
            _desc: "Tradicional da Grandiosa Ilha da Madeira.",
            _img: "images/foods/scastanha.jpg",
            _classif: 4,
            _ctime: 3,
            _ingredientsString: "Castanha, alho e batata.",
            _ingredients: ["Cebola", "Alho"] },
    ],
    "menu-pratos": [
        { _name: "Bitoque de Porco",
            _price: 600,
            _desc: "Bitoque à portuguesa, com um ovo a cavalo.",
            _img: "images/foods/bitoque.jpg",
            _classif: 5,
            _ctime: 5,
            _ingredientsString: "Carne de porco, arroz, salada, ovo e batatas fritas.",
            _ingredients: ["Arroz", "Salada", "Ovo", "Batatas fritas"] },

        { _name: "Espetada",
            _price: 720,
            _desc: "Carne de vaca em pau de louro.",
            _img: "images/foods/espetada.jpg",
            _classif: 4,
            _ctime: 10,
            _ingredientsString: "Carne de vaca, arroz, salada e milho frito.",
            _ingredients: ["Arroz", "Salada", "Milho frito"] },

        { _name: "Picado de Carne",
            _price: 650,
            _desc: "Pedaços de carne de vaca, com molho de natas.",
            _img: "images/foods/picado.jpg",
            _classif: 5,
            _ctime: 8,
            _ingredientsString: "Carne de vaca, batatas fritas, arroz, salada e molho de natas.",
            _ingredients: ["Batata", "Arroz", "Salada", "Molho de natas"] },
    ],
    "menu-bebidas": [
        { _name: "Cerveja Coral",
            _price: 125,
            _desc: "Cerveja preferida do famoso Cristiano Ronaldo.",
            _img: "images/foods/cerveja.jpg",
            _classif: 3,
            _ctime: 1,
            _ingredientsString: "Cerveja.",
            _ingredients: [] },

        { _name: "Coca-Cola",
            _price: 150,
            _desc: "O refrigerante mais famoso do mundo!",
            _img: "images/foods/cocacola.jpg",
            _classif: 4,
            _ctime: 1,
            _ingredientsString: "Coca-cola.",
            _ingredients: ["Gelo","Rodela Limão"] },

        { _name: "Brisa-Maçã",
            _price: 150,
            _desc: "Refrigerante de maçã tradicional da Madeira.",
            _img: "images/foods/brisa.jpg",
            _classif: 5,
            _ctime: 1,
            _ingredientsString: "Brisa-Maçã.",
            _ingredients: ["Gelo"] },
    ],
    "menu-sobremesas": [
        { _name: "Broas de Mel",
            _price: 250,
            _desc: "Broas tradicionais portuguesas.",
            _img: "images/foods/broas.jpg",
            _classif: 5,
            _ctime: 1,
            _ingredientsString: "Mel.",
            _ingredients: ["Doce Framboesas"] },

        { _name: "Arroz Doce",
            _price: 300,
            _desc: "O clássico português com canela.",
            _img: "images/foods/arrozdoce.jpg",
            _classif: 4,
            _ctime: 1,
            _ingredientsString: "Arroz, leite e canela.",
            _ingredients: ["Canela"] },

        { _name: "Serradura",
            _price: 300,
            _desc: "Doce de bolacha com natas e leite condensado.",
            _img: "images/foods/serradura.jpg",
            _classif: 4,
            _ctime: 1,
            _ingredientsString: "Bolacha, natas e leite.",
            _ingredients: ["Doce da Casa"] },
    ],
    "menu-cafetaria": [
        { _name: "Carioca de Limão",
            _price: 100,
            _desc: "Infusão preparada com casca de limão.",
            _img: "images/foods/carioca.jpg",
            _classif: 3,
            _ctime: 1,
            _ingredientsString: "Limão.",
            _ingredients: ["Açúcar","Rodela Limão"] },

        { _name: "Café",
            _price: 100,
            _desc: "É café.",
            _img: "images/foods/cafe.jpg",
            _classif: 4,
            _ctime: 1,
            _ingredientsString: "Café.",
            _ingredients: ["Açúcar"] },

        { _name: "Galão",
            _price: 80,
            _desc: "Deliciosa bebida de café e leite.",
            _img: "images/foods/galao.jpg",
            _classif: 5,
            _ctime: 1,
            _ingredientsString: "Café e leite.",
            _ingredients: ["Açúcar"] },
    ]
};

function getFoodByName(name) {
    for (let menu in FOOD_ITEMS) {
        for (let i = 0; i < FOOD_ITEMS[menu].length; i++) {
            if (FOOD_ITEMS[menu][i]._name === name)
                return FOOD_ITEMS[menu][i];
        }
    }
    console.log("Comida \"" + name + "\" não encontrada.");
}

function getFoodCategory(name) {
    for (let menu in FOOD_ITEMS) {
        for (let i = 0; i < FOOD_ITEMS[menu].length; i++) {
            if (FOOD_ITEMS[menu][i]._name === name)
                return menu;
        }
    }
    console.log("Comida \"" + name + "\" não encontrada.");
}
