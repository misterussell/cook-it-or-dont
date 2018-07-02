// Schema tests will go here
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { graphql } from 'graphql';

describe('The schema should contain the following', () => {

  const schemaString = `enum Category {
	BREAKFAST
	LUNCH
	DINNER
	DESSERT
	SNACK
	BEVERAGE
}

enum DBType {
	INFO
	ELEM
	INGR
}

type Element {
	recipeID: ID!
	elementID: ID!
	type: ID!
	title: String!
	dbtype: DBType!
	ingredients: [Ingredient]
}

input ElementInput {
	elementID: ID!
	title: String!
}

input InfoInput {
	recipeID: ID!
	title: String!
	category: Category
	status: Status
}

type Ingredient {
	recipeID: ID!
	elementID: ID!
	ingredientID: ID!
	type: ID!
	title: String!
	dbtype: DBType!
	count: Float!
	measurement: String!
}

input IngredientInput {
	elementID: ID!
	ingredientID: ID!
	title: String!
	count: Float!
	measurement: String!
}

type Mutation {
	createRecipe(info: InfoInput, elements: [ElementInput], ingredients: [IngredientInput]): RecipeResult
	createInfo(info: InfoInput): RecipeInfo
	createElement(element: ElementInput): Element
	createIngredient(ingredient: IngredientInput): Ingredient
}

type Query {
	composeRecipe(recipeID: ID!): RecipeObj
	getRecipe(recipeID: ID!, type: ID!): Recipe
	listRecipes(first: Int, after: String): RecipeConnection
}

type Recipe {
	recipeID: ID!
	type: ID!
	title: String!
	elements: [Element]
	ingredients: [Ingredient]
}

type RecipeConnection {
	items: [Recipe]
	nextToken: String
}

type RecipeInfo {
	recipeID: ID!
	type: ID!
	title: String!
	dbtype: DBType!
	category: Category
	status: Status!
	creationDate: String
}

type RecipeObj {
	recipeID: ID!
	category: Category
	elements: [Element]
	title: String
	status: String
	creationDate: String
	lastUpdated: String
	author: String
}

type RecipeResult {
	info: RecipeInfo
	elements: [Element]
	ingredients: [Ingredient]
}

enum Status {
	DRAFTED
	PUBLISHED
}`;

  const schema = makeExecutableSchema({ typeDefs: schemaString });
  addMockFunctionsToSchema({ schema });


  beforeEach(() => {

  });

  it('Should have a Recipe Schema', () => {
    // this needs to expose all elements as well as ingredients.
    // does not have required properties as it will be primarily
    // used as the return object not the creation objects
    expect().toEqual({})
    //
  });

  it('Should have an Info Schema', () => {
    // the info schema needs to expose the parent ID

  });

  it('Should have a composeRecipe method to query a specific recipe by ID and returns all rows of the db for that part', () => {
    // because the return of this part isn't a simple object I need to research the mock API
  })
})
